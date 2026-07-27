// Sonne, Erde und Mond — rein per CSS gezeichnet, rein dekorativ.
// Positionierung kommt von außen über className (z. B. "right-8 top-16").

export function Sonne({ className = "" }: { className?: string }) {
    return (
        <div aria-hidden className={`pointer-events-none absolute ${className}`}>
            <div
                className="animate-sun-glow h-40 w-40 rounded-full md:h-56 md:w-56"
                style={{
                    background:
                        "radial-gradient(circle at 38% 35%, #ffe29a 0%, #ffb648 45%, #ff8a2a 75%, #f97316 100%)",
                }}
            />
        </div>
    );
}

export function Erde({ className = "" }: { className?: string }) {
    return (
        <div aria-hidden className={`pointer-events-none absolute ${className}`}>
            <div
                className="animate-float-slow h-20 w-20 rounded-full md:h-28 md:w-28"
                style={{
                    background: [
                        "radial-gradient(circle at 62% 36%, rgba(64,168,105,0.95) 0 11%, transparent 12%)",
                        "radial-gradient(circle at 42% 62%, rgba(64,168,105,0.85) 0 9%, transparent 10%)",
                        "radial-gradient(circle at 74% 62%, rgba(64,168,105,0.8) 0 6%, transparent 7%)",
                        "radial-gradient(circle at 32% 30%, #8ecdf6 0%, #3b82c4 48%, #123f74 85%)",
                    ].join(", "),
                    boxShadow: "inset -14px -10px 30px rgba(0,0,0,0.55), 0 0 45px rgba(59,130,196,0.35)",
                }}
            />
        </div>
    );
}

export function Mond({ className = "" }: { className?: string }) {
    return (
        <div aria-hidden className={`pointer-events-none absolute ${className}`}>
            <div
                className="animate-float-slower h-14 w-14 rounded-full md:h-20 md:w-20"
                style={{
                    background: [
                        "radial-gradient(circle at 32% 38%, rgba(0,0,0,0.25) 0 7%, transparent 8%)",
                        "radial-gradient(circle at 62% 58%, rgba(0,0,0,0.2) 0 9%, transparent 10%)",
                        "radial-gradient(circle at 46% 76%, rgba(0,0,0,0.18) 0 5%, transparent 6%)",
                        "radial-gradient(circle at 68% 28%, rgba(0,0,0,0.15) 0 5%, transparent 6%)",
                        "radial-gradient(circle at 35% 30%, #ececec 0%, #b9bec7 55%, #7d838d 90%)",
                    ].join(", "),
                    boxShadow: "inset -10px -8px 22px rgba(0,0,0,0.5), 0 0 30px rgba(255,255,255,0.12)",
                }}
            />
        </div>
    );
}
