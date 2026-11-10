import Container from "../ui/Container";
import HeroBackground from "./HeroSection/HeroBackground";
import HeroContent from "./HeroSection/Grid/HeroContent";
import HeroVisual from "./HeroSection/Grid/HeroVisual";


export default function HeroSection(){
    return(
        <section id="hero" className="relative z-10 min-h-screen flex items-center overflow-hidden pt-20 md:pt-24 bg-gradient-to-b from-[#071B35] via-[#0F4C81] to-[#F8FBFF]">
        
       <HeroBackground />

       
        <Container>
        
            {/** Grid */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 py-24 md:grid-cols-2 md:gap-16 md:py-20 lg:py-20">
            {/** Left */}
            <HeroContent />
            
            {/** Right */}
            <HeroVisual />
                
        </div>
        </Container>

        </section>
    );
}