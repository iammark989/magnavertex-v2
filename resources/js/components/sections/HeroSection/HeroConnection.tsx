import { HERO_CONNECTIONS } from "../../../constants/heroconnection";

export default function HeroConnection() {
    return (
        <>
            {HERO_CONNECTIONS.map((connection, index) => (
                <div
                    key={connection.id}
                    className={`
                        absolute
                        ${connection.className}
                        w-px
                        bg-cyan-400/15
                    `}
                >
                    <span
            className={`
                absolute
                left-1/2
                top-0
                h-5
                w-1
                rounded-full
                bg-cyan-300
                opacity-70
                blur-[1px]
                ${connection.direction === "reverse"
                    ? "hero-flow-reverse"
                    : "hero-flow"
                }
            `}
            style={{
                marginLeft: "-2px",
                animationDelay: `${index * 400}ms`,
            }}
        />
                </div>
            ))}
        </>
    );
}