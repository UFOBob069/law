'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoadingSpinner } from './LoadingSpinner'
import { PhoneIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { saveCaseSubmission, type CaseData } from '@/lib/services/survey'

interface FormData {
  firstName: string
  lastName: string
  phone: string
  injuryDescription: string
  preferredContact: string
  city: string
  accidentType: string
}

export function InjuryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true)
      
      // Save to Firebase
      const caseData: CaseData = {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        injuryDescription: data.injuryDescription,
        preferredContact: data.preferredContact,
        city: data.city,
        accidentType: data.accidentType
      }

      const result = await saveCaseSubmission(caseData)
      
      if (!result.success) {
        console.error('Failed to save to Firebase:', result.error)
        alert('An error occurred. Please try again or call us directly at (512) 859 7776')
        return
      }

      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred. Please try again or call us directly at (512) 859 7776')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="injury-form" className="py-24 bg-gray-50">
        <div className="w-full max-w-4xl mx-auto px-6">
          <div className="bg-white shadow-xl rounded-lg p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              Thank You! We'll Contact You Soon
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              A member of our legal team will review your case and contact you within 24 hours.
            </p>
            <div className="bg-red-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-red-900 mb-2">
                Need Immediate Help?
              </h3>
              <p className="text-red-700 mb-4">
                Call us right now for immediate assistance:
              </p>
              <a
                href="tel:+15128597776"
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-red-500 transition-colors"
              >
                <PhoneIcon className="mr-2 h-5 w-5" />
                Call (512) 859 7776 NOW
              </a>
            </div>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-red-600 hover:text-red-500 font-semibold"
            >
              Submit Another Case
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="injury-form" className="py-24 bg-gray-50">
      <div className="w-full max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Get Your Free Case Evaluation
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Tell us about your injury and we'll get back to you within 24 hours.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            🔒 Your information is confidential and secure • Se Habla Español
          </p>
        </div>
        
        <div className="bg-white shadow-xl rounded-lg p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name *
                </label>
                <input
                  type="text"
                  {...register('firstName', { required: 'First name is required' })}
                  className="mt-2 block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  placeholder="Your first name"
                />
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name *
                </label>
                <input
                  type="text"
                  {...register('lastName', { required: 'Last name is required' })}
                  className="mt-2 block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                  placeholder="Your last name"
                />
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number *
              </label>
              <input
                type="tel"
                {...register('phone', { 
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[\+]?[1-9][\d]{0,15}$/,
                    message: 'Please enter a valid phone number'
                  }
                })}
                className="mt-2 block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                placeholder="(512) 859 7776"
              />
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City *
              </label>
              <input
                type="text"
                {...register('city', { required: 'City is required' })}
                className="mt-2 block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                placeholder="Austin, Waco, San Marcos, etc."
              />
              {errors.city && (
                <p className="mt-2 text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>

            {/* Accident Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Type of Accident *
              </label>
              <select
                {...register('accidentType', { required: 'Please select accident type' })}
                className="mt-2 block w-full rounded-md border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6"
              >
                <option value="">Select accident type</option>
                <option value="car-accident">Car Accident</option>
                <option value="slip-fall">Slip and Fall</option>
                <option value="workplace">Workplace Accident</option>
                <option value="medical-malpractice">Medical Malpractice</option>
                <option value="product-liability">Product Liability</option>
                <option value="dog-bite">Dog Bite</option>
                <option value="other">Other</option>
              </select>
              {errors.accidentType && (
                <p className="mt-2 text-sm text-red-600">{errors.accidentType.message}</p>
              )}
            </div>

            {/* Injury Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Brief Description of Injury *
              </label>
              <textarea
                {...register('injuryDescription', { 
                  required: 'Please describe your injury',
                  minLength: {
                    value: 10,
                    message: 'Please provide more details about your injury'
                  }
                })}
                rows={4}
                className="mt-2 block w-full rounded-md border-0 py-3 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                placeholder="Describe what happened and your injuries..."
              />
              {errors.injuryDescription && (
                <p className="mt-2 text-sm text-red-600">{errors.injuryDescription.message}</p>
              )}
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Preferred Contact Method *
              </label>
              <div className="mt-2 space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    value="call"
                    {...register('preferredContact', { required: 'Please select preferred contact method' })}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Phone Call
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    value="text"
                    {...register('preferredContact', { required: 'Please select preferred contact method' })}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
                  />
                  <label className="ml-3 block text-sm font-medium text-gray-700">
                    Text Message
                  </label>
                </div>
              </div>
              {errors.preferredContact && (
                <p className="mt-2 text-sm text-red-600">{errors.preferredContact.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto rounded-full bg-red-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:opacity-50 transition-all duration-200"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner className="w-5 h-5 mr-2" />
                    Submitting...
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    Submit My Case
                    <ArrowRightIcon className="ml-2 h-5 w-5" />
                  </span>
                )}
              </button>
              
              <a
                href="tel:+15128597776"
                className="w-full sm:w-auto rounded-full bg-gray-900 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 transition-all duration-200"
              >
                <span className="flex items-center justify-center">
                  <PhoneIcon className="mr-2 h-5 w-5" />
                  Call (512) 859 7776
                </span>
              </a>
            </div>
          </form>
        </div>

        {/* Trust indicators below form */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="space-y-8">
            <div className="text-center">
              <div className="text-yellow-400 text-xl mb-2">⭐⭐⭐⭐⭐</div>
              <p className="italic text-lg text-gray-800">"They fought hard for my case and got me the compensation I deserved after my car accident."</p>
              <div className="mt-2 text-sm text-gray-500">— Maria S., Austin</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 text-xl mb-2">⭐⭐⭐⭐⭐</div>
              <p className="italic text-lg text-gray-800">"Professional, caring, and they really know Central Texas law. Highly recommend!"</p>
              <div className="mt-2 text-sm text-gray-500">— James T., Waco</div>
            </div>
            <div className="text-center">
              <div className="text-yellow-400 text-xl mb-2">⭐⭐⭐⭐⭐</div>
              <p className="italic text-lg text-gray-800">"No win, no fee meant I had nothing to lose. They won my case and changed my life."</p>
              <div className="mt-2 text-sm text-gray-500">— Sarah L., San Marcos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
