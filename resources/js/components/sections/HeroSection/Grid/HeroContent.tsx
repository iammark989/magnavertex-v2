import Button from "../../../ui/Button";
import Text from "../../../ui/Text";
import { HERO_TYPEWRITER } from "../../../../constants/herotypewriter";
import Typewriter from "../../../ui/Typewriter";

export default function HeroContent(){
    return(

                
                <div className="space-y-6 text-center md:text-left">
                       <div className="inline-flex items-center gap-3 text-sky-400">
                            <span className="text-cyan-400">◈</span>
                            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
                                Magna Vertex Technologies
                            </span>
                        </div>
                        <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
                            Building Digital <span className="text-cyan-400">Solutions</span>
                            <br />
                            That Drive Business Growth
                        </h1>
                        
                        <Typewriter
                            words={HERO_TYPEWRITER}
                            typingSpeed={60}
                            deletingSpeed={30}
                            pauseDuration={2000}
                            className="text-sm md:text-base"
                        />
                        <Text>
                        We develop modern web applications, custom software,
                            and scalable digital solutions for growing businesses.
                        </Text>
                        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-2">
                            <Button variant="primary"
                            onClick={() => {document
                                                .getElementById('contact')
                                                ?.scrollIntoView({
                                                    behavior: "smooth",
                                                })}}
                            >
                                Get Started
                            </Button>

                            <Button variant="secondary" 
                            onClick={() => {document
                                                .getElementById('services')
                                                ?.scrollIntoView({
                                                    behavior: "smooth",
                                                })}}
                            >
                                Our Services
                            </Button>
                        </div>
                </div>

    );
}