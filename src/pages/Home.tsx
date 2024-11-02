import { ArrowRight, Package2, Shield, Star } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Moving Made Simple, <span className="text-blue-600">Matched</span> with Care
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Connect with verified professional movers in your area. Get competitive bids and move with confidence.
              </p>
              <div className="flex gap-4">
                <Link to="/signup">
                  <Button size="lg">
                    Plan Your Move
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="outline" size="lg">
                    Join as a Mover
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1603796846097-bee99e4a601f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Moving day"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MoveMatch?</h2>
            <p className="text-xl text-gray-600">We make your moving experience seamless and stress-free</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verified Movers',
                description: 'All movers are thoroughly vetted and verified for your peace of mind',
              },
              {
                icon: Star,
                title: 'Competitive Pricing',
                description: 'Get multiple bids from professional movers to find the best value',
              },
              {
                icon: Package2,
                title: 'Full Transparency',
                description: 'Track your move details and communicate directly with your mover',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <feature.icon className="h-12 w-12 text-blue-600 mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Move?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers who found their perfect moving match
          </p>
          <Link to="/signup">
            <Button variant="secondary" size="lg">
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}