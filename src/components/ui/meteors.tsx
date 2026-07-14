interface MeteorsProps {
  count?: number;
}

const Meteors = ({ count = 18 }: MeteorsProps) => {
  const meteors = Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: `${Math.random() * 12}s`,
    duration: `${Math.random() * 6 + 6}s`,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 55}%`,
    width: `${Math.random() * 1 + 0.4}px`,
    height: `${Math.random() * 80 + 50}px`,
    opacity: Math.random() * 0.55 + 0.2,
  }));

  return (
    <>
      {meteors.map((m) => (
        <span
          key={m.id}
          className="meteor"
          style={{
            left: m.left,
            top: m.top,
            width: m.width,
            height: m.height,
            animationDelay: m.delay,
            animationDuration: m.duration,
            opacity: m.opacity,
          }}
        />
      ))}
    </>
  );
};

export default Meteors;
