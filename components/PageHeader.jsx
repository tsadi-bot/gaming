import { Sparkles } from "lucide-react";

export default function PageHeader({ title, highlight, subtitle }) {
  return (
    <section className="relative py-10 border-b border-white/5 bg-gradient-to-b from-blue-900/10 to-transparent">
      <div className="container mx-auto px-4 text-center">
        <Sparkles className="mx-auto h-7 w-7 text-blue-500 mb-3 opacity-80" />
        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter mb-2">
          {title} <span className="text-blue-500">{highlight}</span>
        </h1>
        {subtitle && (
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto italic opacity-80">
            "{subtitle}"
          </p>
        )}
      </div>
    </section>
  );
}
