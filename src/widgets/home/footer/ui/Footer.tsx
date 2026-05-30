"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

const localeLabels: Record<string, string> = {
  de: "Deutsch",
  en: "English",
  hr: "Hrvatski",
};

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);

  const switchLocale = (next: string) => {
    router.replace(pathname, { locale: next });
    setLangOpen(false);
  };

  const navLinks = [
    { label: t("link1"), href: "#speisekarte" },
    { label: t("link2"), href: "#about" },
    { label: t("link3"), href: "#reservations" },
    { label: t("link4"), href: "#reservations" },
    { label: t("link5"), href: "#contact" },
  ];
  const hours = [
    { day: t("day1"), time: t("day1Time") },
    { day: t("day2"), time: t("day2Time") },
    { day: t("day3"), time: t("day3Time") },
  ];

  return (
    <footer id="contact" className="bg-[#080706] border-t border-amber-900/20 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-2xl font-bold tracking-[0.25em] text-amber-400 mb-4">
              EL NIGO
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed mb-6">{t("description")}</p>
            <div className="flex gap-2">
              {[{ label: "IG", href: "#" }, { label: "FB", href: "#" }, { label: "TW", href: "#" }].map(
                ({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="w-9 h-9 border border-amber-900/40 flex items-center justify-center text-stone-500 text-[10px] tracking-widest hover:border-amber-400 hover:text-amber-400 transition-all duration-200"
                  >
                    {label}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] tracking-[0.35em] text-amber-500/80 uppercase mb-5">{t("navLabel")}</h4>
            <ul className="space-y-3">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-stone-400 text-sm hover:text-amber-400 transition-colors duration-200">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-[10px] tracking-[0.35em] text-amber-500/80 uppercase mb-5">{t("hoursLabel")}</h4>
            <ul className="space-y-4">
              {hours.map(({ day, time }) => (
                <li key={day}>
                  <p className="text-stone-500 text-xs mb-0.5">{day}</p>
                  <p className="text-stone-300 text-sm">{time}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] tracking-[0.35em] text-amber-500/80 uppercase mb-5">{t("addressLabel")}</h4>
            <address className="not-italic space-y-4">
              <p className="text-stone-400 text-sm leading-relaxed">
                Rhönstraße 30<br />60316 Frankfurt am Main
              </p>
              <a href="tel:+496930066661" className="text-stone-400 text-sm hover:text-amber-400 transition-colors block">
                +49 69 30066661
              </a>
            </address>
          </div>
        </div>

        <div className="border-t border-amber-900/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-stone-600 text-xs">
            © {new Date().getFullYear()} El Nigo Steakhouse. {t("copyright")}
          </p>

          <div className="flex items-center gap-6">
            {/* Language dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-2 text-stone-500 text-xs tracking-[0.15em] hover:text-stone-300 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                {localeLabels[locale]}
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              {langOpen && (
                <div className="absolute bottom-full mb-2 right-0 bg-[#0d0b09] border border-amber-900/30 min-w-[130px] py-1 shadow-xl shadow-black/40">
                  {Object.entries(localeLabels).map(([loc, label]) => (
                    <button
                      key={loc}
                      onClick={() => switchLocale(loc)}
                      className={`w-full text-left px-4 py-2 text-xs tracking-[0.1em] transition-colors ${
                        locale === loc
                          ? "text-amber-400 bg-amber-500/5"
                          : "text-stone-400 hover:text-amber-400 hover:bg-amber-500/5"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {[t("privacy"), t("imprint")].map((item) => (
              <a key={item} href="#" className="text-stone-600 text-xs hover:text-stone-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
