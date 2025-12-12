export default function ExplorerPage() {
  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          City &amp; Data Explorer
        </h1>
        <p className="mt-1 max-w-xl text-sm text-slate-300">
          Compare rent, income, and affordability across Canadian cities over
          time. This will become the data playground for renters, researchers,
          and housing nerds.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6">
        <p className="text-sm text-slate-400">
          Explorer UI coming soon: filters, charts, and tables will live here
          once the data pipeline and API are set up.
        </p>
      </div>
    </section>
  );
}
