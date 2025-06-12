import { StarIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'

const testimonials = [
  {
    body: 'Got my roof quote in under a minute and the estimate was spot on. The local contractor they connected me with did an amazing job!',
    author: {
      name: 'Sarah Thompson',
      location: 'Dallas, TX',
      imageUrl: '/testimonial-1.jpg',
    },
    rating: 5,
  },
  {
    body: 'So much easier than calling multiple contractors. The online process was quick and the quote was very detailed. Highly recommend!',
    author: {
      name: 'Michael Rodriguez',
      location: 'Phoenix, AZ',
      imageUrl: '/testimonial-2.jpg',
    },
    rating: 5,
  },
  {
    body: 'Saved me hours of time getting quotes. The contractor they matched me with was professional and completed the job on budget.',
    author: {
      name: 'Jennifer Chen',
      location: 'Seattle, WA',
      imageUrl: '/testimonial-3.jpg',
    },
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-lg font-semibold leading-8 tracking-tight text-primary-600">Testimonials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by Homeowners Across America
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mt-20 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.author.name} className="flex flex-col justify-between bg-white p-8 ring-1 ring-gray-200 rounded-2xl">
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
      </div>
    </div>
  )
} 