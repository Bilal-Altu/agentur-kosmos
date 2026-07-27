import { useId } from "react";

// Sonne, Erde und Mond — als SVG gezeichnet, rein dekorativ.
// Positionierung kommt von außen über className (z. B. "right-8 top-16").

export function Sonne({ className = "" }: { className?: string }) {
    const id = useId();
    const surface = `${id}-surface`;
    const limb = `${id}-limb`;
    const grain = `${id}-grain`;
    const clip = `${id}-clip`;

    return (
        <div aria-hidden className={`pointer-events-none absolute ${className}`}>
            <div className="animate-sun-glow h-40 w-40 rounded-full md:h-56 md:w-56">
                <svg viewBox="0 0 100 100" className="h-full w-full">
                    <defs>
                        <radialGradient id={surface} cx="38%" cy="34%" r="72%">
                            <stop offset="0%" stopColor="#fff6d0" />
                            <stop offset="35%" stopColor="#ffd166" />
                            <stop offset="70%" stopColor="#ff9d31" />
                            <stop offset="100%" stopColor="#f2760f" />
                        </radialGradient>
                        {/* Randabdunklung: außen kühler, wie bei der echten Sonne */}
                        <radialGradient id={limb} cx="50%" cy="50%" r="50%">
                            <stop offset="55%" stopColor="rgba(0,0,0,0)" />
                            <stop offset="88%" stopColor="rgba(170,60,0,0.28)" />
                            <stop offset="100%" stopColor="rgba(120,35,0,0.55)" />
                        </radialGradient>
                        {/* Granulation der Oberfläche */}
                        <filter id={grain} x="0" y="0" width="100%" height="100%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="4" seed="9" />
                            <feColorMatrix type="saturate" values="0" />
                        </filter>
                        <clipPath id={clip}>
                            <circle cx="50" cy="50" r="49" />
                        </clipPath>
                    </defs>

                    <circle cx="50" cy="50" r="49" fill={`url(#${surface})`} />
                    <g clipPath={`url(#${clip})`}>
                        <rect width="100" height="100" filter={`url(#${grain})`} opacity="0.22" />
                        {/* Sonnenflecken */}
                        <ellipse cx="38" cy="58" rx="6" ry="4" fill="rgba(150,55,0,0.35)" />
                        <ellipse cx="36.5" cy="57.5" rx="3" ry="2" fill="rgba(110,35,0,0.45)" />
                        <ellipse cx="64" cy="38" rx="4.5" ry="3" fill="rgba(150,55,0,0.28)" />
                        <ellipse cx="58" cy="70" rx="3.5" ry="2.4" fill="rgba(150,55,0,0.25)" />
                    </g>
                    <circle cx="50" cy="50" r="49" fill={`url(#${limb})`} />
                    {/* Chromosphäre am Rand */}
                    <circle cx="50" cy="50" r="49" fill="none" stroke="#ffdf9b" strokeWidth="1.2" opacity="0.5" />
                </svg>
            </div>
        </div>
    );
}

