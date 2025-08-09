'use client'

export function TrustIndicators() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Thousands of Central Texans
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            We've helped injury victims recover millions in compensation across Central Texas
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 sm:mt-20 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4">
          {/* Trust Badge 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-4">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">No Win, No Fee</h3>
            <p className="mt-2 text-sm text-gray-600">
              You don't pay unless we win your case
            </p>
          </div>

          {/* Trust Badge 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-4">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Free Consultation</h3>
            <p className="mt-2 text-sm text-gray-600">
              Get expert legal advice at no cost
            </p>
          </div>

          {/* Trust Badge 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-4">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Local Expertise</h3>
            <p className="mt-2 text-sm text-gray-600">
              Central Texas focused legal team
            </p>
          </div>

          {/* Trust Badge 4 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mb-4">
              <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">24/7 Response</h3>
            <p className="mt-2 text-sm text-gray-600">
              Available when you need us most
            </p>
          </div>
        </div>

        {/* Awards and Recognition */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">
              Awards & Recognition
            </h3>
            <p className="mt-4 text-lg text-gray-600">
              Recognized for excellence in personal injury law
            </p>
          </div>
          
          <div className="mx-auto mt-12 grid max-w-lg grid-cols-1 gap-8 sm:max-w-none sm:grid-cols-3">
            {/* Award 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">AVVO Rating</h4>
              <p className="mt-2 text-sm text-gray-600">
                Superb 10.0 Rating
              </p>
            </div>

            {/* Award 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Google Reviews</h4>
              <p className="mt-2 text-sm text-gray-600">
                4.9/5 Stars (500+ Reviews)
              </p>
            </div>

            {/* Award 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Board Certified</h4>
              <p className="mt-2 text-sm text-gray-600">
                Personal Injury Trial Law
              </p>
            </div>
          </div>
        </div>

        {/* Urgency Section */}
        <div className="mt-16 bg-red-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            ⚠️ Time is Running Out
          </h3>
          <p className="text-lg mb-6">
            Texas has strict deadlines for filing personal injury claims. 
            Don't wait until it's too late to get the compensation you deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+15128597776"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-lg font-semibold text-red-600 shadow-lg hover:bg-gray-100 transition-colors"
            >
              Call (512) 859 7776 NOW
            </a>
            <a
              href="#injury-form"
              className="inline-flex items-center justify-center rounded-full bg-transparent px-8 py-3 text-lg font-semibold text-white border-2 border-white hover:bg-white hover:text-red-600 transition-colors"
            >
              Submit My Case
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

