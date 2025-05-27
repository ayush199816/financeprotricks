"use client"
import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from 'axios';

// CAROUSEL DATA (no longer needed, will fetch from API)
/*
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
*/

interface ArticleType {
    id: number;
    title: string;
    content: string;
    image_url?: string; // Optional as it might not be in dummy data
    author?: string; // Optional
    published_date: string; // Assuming it comes as a string
}

// CAROUSEL SETTINGS

export default function Articles() {
    const [articles, setArticles] = useState<ArticleType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get<ArticleType[]>('/api/articles');
                setArticles(response.data);
            } catch (err) {
                console.error('Error fetching articles:', err);
                setError('Failed to load articles.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1, // Changed to 1 for smoother scrolling
        arrows: false,
        autoplay: true, // Changed to true for autoplay
        speed: 1000, // Increased speed
        autoplaySpeed: 5000, // Time between slides
        cssEase: "ease-in-out", // Changed ease for smoother transition
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

    if (loading) {
        return (
            <div className="text-center py-20 bg-black text-white">Loading Articles...</div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 bg-black text-red-500">{error}</div>
        );
    }

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
                    }}>Latest Finance Tricks and Tips.</h3>
                </div>

                <Slider {...settings}>
                    {articles.map((article) => (
                        <div key={article.id}>
                            <div className='blog-card-gradient my-10 rounded-3xl border-4 border-black'>
                                <div className="rounded-3xl px-3 pt-3 pb-12 h-full flex flex-col justify-between" style={{ background: 'transparent' }}>
                                    <Image 
                                        src={article.image_url?.startsWith('http') ? article.image_url : 
                                             article.image_url?.startsWith('/') ? article.image_url : 
                                             '/images/articles/default-article-image.png'} 
                                        alt={article.title} 
                                        width={389} 
                                        height={262} 
                                        className="inline-block m-auto"
                                        unoptimized={true}
                                    />
                                    <h4 className='text-2xl font-bold pt-6' style={{ color: 'white' }}>{article.title}</h4>
                                    <p className='text-base font-normal pt-4 pb-2 opacity-75' style={{ color: 'white' }}>{article.content.substring(0, 150)}...</p>
                                    <div>
                                        {article.author && <h3 className='text-base font-normal pt-6 pb-2 opacity-75' style={{ color: 'white' }}>By {article.author}</h3>}
                                        <h3 className='text-base font-normal pb-1 opacity-75' style={{ color: 'white' }}>Published on {new Date(article.published_date).toLocaleDateString()}</h3>
                                    </div>
                                    <Link href={`/articles/${article.id}`} passHref>
                                        <button className="mt-6 w-full py-3 rounded-full font-bold bg-black text-white">Read More</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
