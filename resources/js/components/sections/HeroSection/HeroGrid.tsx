export default function HeroGrid() {
    return (
        <div
            className="absolute inset-0 pointer-events-none opacity-[0.10]"
            style={{
                backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
                `,
                backgroundSize: "80px 80px",
            }}
        />
    );
}