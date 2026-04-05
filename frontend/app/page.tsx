import { AffordabilityForm } from "@/components/AffordabilityForm";

export default function HomePage() {
  return (
    <main className="space-y-6">
      <header className="mt-4">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
          What can you actually afford?
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-300">
          RentReality turns complex housing and income data into simple answers
          for young renters and first-time buyers in Canada. Start by checking
          how your rent compares to typical renters in our early dataset.
        </p>
      </header>

      <AffordabilityForm />
    </main>
  );
}
