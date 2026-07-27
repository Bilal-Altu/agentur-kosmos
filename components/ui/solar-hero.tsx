"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { PROJECTS, type ProjectRef } from "@/components/projects-data";

// --- Sonnensystem-Hero: Projekte kreisen als Planeten um die Marke ---

// Orbit-Konfiguration: Radius (vmin, px-gedeckelt), Umlaufzeit, Drehrichtung
const ORBITS = [
    { radius: "min(24vmin, 190px)", duration: 60, reverse: false, planets: 3, size: 64 },
    { radius: "min(36vmin, 290px)", duration: 95, reverse: true, planets: 3, size: 72 },
    { radius: "min(48vmin, 390px)", duration: 130, reverse: false, planets: 2, size: 80 },
];

// Pausiert die Umlaufbahn genau dieses Planeten, sobald er gehovert wird
const PAUSE_ON_PLANET_HOVER = "[&:has(.planet:hover)]:[animation-play-state:paused]";

function Planet({
    project,
    orbitIndex,
    angleOffset,
    size,
    duration,
    reverse,
}: {
    project: ProjectRef;
    orbitIndex: number;
    angleOffset: number; // Grad
    size: number;
    duration: number;
    reverse: boolean;
}) {
    // Winkelversatz über negative animation-delay: gleiche Keyframes, andere Startposition
    const delay = `-${(angleOffset / 360) * duration}s`;
    const spinClass = reverse ? "animate-orbit-reverse" : "animate-orbit";
    const counterClass = reverse ? "animate-orbit" : "animate-orbit-reverse";

    const planet = (
        <span
            className="planet group/planet pointer-events-auto relative block"
            style={{ width: size, height: size }}
        >
            <img
                src={project.src}
                alt={project.name}
                className="h-full w-full rounded-full object-cover object-top shadow-[0_0_18px_rgba(0,0,0,0.7)] ring-2 ring-white/15 transition duration-300 group-hover/planet:scale-125 group-hover/planet:ring-accent"
            />
            {/* Label beim Hover */}
            <span className="pointer-events-none absolute left-1/2 top-full z-30 mt-3 -translate-x-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-neutral-950/90 px-3 py-1.5 text-center opacity-0 transition duration-300 group-hover/planet:opacity-100">
                <span className="block text-[9px] font-bold uppercase tracking-[0.15em] text-accent">
                    {project.category}
                </span>
                <span className="block text-[11px] font-medium text-neutral-100">{project.name}</span>
            </span>
        </span>
    );

    return (
        // Äußerer Spin: dreht den Planeten um die Sonne
        <div
            className={`pointer-events-none absolute inset-0 ${spinClass} ${PAUSE_ON_PLANET_HOVER}`}
            style={{ animationDuration: `${duration}s`, animationDelay: delay, zIndex: 10 + orbitIndex }}
        >
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                {/* Innerer Gegen-Spin: hält den Planeten aufrecht */}
                <div
                    className={`${counterClass} ${PAUSE_ON_PLANET_HOVER}`}
                    style={{ animationDuration: `${duration}s`, animationDelay: delay }}
                >
                    {project.href ? (
                        <a href={project.href} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                            {planet}
                        </a>
                    ) : (
                        planet
                    )}
                </div>
            </div>
        </div>
    );
}

