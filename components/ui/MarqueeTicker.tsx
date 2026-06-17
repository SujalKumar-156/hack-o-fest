type Props = {
  items: string[];
  speed?: number;
  className?: string;
  separator?: string;
  bg?: string;
  fg?: string;
};

export function MarqueeTicker({
  items,
  speed = 28,
  className = "",
  separator = "✦",
  bg = "bg-gold",
  fg = "text-ink",
}: Props) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className={`overflow-hidden ${bg} ${fg} py-5 border-y border-ink/20 ${className}`}>
      <div
        className="marquee whitespace-nowrap"
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((it, i) => (
          <span
            key={i}
            className="font-display text-3xl md:text-5xl tracking-wider mx-8 inline-flex items-center gap-8"
          >
            <span>{it}</span>
            <span className="text-crimson">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
