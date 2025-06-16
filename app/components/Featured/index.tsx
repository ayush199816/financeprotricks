"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';
import Slider from "react-slick";

// COURSE DATA
interface CourseType {
    title: string;
    instructor: string;
    rating: number;
    price: number;
    classes: number;
    students: number;
    imgSrc: string;
    bestSeller: boolean;
}

// We'll fetch this data from the API now

// Render star ratings
const RatingStars = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
        <div className="flex">
            {[...Array(fullStars)].map((_, i) => (
                <StarIcon key={`full-${i}`} className="h-5 w-5 text-accent" />
            ))}
            {hasHalfStar && (
                <StarIcon className="h-5 w-5 text-accent opacity-60" />
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <StarIconOutline key={`empty-${i}`} className="h-5 w-5 text-accent" />
            ))}
        </div>
    );
};

const Featured = () => {
    const [courseData, setCourseData] = useState<CourseType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [flipped, setFlipped] = useState<number | null>(null);
    
    // Fetch courses from the API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('/api/admin/courses');
                if (!response.ok) {
                    throw new Error('Failed to fetch courses');
                }
                const data = await response.json();
                
                // Transform the data to match our CourseType interface
                const transformedData: CourseType[] = data.map((course: any) => ({
                    title: course.title,
                    instructor: course.instructor,
                    rating: course.rating,
                    price: course.price,
                    classes: course.classes,
                    students: course.students,
                    imgSrc: course.img_src,
                    bestSeller: course.best_seller
                }));
                
                setCourseData(transformedData);
            } catch (err) {
                console.error('Error fetching courses:', err);
                setError('Failed to load courses. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchCourses();
    }, []);
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false, // Hide arrows in this view
        autoplay: true, // Enable autoplay
        autoplaySpeed: 2000, // 2 seconds per slide
        speed: 1000, // 1 second transition
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: false,
                }
            }
        ]
    };

    const handleFlip = (index: number) => {
        setFlipped(flipped === index ? null : index);
    };

    return (
        <div className="bg-black py-20 px-4 sm:px-6 lg:px-8" id="courses-section">
            <div className="mx-auto max-w-7xl">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-10">{error}</div>
                ) : (
                <>
                <div className="text-center mb-16">
                    <h3 className="text-4xl sm:text-5xl font-bold mb-4" style={{
                        background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 0 15px rgba(255, 140, 0, 0.3)'
                    }}>Featured Courses</h3>
                    <p className="text-xl text-white opacity-80 max-w-3xl mx-auto">
                        Enhance your financial knowledge with our expert-led courses
                    </p>
                </div>

                <div className="carousel-container px-2">
                    <Slider {...settings}>
                        {courseData.map((course, i) => (
                            <div key={i} className="px-3 h-full">
                                <div className="p-[2px] rounded-2xl bg-gradient-to-r from-[#FF4500] via-[#FF8C00] to-[#FFD700]">
                                    <div
                                        className="relative h-full perspective-1000"
                                        onClick={() => handleFlip(i)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className={`transition-transform duration-500 w-full h-full transform-style-3d ${flipped === i ? 'rotate-y-180' : ''}`}
                                            style={{ minHeight: 400 }}
                                        >
                                            {/* Front Side */}
                                            <div className="bg-black rounded-xl overflow-hidden shadow-lg h-full flex flex-col backface-hidden absolute w-full h-full top-0 left-0">
                                                <div className="relative h-52 overflow-hidden">
                                                    <Image 
                                                        src={course.imgSrc} 
                                                        alt={course.title}
                                                        width={400}
                                                        height={225}
                                                        className="w-full h-full object-cover"
                                                        unoptimized={true}
                                                    />
                                                    {course.bestSeller && (
                                                        <div className="absolute right-4 bottom-4">
                                                            <div className="px-4 py-2 rounded-full font-bold text-xs bg-black" style={{
                                                                color: 'transparent',
                                                                backgroundImage: 'linear-gradient(to right, #FF4500, #FFD700, #FF8C00, #FFD700)',
                                                                WebkitBackgroundClip: 'text',
                                                                WebkitTextFillColor: 'transparent',
                                                                backgroundClip: 'text'
                                                            }}>
                                                                BEST SELLER
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-6 flex flex-col flex-grow text-white">
                                                    <h3 className="text-xl font-bold mb-2 line-clamp-2 h-14" style={{
                                                        background: 'linear-gradient(to right, #FF4500, #FFD700, #FF8C00, #FFD700)',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                        backgroundClip: 'text'
                                                    }}>
                                                        {course.title}
                                                    </h3>
                                                    <p className="mb-4 text-gray-400">{course.instructor}</p>
                                                    <div className="flex items-center mb-4">
                                                        <span className="text-2xl font-bold mr-2" style={{
                                                            background: 'linear-gradient(to right, #FF4500, #FFD700, #FF8C00, #FFD700)',
                                                            WebkitBackgroundClip: 'text',
                                                            WebkitTextFillColor: 'transparent',
                                                            backgroundClip: 'text'
                                                        }}>{course.rating}</span>
                                                        <RatingStars rating={course.rating} />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Back Side */}
                                            <div className="bg-black rounded-xl overflow-hidden shadow-lg h-full flex flex-col backface-hidden absolute w-full h-full top-0 left-0 rotate-y-180">
                                                <div className="p-6 flex flex-col flex-grow text-white justify-center items-center">
                                                    <h3 className="text-xl font-bold mb-2 text-center" style={{
                                                        background: 'linear-gradient(to right, #FF4500, #FFD700, #FF8C00, #FFD700)',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                        backgroundClip: 'text'
                                                    }}>
                                                        {course.title}
                                                    </h3>
                                                    <div className="space-y-3 mb-6 text-gray-300 text-center">
                                                        <p className="text-base">• {course.classes} Classes</p>
                                                        <p className="text-base">• {course.students} Students</p>
                                                        <p className="text-base">• ${course.price} Only</p>
                                                        <p className="text-base">• Certificate of completion</p>
                                                        <p className="text-base">• Community access</p>
                                                    </div>
                                                    <div className="mt-auto w-full flex justify-center">
                                                        <button className="bg-gradient-to-r from-[#FF4500] via-[#FF8C00] to-[#FFD700] text-black font-bold py-3 px-6 rounded-full w-full">
                                                            Enroll Now
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                </>
                )}
            </div>
        </div>
    );
};

export default Featured;
