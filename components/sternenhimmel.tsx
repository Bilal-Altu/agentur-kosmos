"use client";

import React, { useMemo } from "react";

// Sternenfeld + Nebel als Seitenhintergrund.
// Positionen kommen aus einem festen Seed, damit Server- und Client-Render identisch sind.
export default function Sternenhimmel({
    count = 240,
    seed = 7,
}: {
    count?: number;
    seed?: number;
}) {
    const stars = useMemo(() => {
        let s = seed;
        const rnd = () => {
            s = (s * 16807) % 2147483647;
            return s / 2147483647;
        };
        const tints = [
            "rgba(255,255,255,0.9)",
            "rgba(255,255,255,0.5)",
            "rgba(167,139,250,0.8)",
            "rgba(140,197,246,0.8)",
        ];
        return Array.from({ length: count }, () => ({
            x: rnd() * 100,
            y: rnd() * 100,
            size: rnd() < 0.8 ? 1 : 2,
            delay: rnd() * 6,
            duration: 3 + rnd() * 5,
            color: tints[Math.floor(rnd() * tints.length)],
        }));
    }, [count, seed]);

    return (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {stars.map((star, i) => (
                <span
                    key={i}
                    className="animate-twinkle absolute rounded-full"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                        backgroundColor: star.color,
                        animationDelay: `${star.delay}s`,
                        animationDuration: `${star.duration}s`,
                    }}
                />
            ))}
            {/* Nebel entlang der Seite */}
            <div
                className="absolute -right-1/4 top-[5%] h-[70vmin] w-[70vmin] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(124,92,255,0.12) 0%, transparent 65%)" }}
            />
            <div
                className="absolute -left-1/4 top-[40%] h-[80vmin] w-[80vmin] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(140,197,246,0.08) 0%, transparent 65%)" }}
            />
            <div
                className="absolute -right-1/4 top-[72%] h-[75vmin] w-[75vmin] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(124,92,255,0.10) 0%, transparent 65%)" }}
            />
            {/* Filmkorn */}
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
            />
        </div>
    );
}
