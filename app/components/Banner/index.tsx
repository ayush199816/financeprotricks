"use client"
import { useState, useEffect } from "react";

const Banner = () => {
    const rotatingTexts = [
        { 
            text: "Pro Impact", 
            icon: "⏱️",
            iconStyle: { fontSize: "3.5rem", filter: "drop-shadow(0 0 5px rgba(255, 215, 0, 0.5))" },
            color: "#FFD700"
        },
        { 
            text: "Smart Finance", 
            icon: "💵",
            iconStyle: { fontSize: "3.5rem", filter: "drop-shadow(0 0 5px rgba(255, 140, 0, 0.5))" },
            color: "#FF8C00"
        },
        { 
            text: "Bright Future", 
            icon: "📈",
            iconStyle: { fontSize: "3.5rem", filter: "drop-shadow(0 0 5px rgba(255, 69, 0, 0.5))" },
            color: "#FF4500"
        }
    ];
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [prevTextIndex, setPrevTextIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            // Start dissolve-out animation
            setIsAnimating(true);
            
            // After dissolve out, change the content
            setTimeout(() => {
                setPrevTextIndex(currentTextIndex);
                setCurrentTextIndex(prevIndex => (prevIndex + 1) % rotatingTexts.length);
                
            }, 1000);
            
            // Reset animation state after full cycle
            setTimeout(() => {
                setIsAnimating(false);
            }, 2000);
            
        }, 4000); // Total duration for each item

        return () => clearInterval(interval);
    }, [currentTextIndex, rotatingTexts.length]);

    const currentItem = rotatingTexts[currentTextIndex];

    const dissolveStyle = {
        container: {
            position: 'relative' as 'relative',
            height: '160px',
            width: '100%',
        },
        item: {
            position: 'absolute' as 'absolute',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap' as 'nowrap',
            transition: 'opacity 1s ease-in-out, filter 1s ease-in-out',
        }
    };

    return (
        <div className='mx-auto max-w-7xl sm:py-6 px-6 lg:px-8'>
            <div className='grid grid-cols-1 my-16'>
                <div className="flex flex-col items-center justify-center text-center py-12">
                    <style jsx global>{`
                        @keyframes textDissolve {
                            0% {
                                opacity: 1;
                                filter: blur(0px);
                            }
                            50% {
                                opacity: 0;
                                filter: blur(8px);
                            }
                            100% {
                                opacity: 1;
                                filter: blur(0px);
                            }
                        }
                    `}</style>
                
                    <div className="flex flex-col items-center">
                        <h1 className='text-9xl font-bold mb-4' style={{ 
                            background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 0 15px rgba(255, 140, 0, 0.3)',
                            fontWeight: '800',
                            letterSpacing: '-0.02em',
                            lineHeight: '1.1',
                            fontSize: '7rem',
                        }}>
                            Smart tricks
                        </h1>
                        
                        <div style={dissolveStyle.container}>
                            <div 
                                style={{
                                    ...dissolveStyle.item,
                                    animation: isAnimating ? 'textDissolve 2s ease-in-out' : 'none',
                                }}
                            >
                                <div className="flex items-center justify-center">
                                    <h2 
                                        className='text-7xl lg:text-9xl font-bold inline-flex items-center' 
                                        style={{ 
                                            color: currentItem.color,
                                            textShadow: `0 0 8px ${currentItem.color}40`,
                                            fontWeight: 800,
                                            letterSpacing: '-0.02em',
                                            lineHeight: '1.1',
                                        }}
                                    >
                                        {currentItem.text}
                                        <span 
                                            className="inline-block ml-3 animate-bounce" 
                                            style={currentItem.iconStyle}
                                        >
                                            {currentItem.icon}
                                        </span>
                                    </h2>
                                </div>
                    </div>
                    </div>
                </div>

                    <p className="mt-10 max-w-2xl text-xl" style={{color: "#FF8C00"}}>
                        Transform your financial journey with our cutting-edge strategies and expert insights designed to maximize your wealth potential.
                    </p>
                    
                    <button 
                        className="mt-8 px-10 py-4 text-xl font-medium rounded-full transition-all duration-300 relative"
                        style={{
                            background: 'linear-gradient(to right, #FF8C00, #FFD700)',
                            boxShadow: '0 0 20px rgba(255, 165, 0, 0.5), inset 0 0 0 2px #000000',
                            color: 'white',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}
                    >
                        Start Today
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Banner;
