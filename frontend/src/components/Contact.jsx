// Contact.jsx
import React from "react";

const Contact = () => {
    return (
        <section className="bg-white py-16 px-6 md:px-20">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">Contact Us</h2>

                <form className="bg-gray-50 p-8 rounded-lg shadow-md">
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2 font-medium">Name</label>
                        <input
                            type="text"
                            placeholder="Your name"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2 font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="Your email"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2 font-medium">Message</label>
                        <textarea
                            rows="4"
                            placeholder="Your message"
                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Send Message
                    </button>
                </form>

                <div className="text-center mt-8">
                    <p className="text-gray-700">Or reach out via:</p>
                    <p className="mt-2 text-indigo-600 font-medium">support@shopease.com</p>
                    <p className="text-gray-600">+1 (234) 567-890</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