export default function SolarHero() {
    // --- Sternenfeld: deterministisch generierte Positionen ---
    // (fester Seed, damit Server- und Client-Render identisch sind)
    const stars = useMemo(() => {
        let seed = 42;
        const rnd = () => {
            seed = (seed * 16807) % 2147483647;
            return seed / 2147483647;
        };
        return Array.from({ length: 140 }, () => ({
            x: rnd() * 100,
            y: rnd() * 100,
            size: rnd() < 0.85 ? 1 : 2,
            delay: rnd() * 6,
            duration: 3 + rnd() * 5,
            bright: rnd() < 0.25,
        }));
    }, []);

    // --- Cursor-Lampe (wie in der Hauptvariante) ---
    const cursorX = useMotionValue(-600);
    const cursorY = useMotionValue(-600);
    const spotX = useSpring(cursorX, { stiffness: 250, damping: 30 });
    const spotY = useSpring(cursorY, { stiffness: 250, damping: 30 });
    const lampGlow = useMotionTemplate`radial-gradient(circle 300px at ${spotX}px ${spotY}px, rgba(255,255,255,0.06) 0%, rgba(124,92,255,0.06) 35%, transparent 70%)`;

    // --- Intro: erst nach Mount animieren (Planeten fliegen ein) ---
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    // Planeten auf Orbits verteilen
    let projectIndex = 0;
    const orbitPlanets = ORBITS.map((orbit) => {
        const slice = PROJECTS.slice(projectIndex, projectIndex + orbit.planets);
        projectIndex += orbit.planets;
        return slice;
    });

    return (
        <div
            className="relative h-svh w-full overflow-hidden bg-[#050508]"
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                cursorX.set(e.clientX - rect.left);
                cursorY.set(e.clientY - rect.top);
            }}
            onMouseLeave={() => {
                cursorX.set(-600);
                cursorY.set(-600);
            }}
        >
            {/* --- Weltall-Hintergrund --- */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                {/* Nebel */}
                <div
                    className="absolute -left-1/4 -top-1/4 h-[80vmin] w-[80vmin] rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(124,92,255,0.13) 0%, transparent 65%)" }}
                />
                <div
                    className="absolute -bottom-1/4 -right-1/4 h-[90vmin] w-[90vmin] rounded-full"
                    style={{ background: "radial-gradient(circle, rgba(124,92,255,0.10) 0%, transparent 65%)" }}
                />
                {/* Sterne */}
                {stars.map((s, i) => (
                    <span
                        key={i}
                        className="animate-twinkle absolute rounded-full"
                        style={{
                            left: `${s.x}%`,
                            top: `${s.y}%`,
                            width: s.size,
                            height: s.size,
                            backgroundColor: s.bright ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
                            animationDelay: `${s.delay}s`,
                            animationDuration: `${s.duration}s`,
                        }}
                    />
                ))}
                {/* Sternschnuppe */}
                <span className="animate-shooting-star absolute left-[15%] top-[18%] h-px w-24 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                {/* Cursor-Lampe */}
                <motion.div className="absolute inset-0" style={{ background: lampGlow }} />
                {/* Filmkorn */}
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    }}
                />
            </div>

            {/* --- Sonnensystem --- */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative" style={{ width: "min(96vmin, 780px)", height: "min(96vmin, 780px)" }}>
                    {ORBITS.map((orbit, oi) => (
                        <React.Fragment key={oi}>
                            {/* Orbit-Linie */}
                            <div
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
                                style={{ width: `calc(${orbit.radius} * 2)`, height: `calc(${orbit.radius} * 2)` }}
                            />
                            {/* Planeten dieses Orbits (Positions-Wrapper außen, Animation innen —
                                Framer überschreibt sonst das zentrierende transform) */}
                            <div
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                style={{ width: `calc(${orbit.radius} * 2)`, height: `calc(${orbit.radius} * 2)` }}
                            >
                                <motion.div
                                    className="absolute inset-0"
                                    initial={{ opacity: 0, scale: 0.3 }}
                                    animate={mounted ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 1.2, delay: 0.6 + oi * 0.35, ease: "easeOut" }}
                                >
                                    {orbitPlanets[oi].map((p, pi) => (
                                        <Planet
                                            key={p.name + pi}
                                            project={p}
                                            orbitIndex={oi}
                                            angleOffset={(360 / orbitPlanets[oi].length) * pi + oi * 40}
                                            size={orbit.size}
                                            duration={orbit.duration}
                                            reverse={orbit.reverse}
                                        />
                                    ))}
                                </motion.div>
                            </div>
                        </React.Fragment>
                    ))}

                    {/* Sonne */}
                    <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={mounted ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 1.4, ease: "easeOut" }}
                        >
                            <div className="animate-sun-pulse flex h-[16vmin] max-h-[130px] min-h-[80px] w-[16vmin] min-w-[80px] max-w-[130px] items-center justify-center rounded-full bg-accent/90">
                                <span className="text-[10px] font-bold tracking-[0.3em] text-white md:text-xs">
                                    STUDIO
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* --- Claim unten --- */}
            <motion.div
                className="pointer-events-none absolute inset-x-0 bottom-10 z-20 px-6 text-center"
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={mounted ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 1, delay: 1.6 }}
            >
                <h1 className="text-lg font-medium tracking-tight text-neutral-100 sm:text-2xl md:text-3xl">
                    Wir bauen digitale Auftritte, die arbeiten.
                </h1>
                <p className="mt-3 text-[9px] font-bold tracking-[0.2em] text-neutral-500 md:text-xs">
                    SCROLLEN ZUM ENTDECKEN
                </p>
            </motion.div>
        </div>
    );
}
