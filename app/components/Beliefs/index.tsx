'use client'
import React, { useState } from 'react';

const Beliefs = () => {
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30; // max 15deg
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
        setTilt({ x, y });
    };

    const handleMouseLeave = (_e: React.MouseEvent<HTMLDivElement>) => {
        setTilt({ x: 0, y: 0 });
    };

    return (
        <div className='mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8 rounded-3xl'>
            <div className='flex flex-col items-center justify-center w-full'>
                <div className='text-center'>
                    <h3 className="text-4xl sm:text-6xl font-bold my-3"
                        style={{
                            background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 0 15px rgba(255, 140, 0, 0.3)',
                            fontWeight: 800,
                            opacity: 1
                        }}
                    >Client Success Stories</h3>
                    <h3 className="text-4xl sm:text-6xl font-bold my-3"
                        style={{
                            background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 0 15px rgba(255, 140, 0, 0.3)',
                            fontWeight: 700,
                            opacity: 0.5
                        }}
                    >Financial Transformations</h3>
                    <h3 className="text-4xl sm:text-6xl font-bold my-3"
                        style={{
                            background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 0 15px rgba(255, 140, 0, 0.3)',
                            fontWeight: 700,
                            opacity: 0.25
                        }}
                    >Investment Journeys</h3>
                </div>
            </div>
            <div className='flex justify-center items-center w-full min-h-[400px]'>
                <div
                    className="bg-darkblue bg-beliefs pt-12 px-10 sm:px-24 pb-52 md:pb-70 rounded-3xl transition-transform duration-500 flex flex-col justify-center items-center w-full max-w-xl"
                    style={{
                        transform: `rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)`
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <h3 className="text-4xl sm:text-65xl font-bold text-white leading-snug mb-5 text-center sm:text-start">Honesty <span className="text-grey">and hard work are our beliefs.</span></h3>
                    <h5 className="text-offwhite pt-2 mb-5 text-center sm:text-start">Quis ipsum suspendisse ultrices gravida risus commodo viverra maecenas accumsan lacus vel facilisis.</h5>
                    <div className="text-center sm:text-start">
                        <button className="text-xl py-5 px-14 mt-5 font-semibold text-white rounded-full bg-blue border border-blue hover:bg-accent hover:text-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Beliefs;
