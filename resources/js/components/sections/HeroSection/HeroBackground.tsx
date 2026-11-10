import HeroShapes from "./HeroShapes";
import HeroGrid from "./HeroGrid";
import HeroWave from "./HeroWave";

export default function HeroBackground(){
    return(
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <HeroGrid />
            <HeroShapes />
            <HeroWave />
                                
                </div>
    );
}