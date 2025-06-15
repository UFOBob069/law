'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoadingSpinner } from './LoadingSpinner'
import QuoteResult from './QuoteResult'
import { saveSurveyResponse, type SurveyData } from '@/lib/services/survey'

interface FormData {
  roofAge: string
  squareFootage: string
  roofStyle: string
  knownDamage: string
  urgency: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
}

interface QuoteResponse {
  success: boolean
  message: string
  estimatedCost: {
    low: number
    high: number
  }
  analysis: string
  details: {
    squareFootage: { min: number, max: number }
    baseCostPerSqFt: { min: number, max: number }
    location: string
    roofType: string
    ageRange: string
    damageReport: string
    urgencyLevel: string
  }
}

export function QuoteForm() {
  const [step, setStep] = useState(1)
  const [showQuote, setShowQuote] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [quoteResponse, setQuoteResponse] = useState<QuoteResponse | null>(null)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true)
      
      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      
      if (result.success) {
        // Save to Firebase
        const surveyData: SurveyData = {
          ...data,
          estimatedCost: result.estimatedCost,
          aiAnalysis: result.analysis
        }

        const firebaseResult = await saveSurveyResponse(surveyData)
        
        if (!firebaseResult.success) {
          console.error('Failed to save to Firebase:', firebaseResult.error)
        }

        setQuoteResponse(result)
        setShowQuote(true)
      } else {
        alert('Failed to get quote. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (showQuote && quoteResponse) {
    return <QuoteResult {...quoteResponse} />
  }

  return (
    <section id="quote-form" className="py-24 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto px-6">
        {step === 1 && (
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              🏠 Get Your Roof Estimate — Takes 60 Seconds
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Answer a few questions to receive your free quote instantly.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              🔒 Trusted by 10,000+ homeowners
            </p>
          </div>
        )}
        <div className="bg-white shadow-xl rounded-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    How old is your roof?
                  </label>
                  <select
                    {...register('roofAge', { required: true })}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select age range</option>
                    <option value="0-5">0-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10-15">10-15 years</option>
                    <option value="15-20">15-20 years</option>
                    <option value="20+">20+ years</option>
                    <option value="unknown">I don't know</option>
                  </select>
                  {errors.roofAge && (
                    <p className="mt-2 text-sm text-red-600">Please select the age of your roof</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    What is your roof&apos;s approximate square footage?
                  </label>
                  <select
                    {...register('squareFootage', { required: true })}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select square footage</option>
                    <option value="under-1000">Under 1,000 sq ft</option>
                    <option value="1000-1500">1,000 - 1,500 sq ft</option>
                    <option value="1500-2000">1,500 - 2,000 sq ft</option>
                    <option value="2000-2500">2,000 - 2,500 sq ft</option>
                    <option value="2500-3000">2,500 - 3,000 sq ft</option>
                    <option value="over-3000">Over 3,000 sq ft</option>
                    <option value="unknown">I don't know</option>
                  </select>
                  {errors.squareFootage && (
                    <p className="mt-2 text-sm text-red-600">Please select your roof's square footage</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    What type of roof do you have?
                  </label>
                  <select
                    {...register('roofStyle', { required: true })}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select roof type</option>
                    <option value="asphalt">Asphalt Shingles</option>
                    <option value="metal">Metal Roof</option>
                    <option value="tile">Tile Roof</option>
                    <option value="flat">Flat/Low Slope</option>
                    <option value="other">Other/Not Sure</option>
                  </select>
                  {errors.roofStyle && (
                    <p className="mt-2 text-sm text-red-600">Please select your roof type</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Any known damage or issues?
                  </label>
                  <select
                    {...register('knownDamage', { required: true })}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select damage type</option>
                    <option value="leaks">Active Leaks</option>
                    <option value="missing-shingles">Missing/Damaged Shingles</option>
                    <option value="storm-damage">Storm Damage</option>
                    <option value="sagging">Sagging/Structural Issues</option>
                    <option value="none">No Known Issues</option>
                    <option value="other">Other Issues</option>
                  </select>
                  {errors.knownDamage && (
                    <p className="mt-2 text-sm text-red-600">Please select any known issues</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    How urgent is your roofing need?
                  </label>
                  <select
                    {...register('urgency', { required: true })}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select urgency</option>
                    <option value="emergency">Emergency - Need Immediate Help</option>
                    <option value="soon">Need Service Within 1 Month</option>
                    <option value="planning">Planning for Next 2-3 Months</option>
                    <option value="future">Future Project (3+ Months)</option>
                    <option value="researching">Just Researching</option>
                  </select>
                  {errors.urgency && (
                    <p className="mt-2 text-sm text-red-600">Please select your urgency level</p>
                  )}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="rounded-md bg-primary-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                  >
                    See My Free Roof Estimate
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    🏠 You&apos;re Almost Done — Get Your Custom Roof Quote Now
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-gray-600">
                    Enter your details to receive your AI-powered estimate and connect with top-rated roofers near you.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      {...register('firstName', { required: true })}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                    {errors.firstName && (
                      <p className="mt-2 text-sm text-red-600">First name is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      {...register('lastName', { required: true })}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                    {errors.lastName && (
                      <p className="mt-2 text-sm text-red-600">Last name is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      {...register('email', { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">Valid email is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      {...register('phone', { required: true })}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                    {errors.phone && (
                      <p className="mt-2 text-sm text-red-600">Phone number is required</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    {...register('address', { required: true })}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                  />
                  {errors.address && (
                    <p className="mt-2 text-sm text-red-600">Address is required</p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      type="text"
                      {...register('city', { required: true })}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                    {errors.city && (
                      <p className="mt-2 text-sm text-red-600">City is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      State
                    </label>
                    <input
                      type="text"
                      {...register('state', { required: true })}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                    {errors.state && (
                      <p className="mt-2 text-sm text-red-600">State is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      {...register('zipCode', { required: true })}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                    {errors.zipCode && (
                      <p className="mt-2 text-sm text-red-600">ZIP code is required</p>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-8">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-md bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <LoadingSpinner className="w-4 h-4 mr-2" />
                        Getting Quote...
                      </div>
                    ) : (
                      '🚀 Get My Instant Quote'
                    )}
                  </button>
                </div>
                <p className="text-center text-sm text-gray-500 mt-4">
                  🔒 Secure & confidential
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
} 