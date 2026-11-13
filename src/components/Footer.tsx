import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070B14] border-t border-white/10 py-10 text-slate-400">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-md bg-[#2563EB] text-white flex items-center justify-center font-bold text-[10px]">
            VG
          </span>
          <span className="font-semibold text-white">Vaibhav Garad</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Website Developer (50+ Businesses Served)</span>
        </div>

        <div className="flex items-center gap-4">
          <p>© 2026 Vaibhav Garad. All Rights Reserved.</p>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
