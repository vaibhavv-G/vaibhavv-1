import React, { useState, useRef } from 'react';
import { X, Upload, Check, AlertCircle, RefreshCw, Image as ImageIcon } from 'lucide-react';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhoto: string | null;
  onPhotoUpdated: (photoUrl: string | null) => void;
}

export function PhotoUploadModal({
  isOpen,
  onClose,
  currentPhoto,
  onPhotoUpdated,
}: PhotoUploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentPhoto);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    setError(null);
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file (PNG, JPG, WEBP).');
      return;
    }
    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size exceeds 5MB limit. Please choose a smaller photo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    };
    reader.onerror = () => {
      setError('Failed to read file. Please try another image.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSave = () => {
    if (preview) {
      try {
        localStorage.setItem('vg_portfolio_profile_photo', preview);
      } catch (err) {
        console.warn('Storage quota exceeded, using in-memory only', err);
      }
      onPhotoUpdated(preview);
      onClose();
    }
  };

  const handleReset = () => {
    try {
      localStorage.removeItem('vg_portfolio_profile_photo');
    } catch {
      // ignore
    }
    setPreview(null);
    onPhotoUpdated(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full border border-[#EAEAEA] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAEAEA]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#4169E1]/10 text-[#4169E1] flex items-center justify-center">
              <CameraIcon className="w-4 h-4" />
            </div>
            <h3 className="text-base font-semibold text-[#171717]">Update Profile Photograph</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-[#777777] hover:text-[#171717] rounded-lg hover:bg-[#F8F9FA] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-[#777777] leading-relaxed">
            Upload your original portrait photograph. To preserve your authentic identity, no AI face substitution is performed.
          </p>

          {/* Drag & Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-[#4169E1] bg-[#4169E1]/5'
                : 'border-[#EAEAEA] hover:border-[#4169E1]/50 bg-[#F8F9FA]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
            />

            {preview ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#4169E1] shadow-sm">
                  <img
                    src={preview}
                    alt="Uploaded profile preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-xs text-[#171717] font-medium flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Photo ready to apply
                </div>
                <p className="text-[11px] text-[#777777]">Click to select a different image</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2.5">
                <div className="w-12 h-12 rounded-full bg-white border border-[#EAEAEA] flex items-center justify-center text-[#4169E1] shadow-xs">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-[#171717]">
                  Click to upload or drag & drop photo
                </div>
                <p className="text-[11px] text-[#777777]">Supports JPG, PNG, WEBP up to 5MB</p>
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 p-3 rounded-lg border border-rose-100">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
              <Check className="w-4 h-4 shrink-0" />
              <span>Photo loaded successfully! Click Save to apply.</span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F8F9FA] border-t border-[#EAEAEA] flex items-center justify-between">
          {preview ? (
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset
            </button>
          ) : (
            <span className="text-[11px] text-[#777777]">No photo uploaded yet</span>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-medium text-[#777777] hover:text-[#171717] transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!preview}
              onClick={handleSave}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-[#4169E1] hover:bg-[#3154b3] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors shadow-xs"
            >
              Save Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CameraIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}
