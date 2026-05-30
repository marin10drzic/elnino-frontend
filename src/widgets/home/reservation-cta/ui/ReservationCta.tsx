"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useCreateReservation } from "@/entities/reservation";

const TIME_SLOTS = [
  "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00",
  "19:30", "20:00", "20:30", "21:00", "21:30", "22:00",
];

const today = () => new Date().toISOString().split("T")[0];

export function ReservationCta() {
  const t = useTranslations("reservation");
  const { mutate: createReservation, isPending } = useCreateReservation();

  const [form, setForm] = useState({
    guest_name: "",
    guest_email: "",
    guest_phone: "",
    party_size: "2",
    date: "",
    time: "19:00",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reserved_at = new Date(`${form.date}T${form.time}:00`).toISOString();
    createReservation(
      {
        guest_name: form.guest_name,
        guest_email: form.guest_email,
        guest_phone: form.guest_phone || undefined,
        party_size: Number(form.party_size),
        reserved_at,
        notes: form.notes || undefined,
      },
      {
        onSuccess: () => setStatus("success"),
        onError: () => setStatus("error"),
      }
    );
  };

  const inputCls =
    "w-full bg-black/40 border border-amber-900/40 text-stone-300 text-xs px-3 py-3 placeholder-stone-600 focus:outline-none focus:border-amber-500/60 transition-colors";

  return (
    <section id="reservations" className="relative py-24 px-6 overflow-hidden">
      <img
        src="/landing_page/interior-menus.jpeg"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(196,146,42,0.06)_0%,transparent_65%)]" />
      <div className="absolute inset-6 md:inset-10 border border-amber-500/10 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — heading + contact */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-amber-500/60" />
              <span className="text-amber-500 text-[10px] tracking-[0.5em] uppercase">{t("tagline")}</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-5 leading-tight">
              {t("heading")}{" "}
              <span className="text-amber-400 italic">{t("headingAccent")}</span>
            </h2>
            <p className="text-stone-400 text-sm mb-8 leading-relaxed">{t("body")}</p>

            <a
              href="tel:+496930066661"
              className="inline-flex items-center gap-3 border border-amber-500/40 px-6 py-3 text-amber-400 text-xs tracking-[0.2em] hover:bg-amber-500/10 hover:border-amber-400 transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.18 6.18l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {t("call").toUpperCase()} · +49 69 30066661
            </a>

            <p className="text-stone-600 text-xs mt-6 tracking-wide">{t("hours")}</p>
          </div>

          {/* Right — form */}
          <div className="bg-black/50 border border-amber-900/30 p-6 backdrop-blur-sm">
            {status === "success" ? (
              <div className="text-center py-10">
                <div className="w-12 h-12 border border-amber-500/40 flex items-center justify-center mx-auto mb-4">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="font-serif text-xl text-white mb-3">{t("successTitle")}</p>
                <p className="text-stone-400 text-xs leading-relaxed mb-6">{t("successText")}</p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ guest_name: "", guest_email: "", guest_phone: "", party_size: "2", date: "", time: "19:00", notes: "" }); }}
                  className="text-amber-400 text-xs tracking-[0.2em] hover:text-amber-300 transition-colors"
                >
                  {t("newReservation").toUpperCase()} →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[10px] tracking-[0.2em] text-amber-500/70 uppercase mb-1.5">{t("nameLabel")}</label>
                    <input
                      type="text"
                      required
                      value={form.guest_name}
                      onChange={(e) => set("guest_name", e.target.value)}
                      placeholder={t("namePlaceholder")}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-amber-500/70 uppercase mb-1.5">{t("emailLabel")}</label>
                    <input
                      type="email"
                      required
                      value={form.guest_email}
                      onChange={(e) => set("guest_email", e.target.value)}
                      placeholder={t("emailPlaceholder")}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-amber-500/70 uppercase mb-1.5">{t("phoneLabel")}</label>
                    <input
                      type="tel"
                      value={form.guest_phone}
                      onChange={(e) => set("guest_phone", e.target.value)}
                      placeholder={t("phonePlaceholder")}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-amber-500/70 uppercase mb-1.5">{t("partySizeLabel")}</label>
                    <select
                      required
                      value={form.party_size}
                      onChange={(e) => set("party_size", e.target.value)}
                      className={inputCls}
                    >
                      {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-amber-500/70 uppercase mb-1.5">{t("dateLabel")}</label>
                    <input
                      type="date"
                      required
                      min={today()}
                      value={form.date}
                      onChange={(e) => set("date", e.target.value)}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.2em] text-amber-500/70 uppercase mb-1.5">{t("timeLabel")}</label>
                    <select
                      required
                      value={form.time}
                      onChange={(e) => set("time", e.target.value)}
                      className={inputCls}
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-[10px] tracking-[0.2em] text-amber-500/70 uppercase mb-1.5">{t("notesLabel")}</label>
                    <textarea
                      rows={2}
                      value={form.notes}
                      onChange={(e) => set("notes", e.target.value)}
                      placeholder={t("notesPlaceholder")}
                      className={`${inputCls} resize-none`}
                    />
                  </div>
                </div>

                {status === "error" && (
                  <p className="text-red-400 text-xs">{t("errorText")}</p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3.5 bg-amber-500 text-black text-xs tracking-[0.25em] font-semibold hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? t("submitting").toUpperCase() : t("submit").toUpperCase()}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
