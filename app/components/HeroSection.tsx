'use client'

import Link from 'next/link'
import { PhoneIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

export function HeroSection() {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-red-50 via-white to-white" />
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <svg className="h-full w-full" width="100%" height="100%">
          <pattern id="heroPattern" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M25,0 L50,25 L25,50 L0,25 Z" fill="currentColor" className="text-red-600"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#heroPattern)" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <Link href="#injury-form" className="inline-flex space-x-6">
              <span className="rounded-full bg-red-600/10 px-3 py-1 text-sm font-semibold leading-6 text-red-600 ring-1 ring-inset ring-red-600/10 animate-fade-in">
                Free Consultation
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium text-gray-600 animate-fade-in">
                <span>No Win, No Fee</span>
                <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          </div>

          <div className="animate-fade-in-up">
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Injured in an Accident? <span className="text-red-600">Get the Help You Deserve—Fast.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Car accidents, slip and falls, workplace injuries—we fight for Central Texans 
              to get the compensation they deserve. Free consultation, no win no fee.
            </p>
          </div>

          {/* Primary CTA - Phone Number */}
          <div className="mt-10 flex flex-col gap-4">
            <a
              href="tel:512-543-7777"
              className="group relative rounded-full bg-red-600 px-8 py-4 text-xl font-bold text-white shadow-lg hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 transition-all duration-200 animate-fade-in-up"
            >
              <span className="flex items-center justify-center">
                <PhoneIcon className="mr-3 h-6 w-6" />
                Call 512-543-7777 NOW
                <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
            
            <Link
              href="#injury-form"
              className="group relative rounded-full bg-gray-900 px-8 py-4 text-xl font-semibold text-white shadow-lg hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 transition-all duration-200 animate-fade-in-up"
            >
              <span className="flex items-center justify-center">
                Submit My Case
                <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 animate-fade-in-up">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="mr-2 h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Millions Recovered
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="mr-2 h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Central Texas Focus
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <svg className="mr-2 h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              24/7 Response
            </div>
          </div>

          {/* Geographic targeting */}
          <div className="mt-8 animate-fade-in-up">
            <p className="text-sm text-gray-500">
              Serving Austin, Waco, San Marcos, Round Rock, Georgetown, Cedar Park, 
              Kyle, Buda, New Braunfels, and all of Central Texas
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32 animate-fade-in-scale">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="relative rounded-xl shadow-2xl ring-1 ring-gray-400/10 overflow-hidden">
              <img
                src="/hero-injury.jpg"
                alt="Personal injury lawyer helping client"
                className="w-[76rem] rounded-xl bg-gray-50 object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out 0.2s both;
        }

        .animate-fade-in-scale {
          animation: fadeInScale 0.5s ease-out 0.3s both;
        }
      `}</style>
    </div>
  )
}