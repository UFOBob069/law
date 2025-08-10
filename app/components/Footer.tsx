const navigation = {
  main: [
    { name: 'About Us', href: '#' },
    { name: 'Practice Areas', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Contact', href: 'tel:+15128597776' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      ),
    },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        {/* Contact Information */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">Central Texas Hurt</h3>
          <p className="text-lg mb-4">Personal Injury Lawyers</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="tel:+15128597776"
              className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-lg font-semibold text-white shadow-lg hover:bg-red-500 transition-colors"
            >
              Call (512) 859 7776
            </a>
            <p className="text-gray-300">Available 24/7 for Emergency Cases</p>
          </div>
        </div>

        {/* Practice Areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h4 className="text-lg font-semibold mb-4">Practice Areas</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Car Accidents</li>
              <li>Slip & Fall</li>
              <li>Workplace Injuries</li>
              <li>Medical Malpractice</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Areas We Serve</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Austin</li>
              <li>Waco</li>
              <li>San Marcos</li>
              <li>Round Rock</li>
              <li>Georgetown</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Why Choose Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li>No Win, No Fee</li>
              <li>Free Consultation</li>
              <li>Local Expertise</li>
              <li>24/7 Response</li>
              <li>Se Habla Español</li>
            </ul>
          </div>
        </div>

        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white">
                {item.name}
              </a>
            </div>
          ))}
        </nav>

        <div className="mt-10 flex justify-center space-x-10">
          {navigation.social.map((item) => (
            <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} Central Texas Hurt. All rights reserved.
          </p>
          <p className="mt-4 text-xs leading-5 text-gray-400 max-w-4xl mx-auto">
            Disclaimer: The information on this website is for general information purposes only. Nothing on this site should be taken as legal advice for any individual case or situation. 
            This information is not intended to create, and receipt or viewing does not constitute, an attorney-client relationship. 
            Past results do not guarantee future outcomes. Each case is unique and results depend on the specific facts and circumstances.
          </p>
          <p className="mt-2 text-xs leading-5 text-gray-400">
            Attorney Advertising. This website is designed for general information only.
          </p>
        </div>
      </div>
    </footer>
  )
} 