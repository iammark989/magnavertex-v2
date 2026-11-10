import { HERO_NODES } from "../../../constants/heronodes";

export default function HeroNodes() {
    return (
        <>
            {HERO_NODES.map((node,index) => (
                <div
                    key={node.id}
                    className={`
                        absolute
                        ${node.className}
                        h-2
                        w-2
                        rounded-full
                        bg-cyan-400
                        shadow-[0_0_12px_rgba(34,211,238,0.7)]
                        animate-pulse
                    `}
                    style={{
                        animationDelay: `${index * 300}ms`,
                    }}
                />
            ))}
        </>
    );
}