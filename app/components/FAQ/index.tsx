"use client"
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

const FAQ = () => {
    return (
        <div id="faq-section" className='mx-auto max-w-7xl py-24 lg:px-8 bg-primary rounded-2xl my-16 faq-bg'>
            <h3 className='text-xl font-normal text-black text-center mb-6'>FAQ</h3>
            <h2 className='text-4xl lg:text-6xl font-semibold text-center text-black'>Financial Questions <br /> Answered</h2>
            <div className="w-full px-4 pt-16">
                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-black py-8 px-6 mb-5">
                    <Disclosure>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-2xl font-medium text-white">
                                    <span style={{
                                        background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}>How much should I save for retirement?</span>
                                    <ChevronUpIcon
                                        className={`${open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-secondary`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base font-normal">
                                    <span style={{
                                        background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}>
                                        Financial advisors typically recommend saving 15-20% of your annual income for retirement. 
                                        However, the exact amount depends on your age, desired retirement lifestyle, and when you plan to retire. 
                                        Our financial advisors can create a personalized retirement savings plan based on your specific goals.
                                    </span>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>

                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-black py-8 px-6 mb-5">
                    <Disclosure as="div" className="mt-2">
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-2xl font-medium text-white">
                                    <span style={{
                                        background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}>What investment strategy is best for beginners?</span>
                                    <ChevronUpIcon
                                        className={`${open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-secondary`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base font-normal">
                                    <span style={{
                                        background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}>
                                        For beginners, we recommend starting with a diversified portfolio of low-cost index funds or ETFs.
                                        This approach provides broad market exposure while minimizing fees and complexity.
                                        As you gain experience, our advisors can help you explore more sophisticated investment strategies
                                        tailored to your risk tolerance and financial goals.
                                    </span>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>

                <div className="mx-auto w-full max-w-5xl rounded-2xl bg-black py-8 px-6">
                    <Disclosure as="div" className="mt-2">
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg px-4 py-2 text-left text-2xl font-medium text-white">
                                    <span style={{
                                        background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}>How can I reduce my tax burden legally?</span>
                                    <ChevronUpIcon
                                        className={`${open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-secondary`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-base font-normal">
                                    <span style={{
                                        background: 'linear-gradient(to right, #FF8C00, #FF4500, #FFD700)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text',
                                    }}>
                                        There are several tax-efficient strategies available, including maxing out contributions to tax-advantaged 
                                        retirement accounts (401(k)s, IRAs), tax-loss harvesting, charitable giving, and utilizing health savings
                                        accounts (HSAs). Our tax planning specialists can develop a comprehensive strategy to minimize your tax
                                        liability while ensuring full compliance with tax laws.
                                    </span>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>

            </div>
        </div>
    )
}

export default FAQ;