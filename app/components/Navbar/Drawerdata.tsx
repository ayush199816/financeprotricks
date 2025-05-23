import React from 'react'
import Link from 'next/link'

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

const Drawerdata = () => {
    return (
        <div className="rounded-md max-w-sm w-full mx-auto">
            <div className="flex-1 space-y-5 py-6">
                <div className="px-5 sm:px-0">
                    <Link href="/" className="flex items-center">
                        <div className="w-8 h-8 mr-2 flex items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                                <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
                            </svg>
                        </div>
                        <span className='text-xl font-medium text-white'>
                            FinanceProTricks
                        </span>
                    </Link>
                </div>
                <div className="space-y-1 pt-6 px-5">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                            className='block px-3 py-2 text-base font-medium transition-colors duration-200'
                            style={{ 
                                fontWeight: 500,
                                background: 'linear-gradient(90deg, #FFD700, #FF8C00)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 0 1px rgba(255, 215, 0, 0.1)'
                            }}
                            >
                                {item.name}
                            </Link>
                        ))}
                    <Link 
                        href="#get-started" 
                        className="block text-base font-medium transition-colors duration-300 rounded-full text-white py-2 mt-6 px-6 text-center"
                        style={{ 
                            fontWeight: 500,
                            background: 'linear-gradient(to right, #FF8C00, #FFD700)',
                            boxShadow: '0 0 10px rgba(255, 165, 0, 0.3)'
                        }}
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Drawerdata
