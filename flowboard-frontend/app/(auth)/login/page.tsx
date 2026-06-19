import Link from "next/link";

export default function Login() {
  return (
    <main className="min-h-screen bg-[#F4F5F7] flex items-center justify-center p-5 font-sans">
      <div className="w-full max-w-[420px] bg-white rounded-xl p-10 shadow-[0_1px_3px_rgba(23,43,77,0.08),0_8px_24px_rgba(23,43,77,0.06)] border border-[#DFE1E6]">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-[28px] font-bold text-[#172B4D] mb-2">FlowBoard</h1>
          <p className="text-sm text-[#44546F]">Seja bem-vindo de volta, cadete</p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4">
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
              required
            />
          </label>

          <button
            type="submit"
            className="h-[42px] mt-2 rounded-md bg-[#0052CC] text-white text-sm font-semibold cursor-pointer transition-all hover:opacity-92 hover:-translate-y-px focus:outline-2 focus:outline-[#0052CC] focus:outline-offset-2"
          >
            Entrar
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[#DFE1E6]" />
          <span className="text-xs text-[#44546F] uppercase tracking-wider">ou</span>
          <div className="flex-1 h-px bg-[#DFE1E6]" />
        </div>

        {/* 42 Intra Login */}
        <a
          href="/api/auth/42"
          className="flex items-center justify-center gap-2.5 h-[42px] rounded-md border border-[#DFE1E6] bg-white text-[#172B4D] text-sm font-medium no-underline cursor-pointer transition-all hover:opacity-92 focus:outline-2 focus:outline-[#0052CC] focus:outline-offset-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L1.5 6.5v11L12 24l10.5-6.5v-11L12 0zm0 2.3l8.3 5.2v9.5L12 22.2 3.7 17V7.5L12 2.3z"/>
          </svg>
          Entrar com 42 Intra
        </a>

        {/* Footer */}
        <p className="text-center text-[13px] text-[#44546F] mt-6">
          Ainda não tens conta?{" "}
          <Link href="/signup" className="text-[#0052CC] no-underline font-medium">
            Regista-te
          </Link>
        </p>
      </div>
    </main>
  );
}