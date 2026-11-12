import React, { useState } from 'react';
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
  MapPin,
  Clock,
  Youtube,
  Instagram,
  Linkedin,
  ArrowUpRight,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData.ts';

export function Contact() {
  // Form State
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
    submissionId?: string;
  } | null>(null);

  // Privacy Protection State (Hidden until explicitly approved)
  const [isContactRevealed, setIsContactRevealed] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please enter your name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errors.message = 'Please enter a message (at least 5 characters).';
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
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitResult({
          success: true,
          message: data.message || 'Your message has been sent to Vaibhav Garad!',
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
        message: 'Network error connecting to backend. Please check connection and retry.',
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
    <section id="contact" className="py-20 md:py-28 bg-white border-t border-[#EAEAEA]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-bold tracking-widest text-[#4169E1] uppercase block mb-2">
            Reach Out
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#171717] tracking-tight">
            Let's Connect.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#777777] leading-relaxed">
            Have a question, collaboration idea, or want to connect? Send a message or reach out through my digital channels.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Clean Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-[#F8F9FA] rounded-2xl border border-[#EAEAEA] p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#EAEAEA]">
              <div>
                <h3 className="text-base font-bold text-[#171717]">Send a Direct Message</h3>
                <p className="text-xs text-[#777777] mt-0.5">
                  Delivered straight to Vaibhav Garad's inbox.
                </p>
              </div>
              <span className="text-[11px] font-mono text-[#4169E1] font-semibold">Active API</span>
            </div>

            {submitResult && (
              <div
                className={`mb-6 p-4 rounded-xl border flex items-start gap-3 ${
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
                <div className="text-xs sm:text-sm">
                  <p className="font-semibold">{submitResult.message}</p>
                  {submitResult.submissionId && (
                    <p className="text-[11px] opacity-80 mt-1 font-mono">
                      Tracking ID: {submitResult.submissionId}
                    </p>
                  )}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-[#171717] mb-1.5">
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
                  placeholder="e.g. Alex Sharma"
                  className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-[#171717] placeholder:text-[#777777]/50 focus:outline-none focus:ring-2 focus:ring-[#4169E1] transition-all ${
                    fieldErrors.name ? 'border-rose-400 bg-rose-50/20' : 'border-[#EAEAEA]'
                  }`}
                />
                {fieldErrors.name && (
                  <p className="text-xs text-rose-600 mt-1">{fieldErrors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-[#171717] mb-1.5">
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
                  placeholder="e.g. alex@example.com"
                  className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-[#171717] placeholder:text-[#777777]/50 focus:outline-none focus:ring-2 focus:ring-[#4169E1] transition-all ${
                    fieldErrors.email ? 'border-rose-400 bg-rose-50/20' : 'border-[#EAEAEA]'
                  }`}
                />
                {fieldErrors.email && (
                  <p className="text-xs text-rose-600 mt-1">{fieldErrors.email}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-[#171717] mb-1.5">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: '' });
                  }}
                  placeholder="Share a message, inquiry, or question..."
                  className={`w-full px-4 py-2.5 rounded-xl bg-white border text-sm text-[#171717] placeholder:text-[#777777]/50 focus:outline-none focus:ring-2 focus:ring-[#4169E1] transition-all resize-none ${
                    fieldErrors.message ? 'border-rose-400 bg-rose-50/20' : 'border-[#EAEAEA]'
                  }`}
                />
                {fieldErrors.message && (
                  <p className="text-xs text-rose-600 mt-1">{fieldErrors.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#4169E1] hover:bg-[#3154b3] disabled:opacity-60 disabled:cursor-not-allowed rounded-xl transition-all duration-200 shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#4169E1]"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Right Column: Channels & Privacy-Protected Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            {/* 1. Direct Contact Privacy Protection Card */}
            <div className="bg-[#F8F9FA] rounded-2xl border border-[#EAEAEA] p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#EAEAEA] flex items-center justify-center text-[#4169E1]">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#171717]">Direct Contact Information</h3>
                    <p className="text-[11px] text-[#777777]">Protected to prevent scraping</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsContactRevealed(!isContactRevealed)}
                  className="px-2.5 py-1 text-xs font-semibold text-[#4169E1] hover:text-[#3154b3] bg-white border border-[#EAEAEA] rounded-md transition-colors flex items-center gap-1 shadow-xs"
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

              {/* Revealable Contact Links or Privacy Mask */}
              {isContactRevealed ? (
                <div className="space-y-3.5 pt-2 border-t border-[#EAEAEA] animate-fadeIn">
                  {/* Email contact link */}
                  <div className="bg-white p-3.5 rounded-xl border border-[#EAEAEA] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-md bg-[#4169E1]/10 text-[#4169E1] flex items-center justify-center shrink-0">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-[#777777] block font-semibold uppercase tracking-wider">
                          Email Contact
                        </span>
                        <a
                          href={`mailto:${PERSONAL_INFO.email}`}
                          className="text-xs font-semibold text-[#171717] hover:text-[#4169E1] truncate block"
                        >
                          {PERSONAL_INFO.email}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(PERSONAL_INFO.email, 'email')}
                      className="p-1.5 text-[#777777] hover:text-[#171717] rounded-md hover:bg-[#F8F9FA] transition-colors shrink-0"
                      title="Copy email address"
                    >
                      {copiedType === 'email' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Phone contact link */}
                  <div className="bg-white p-3.5 rounded-xl border border-[#EAEAEA] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-md bg-[#4169E1]/10 text-[#4169E1] flex items-center justify-center shrink-0">
                        <Phone className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-[#777777] block font-semibold uppercase tracking-wider">
                          Phone Contact
                        </span>
                        <a
                          href={`tel:${PERSONAL_INFO.phone}`}
                          className="text-xs font-semibold text-[#171717] hover:text-[#4169E1] block font-mono"
                        >
                          {PERSONAL_INFO.phoneFormatted}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(PERSONAL_INFO.phone, 'phone')}
                      className="p-1.5 text-[#777777] hover:text-[#171717] rounded-md hover:bg-[#F8F9FA] transition-colors shrink-0"
                      title="Copy phone number"
                    >
                      {copiedType === 'phone' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-white border border-[#EAEAEA] text-center space-y-2">
                  <p className="text-xs text-[#777777] leading-relaxed">
                    Personal phone and direct email are shielded from public crawlers.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsContactRevealed(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4169E1] hover:underline"
                  >
                    <span>Click to reveal contact details</span>
                  </button>
                </div>
              )}
            </div>

            {/* 2. Digital Channels (YouTube, LinkedIn, Instagram) */}
            <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6 space-y-4">
              <h3 className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                Digital Presence &amp; Social Links
              </h3>

              <div className="space-y-2.5">
                {/* YouTube Link */}
                <a
                  href={PERSONAL_INFO.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-[#EAEAEA] hover:border-[#FF0000]/40 hover:bg-[#F8F9FA] flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#FF0000] flex items-center justify-center">
                      <Youtube className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#171717] block group-hover:text-[#FF0000] transition-colors">
                        YouTube Channel
                      </span>
                      <span className="text-[11px] text-[#777777]">@MiniAiYT · AI Tutorials &amp; Content</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#777777] group-hover:text-[#FF0000] transition-colors" />
                </a>

                {/* LinkedIn Link */}
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-[#EAEAEA] hover:border-[#0077B5]/40 hover:bg-[#F8F9FA] flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0077B5] flex items-center justify-center">
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#171717] block group-hover:text-[#0077B5] transition-colors">
                        LinkedIn Profile
                      </span>
                      <span className="text-[11px] text-[#777777]">Professional network &amp; updates</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#777777] group-hover:text-[#0077B5] transition-colors" />
                </a>

                {/* Instagram Link */}
                <a
                  href={PERSONAL_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl border border-[#EAEAEA] hover:border-[#E4405F]/40 hover:bg-[#F8F9FA] flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-pink-50 text-[#E4405F] flex items-center justify-center">
                      <Instagram className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#171717] block group-hover:text-[#E4405F] transition-colors">
                        Instagram Profile
                      </span>
                      <span className="text-[11px] text-[#777777]">Creative visuals &amp; highlights</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#777777] group-hover:text-[#E4405F] transition-colors" />
                </a>
              </div>
            </div>

            {/* Location & Timezone card */}
            <div className="bg-[#F8F9FA] rounded-xl border border-[#EAEAEA] p-4 flex items-center justify-between text-xs text-[#777777]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#4169E1] shrink-0" />
                <span>Maharashtra, India</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono text-[11px]">
                <Clock className="w-3.5 h-3.5 text-[#4169E1]" />
                <span>IST (UTC+5:30)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
