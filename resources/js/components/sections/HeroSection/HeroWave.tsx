export default function HeroWave() {
    return (
        <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none">
            <svg
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
                className="w-full h-[180px]"
            >
                <path
                    fill="rgba(202, 197, 197, 0.08)"
                    d="
                        M0,160
                        C240,260
                        480,60
                        720,160
                        C960,260
                        1200,60
                        1440,160
                        L1440,320
                        L0,320
                        Z
                    "
                />
            </svg>
        </div>
    );
}