"use client";

import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [passwordValue, setPasswordValue] = useState("");

  const getStrength = (pw: string) => {
    if (pw.length === 0) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };

  const strength = getStrength(passwordValue);
  const strengthLabels = ["", "Fraca", "Razoável", "Boa", "Forte"];
  const strengthColors = ["", "#FF5630", "#FFAB00", "#36B37E", "#00875A"];

  return (
    <main className="min-h-screen bg-[#F4F5F7] flex items-center justify-center p-5 font-sans">
      <div className="w-full max-w-[420px] bg-white rounded-xl p-10 shadow-[0_1px_3px_rgba(23,43,77,0.08),0_8px_24px_rgba(23,43,77,0.06)] border border-[#DFE1E6]">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-[28px] font-bold text-[#172B4D] mb-2">FlowBoard</h1>
          <p className="text-sm text-[#44546F]">Cria a tua conta, cadete</p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4">

          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-[#172B4D]">Nome de utilizador</span>
            <input
              className="h-10 px-3 rounded-md border border-[#DFE1E6] bg-[#F4F5F7] text-sm text-[#172B4D] transition-all focus:outline-2 focus:outline-[#0052CC] focus:outline-offset-2"
              type="text"
              placeholder="o_teu_login_42"
              required
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-[#172B4D]">Email</span>
            <input
              className="h-10 px-3 rounded-md border border-[#DFE1E6] bg-[#F4F5F7] text-sm text-[#172B4D] transition-all focus:outline-2 focus:outline-[#0052CC] focus:outline-offset-2"
              type="email"
              placeholder="seu.email@42porto.com"
              required
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-[#172B4D]">Palavra-passe</span>
            <input
              className="h-10 px-3 rounded-md border border-[#DFE1E6] bg-[#F4F5F7] text-sm text-[#172B4D] transition-all focus:outline-2 focus:outline-[#0052CC] focus:outline-offset-2"
              type="password"
              placeholder="••••••••"
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              required
            />
            {passwordValue.length > 0 && (
              <div className="flex flex-col gap-1 mt-1">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-1 flex-1 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: i <= strength ? strengthColors[strength] : "#DFE1E6",
                      }}
                    />
                  ))}
                </div>
                <span className="text-[11px]" style={{ color: strengthColors[strength] }}>
                  {strengthLabels[strength]}
                </span>
              </div>
            )}
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-[13px] font-medium text-[#172B4D]">Confirmar palavra-passe</span>
            <input
              className="h-10 px-3 rounded-md border border-[#DFE1E6] bg-[#F4F5F7] text-sm text-[#172B4D] transition-all focus:outline-2 focus:outline-[#0052CC] focus:outline-offset-2"
              type="password"
              placeholder="••••••••"
              required
            />
          </label>

          <button
            type="submit"
            className="h-[42px] mt-2 rounded-md bg-[#0052CC] text-white text-sm font-semibold cursor-pointer transition-all hover:opacity-90 hover:-translate-y-px focus:outline-2 focus:outline-[#0052CC] focus:outline-offset-2"
          >
            Criar conta
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#DFE1E6]" />
          <span className="text-xs text-[#44546F] uppercase tracking-wider">ou</span>
          <div className="flex-1 h-px bg-[#DFE1E6]" />
        </div>

        {/* Footer */}
        <p className="text-center text-[13px] text-[#44546F] mt-6">
          Já tens conta?{" "}
          <Link href="/login" className="text-[#0052CC] no-underline font-medium">
            Entra aqui
          </Link>
        </p>
      </div>
    </main>
  );
}