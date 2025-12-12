export default function HomePage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          What can you actually afford?
        </h1>
        <p className="mt-2 max-w-xl text-sm text-slate-300">
          RentReality turns complex housing and income data into simple answers
          for young renters and first-time buyers in Canada.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 sm:p-6">
        <h2 className="text-lg font-medium text-slate-100">
          Affordability Check (coming soon)
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          This will let you enter your city, income, and rent to see whether
          you&apos;re in a safe, stretched, or risky zone – with context from
          real Canadian data.
        </p>
        <p className="mt-3 text-xs text-slate-500">
          For now, this is just a placeholder while we wire up the backend and
          database.
        </p>
      </div>
    </section>
  );
}
