import { ClockIcon, ShieldCheckIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'

const benefits = [
  {
    name: '60-Second Quote',
    description: 'Get an instant estimate for your roof project in just one minute. No waiting, no hassle.',
    icon: ClockIcon,
  },
  {
    name: 'Trusted Local Roofers',
    description: 'Connect with pre-screened, licensed roofing contractors in your area. All contractors are fully insured.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Transparent Pricing',
    description: 'Get clear, upfront pricing based on your roof size and requirements. No hidden fees or surprises.',
    icon: CurrencyDollarIcon,
  },
]

export function Benefits() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600">Why Choose Us</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for your roofing project
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We make it easy to get a fair, accurate quote for your roof repair or replacement. No sales calls, no pressure - just the information you need.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <benefit.icon className="h-5 w-5 flex-none text-primary-600" aria-hidden="true" />
                  {benefit.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{benefit.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
} 