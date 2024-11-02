import { Truck, ClipboardList, Users, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

const steps = [
  {
    title: 'Create Your Move Request',
    description: 'List your items, specify pickup and delivery locations, and set your preferred dates.',
    icon: ClipboardList,
  },
  {
    title: 'Get Competitive Bids',
    description: 'Receive bids from verified professional movers in your area.',
    icon: Users,
  },
  {
    title: 'Choose Your Mover',
    description: 'Review bids, check mover profiles and ratings, and select the best match.',
    icon: Truck,
  },
  {
    title: 'Coordinate and Move',
    description: 'Communicate directly with your chosen mover and complete your move with confidence.',
    icon: MessageSquare,
  },
];

export function HowItWorks() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How MoveMatch Works
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make moving simple and stress-free by connecting you with verified professional movers
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Safe and Secure Moving Experience
            </h2>
            <ul className="space-y-4">
              {[
                'All movers are thoroughly vetted and verified',
                'Secure messaging and file sharing',
                'Detailed inventory management',
                'Real-time notifications and updates',
                'Rating and review system',
                'Competitive pricing through bidding',
              ].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1600125693229-a0c898d900be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Moving day"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your Move?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied customers who found their perfect moving match
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
            <Link to="/movers">
              <Button variant="secondary">
                Learn More About Moving
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}