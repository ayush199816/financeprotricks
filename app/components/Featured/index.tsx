"use client"
import React, { Component } from "react";
import Image from "next/image";
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

interface FeaturedState {
    flippedCards: Set<number>;
}

const courseData: CourseType[] = [
    {
        title: 'Financial Planning Fundamentals',
        instructor: 'Robert Morgan',
        rating: 4.4,
        price: 20,
        classes: 12,
        students: 150,
        imgSrc: '/images/featured/feat1.jpg',
        bestSeller: true,
    },
    {
        title: 'Investment Strategies for Beginners',
        instructor: 'Sarah Johnson',
        rating: 4.5,
        price: 20,
        classes: 12,
        students: 130,
        bestSeller: true,
        imgSrc: '/images/featured/feat2.jpg',
    },
    {
        title: 'Retirement Planning Masterclass',
        instructor: 'Michael Chen',
        rating: 5,
        price: 20,
        classes: 12,
        students: 120,
        bestSeller: true,
        imgSrc: '/images/featured/feat1.jpg',
    },
    {
        title: 'Tax Optimization Strategies',
        instructor: 'Emily Rodriguez',
        rating: 4.3,
        price: 20,
        classes: 10,
        students: 95,
        bestSeller: false,
        imgSrc: '/images/featured/feat2.jpg',
    },
    {
        title: 'Stock Market Analysis',
        instructor: 'David Williams',
        rating: 4.7,
        price: 20,
        classes: 14,
        students: 165,
        bestSeller: true,
        imgSrc: '/images/featured/feat1.jpg',
    },
    {
        title: 'Real Estate Investment',
        instructor: 'Jennifer Lee',
        rating: 4.6,
        price: 20,
        classes: 12,
        students: 110,
        bestSeller: false,
        imgSrc: '/images/featured/feat2.jpg',
    }
]

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

// Custom next arrow component
function SampleNextArrow(props: { className: any; style: any; onClick: any; }) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ 
                ...style, 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                background: "var(--color-primary)", 
                padding: "28px", 
                borderRadius: "50%", 
                color: "white",
                transition: "all 0.3s ease"
            }}
            onClick={onClick}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-accent)";
                e.currentTarget.style.color = "var(--color-primary)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-primary)";
                e.currentTarget.style.color = "white";
            }}
        />
    );
}

// Custom prev arrow component
function SamplePrevArrow(props: { className: any; style: any; onClick: any; }) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ 
                ...style, 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                background: "var(--color-primary)", 
                padding: "28px", 
                borderRadius: "50%", 
                color: "white",
                transition: "all 0.3s ease"
            }}
            onClick={onClick}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--color-accent)";
                e.currentTarget.style.color = "var(--color-primary)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--color-primary)";
                e.currentTarget.style.color = "white";
            }}
        />
    );
}

export default class Featured extends Component<{}, FeaturedState> {
    state: FeaturedState = {
        flippedCards: new Set<number>()
    };

    handleCardClick = (index: number) => {
        this.setState(prevState => {
            const newFlippedCards = new Set(prevState.flippedCards);
            if (newFlippedCards.has(index)) {
                newFlippedCards.delete(index);
            } else {
                newFlippedCards.add(index);
            }
            return { flippedCards: newFlippedCards };
        });
    };

