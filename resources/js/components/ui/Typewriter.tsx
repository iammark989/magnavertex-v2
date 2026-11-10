import { useEffect,useState } from "react";
interface TypewriterProps {

    words: readonly string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;

    className?: string;
}

const baseClasses = "inline-flex items-center rounded-lg border border-cyan-400/20 shadow-sm shadow-cyan-500/10 bg-cyan-400/10 px-3 py-1.5 font-medium text-cyan-300 tracking-wide backdrop-blur-sm";
export default function Typewriter({
    words,typingSpeed = 80,deletingSpeed = 30 ,pauseDuration = 2000,className = "",
}: TypewriterProps) {

    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayText, setDisplayText] = useState("");
    const [charIndex,setCharIndex] = useState(0);
    const [isDeleting,setIsDeleting] = useState(false);

    const currentWord = words[currentWordIndex];

   const typewriterClasses = [
    baseClasses,
    className,
].join(" ");

    useEffect(() => {

                        // PAUSE
                if (!isDeleting && charIndex >= currentWord.length) {

                    const pauseTimer = setTimeout(() => {
                        setIsDeleting(true);
                    }, pauseDuration);

                    return () => clearTimeout(pauseTimer);
                }

                // DELETE
                if (isDeleting) {

                    if (charIndex <= 1) {
                        setDisplayText("");
                        setCharIndex(0);
                        setIsDeleting(false);

                        setCurrentWordIndex(
                            (prev) => (prev + 1) % words.length
                        );

                        return;
                    }

                    const deleting = setTimeout(() => {
                        const nextCharIndex = charIndex - 1;

                        setCharIndex(nextCharIndex);
                        setDisplayText(
                            currentWord.substring(0, nextCharIndex)
                        );
                    }, deletingSpeed);

                    return () => clearTimeout(deleting);
                }

                // TYPE
                const timer = setTimeout(() => {
                    const nextCharIndex = charIndex + 1;

                    setCharIndex(nextCharIndex);
                    setDisplayText(
                        currentWord.substring(0, nextCharIndex)
                    );
                }, typingSpeed);

                return () => clearTimeout(timer);


}, [currentWord,isDeleting,typingSpeed,charIndex,pauseDuration]);



       return (
    <p className={typewriterClasses}>
        {displayText}
        <span className="animate-pulse">|</span>
    </p>

    );
}