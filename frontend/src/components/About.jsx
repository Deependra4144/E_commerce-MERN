import React from 'react'

function About() {
    return (
        <div>
            <section className="bg-gray-50 py-16 px-6 md:px-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Welcome to <span className="font-semibold text-indigo-600">ShopEase</span>,
                        your go-to destination for premium quality products at unbeatable prices.
                        Our mission is to provide customers with a seamless shopping experience,
                        offering everything you need with just a few clicks.
                    </p>
                    <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                        We believe in making online shopping easy, enjoyable, and reliable.
                        Thank you for choosing us to be part of your journey!
                    </p>
                </div>
            </section>
        </div>
    )
}

export default About
