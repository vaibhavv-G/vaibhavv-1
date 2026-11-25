import express from 'express';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || 'vgarad75@gmail.com';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  projectType?: string;
  message: string;
  createdAt: string;
  deliveryMethod: 'smtp' | 'formsubmit' | 'stored_only';
}

const memorySubmissions: ContactSubmission[] = [];

async function sendViaSmtp(submission: ContactSubmission): Promise<boolean> {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    return false;
  }

  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = Number(process.env.SMTP_PORT) || 465;

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  await transporter.sendMail({
    from: `"Portfolio Quote" <${smtpUser}>`,
    to: RECIPIENT_EMAIL,
    replyTo: submission.email,
    subject: `New Website Quote Request (${submission.projectType || 'Website'}) from ${submission.name}`,
    text: [
      `New Website Quote / Inquiry for Vaibhav Garad`,
      `--------------------------------------------------`,
      `Name: ${submission.name}`,
      `Client Email: ${submission.email}`,
      `Project Type: ${submission.projectType || 'Website Inquiry'}`,
      `Submitted At: ${submission.createdAt}`,
      ``,
      `Message:`,
      submission.message,
    ].join('\n'),
    html: `
      <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="margin: 0 0 12px; color: #0f172a;">New Website Quote Request</h2>
        <p style="margin: 0 0 16px; color: #475569; font-size: 14px;">You received a new inquiry from your portfolio website.</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 8px 0; color: #64748b; width: 120px;"><strong>Name</strong></td><td style="padding: 8px 0; color: #0f172a;">${escapeHtml(submission.name)}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;"><strong>Email</strong></td><td style="padding: 8px 0;"><a href="mailto:${escapeHtml(submission.email)}">${escapeHtml(submission.email)}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;"><strong>Website Type</strong></td><td style="padding: 8px 0; color: #2563eb; font-weight: 600;">${escapeHtml(submission.projectType || 'Website Inquiry')}</td></tr>
        </table>
        <div style="margin-top: 16px; padding: 14px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
          <strong style="display: block; margin-bottom: 6px; font-size: 13px; color: #475569;">Project Details</strong>
          <p style="margin: 0; white-space: pre-wrap; color: #0f172a; font-size: 14px;">${escapeHtml(submission.message)}</p>
        </div>
      </div>
    `,
  });

  return true;
}

async function sendViaFormSubmit(submission: ContactSubmission): Promise<boolean> {
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(RECIPIENT_EMAIL)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: process.env.APP_URL || 'http://localhost:3000',
        Referer: process.env.APP_URL || 'http://localhost:3000',
      },
      body: JSON.stringify({
        name: submission.name,
        email: submission.email,
        _replyto: submission.email,
        _subject: `New Quote Request (${submission.projectType || 'Website'}) from ${submission.name}`,
        projectType: submission.projectType || 'Website Inquiry',
        message: submission.message,
        _template: 'table',
      }),
    });

    if (!response.ok) {
      return false;
    }

    const result = (await response.json()) as { success?: string | boolean; message?: string };
    return result.success === true || result.success === 'true';
  } catch (err) {
    console.warn('FormSubmit forward failed:', err);
    return false;
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  app.use(express.json());

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      time: new Date().toISOString(),
      smtpConfigured: Boolean(process.env.SMTP_USER && process.env.SMTP_PASS),
      recipient: RECIPIENT_EMAIL,
    });
  });

  app.post('/api/contact', async (req, res) => {
    const { name, email, message, projectType } = req.body || {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your name (minimum 2 characters).',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.',
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a message (minimum 5 characters).',
      });
    }

    const submission: ContactSubmission = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      email: email.trim(),
      projectType: typeof projectType === 'string' && projectType.trim() ? projectType.trim() : 'Website Inquiry',
      message: message.trim(),
      createdAt: new Date().toISOString(),
      deliveryMethod: 'stored_only',
    };

    try {
      const sentSmtp = await sendViaSmtp(submission);
      if (sentSmtp) {
        submission.deliveryMethod = 'smtp';
      } else {
        const sentFormSubmit = await sendViaFormSubmit(submission);
        if (sentFormSubmit) {
          submission.deliveryMethod = 'formsubmit';
        }
      }
    } catch (err) {
      console.error('Email delivery error:', err);
    }

    memorySubmissions.unshift(submission);

    try {
      const dataDir = path.resolve(__dirname, 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(
        path.join(dataDir, 'messages.json'),
        JSON.stringify(memorySubmissions, null, 2),
        'utf-8'
      );
    } catch (err) {
      console.warn('Could not write message to file system:', err);
    }

    console.log(
      `[Contact Quote] ${submission.name} <${submission.email}> (${submission.projectType}) -> delivery: ${submission.deliveryMethod} -> ${RECIPIENT_EMAIL}`
    );

    const emailDispatched = submission.deliveryMethod === 'smtp' || submission.deliveryMethod === 'formsubmit';

    return res.status(200).json({
      success: true,
      emailDispatched,
      deliveryMethod: submission.deliveryMethod,
      recipient: RECIPIENT_EMAIL,
      message: emailDispatched
        ? `Thank you, ${submission.name}! Your quote request has been sent to ${RECIPIENT_EMAIL}.`
        : `Thank you, ${submission.name}! Your quote request has been saved. You can also send it directly via your email app below.`,
      submissionId: submission.id,
      timestamp: submission.createdAt,
    });
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Vaibhav Garad Portfolio server running at http://0.0.0.0:${port}`);
  });
}

startServer();
