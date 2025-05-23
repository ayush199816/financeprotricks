"use client"
import Slider from "react-slick";
import React, { Component } from "react";
import { StarIcon } from '@heroicons/react/24/solid';
import Image from "next/image";

// CAROUSEL DATA

interface DataType {
    profession: string;
    comment: string;
    imgSrc: string;
    name: string;
}

const postData: DataType[] = [
    {
        name: "Robert Fox",
        profession: 'Business Owner',
        comment: 'Thanks to FinanceProTricks, I was able to establish a retirement plan that provides security for my family while optimizing my business tax strategy. Their expertise has been invaluable.',
        imgSrc: '/images/testimonial/user1.svg',
    },
    {
        name: "Leslie Alexander",
        profession: 'Senior Executive',
        comment: 'After working with their investment advisors, my portfolio has seen consistent growth even during market volatility. Their personalized approach to wealth management truly sets them apart.',
        imgSrc: '/images/testimonial/user2.svg',
    },
    {
        name: "Cody Fisher",
        profession: 'Medical Professional',
        comment: 'As a busy physician, I needed financial guidance that worked with my schedule. FinanceProTricks provided clear investment strategies that have helped me build wealth while focusing on my practice.',
        imgSrc: '/images/testimonial/user3.svg',
    },
    {
        name: "Sarah Johnson",
        profession: 'Retiree',
        comment: 'Transitioning to retirement was seamless with their help. Their income planning strategies have given me peace of mind knowing my savings will last throughout my retirement years.',
        imgSrc: '/images/testimonial/user1.svg',
    },
    {
        name: "Michael Chen",
        profession: 'Technology Entrepreneur',
        comment: 'Their tax planning saved my startup thousands in unnecessary expenses. The team understands the unique financial challenges of entrepreneurs and provides actionable solutions.',
        imgSrc: '/images/testimonial/user2.svg',
    },
    {
        name: "Emily Rodriguez",
        profession: 'Young Professional',
        comment: 'As someone just starting my career, their financial literacy program gave me the foundation I needed to make smart decisions about saving, investing, and planning for my future.',
        imgSrc: '/images/testimonial/user3.svg',
    },
]

// CAROUSEL SETTINGS


export default class MultipleItems extends Component {

    render() {
        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 3,
            // centerMode: true,
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
                        dots: false
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 450,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                }
            ]
        };


        return (
            <div className="pt-40 pb-32 lg:py-32 testimonial-gradient-bg" id="testimonial-section">
                <div className='mx-auto max-w-7xl sm:py-4 lg:px-8 '>

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
                        {postData.map((items, i) => (
                            <div key={i} className="relative">
                                <div className='testimonial-card p-[2px] my-20 rounded-3xl flex justify-center'>
                                    <div className="bg-black rounded-3xl p-8 h-full flex flex-col justify-between w-80 min-h-[350px]">
                                        <Image src={items.imgSrc} alt={items.imgSrc} width={71} height={71} className="inline-block m-auto absolute test-pos" />
                                        <h4 className='text-base font-medium my-4' style={{color: 'white'}}>{items.comment}</h4>
                                        <hr style={{ color: "#333", opacity: 0.3 }} />
                                        <div className="flex justify-between items-end mt-4">
                                            <div>
                                                <h3 className='text-base font-medium pt-4 pb-2' style={{color: 'black'}}>
                                                    {items.name}
                                                </h3>
                                                <h3 className='text-xs font-medium pb-2 opacity-50' style={{color: 'white'}}>{items.profession}</h3>
                                            </div>
                                            <div className="flex">
                                                <StarIcon width={20} className="text-accent" />
                                                <StarIcon width={20} className="text-accent" />
                                                <StarIcon width={20} className="text-accent" />
                                                <StarIcon width={20} className="text-accent" />
                                                <StarIcon width={20} className="text-accent" />
                                            </div>
                                        </div>
                                        <button className="mt-6 w-full py-3 rounded-full font-bold testimonial-gradient-btn" style={{color: 'black'}}>Read Story</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

        );
    }
}
