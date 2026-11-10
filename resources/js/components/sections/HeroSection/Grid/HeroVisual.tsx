import HeroCard from "../../../cards/HeroCards/HeroCard";

export default function HeroVisual(){
    return(
          
                <div className="flex justify-center">
                <div className="relative w-full max-w-lg aspect-square bg-gradient-to-tr from-cyan-400/70 to-purple-500/70 rounded-2xl p-[1px] shadow-2xl">
    
                    <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950/95 p-4 sm:p-6">
                        <HeroCard />
                    </div>
                </div>
                </div>
    );
}