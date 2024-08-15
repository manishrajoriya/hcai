"use client"
import { UserButton } from '@clerk/nextjs';
import React from 'react'
import Link from 'next/link'
import { link } from 'fs';

const LandingPage: React.FC = () => {


  return (
    <div className="font-sans leading-relaxed">
      {/* Header Section */}
      <header className="bg-blue-500 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">AspectAI</h1>
        <p className="mt-4 text-xl">Smart Image Transformation & Cropping Powered by AI</p>
        <button className="mt-6 px-6 py-2 bg-white text-blue-500 rounded-full text-lg font-semibold shadow-lg hover:bg-blue-100">
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-800 text-center">
        <h2 className="text-3xl font-semibold mb-12">Why Choose AspectAI?</h2>
        <div className="flex flex-wrap justify-around">
          <div className="max-w-xs mb-8">
            
            <h3 className="mt-6 text-xl font-medium">Intelligent Cropping</h3>
            <p className="mt-2 text-gray-600">Automatically crop images to the perfect aspect ratio for any platform.</p>
            
            <Link href="/social-share">
              <button className='px-8 py-3 bg-blue-500 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-blue-600'>Try It Now</button>
            </Link>
            
          </div>
          <div className="max-w-xs mb-8">

            <h3 className="mt-6 text-xl font-medium">Dynamic Transformation</h3>
            <p className="mt-2 text-gray-600">Transform your images with AI-driven adjustments that maintain quality and clarity.</p>
            <Link href="/video-upload">
              <button className='px-8 py-3 bg-blue-500 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-blue-600'>Try It Now</button>
            </Link>
          </div>
          <div className="max-w-xs mb-8">
            <img src="/path/to/feature3.png" alt="Feature 3" className="mx-auto w-24 h-24" />
            <h3 className="mt-6 text-xl font-medium">Seamless Integration</h3>
            <p className="mt-2 text-gray-600">Easily integrate AspectAI with your existing workflows and tools.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">Ready to Transform Your Images?</h2>
        <p className="text-lg text-gray-700 mb-8">Sign up now and experience the power of AI-driven image cropping and transformation.</p>
        <button className="px-8 py-3 bg-blue-500 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-blue-600">
          Get Started Today
        </button>
      </section>

      {/* Footer Section */}
      <footer className="py-6 bg-gray-800 text-white text-center">
        <p>&copy; 2024 AspectAI. All rights reserved.</p>
        
      </footer>
      <UserButton/>
    </div>
  );
}

export default LandingPage;
