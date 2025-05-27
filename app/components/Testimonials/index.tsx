"use client"
import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import { StarIcon } from '@heroicons/react/24/solid';
import Image from "next/image";
import axios from 'axios';

interface Testimonial {
    id: number;
    name: string;
    profession: string;
    comment: string;
    imgSrc: string;
    display_order: number;
}

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await axios.get<Testimonial[]>('/api/testimonials');
                setTestimonials(response.data);
            } catch (err) {
                console.error('Error fetching testimonials:', err);
                setError('Failed to load testimonials.');
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: false,
        autoplay: false,
        speed: 500,
        autoplaySpeed: 2000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    arrows: false,
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    arrows: false,
                }
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    arrows: false,
                }
            }
        ]
    };

    if (loading) {
        return (
            <div className="pt-40 pb-32 lg:py-32 testimonial-gradient-bg" id="testimonial-section">
                <div className="text-center text-white">Loading testimonials...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="pt-40 pb-32 lg:py-32 testimonial-gradient-bg" id="testimonial-section">
                <div className="text-center text-red-500">{error}</div>
            </div>
        );
    }

    return (
        <div className="pt-40 pb-32 lg:py-32 testimonial-gradient-bg" id="testimonial-section">
            <div className='mx-auto max-w-7xl sm:py-4 lg:px-8 relative'>
                <div className="text-center">
                    <h3 className="text-4xl sm:text-6xl font-bold my-3" style={{
                        color: '#111',
                        textShadow: '0 0 15px rgba(0,0,0,0.03)'
                    }}>Client Success Stories</h3>
                    <h3 className="text-4xl sm:text-6xl font-bold my-4" style={{
                        color: '#666',
                        textShadow: '0 0 15px rgba(0,0,0,0.03)'
                    }}>Financial Transformations</h3>
                    <h3 className="text-4xl sm:text-6xl font-bold my-4" style={{
                        color: '#bbb',
                        textShadow: '0 0 15px rgba(0,0,0,0.03)'
                    }}>Investment Journeys</h3>
                </div>

                <Slider {...settings}>
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="relative">
                            <div className='testimonial-card p-[2px] my-20 rounded-3xl flex justify-center'>
                                <div className="bg-black rounded-3xl p-8 h-full flex flex-col justify-between w-80 min-h-[350px]">
                                    <Image 
                                        src={testimonial.imgSrc} 
                                        alt={testimonial.name} 
                                        width={71} 
                                        height={71} 
                                        className="inline-block m-auto absolute test-pos" 
                                    />
                                    <h4 className='text-base font-medium my-4' style={{color: 'white'}}>
                                        {testimonial.comment}
                                    </h4>
                                    <hr style={{ color: "#333", opacity: 0.3 }} />
                                    <div className="flex justify-between items-end mt-4">
                                        <div>
                                            <h3 className='text-base font-medium pt-4 pb-2' style={{color: 'black'}}>
                                                {testimonial.name}
                                            </h3>
                                            <h3 className='text-xs font-medium pb-2 opacity-50' style={{color: 'white'}}>
                                                {testimonial.profession}
                                            </h3>
                                        </div>
                                        <div className="flex">
                                            <StarIcon width={20} className="text-accent" />
                                            <StarIcon width={20} className="text-accent" />
                                            <StarIcon width={20} className="text-accent" />
                                            <StarIcon width={20} className="text-accent" />
                                            <StarIcon width={20} className="text-accent" />
                                        </div>
                                    </div>
                                    <button className="mt-6 w-full py-3 rounded-full font-bold testimonial-gradient-btn" style={{color: 'black'}}>
                                        Read Story
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