    render() {
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true,
            autoplay: false,
            speed: 500,
            nextArrow: <SampleNextArrow className={undefined} style={undefined} onClick={undefined} />,
            prevArrow: <SamplePrevArrow className={undefined} style={undefined} onClick={undefined} />,
            cssEase: "linear",
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                }
            ]
        };

        return (
            <div className="bg-black py-20 px-4 sm:px-6 lg:px-8" id="courses-section">
                <div className="mx-auto max-w-7xl">
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
                                        <div className="relative h-[500px] perspective-1000">
                                            <div 
                                                className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${this.state.flippedCards.has(i) ? 'rotate-y-180' : ''}`}
                                                onClick={() => this.handleCardClick(i)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {/* Front of card */}
                                                <div className="absolute w-full h-full backface-hidden">
                                                    <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col group">
                                                        <div className="relative h-52 overflow-hidden">
                                                            <Image 
                                                                src={course.imgSrc} 
                                                                alt={course.title}
                                                                width={400}
                                                                height={225}
                                                                className="w-full h-full object-cover"
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
                                                        
                                                        <div className="p-6 flex flex-col flex-grow bg-black rounded-b-xl">
                                                            <h3 className="text-xl font-bold mb-2 line-clamp-2 h-14" style={{
                                                                background: 'linear-gradient(to right, #FF4500, #FFD700, #FF8C00, #FFD700)',
                                                                WebkitBackgroundClip: 'text',
                                                                WebkitTextFillColor: 'transparent',
                                                                backgroundClip: 'text'
                                                            }}>
                                                                {course.title}
                                                            </h3>
                                                            
                                                            <p className="mb-4" style={{
                                                                background: 'linear-gradient(to right, #FF4500, #FFD700, #FF8C00, #FFD700)',
                                                                WebkitBackgroundClip: 'text',
                                                                WebkitTextFillColor: 'transparent',
                                                                backgroundClip: 'text'
                                                            }}>{course.instructor}</p>
                                                            
                                                            <div className="flex items-center mb-4">
                                                                <span className="text-2xl font-bold mr-2" style={{
                                                                    background: 'linear-gradient(to right, #FF4500, #FFD700, #FF8C00, #FFD700)',
                                                                    WebkitBackgroundClip: 'text',
                                                                    WebkitTextFillColor: 'transparent',
                                                                    backgroundClip: 'text'
                                                                }}>{course.rating}</span>
                                                                <RatingStars rating={course.rating} />
                                                            </div>
                                                            
                                                            <div className="flex justify-between items-center mt-auto">
                                                                <span className="text-2xl font-bold" style={{
                                                                    background: 'linear-gradient(to right, #FF4500, #FFD700, #FF8C00, #FFD700)',
                                                                    WebkitBackgroundClip: 'text',
                                                                    WebkitTextFillColor: 'transparent',
                                                                    backgroundClip: 'text'
                                                                }}>${course.price}</span>
                                                                
                                                                <div className="flex space-x-4 text-sm" >
                                                                    <div className="flex items-center" style={{
                                                                        background: 'linear-gradient(to right, #FF4500, #FFD700, #FF8C00, #FFD700)',
                                                                        WebkitBackgroundClip: 'text',
                                                                        WebkitTextFillColor: 'transparent',
                                                                        backgroundClip: 'text'
                                                                    }}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                                        </svg>
                                                                        {course.classes} classes
                                                                    </div>
                                                                    <div className="flex items-center" style={{
                                                                        background: 'linear-gradient(to right, #FF4500, #FFD700, #FF8C00, #FFD700)',
                                                                        WebkitBackgroundClip: 'text',
                                                                        WebkitTextFillColor: 'transparent',
                                                                        backgroundClip: 'text'
                                                                    }}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                                                        </svg>
                                                                        {course.students} students
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="font-bold absolute bottom-0 left-0 right-0 backdrop-blur-md bg-gradient-to-r from-[#FF4500]/80 via-[#FF8C00]/80 to-[#FFD700]/80 text-black text-center py-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-full rounded-b-xl">
                                                            <span className="relative inline-block font-bold">
                                                                Click Me
                                                                <span className="absolute inset-0 bg-gradient-to-r from-[#FF4500] via-[#FF8C00] to-[#FFD700] blur-sm opacity-50 animate-pulse rounded-b-xl"></span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Back of card */}
                                                <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-r from-[#FF4500] via-[#FF8C00] to-[#FFD700] rounded-xl p-6 text-black">
                                                    <div className="h-full flex flex-col justify-between">
                                                        <div>
                                                            <h3 className="text-2xl font-bold mb-4">{course.title}</h3>
                                                            <div className="space-y-3">
                                                                <p className="text-lg">• Comprehensive course materials</p>
                                                                <p className="text-lg">• Lifetime access to content</p>
                                                                <p className="text-lg">• Certificate of completion</p>
                                                                <p className="text-lg">• Expert instructor support</p>
                                                                <p className="text-lg">• Community access</p>
                                                            </div>
                                                        </div>
                                                        <div className="mt-6">
                                                            <button className="w-full bg-black font-bold py-3 px-6 rounded-full text-white">
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
                </div>
            </div>
        );
    }
};
