export default function AboutPage() {
  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">About</h1>
        <p className="mt-1 max-w-xl text-sm text-slate-300">
          RentReality is a small, independent project focused on giving young
          Canadians clarity about housing affordability using real data and
          plain language.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-xs text-slate-400 space-y-2">
        <p>
          This tool is for educational purposes only and does not constitute
          financial or legal advice. Always consider talking to a qualified
          professional before making big money decisions.
        </p>
        <p>
          V1 focuses on: the Affordability Check, a simple &quot;Can I Buy?&quot;
          calculator, a city explorer with real rent and income data, and
          AI-generated explanations.
        </p>
      </div>
    </section>
  );
}
