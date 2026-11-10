import { SHAPES } from "../../../constants/shapes";

export default function HeroShapes(){
    return(
        <>

                                <div className={`absolute top-25 left-30 ${SHAPES["diamond-xs"]} bg-cyan-300 opacity-10`} />
                                <div className={`absolute top-25 left-120 ${SHAPES["diamond-xs"]} bg-cyan-300 opacity-10`} />
                                <div className={`absolute top-25 left-210 ${SHAPES["diamond-xs"]} bg-cyan-300 opacity-10`} />
                                <div className={`absolute top-25 left-300  ${SHAPES["diamond-xs"]} bg-cyan-300 opacity-10`} />
                                
                                <div className={`absolute top-90 left-100 ${SHAPES["diamond-xs"]} bg-cyan-300 opacity-10`} />
                                <div className={`absolute top-90 left-190 ${SHAPES["diamond-xs"]} bg-cyan-300 opacity-10`} />
                                <div className={`absolute top-90 left-280 ${SHAPES["diamond-xs"]} bg-cyan-300 opacity-10`} />
                                

                                <div className={`absolute top-120 left-30 ${SHAPES["diamond-xs"]} bg-cyan-300 opacity-10`} />
                                <div className={`absolute top-120 left-120 ${SHAPES["diamond-xs"]} bg-cyan-300 opacity-10`} />
                                <div className={`absolute top-120 left-210 ${SHAPES["diamond-xs"]} bg-cyan-300 opacity-10`} />
                                <div className={`absolute top-120 left-300 ${SHAPES["diamond-xs"]} bg-cyan-300 opacity-10`} />
        </>
    );
}