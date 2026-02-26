import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-900 border-t border-gray-100  pt-20 pb-12 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-5 space-y-8">
            <div className="font-black tracking-tighter text-3xl">
              INCUVERA.
            </div>
            <p className="text-gray-500 text-lg leading-relaxed max-w-sm">
              Building the infrastructure behind great businesses. Moving
              founders from ambition to operational maturity.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:border-emerald-500 hover:text-emerald-600 transition-all"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-current" />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-8">
              Initiative
            </h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li>
                <button className="hover:text-emerald-600 transition-colors">
                  About IncuVera
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-600 transition-colors">
                  Incubation Framework
                </button>
              </li>
              <li>
                <button className="hover:text-emerald-600 transition-colors">
                  Events & Seminars
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-8">
              Programme
            </h4>
            <ul className="space-y-4 text-sm font-semibold text-gray-500">
              <li>
                <span className="opacity-50">Diagnostic</span>
              </li>
              <li>
                <span className="opacity-50">Architecture</span>
              </li>
              <li>
                <span className="opacity-50">Structural Build</span>
              </li>
              <li>
                <span className="opacity-50">Market Activation</span>
              </li>
              <li>
                <span className="opacity-50">Governance</span>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-8">
              Connect
            </h4>
            <ul className="space-y-4 text-sm font-semibold">
              <li>
                <a
                  href="#"
                  className="text-emerald-600 hover:underline underline-offset-4"
                >
                  Apply Now
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-600 transition-colors"
                >
                  Sponsorship
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-emerald-600 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-50 flex flex-col md:grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            © 2026 IncuVera Initiative. All Rights Reserved.
          </div>
          <div className="md:col-span-6 flex justify-center md:justify-end gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <a href="#" className="hover:text-emerald-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-emerald-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-emerald-600 transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
