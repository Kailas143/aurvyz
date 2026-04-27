const LOGOS = [
  { name: "OpenAI", slug: "openai" },
  { name: "Anthropic", slug: "anthropic" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Vercel", slug: "vercel" },
  { name: "Stripe", slug: "stripe" },
  { name: "Hugging Face", slug: "huggingface" },
  { name: "Google Cloud", slug: "googlecloud" },
  { name: "Notion", slug: "notion" },
  { name: "Slack", slug: "slack" },
  { name: "Cloudflare", slug: "cloudflare" },
  { name: "Linear", slug: "linear" },
  { name: "Supabase", slug: "supabase" },
];

export default function Logos() {
  // Duplicate list for seamless marquee loop
  const loop = [...LOGOS, ...LOGOS];

  return (
    <section
      data-testid="logos-section"
      className="relative pt-4 pb-16 sm:pb-24 bg-[#F7F9FB]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-8">
          <p className="text-[11px] tracking-[0.22em] uppercase text-[#4B5563] font-semibold">
            Built with the tools that power modern AI businesses
          </p>
        </div>

        <div className="nx-marquee-wrap overflow-hidden">
          <div
            className="nx-marquee flex items-center gap-14 w-max"
            data-testid="logos-marquee"
          >
            {loop.map((l, i) => (
              <div
                key={`${l.slug}-${i}`}
                className="flex items-center gap-3 shrink-0 opacity-70 hover:opacity-100 transition-opacity"
                title={l.name}
              >
                <img
                  src={`https://cdn.simpleicons.org/${l.slug}/0B3C5D`}
                  alt={l.name}
                  className="w-7 h-7 object-contain"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <span className="font-display text-base font-semibold text-[#0B3C5D]/80 tracking-tight">
                  {l.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
