import MVLogo from '../../../assets/logo/mv-logo.png'
import { HERO_CARDS } from '../../../constants/herocard';
import HeroNodes from '../../sections/HeroSection/HeroNodes';
import HeroConnection from '../../sections/HeroSection/HeroConnection';

export default function HeroCard(){
    return(
        <div className="
                relative
                w-full
                max-w-lg
                aspect-square
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-md
                shadow-2xl
                overflow-hidden
            "
        >
                    <div className="
                        absolute
                        inset-0
                        bg-radial
                        from-cyan-500/20
                        via-transparent
                        to-transparent
                        "
                    />

                    <HeroNodes />
                    <HeroConnection />

                  {HERO_CARDS.map((card) => (
                    <div
                        key={card.id}
                        className={`absolute ${card.className}
                            rounded-xl
                            border border-cyan-400/20
                            bg-slate-900/50
                            px-3 py-1.5
                            text-xs
                            font-medium
                            text-cyan-200
                            shadow-lg
                            shadow-cyan-950/30
                            backdrop-blur-md
                            sm:px-4
                            sm:py-2
                            sm:text-sm`}
                    >
                        <div className="flex items-center gap-2">
                        
                        <span>{card.label}</span>
                    </div>
                    </div>
                    
                    
                ))}
                    
                    
                      <div
                            className="
                                absolute
                                inset-0
                                flex
                                items-center
                                justify-center
                                z-20
                            "
                        >
                            
                           <div className="
                                        relative
                                        h-32
                                        w-32
                                        rounded-full
                                    ">
                                        {/* Animated border */}
                                        <div
                                            className="
                                                absolute
                                                inset-0
                                                rounded-full
                                                hero-logo-ring
                                            "
                                        />

                                        {/* Inner logo container */}
                                        <div
                                            className="
                                                absolute
                                                inset-[3px]
                                                flex
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-slate-900/95
                                                shadow-[0_0_30px_rgba(34,211,238,0.15)]
                                            "
                                        >
                                
                                <img
                                src={MVLogo}
                                alt="Magna Vertex Technologies Logo"
                                className="
                                    w-24
                                    h-24
                                    object-contain
                                    select-none
                                    pointer-events-none"
                            />
                            </div>
                            </div>
                        </div>
          
        </div>
    );
}