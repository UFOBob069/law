'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "How accurate is the instant quote?",
    answer: "Our AI-powered instant quotes are based on local market data, material costs, and typical labor rates in your area. While the final price may vary based on specific conditions of your roof, our estimates are typically within 10-15% of the final quote.",
  },
  {
    question: "Do I need to be home for an inspection?",
    answer: "After receiving your instant quote, if you'd like to proceed, a local contractor will schedule an in-person inspection. You'll need to be present for this inspection to discuss specific details and requirements for your project.",
  },
  {
    question: "What types of roofing do you handle?",
    answer: "Our network of contractors handles all types of residential roofing including asphalt shingles, metal roofing, tile, slate, and flat roofs. The instant quote system works best for standard asphalt shingle roofs, but we can provide quotes for any type.",
  },
  {
    question: "How soon can the work begin?",
    answer: "Timeline varies based on contractor availability and weather conditions. Emergency repairs can often be addressed within 24-48 hours. For full replacements, work typically begins within 2-4 weeks after signing the contract.",
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function FAQ() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions</h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                            className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
} 