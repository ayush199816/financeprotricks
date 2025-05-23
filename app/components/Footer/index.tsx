import Image from "next/image";
import Link from "next/link";


// MIDDLE LINKS DATA
interface ProductType {
    id: number;
    section: string;
    link: string[];
}

const products: ProductType[] = [
    {
        id: 1,
        section: "Services",
        link: ['Wealth Management', 'Financial Planning', 'Investment Advisory', 'Tax Planning'],
    },
    {
        id: 2,
        section: "Investments",
        link: ['Stocks & ETFs', 'Mutual Funds', 'Retirement Accounts', 'Fixed Income']
    },
    {
        id: 3,
        section: "Resources",
        link: ['Market News', 'Calculators', 'Webinars', 'Newsletters']
    },
    {
        id: 4,
        section: "Company",
        link: ['About Us', 'Team', 'Careers', 'Contact']
    }
]

const footer = () => {
    return (
        <div className="footer-lava-gradient relative overflow-hidden -mt-40" id="first-section">
            {/* Instagram component in front of lava and bubbles */}
            
            {/* Bubbles animation */}
            <div className="footer-bubbles pointer-events-none absolute left-0 right-0 top-0 z-20 w-full h-32">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className={`footer-bubble bubble-${i}`}></div>
                ))}
            </div>
            <div className="mx-auto max-w-2xl pt-48 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-24 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-12 xl:gap-x-8">

                    {/* COLUMN-1 */}

                    <div className='col-span-4'>
                        <h3 className='text-white text-4xl font-semibold leading-9 mb-4 lg:mb-20'> FinanceProTricks</h3>
                        <p className='text-white text-lg mb-4'>Your trusted partner for financial success</p>
                        <div className='flex gap-4'>
                            <div className='footer-icons'>
                                <Link href="https://facebook.com"><Image src={'/images/footer/vec.svg'} alt="facebook" width={15} height={20} /></Link>
                            </div>
                            <div className='footer-icons'>
                                <Link href="https://twitter.com"><Image src={'/images/footer/twitter.svg'} alt="twitter" width={20} height={20} /></Link>
                            </div>
                            <div className='footer-icons'>
                                <Link href="https://instagram.com"><Image src={'/images/footer/instagram.svg'} alt="instagram" width={20} height={20} /></Link>
                            </div>
                        </div>
                    </div>

                    {/* CLOUMN-2/3 */}

                    {products.map((product) => (
                        <div key={product.id} className="group relative col-span-2">
                            <p className="text-accent text-xl font-extrabold mb-9">{product.section}</p>
                            <ul>
                                {product.link.map((link: string, index: number) => (
                                    <li key={index} className='mb-5'>
                                        <Link href="/" className="text-white text-lg font-normal mb-6 space-links">{link}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                </div>
            </div>

            {/* All Rights Reserved */}

            <div className="mx-auto max-w-2xl lg:max-w-7xl">
                <div className="pt-5 pb-5 px-4 sm:px-6 lg:px-4 border-solid border-t border-secondary">
                    <div className="mt-4 grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 xl:gap-x-8">
                        <div>
                            <h3 className='text-center md:text-start text-offwhite text-lg'>@2023 - All Rights Reserved by <Link href="https://FinanceProTricks/" target="_blank"> FinanceProTricks</Link></h3>
                        </div>
                        <div className="flex justify-center md:justify-end">
                            <Link href="/">
                                <h3 className="text-offwhite pr-6">Privacy policy</h3>
                            </Link>
                            <Link href="/">
                                <h3 className="text-offwhite pl-6 border-solid border-l border-secondary">Terms & conditions</h3>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default footer;
