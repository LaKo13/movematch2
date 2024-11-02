import { DollarSign, Calendar, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

const benefits = [
  {
    title: 'Flexible Schedule',
    description: 'Choose jobs that fit your schedule and capacity. Work when you want.',
    icon: Calendar,
  },
  {
    title: 'Competitive Earnings',
    description: 'Set your own rates and bid on jobs that match your expertise.',
    icon: DollarSign,
  },
  {
    title: 'Local & Long Distance',
    description: 'Access jobs in your area and beyond, expanding your business reach.',
    icon: MapPin,
  },
  {
    title: 'Build Your Reputation',
    description: 'Earn reviews and ratings to showcase your quality service.',
    icon: Star,
  },
];

export function ForMovers() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Grow Your Moving Business with MoveMatch
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join our network of professional movers and connect with customers looking for quality moving services.
            </p>
            <div className="flex gap-4">
              <Link to="/signup">
                <Button>Join as a Mover</Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary">Sign In</Button>
              </Link>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1600125693429-cf4b4d8e82c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Professional movers"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Partner with MoveMatch?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-4">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Create Your Profile',
                description:
                  'Sign up and complete your business profile with licenses, insurance, and company details.',
              },
              {
                step: '2',
                title: 'Browse & Bid on Jobs',
                description:
                  'Access move requests in your area and submit competitive bids to potential customers.',
              },
              {
                step: '3',
                title: 'Complete Moves & Earn',
                description:
                  'Coordinate with customers, complete moves, and build your reputation through reviews.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white text-xl font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-blue-600 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join our network of professional movers and start receiving job requests today
          </p>
          <Link to="/signup">
            <Button variant="secondary">Get Started Now</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}