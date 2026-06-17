type Props = {
  size?: number;
  className?: string;
  color?: string;
  spikes?: number;
  text?: string;
};

export function ComicBurst({
  size = 280,
  className = "",
  color = "#FFD23F",
  spikes = 18,
  text,
}: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size / 2;
  const rInner = (size / 2) * 0.7;

  const points: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const angle = (i / (spikes * 2)) * Math.PI * 2;
    const r = i % 2 === 0 ? rOuter : rInner;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="absolute inset-0"
      >
        <polygon
          points={points.join(" ")}
          fill={color}
          stroke="#14141C"
          strokeWidth={4}
          strokeLinejoin="round"
        />
      </svg>
      {text && (
        <div className="absolute inset-0 flex items-center justify-center font-accent text-ink text-4xl md:text-5xl tracking-wider -rotate-6 select-none">
          {text}
        </div>
      )}
    </div>
  );
}