export function Erde({ className = "" }: { className?: string }) {
    const id = useId();
    const ocean = `${id}-ocean`;
    const shade = `${id}-shade`;
    const clip = `${id}-clip`;
    const land = `${id}-land`;
    const clouds = `${id}-clouds`;
    const soften = `${id}-soften`;

    return (
        <div aria-hidden className={`pointer-events-none absolute ${className}`}>
            <div
                className="animate-float-slow h-20 w-20 rounded-full md:h-28 md:w-28"
                style={{ boxShadow: "0 0 34px rgba(120,190,255,0.4)" }}
            >
                <svg viewBox="0 0 100 100" className="h-full w-full">
                    <defs>
                        <radialGradient id={ocean} cx="34%" cy="30%" r="78%">
                            <stop offset="0%" stopColor="#8fd3f7" />
                            <stop offset="40%" stopColor="#3d84c6" />
                            <stop offset="80%" stopColor="#17548f" />
                            <stop offset="100%" stopColor="#0a2f57" />
                        </radialGradient>
                        {/* Tag-Nacht-Grenze */}
                        <radialGradient id={shade} cx="34%" cy="30%" r="80%">
                            <stop offset="45%" stopColor="rgba(0,0,0,0)" />
                            <stop offset="80%" stopColor="rgba(0,0,10,0.35)" />
                            <stop offset="100%" stopColor="rgba(0,0,15,0.72)" />
                        </radialGradient>
                        <filter id={soften}>
                            <feGaussianBlur stdDeviation="1.1" />
                        </filter>
                        <clipPath id={clip}>
                            <circle cx="50" cy="50" r="49" />
                        </clipPath>

                        {/* Landmassen als Kachel (Breite 100), zweimal versetzt = nahtloser Umlauf */}
                        <g id={land}>
                            <path
                                d="M20,30 C27,26 33,30 31,38 C29,46 25,50 27,58 C29,66 24,72 20,68 C15,62 13,44 16,36 Z"
                                fill="#3f8f52"
                            />
                            <path d="M24,72 C30,70 33,76 31,84 C29,90 25,92 23,88 C21,82 21,76 24,72 Z" fill="#48965a" />
                            <path
                                d="M44,26 C56,20 76,22 88,28 C80,34 66,32 56,35 C48,37 44,33 44,26 Z"
                                fill="#4a9a5c"
                            />
                            <path
                                d="M58,40 C66,37 71,44 69,53 C67,63 60,72 55,68 C50,62 52,46 58,40 Z"
                                fill="#3f8f52"
                            />
                            <ellipse cx="86" cy="62" rx="7" ry="5" fill="#4a9a5c" transform="rotate(-15 86 62)" />
                            <circle cx="38" cy="46" r="2" fill="#4a9a5c" />
                            <circle cx="76" cy="46" r="2.4" fill="#48965a" />
                        </g>

                        {/* Wolkenband */}
                        <g id={clouds} fill="rgba(255,255,255,0.72)">
                            <ellipse cx="18" cy="34" rx="13" ry="4" />
                            <ellipse cx="30" cy="52" rx="9" ry="3.4" />
                            <ellipse cx="52" cy="30" rx="15" ry="4.5" />
                            <ellipse cx="66" cy="58" rx="12" ry="4" />
                            <ellipse cx="86" cy="42" rx="10" ry="3.6" />
                            <ellipse cx="44" cy="74" rx="14" ry="4.2" />
                        </g>
                    </defs>

                    <circle cx="50" cy="50" r="49" fill={`url(#${ocean})`} />
                    <g clipPath={`url(#${clip})`}>
                        {/* Kontinente ziehen vorbei — die Erde dreht sich */}
                        <g className="animate-globe-drift">
                            <use href={`#${land}`} />
                            <use href={`#${land}`} x="100" />
                        </g>
                        {/* Polkappen */}
                        <ellipse cx="50" cy="4" rx="34" ry="10" fill="rgba(255,255,255,0.85)" filter={`url(#${soften})`} />
                        <ellipse cx="50" cy="97" rx="30" ry="9" fill="rgba(255,255,255,0.8)" filter={`url(#${soften})`} />
                        {/* Wolken, etwas schneller als die Landmassen.
                            Kein Blur-Filter: der müsste bei jedem Frame neu berechnet werden. */}
                        <g className="animate-globe-drift-fast" opacity="0.5">
                            <use href={`#${clouds}`} />
                            <use href={`#${clouds}`} x="100" />
                        </g>
                    </g>
                    <circle cx="50" cy="50" r="49" fill={`url(#${shade})`} />
                    {/* Atmosphäre */}
                    <circle cx="50" cy="50" r="48.4" fill="none" stroke="#9fd8ff" strokeWidth="1.6" opacity="0.45" />
                </svg>
            </div>
        </div>
    );
}

