import { Link } from 'react-router-dom';
import { Button } from './Button';
import { Truck } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Truck className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">MoveMatch</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/how-it-works" className="text-gray-600 hover:text-gray-900">
              How it Works
            </Link>
            <Link to="/movers" className="text-gray-600 hover:text-gray-900">
              For Movers
            </Link>
            <Link to="/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="sm">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}