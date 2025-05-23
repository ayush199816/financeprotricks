"use client"
import Slider from "react-slick";
import React, { Component } from "react";
import Link from "next/link";
import Image from "next/image";

// CAROUSEL DATA

interface DataType {
    time: string;
    heading: string;
    heading2: string;
    date: string;
    imgSrc: string;
    name: string;
}

const postData: DataType[] = [
    {
        time: "5 min",
        heading: 'We Launch Delia',
        heading2: 'Webflow this Week!',
        name: "Published on Startupon",
        date: 'August 19, 2021',
        imgSrc: '/images/articles/article.png',
    },
    {
        time: "5 min",
        heading: 'We Launch Delia',
        heading2: 'Webflow this Week!',
        name: "Published on Startupon",
        date: 'August 19, 2021',
        imgSrc: '/images/articles/article2.png',
    },
    {
        time: "5 min",
        heading: 'We Launch Delia',
        heading2: 'Webflow this Week!',
        name: "Published on Startupon",
        date: 'August 19, 2021',
        imgSrc: '/images/articles/article3.png',
    },
    {
        time: "5 min",
        heading: 'We Launch Delia',
        heading2: 'Webflow this Week!',
        name: "Published on Startupon",
        date: 'August 19, 2021',
        imgSrc: '/images/articles/article.png',
    },
    {
        time: "5 min",
        heading: 'We Launch Delia',
        heading2: 'Webflow this Week!',
        name: "Published on Startupon",
        date: 'August 19, 2021',
        imgSrc: '/images/articles/article2.png',
    },
    {
        time: "5 min",
        heading: 'We Launch Delia',
        heading2: 'Webflow this Week!',
        name: "Published on Startupon",
        date: 'August 19, 2021',
        imgSrc: '/images/articles/article3.png',
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
            cssEase: "linear",
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
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
            <div className="py-20 bg-black" id="blog-section">
                <div className='mx-auto max-w-7xl sm:py-4 lg:px-8 '>
                    <div className="text-center">
                        <h3 className="text-secondary text-lg font-normal tracking-widest">ARTICLES</h3>
                        <h3 className="text-4xl sm:text-6xl font-bold" style={{
                            background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 0 15px rgba(255, 140, 0, 0.3)'
                        }}>Our latest post.</h3>
                    </div>


                    <Slider {...settings}>
                        {postData.map((items, i) => (
                            <div key={i}>
                                <div className='blog-card-gradient my-10 rounded-3xl border-4 border-black'>
                                    <div className="rounded-3xl px-3 pt-3 pb-12 h-full flex flex-col justify-between" style={{background: 'transparent'}}>
                                    <Image src={items.imgSrc} alt="gaby" width={389} height={262} className="inline-block m-auto" />
                                    <Link href="/">
                                            <h3 className="absolute bg-black text-white hover:opacity-80 py-3 px-6 rounded-full article-img">{items.time} read</h3>
                                    </Link>
                                        <h4 className='text-2xl font-bold pt-6' style={{color: 'white'}}>{items.heading}</h4>
                                        <h4 className='text-2xl font-bold pt-1' style={{color: 'white'}}>{items.heading2}</h4>
                                    <div>
                                            <h3 className='text-base font-normal pt-6 pb-2 opacity-75' style={{color: 'white'}}>{items.name}</h3>
                                            <h3 className='text-base font-normal pb-1 opacity-75' style={{color: 'white'}}>{items.date}</h3>
                                        </div>
                                        <button className="mt-6 w-full py-3 rounded-full font-bold bg-black text-white" >Read More</button>
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
