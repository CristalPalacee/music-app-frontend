"use client";

import { useEffect, useState } from "react";

type Slide = {
  id: number;
  image: string;
  title?: string;
};

type Props = {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
};

export default function Slider({
  slides,
  autoPlay = true,
  interval = 8000,
}: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer);
  }, [slides.length, autoPlay, interval]);

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* SLIDES */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="min-w-full h-100 md:h-170 relative"
          >
            <img
              src={slide.image}
              alt={slide.title ?? "slide"}
              className="w-full h-full object-cover"
            />

            {slide.title && (
              <div className="absolute bottom-4 left-4 text-white text-xl font-bold drop-shadow-lg">
                {slide.title}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* DOTS */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex ">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
