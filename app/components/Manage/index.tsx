"use client"
import { useState } from 'react';
import { Switch } from '@headlessui/react';
import Image from 'next/image';


const names = [
    {
        heading: "Startup",
        price: 41,
        user: 'per user, per month',
        button: "Start My 15-day Trial",
        profiles: '5 Social Profiles',
        posts: '5 Scheduled Posts Per Profile',
        templates: "400+ Templated",
        view: "Calendar View",
        support: '24/7 Support',
        category: 'yearly'
    },
    {
        heading: "Business",
        price: 29,
        user: 'per user, per month',
        button: "Start My 15-day Trial",
        profiles: '10 Social Profiles',
        posts: '5 Scheduled Posts Per Profile',
        templates: "600+ Templated",
        view: "Calendar View",
        support: '24/7 VIP Support',
        category: 'yearly'
    },
    {
        heading: "Agency",
        price: 139,
        user: 'per user, per month',
        button: "Start My 15-day Trial",
        profiles: '100 Social Profiles',
        posts: '100 Scheduled Posts Per Profile',
        templates: "800+ Templated",
        view: "Calendar View",
        support: '24/7 VIP Support',
        category: 'yearly'
    },
    {
        heading: "Agency",
        price: 139,
        user: 'per user, per yearly',
        button: "Start My 15-day Trial",
        profiles: '100 Social Profiles',
        posts: '100 Scheduled Posts Per Profile',
        templates: "800+ Templated",
        view: "Calendar View",
        support: '24/7 VIP Support',
        category: 'monthly'
    },
    {
        heading: "Startup",
        price: 41,
        user: 'per user, per yearly',
        button: "Start My 15-day Trial",
        profiles: '5 Social Profiles',
        posts: '5 Scheduled Posts Per Profile',
        templates: "400+ Templated",
        view: "Calendar View",
        support: '24/7 Support',
        category: 'monthly'
    },
    {
        heading: "Business",
        price: 29,
        user: 'per user, per yearly',
        button: "Start My 15-day Trial",
        profiles: '10 Social Profiles',
        posts: '5 Scheduled Posts Per Profile',
        templates: "600+ Templated",
        view: "Calendar View",
        support: '24/7 VIP Support',
        category: 'monthly'
    },


]

const Manage = () => {
    
    const [enabled, setEnabled] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('monthly');

    const toggleEnabled = () => {
        setEnabled(!enabled);
        setSelectedCategory(enabled ? 'monthly' : 'yearly');
    }

    const filteredData = names.filter(items => items.category === selectedCategory);

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
                </div>

            </div>
        </div>
    );
}

export default Manage;