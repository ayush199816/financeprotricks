"use client"
import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';
import Image from 'next/image';

// Define the subscription plan type
type SubscriptionPlanType = {
    id: string;
    heading: string;
    price: number;
    user: string;
    button: string;
    profiles: string;
    posts: string;
    templates: string;
    view: string;
    support: string;
    category: string;
};

const Manage = () => {
    const [enabled, setEnabled] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('monthly');
    const [plans, setPlans] = useState<SubscriptionPlanType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch subscription plans on component mount
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await fetch('/api/subscription-plans');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch subscription plans');
                }
                
                const data = await response.json();
                setPlans(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching subscription plans:', err);
                setError('Failed to load subscription plans');
                setLoading(false);
            }
        };
        
        fetchPlans();
    }, []);

    const toggleEnabled = () => {
        setEnabled(!enabled);
        setSelectedCategory(enabled ? 'monthly' : 'yearly');
    }

    const filteredData = plans.filter(items => items.category === selectedCategory);

    return (
        <div id="services-section">
            <div className='mx-auto max-w-7xl sm:py-20 lg:px-8 my-16'>
                <h3 className='text-center text-4xl sm:text-65xl font-black'
                    style={{
                        background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        textShadow: '0 0 15px rgba(255, 140, 0, 0.3)'
                    }}
                >
                    Learn the Finance Tricks <span className="block" /> like a pro.
                </h3>


                <div className='md:flex md:justify-around mt-20'>
                    {loading ? (
                        <div className="flex justify-center items-center w-full py-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-10 w-full">{error}</div>
                    ) : (
                        <div className="flex flex-col md:flex-row md:justify-around w-full gap-4">
                            <div className='flex gap-5 justify-center md:justify-start items-center'>
                                <Image src="/images/manage/right.svg" alt="right-icon" width={21} height={14} style={{
                                    filter: 'invert(79%) sepia(53%) saturate(1095%) hue-rotate(330deg) brightness(101%) contrast(96%)'
                                }} />
                                <h4 className='text-lg font-semibold' style={{
                                    background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}>Free 15-day trial</h4>
                            </div>
                            <div className='flex gap-5 justify-center md:justify-start items-center'>
                                <Image src="/images/manage/right.svg" alt="right-icon" width={21} height={14} style={{
                                    filter: 'invert(79%) sepia(53%) saturate(1095%) hue-rotate(330deg) brightness(101%) contrast(96%)'
                                }} />
                                <h4 className='text-lg font-semibold' style={{
                                    background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}>Unlimited Team Members</h4>
                            </div>
                            <div className='flex gap-5 justify-center md:justify-start items-center'>
                                <Image src="/images/manage/right.svg" alt="right-icon" width={21} height={14} style={{
                                    filter: 'invert(79%) sepia(53%) saturate(1095%) hue-rotate(330deg) brightness(101%) contrast(96%)'
                                }} />
                                <h4 className='text-lg font-semibold' style={{
                                    background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}>Cancel Anytime</h4>
                            </div>
                        </div>
                    )}
                </div>

                <div className='mt-6 relative'>
                    <div className='dance-text mb-5' style={{
                        background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}>get 3 months free</div>
                    <Image src="/images/manage/toggle.svg" alt="toggle-image" width={24} height={24} className="toggleImage" />
                    <div className='flex justify-center'>
                        <h3 className='text-sm font-medium mr-5' style={{
                            background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>Billed Yearly</h3>
                        <Switch
                            checked={enabled}
                            onChange={toggleEnabled}
                            className={`${enabled ? 'bg-darkpurple' : 'bg-darkpurple'
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                            <span className="sr-only text-black">Enable notifications</span>
                            <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>
                        <h3 className='text-sm font-medium ml-5' style={{
                            background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}>Billed Monthly</h3>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-16 mx-5 gap-14 manage'>
                    {filteredData.map((items, i) => (
                        <div className={
                            `manageTabs text-center p-10 rounded-3xl ${i === 1 
                                ? 'bg-black border-2 border-black' 
                                : 'bg-gradient-to-r from-[#FF4500] via-[#FF8C00] to-[#FFD700] text-black'
                            }`
                        } key={i}>
                            <h4 className={
                                `text-2xl font-bold mb-3 ${i === 1 
                                    ? '' // Apply gradient via inline style
                                    : 'text-black'
                                }`
                            }
                            style={i === 1 ? {
                                background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            } : {}}>{items.heading}</h4>
                            <h2 className={
                                `text-5xl sm:text-65xl font-extrabold mb-3 ${i === 1 
                                    ? '' // Apply gradient via inline style
                                    : 'text-black'
                                }`
                            }
                            style={i === 1 ? {
                                background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            } : {}}>${items.price}</h2>
                            <p className={
                                `text-sm font-medium mb-6 ${i === 1 
                                    ? '' // Apply gradient via inline style
                                    : 'text-black'
                                }`
                            }
                            style={i === 1 ? {
                                background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            } : {}}>{items.user}</p>
                            <button className={
                                `text-sm font-bold rounded-full py-4 px-12 mb-6 ${i === 1 
                                    ? 'bg-gradient-to-r from-[#FF4500] via-[#FF8C00] to-[#FFD700] text-black'
                                    : 'text-white bg-black hover:bg-white hover:text-black border-2 border-black'
                                }`
                            }>{items.button}</button>
                            <hr style={{ color: "black", width: "50%", margin: "auto", borderTop: `1px solid ${i === 1 ? 'transparent' : 'black'}`
                            }} />
                            <h3 className={
                                `text-sm font-medium mb-3 ${i === 1 
                                    ? '' // Apply gradient via inline style
                                    : 'text-black'
                                }`
                            }
                            style={i === 1 ? {
                                background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            } : {}}>{items.support}</h3>
                        </div>
                    ))}
                    {filteredData.length === 0 && !loading && !error && (
                        <div className="text-center w-full py-10 text-gray-400">
                            No subscription plans found for this category.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Manage;