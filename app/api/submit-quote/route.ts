import { NextResponse } from 'next/server'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Add this to your .env.local file
})

// Helper function to calculate base cost per square foot based on roof type
function getBaseCostPerSqFt(roofStyle: string) {
  const costs = {
    asphalt: { min: 3.5, max: 5.5 },
    metal: { min: 8.0, max: 12.0 },
    tile: { min: 10.0, max: 15.0 },
    flat: { min: 5.0, max: 7.0 },
    other: { min: 6.0, max: 9.0 }
  }
  return costs[roofStyle as keyof typeof costs] || costs.asphalt
}

// Helper function to get square footage from range
function getSquareFootage(range: string) {
  const ranges = {
    'under-1000': { min: 800, max: 1000 },
    '1000-1500': { min: 1000, max: 1500 },
    '1500-2000': { min: 1500, max: 2000 },
    '2000-2500': { min: 2000, max: 2500 },
    '2500-3000': { min: 2500, max: 3000 },
    'over-3000': { min: 3000, max: 4000 },
    'unknown': { min: 1800, max: 2200 } // Average home size
  }
  return ranges[range as keyof typeof ranges] || ranges.unknown
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Extract relevant data
    const {
      roofAge,
      squareFootage,
      roofStyle,
      knownDamage,
      urgency,
      address,
      city,
      state
    } = data

    // Calculate base estimates
    const sqFtRange = getSquareFootage(squareFootage)
    const baseCost = getBaseCostPerSqFt(roofStyle)
    
    // Calculate rough estimate ranges
    const lowEstimate = Math.round(sqFtRange.min * baseCost.min)
    const highEstimate = Math.round(sqFtRange.max * baseCost.max)

    // Generate detailed analysis with ChatGPT
    const prompt = `As a professional roofing expert providing a quote analysis for a homeowner in ${city}, ${state}, please provide a detailed breakdown for their roof project:

Location Context:
- Property Location: ${city}, ${state}
- Local Market: Consider ${state}'s specific building codes and regional requirements
- Weather Considerations: Account for typical weather patterns in ${city}
- Labor Market: Based on current ${state} contractor rates

Project Specifications:
- Age: ${roofAge}
- Square Footage Range: ${squareFootage}
- Roof Type: ${roofStyle}
- Known Issues: ${knownDamage}
- Project Urgency: ${urgency}

Base Estimate Range: $${lowEstimate.toLocaleString()} - $${highEstimate.toLocaleString()}

Please provide a comprehensive analysis including:

1. Cost Breakdown
- Break down the estimate for ${city} homeowners
- Include local material and labor costs
- Factor in ${state} permit requirements
- Consider regional safety requirements

2. Cost Factors
- Explain key cost variables for ${city} area
- Detail how local weather impacts materials choice
- Include ${state}-specific code requirements
- Note any regional price trends

3. Timeline Expectations
- Account for typical ${city} weather patterns
- Consider local permit processing times
- Factor in regional contractor availability
- Include seasonal considerations for ${state}

4. Professional Recommendations
- Provide ${state}-specific material recommendations
- Suggest timing based on local weather patterns
- Include regional safety considerations
- Note any local building code requirements

5. Cost-Saving Opportunities
- Identify ${state} tax incentives or rebates
- Suggest seasonal timing for best local rates
- Note any regional material cost savings
- Mention local contractor negotiation tips

Format the response in a clear, professional manner that a homeowner can understand, with specific references to ${city}, ${state} where relevant to make the analysis feel personalized to their location.`

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
      temperature: 0.7,
      max_tokens: 1500 // Increased token limit for more detailed response
    })

    const analysis = completion.choices[0].message.content

    // Structure the response
    return NextResponse.json({
      success: true,
      message: 'Quote generated successfully',
      estimatedCost: {
        low: lowEstimate,
        high: highEstimate
      },
      analysis: analysis,
      details: {
        squareFootage: sqFtRange,
        baseCostPerSqFt: baseCost,
        location: `${city}, ${state}`,
        roofType: roofStyle,
        ageRange: roofAge,
        damageReport: knownDamage,
        urgencyLevel: urgency
      }
    })

  } catch (error) {
    console.error('Error processing quote request:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to process quote request',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 