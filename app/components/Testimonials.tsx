import { StarIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

const testimonials = [
  {
    body: 'After my car accident, I was overwhelmed with medical bills. Central Texas Hurt fought hard for my case and got me the compensation I deserved. They really care about their clients.',
    author: {
      name: 'Maria Santos',
      location: 'Austin, TX',
      imageUrl: '/testimonial-1.jpg',
    },
    rating: 5,
  },
  {
    body: 'I slipped and fell at a restaurant and was seriously injured. The team at Central Texas Hurt handled everything professionally and got me a great settlement. Highly recommend!',
    author: {
      name: 'James Thompson',
      location: 'Waco, TX',
      imageUrl: '/testimonial-2.jpg',
    },
    rating: 5,
  },
  {
    body: 'Workplace accident left me unable to work. Central Texas Hurt helped me navigate the complex legal process and got me the compensation I needed to support my family.',
    author: {
      name: 'Jennifer Lopez',
      location: 'San Marcos, TX',
      imageUrl: '/testimonial-3.jpg',
    },
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-red-600">Client Success Stories</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Central Texans
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Real clients, real results. See how we've helped injury victims across Central Texas.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mt-20 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.author.name} className="flex flex-col justify-between bg-gray-50 p-8 ring-1 ring-gray-200 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                ))}
              </div>
              <div className="mt-6 flex-1">
                <p className="text-lg leading-8 text-gray-600">{testimonial.body}</p>
              </div>
              <div className="mt-6 flex items-center gap-x-4">
                <Image className="h-10 w-10 rounded-full bg-gray-50" src={testimonial.author.imageUrl} alt="" width={40} height={40} />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
                  <div className="text-sm leading-6 text-gray-600">{testimonial.author.location}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* Call to action after testimonials */}
        <div className="mt-16 text-center">
          <div className="bg-red-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Get the Compensation You Deserve?
            </h3>
            <p className="text-lg mb-6">
              Join thousands of Central Texans who have trusted us with their injury cases.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:512-543-7777"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-lg font-semibold text-red-600 shadow-lg hover:bg-gray-100 transition-colors"
              >
                Call 512-543-7777 NOW
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
      </div>
    </div>
  )
} 