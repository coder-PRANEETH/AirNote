import { useEffect, useRef, useState } from 'react';

export default function WaveformVisualizer({ active }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const [bars] = useState(() => Array.from({ length: 48 }, () => 0.2));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    let phase = 0;

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const barWidth = width / bars.length - 1;
      bars.forEach((_, i) => {
        const noise = active ? Math.sin(phase + i * 0.4) * 0.35 + Math.random() * 0.25 : 0.05;
        const h = Math.max(2, (0.15 + Math.abs(noise)) * height * 0.85);
        const x = i * (barWidth + 1);
        const y = (height - h) / 2;

        const gradient = ctx.createLinearGradient(0, y, 0, y + h);
        gradient.addColorStop(0, 'rgba(0, 212, 170, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 212, 170, 0.15)');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth, h);
      });

      phase += active ? 0.12 : 0.02;
      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active, bars]);

  return (
    <canvas
      ref={canvasRef}
      width={280}
      height={40}
      className="w-full h-10 opacity-80"
    />
  );
}
