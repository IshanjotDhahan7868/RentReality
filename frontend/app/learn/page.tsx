export default function LearnPage() {
  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Learn</h1>
        <p className="mt-1 max-w-xl text-sm text-slate-300">
          Short, no-BS explainers on rent-to-income, affordability, interest
          rates, and other concepts behind RentReality.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <h2 className="text-sm font-medium text-slate-100">
            What is rent-to-income ratio?
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            A simple way to see how much of your take-home pay is going to rent
            — and why 30% is a common rule-of-thumb.
          </p>
        </article>

        <article className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
          <h2 className="text-sm font-medium text-slate-100">
            Why do interest rates matter?
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            How the Bank of Canada&apos;s decisions ripple into mortgages,
            rents, and your long-term housing options.
          </p>
        </article>
      </div>
    </section>
  );
}
