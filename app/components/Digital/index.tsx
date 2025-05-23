'use client';

import React from "react";
import styles from './Digital.module.css';

const Digital = () => {
    return (
        <div className="mx-2 my-40">
            <div className={`mx-auto max-w-7xl rounded-3xl relative ${styles.gradientBorderContainer}`}>
                {/* Top border */}
                <div className={styles.topBorder}></div>
                {/* Right border (animated) */}
                <div className={styles.rightBorder}></div>
                {/* Bottom border (animated) */}
                <div className={styles.bottomBorder}></div>
                {/* Left border */}
                <div className={styles.leftBorder}></div>
                <div className='w-full h-full bg-black rounded-3xl px-4 py-20 lg:px-8 relative'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 my-16 gap-8'>
                        {/* COLUMN-1 */}
                        <div className="pt-0 lg:pl-24 ">
                            <h3 className="text-lg font-normal text-white mb-5 tracking-widest text-center lg:text-start">WHO WE ARE</h3>
                            <h4 className="text-4xl sm:text-6xl font-bold mb-8 leading-snug text-center lg:text-start text-white">We are a finance <br /> agency that builds <br /> amazing products.</h4>
                            <div className="text-center lg:text-start">
                                <button className="w-auto bg-black text-white font-bold py-4 px-12 rounded-full hover:bg-gray-800 transition-colors duration-200">
                                    Get started
                                </button>
                            </div>
                        </div>
                        {/* COLUMN-2: Static Gradient Border Container */}
                        <div className="flex items-center justify-center">
                                <div className="w-full h-full bg-black rounded-xl flex items-center justify-center">
                                    {/* Content inside the border can go here */}
                                    <span className="text-white text-xl font-bold">Content Area</span>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Digital;