export function Mond({ className = "" }: { className?: string }) {
    const id = useId();
    const surface = `${id}-surface`;
    const shade = `${id}-shade`;
    const grain = `${id}-grain`;
    const clip = `${id}-clip`;

    // Krater: x, y, Radius — Rand hell, Boden dunkel (Licht von links oben)
    const craters: [number, number, number][] = [
        [34, 36, 9],
        [62, 30, 6],
        [70, 60, 7.5],
        [44, 68, 5],
        [24, 58, 4],
        [56, 48, 3.2],
        [80, 42, 3],
        [38, 22, 2.6],
        [50, 82, 3.4],
        [18, 44, 2.2],
    ];

    return (
        <div aria-hidden className={`pointer-events-none absolute ${className}`}>
            <div
                className="animate-float-slower h-14 w-14 rounded-full md:h-20 md:w-20"
                style={{ boxShadow: "0 0 26px rgba(255,255,255,0.16)" }}
            >
                <svg viewBox="0 0 100 100" className="h-full w-full">
                    <defs>
                        <radialGradient id={surface} cx="34%" cy="32%" r="78%">
                            <stop offset="0%" stopColor="#f2f0ec" />
                            <stop offset="55%" stopColor="#c3c6cc" />
                            <stop offset="100%" stopColor="#8b9099" />
                        </radialGradient>
                        <radialGradient id={shade} cx="34%" cy="32%" r="80%">
                            <stop offset="50%" stopColor="rgba(0,0,0,0)" />
                            <stop offset="85%" stopColor="rgba(0,0,0,0.3)" />
                            <stop offset="100%" stopColor="rgba(0,0,0,0.62)" />
                        </radialGradient>
                        <filter id={grain} x="0" y="0" width="100%" height="100%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" seed="3" />
                            <feColorMatrix type="saturate" values="0" />
                        </filter>
                        <clipPath id={clip}>
                            <circle cx="50" cy="50" r="49" />
                        </clipPath>
                    </defs>

                    <circle cx="50" cy="50" r="49" fill={`url(#${surface})`} />
                    <g clipPath={`url(#${clip})`}>
                        {/* Mare — die dunklen Ebenen */}
                        <ellipse cx="40" cy="42" rx="24" ry="18" fill="rgba(96,102,112,0.45)" transform="rotate(-20 40 42)" />
                        <ellipse cx="68" cy="66" rx="18" ry="13" fill="rgba(96,102,112,0.38)" transform="rotate(15 68 66)" />
                        <ellipse cx="72" cy="26" rx="12" ry="9" fill="rgba(96,102,112,0.3)" />
                        {/* Oberflächenrauheit */}
                        <rect width="100" height="100" filter={`url(#${grain})`} opacity="0.16" />
                        {/* Krater */}
                        {craters.map(([cx, cy, r], i) => (
                            <g key={i}>
                                <circle cx={cx} cy={cy} r={r} fill="rgba(120,126,136,0.55)" />
                                <circle cx={cx - r * 0.16} cy={cy - r * 0.16} r={r * 0.82} fill="rgba(70,75,84,0.35)" />
                                <circle
                                    cx={cx - r * 0.2}
                                    cy={cy - r * 0.2}
                                    r={r}
                                    fill="none"
                                    stroke="rgba(255,255,255,0.35)"
                                    strokeWidth={r * 0.14}
                                />
                            </g>
                        ))}
                        {/* Strahlensystem eines jungen Kraters */}
                        <g stroke="rgba(255,255,255,0.22)" strokeWidth="1" opacity="0.7">
                            <line x1="34" y1="36" x2="10" y2="18" />
                            <line x1="34" y1="36" x2="58" y2="12" />
                            <line x1="34" y1="36" x2="14" y2="60" />
                        </g>
                    </g>
                    <circle cx="50" cy="50" r="49" fill={`url(#${shade})`} />
                </svg>
            </div>
        </div>
    );
}
