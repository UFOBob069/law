'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const faqs = [
  {
    question: "What does 'no win, no fee' mean?",
    answer: "It means you don't pay any attorney fees unless we win your case. If we don't recover compensation for you, you owe us nothing. We only get paid when you get paid. This allows injury victims to pursue justice without worrying about upfront legal costs.",
  },
  {
    question: "How much does a consultation cost?",
    answer: "Your initial consultation is completely free. We'll review your case, explain your legal options, and answer all your questions at no cost. There's no obligation to hire us after the consultation.",
  },
  {
    question: "How long do I have to file a personal injury claim in Texas?",
    answer: "In Texas, you generally have 2 years from the date of your injury to file a personal injury lawsuit. However, some cases have shorter deadlines, and it's best to contact us as soon as possible to preserve evidence and witness testimony.",
  },
  {
    question: "What types of injuries do you handle?",
    answer: "We handle all types of personal injury cases including car accidents, slip and falls, workplace accidents, medical malpractice, product liability, dog bites, and more. If you've been injured due to someone else's negligence, we can help.",
  },
  {
    question: "How much compensation can I expect?",
    answer: "Compensation varies based on the severity of your injuries, medical expenses, lost wages, pain and suffering, and other factors. We'll evaluate your specific case and fight for the maximum compensation you deserve.",
  },
  {
    question: "Do I need to go to court?",
    answer: "Most personal injury cases settle out of court. However, if the insurance company refuses to offer fair compensation, we're prepared to take your case to trial. We have extensive trial experience and will fight for your rights in court if necessary.",
  },
  {
    question: "What areas do you serve?",
    answer: "We serve all of Central Texas including Austin, Waco, San Marcos, Round Rock, Georgetown, Cedar Park, Kyle, Buda, New Braunfels, and surrounding areas. We're local attorneys who understand Central Texas law and courts.",
  },
  {
    question: "How long does a personal injury case take?",
    answer: "Simple cases can settle in a few months, while complex cases may take 1-2 years. We work to resolve your case as quickly as possible while ensuring you receive full and fair compensation. We'll keep you updated throughout the process.",
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function FAQ() {
  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold leading-10 tracking-tight text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Get answers to common questions about personal injury cases
            </p>
          </div>
          
          <div className="divide-y divide-gray-900/10">
            <dl className="space-y-6 divide-y divide-gray-900/10">
              {faqs.map((faq) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt>
                        <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                          <span className="text-lg font-semibold leading-7">{faq.question}</span>
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
          
          {/* Call to action after FAQ */}
          <div className="mt-16 text-center">
            <div className="bg-red-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">
                Still Have Questions?
              </h3>
              <p className="text-lg mb-6">
                Our legal team is here to help. Get your free consultation today.
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
    </div>
  )
} 