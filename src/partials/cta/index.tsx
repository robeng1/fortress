import { BriefcaseIcon, CurrencyDollarIcon, TagIcon } from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'



type CTAProps = {
  noProducts: boolean
  noRates: boolean
  noTheme: boolean
}
const CTAs: React.FC<CTAProps> = ({ noProducts, noRates, noTheme }) => {
  const navigate = useNavigate()
  const features = [
    {
      name: 'Add Products',
      description:
        'You have not added any products yet. Add products to get started',
      icon: TagIcon,
      link: '/shop/products/new',
      key: "product",
      show: noProducts
    },
    {
      name: 'Add Rates',
      description:
        `You have not set up delivery fees yet. Defaults to GHS10 per order. Setup rates for different regions & cities`,
      icon: CurrencyDollarIcon,
      link: '/settings/shipping',
      key: "rate",
      show: noRates,
    },
    {
      name: 'Customize Theme',
      description:
        'Cuztomise and change default banner images on your website',
      icon: BriefcaseIcon,
      link: '/settings/theme',
      key: "theme",
      show: noTheme
    },
  ]
  return (
    <>
      {(noProducts || noRates || noTheme) && <div className="py-12 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Setup</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Let's get you setup asap!
            </p>
          </div>

          <div className="mt-10 cursor-pointer bg-white shadow-md py-12 px-4 sm:px-6 lg:px-8">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <>
                  {feature.show && <div key={feature.key} className="relative px-2">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-purple-500 text-white">
                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <button onClick={()=> navigate(feature.link)} className="ml-16 text-lg leading-6 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{feature.name}</button>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                  </div>}
                </>
              ))}
            </dl>
          </div>
        </div>
      </div>}
    </>
  )
}
export default CTAs;
