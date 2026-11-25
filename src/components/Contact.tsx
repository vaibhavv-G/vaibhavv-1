import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Eye,
  EyeOff,
  Copy,
  Check,
  Linkedin,
  ArrowUpRight,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';
import { YouTubeLogo, InstagramLogo } from './SocialIcons.tsx';

interface ContactProps {
  selectedService?: string | null;
}

const PROJECT_TYPES = ['Business Website', 'Portfolio & Landing Page', 'Modern React & AI Site', 'Other'];

export function Contact({ selectedService }: ContactProps) {
  const [projectType, setProjectType] = useState<string>('Business Website');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    emailDispatched?: boolean;
    mailtoHref?: string;
    submissionId?: string;
  } | null>(null);

  const [isContactRevealed, setIsContactRevealed] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  useEffect(() => {
    if (selectedService && PROJECT_TYPES.includes(selectedService)) {
      setProjectType(selectedService);
    }
  }, [selectedService]);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please enter your name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errors.message = 'Please tell me briefly about your website needs.';
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitResult(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const subject = encodeURIComponent(`Website Quote Request (${projectType}) from ${formData.name}`);
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${projectType}\n\nMessage:\n${formData.message}`
        );
        setSubmitResult({
          success: true,
          emailDispatched: Boolean(data.emailDispatched),
          mailtoHref: `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`,
          message: data.message || `Your quote request has been sent to ${PERSONAL_INFO.email}!`,
          submissionId: data.submissionId,
        });
        setFormData({ name: '', email: '', message: '' });
        setFieldErrors({});
      } else {
        setSubmitResult({
          success: false,
          message: data.error || 'Failed to send message. Please try again.',
        });
      }
    } catch {
      setSubmitResult({
        success: false,
        message: 'Network error. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-24 bg-[#0B1120] bg-grid-dark text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Headline & Direct Channels */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div>
              <span className="text-xs font-bold tracking-widest text-[#60A5FA] uppercase block mb-2">
                Start Your Website
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight text-balance">
                Let's Build Your Business Website.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                Affordable pricing, fast delivery, and proven experience across 50+ businesses. Send a message to get started.
              </p>
            </div>

            {/* Protected Contact Box */}
            <div className="bg-[#131C31] rounded-2xl border border-white/10 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#60A5FA]" />
                  <span className="text-xs font-bold text-white">Direct Contact</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsContactRevealed(!isContactRevealed)}
                  className="px-2.5 py-1 text-xs font-semibold text-[#60A5FA] hover:text-white bg-white/5 border border-white/10 rounded-md transition-colors flex items-center gap-1"
                >
                  {isContactRevealed ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hide</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Reveal</span>
                    </>
                  )}
                </button>
              </div>

              {isContactRevealed ? (
                <div className="space-y-2.5 pt-2 border-t border-white/10">
                  <div className="bg-[#0B1120] p-3 rounded-xl border border-white/10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Mail className="w-4 h-4 text-[#60A5FA] shrink-0" />
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-xs font-medium text-white hover:text-[#60A5FA] truncate"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                      className="p-1.5 text-slate-400 hover:text-white rounded"
                      title="Copy email"
                    >
                      {copiedType === 'email' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="bg-[#0B1120] p-3 rounded-xl border border-white/10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Phone className="w-4 h-4 text-[#60A5FA] shrink-0" />
                      <a
                        href={`tel:${PERSONAL_INFO.phone}`}
                        className="text-xs font-mono font-medium text-white hover:text-[#60A5FA]"
                      >
                        {PERSONAL_INFO.phoneFormatted}
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                      className="p-1.5 text-slate-400 hover:text-white rounded"
                      title="Copy phone"
                    >
                      {copiedType === 'phone' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400">
                  Phone &amp; email are hidden to block spam bots. Click Reveal when needed.
                </p>
              )}
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={PERSONAL_INFO.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors"
              >
                <YouTubeLogo className="w-4 h-4 shrink-0" />
                <span>@miniaiyt</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>
              <a
                href={PERSONAL_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors"
              >
                <InstagramLogo className="w-4 h-4 shrink-0" />
                <span>@vaibhavvv_275</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-200 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </motion.div>

          {/* Right Column: High-Contrast White Inquiry Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white text-[#0F172A] rounded-2xl p-6 sm:p-8 shadow-2xl"
          >
            {/* Interactive Project Type Tabs */}
            <div className="mb-6">
              <span className="block text-xs font-bold text-[#0F172A] mb-2.5">
                What kind of website do you need?
              </span>
              <div className="flex flex-wrap gap-2">
                {PROJECT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setProjectType(type)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                      projectType === type
                        ? 'bg-[#0B1120] text-white'
                        : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {submitResult && (
              <div
                className={`mb-5 p-4 rounded-xl border flex items-start gap-3 ${
                  submitResult.success
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-rose-50 border-rose-200 text-rose-800'
                }`}
              >
                {submitResult.success ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
                )}
                <div className="text-xs sm:text-sm space-y-2">
                  <p className="font-semibold">{submitResult.message}</p>
                  {submitResult.success && !submitResult.emailDispatched && submitResult.mailtoHref && (
                    <a
                      href={submitResult.mailtoHref}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Send Directly via Email App</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                    }}
                    placeholder="Your name"
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all ${
                      fieldErrors.name ? 'border-rose-400' : 'border-[#E2E8F0]'
                    }`}
                  />
                  {fieldErrors.name && (
                    <p className="text-xs text-rose-600 mt-1">{fieldErrors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                    }}
                    placeholder="you@business.com"
                    className={`w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all ${
                      fieldErrors.email ? 'border-rose-400' : 'border-[#E2E8F0]'
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="text-xs text-rose-600 mt-1">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-[#0F172A] mb-1.5">
                  Project Details <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: '' });
                  }}
                  placeholder="Tell me about your business and the website you want..."
                  className={`w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:bg-white transition-all resize-none ${
                    fieldErrors.message ? 'border-rose-400' : 'border-[#E2E8F0]'
                  }`}
                />
                {fieldErrors.message && (
                  <p className="text-xs text-rose-600 mt-1">{fieldErrors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 rounded-xl transition-all duration-200 shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Request Affordable Quote</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
