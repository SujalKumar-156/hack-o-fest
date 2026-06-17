type Props = {
  className?: string;
  size?: number;
  color?: string;
  opacity?: number;
};

export function Halftone({
  className = "",
  size = 8,
  color = "rgba(245,239,224,0.18)",
  opacity = 1,
}: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: `radial-gradient(${color} 1px, transparent 1.4px)`,
        backgroundSize: `${size}px ${size}px`,
        opacity,
      }}
    />
  );
}
