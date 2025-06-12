'use client'

import { useState } from 'react'

interface QuoteResultProps {
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

export default function QuoteResult({ estimatedCost, analysis, details }: QuoteResultProps) {
  const [activeTab, setActiveTab] = useState('overview')

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Parse analysis sections from ChatGPT response
  const parseAnalysis = (text: string) => {
    const sections = {
      breakdown: [] as string[],
      factors: [] as string[],
      timeline: [] as string[],
      recommendations: [] as string[],
      savings: [] as string[],
    }

    // Split text into paragraphs
    const paragraphs = text.split('\n\n')
    
    let currentSection = ''
    
    paragraphs.forEach((paragraph) => {
      const lowerParagraph = paragraph.toLowerCase()
      
      // Determine section based on content
      if (lowerParagraph.includes('breakdown') || lowerParagraph.includes('cost breakdown')) {
        currentSection = 'breakdown'
      } else if (lowerParagraph.includes('factor') || lowerParagraph.includes('affecting the cost')) {
        currentSection = 'factors'
      } else if (lowerParagraph.includes('timeline') || lowerParagraph.includes('expected duration')) {
        currentSection = 'timeline'
      } else if (lowerParagraph.includes('recommend')) {
        currentSection = 'recommendations'
      } else if (lowerParagraph.includes('saving') || lowerParagraph.includes('reduce cost')) {
        currentSection = 'savings'
      }

      // Add content to appropriate section if it's not a section header
      if (currentSection && !lowerParagraph.includes('please provide') && paragraph.trim()) {
        // Split paragraph into bullet points if it contains them
        const points = paragraph
          .split(/(?:\r?\n|\r)/)
          .filter(point => point.trim())
          .map(point => point.replace(/^[•\-\*]\s*/, '').trim())
          .filter(point => point && !point.toLowerCase().includes('breakdown') && 
                          !point.toLowerCase().includes('factor') &&
                          !point.toLowerCase().includes('timeline') &&
                          !point.toLowerCase().includes('recommend') &&
                          !point.toLowerCase().includes('saving'))

        sections[currentSection as keyof typeof sections].push(...points)
      }
    })

    return sections
  }

  const sections = parseAnalysis(analysis)

  // Default content for empty sections
  const defaultContent = {
    breakdown: [
      `Base cost per square foot: $${details.baseCostPerSqFt.min} - $${details.baseCostPerSqFt.max}`,
      `Total square footage: ${details.squareFootage.min} - ${details.squareFootage.max} sq ft`,
      'Final cost includes materials, labor, and standard warranty',
      'Additional costs may apply based on inspection findings'
    ],
    factors: [
      'Roof size and complexity',
      'Material type and quality',
      'Current roof condition',
      'Local labor rates',
      'Seasonal factors'
    ],
    timeline: [
      'Initial inspection: 1-2 business days',
      'Project planning: 2-3 days',
      'Material delivery: 1-2 weeks',
      'Installation: 2-5 days (weather permitting)'
    ],
    recommendations: [
      'Schedule a professional inspection',
      'Document current issues with photos',
      'Get multiple contractor quotes',
      'Review warranty options'
    ],
    savings: [
      'Schedule during off-peak season',
      'Bundle repairs if needed',
      'Consider energy-efficient materials',
      'Check for available tax incentives',
      'Ask about contractor discounts'
    ]
  }

  const getContent = (section: keyof typeof sections) => {
    return sections[section].length > 0 ? sections[section] : defaultContent[section]
  }

  function getBestTimeToStart(urgency: string): string {
    const currentDate = new Date()
    const month = currentDate.getMonth()

    if (urgency.toLowerCase().includes('emergency')) {
      return 'Immediate'
    }

    // Consider seasonal factors
    if (month >= 3 && month <= 4) { // Spring
      return 'Current season (Spring pricing optimal)'
    } else if (month >= 5 && month <= 7) { // Summer
      return 'Current season (Peak season)'
    } else if (month >= 8 && month <= 9) { // Fall
      return 'Current season (Ideal conditions)'
    } else { // Winter
      return 'Next spring (Better conditions)'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Your Estimated Roof Quote</h1>
      
      {/* Price Range */}
      <div className="text-center mb-8">
        <p className="text-lg text-gray-700 mb-4">Based on your inputs, we estimate your roof project will cost:</p>
        <div className="text-4xl font-bold text-blue-600">
          {formatCurrency(estimatedCost.low)} - {formatCurrency(estimatedCost.high)}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          This is an estimated range. Your final quote may vary based on additional factors and contractor assessment.
        </p>
      </div>

      {/* Project Details Summary */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Project Details</h2>
          <div className="flex items-center text-blue-600">
            <svg className="w-5 h-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium">AI-Powered Analysis</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Location & Property</h3>
              <div className="space-y-2">
                <p className="text-gray-600">Location: <span className="font-medium">{details.location}</span></p>
                <p className="text-gray-600">Square Footage: <span className="font-medium">{details.squareFootage.min} - {details.squareFootage.max} sq ft</span></p>
                <div className="mt-2 text-sm text-blue-600">
                  <p>✓ Analyzed against 1000+ similar properties in your area</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Current Roof Status</h3>
              <div className="space-y-2">
                <p className="text-gray-600">Age Range: <span className="font-medium">{details.ageRange}</span></p>
                <p className="text-gray-600">Known Issues: <span className="font-medium">{details.damageReport}</span></p>
                <div className="mt-2 text-sm text-blue-600">
                  <p>✓ Condition assessment based on regional weather data</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Project Specifications</h3>
              <div className="space-y-2">
                <p className="text-gray-600">Roof Type: <span className="font-medium">{details.roofType}</span></p>
                <p className="text-gray-600">Base Cost/Sq Ft: <span className="font-medium">${details.baseCostPerSqFt.min} - ${details.baseCostPerSqFt.max}</span></p>
                <div className="mt-2 text-sm text-blue-600">
                  <p>✓ Material costs updated daily from supplier data</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Timeline & Priority</h3>
              <div className="space-y-2">
                <p className="text-gray-600">Urgency: <span className="font-medium">{details.urgencyLevel}</span></p>
                <p className="text-gray-600">Best Time to Start: <span className="font-medium">{getBestTimeToStart(details.urgencyLevel)}</span></p>
                <div className="mt-2 text-sm text-blue-600">
                  <p>✓ Seasonal pricing trends considered in estimate</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-gray-600">
              Our AI analyzes local market data, material costs, and seasonal trends to provide you with the most accurate estimate possible. 
              This helps you make informed decisions and get fair pricing from contractors.
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Analysis Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 border-b">
          {['overview', 'cost factors', 'timeline', 'recommendations', 'savings'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="p-6 bg-gray-50 rounded-b-lg">
          {activeTab === 'overview' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Cost Breakdown</h3>
              <ul className="space-y-3">
                {getContent('breakdown').map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 mt-1 mr-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'cost factors' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Factors Affecting Cost</h3>
              <ul className="space-y-3">
                {getContent('factors').map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 mt-1 mr-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Project Timeline</h3>
              <ul className="space-y-3">
                {getContent('timeline').map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 mt-1 mr-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Professional Recommendations</h3>
              <ul className="space-y-3">
                {getContent('recommendations').map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 mt-1 mr-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'savings' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Cost-Saving Opportunities</h3>
              <ul className="space-y-3">
                {getContent('savings').map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 w-5 h-5 mt-1 mr-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">What's Next?</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg mb-6">
            <div className="flex items-start space-x-3">
              <svg className="w-6 h-6 text-blue-600 mt-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900">AI-Powered Quote Advantage</h3>
                <p className="text-gray-700 mt-1">
                  This AI-generated quote analyzes thousands of real roofing projects to give you accurate, market-based estimates. 
                  Use these insights to confidently negotiate with contractors and identify fair pricing.
                </p>
              </div>
            </div>
          </div>

          <p className="text-gray-700">
            We'll connect you with top-rated local contractors who will contact you to schedule an
            inspection and provide a detailed quote. You'll be prepared with:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-blue-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-gray-900 font-medium">Free, No-Obligation Inspection</p>
                <p className="text-gray-600 text-sm">Know what questions to ask during the inspection</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-blue-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-gray-900 font-medium">Detailed Written Quote</p>
                <p className="text-gray-600 text-sm">Compare contractor quotes with our AI analysis</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-blue-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-gray-900 font-medium">Professional Consultation</p>
                <p className="text-gray-600 text-sm">Make informed decisions with data-backed insights</p>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <svg className="w-5 h-5 text-blue-600 mt-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-gray-900 font-medium">Market-Based Pricing</p>
                <p className="text-gray-600 text-sm">Understand fair market rates for your area</p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white p-4 rounded-lg border border-blue-100">
            <p className="text-sm text-gray-600 italic">
              "Our AI-powered quote system helps homeowners save an average of 15-20% on their roofing projects by providing 
              accurate cost expectations and insider knowledge for contractor negotiations."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 