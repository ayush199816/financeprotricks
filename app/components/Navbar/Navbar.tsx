"use client"
import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";

interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
}

const navigation: NavigationItem[] = [
    { name: 'Docs', href: '#docs-section', current: false },
    { name: 'Support', href: '#support-section', current: false },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <Disclosure as="nav" className="navbar" style={{
            background: 'linear-gradient(90deg, rgba(255,69,0,0.85), rgba(255,215,0,0.85), rgba(255,140,0,0.85), rgba(255,215,0,0.85))',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)'
        }}>
            <>
                <div className="mx-auto max-w-7xl px-6 md:px-8 lg:px-10">
                    <div className="relative flex h-16 items-center justify-between">
                            {/* LOGO */}
                        <div className="flex items-center">
                            <Link href="/" className='flex items-center'>
                                <div className="w-10 h-10 mr-3 flex items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                                        <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
                                    </svg>
                                </div>
                                <span className='text-2xl font-medium text-black' style={{ fontWeight: 500, letterSpacing: '-0.01em' }}>
                                    FinanceProTricks
                                </span>
                                </Link>
                            </div>

                        {/* LINKS - CENTER */}
                        <div className="hidden lg:flex items-center justify-center flex-1">
                            <div className="flex space-x-10">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                        className='px-3 py-2 text-base font-medium transition-colors duration-200 text-black'
                                        style={{ 
                                            fontWeight: 500,
                                            background: 'none',
                                            color: 'black'
                                        }}
                                            aria-current={item.href ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            
                        {/* GET STARTED BUTTON */}
                        <div className="hidden lg:flex">
                            <Link 
                                href="#get-started" 
                                className="text-base font-medium transition-colors duration-300 rounded-full text-black py-2 px-6 bg-white"
                                style={{ 
                                    fontWeight: 500,
                                    boxShadow: '0 0 10px rgba(255, 165, 0, 0.3)'
                                }}
                            >
                                Get Started
                            </Link>
                        </div>

                        {/* DRAWER FOR MOBILE VIEW */}
                        <div className='block lg:hidden'>
                            <Bars3Icon className="block h-6 w-6 text-black" aria-hidden="true" onClick={() => setIsOpen(true)} />
                        </div>

                        {/* DRAWER LINKS DATA */}
                        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                            <Drawerdata />
                        </Drawer>
                    </div>
                </div>
            </>
        </Disclosure>
    )
}

export default Navbar;
