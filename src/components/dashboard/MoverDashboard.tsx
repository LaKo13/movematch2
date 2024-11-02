import { DollarSign, Package2, CheckCircle, Search } from 'lucide-react';
import { Button } from '../Button';

export function MoverDashboard() {
  const availableMoves = [
    {
      id: 1,
      pickupDate: '2024-04-15',
      pickupLocation: 'San Francisco, CA',
      dropoffLocation: 'Los Angeles, CA',
      items: 12,
      distance: '383 miles',
    },
    {
      id: 2,
      pickupDate: '2024-04-20',
      pickupLocation: 'Seattle, WA',
      dropoffLocation: 'Portland, OR',
      items: 8,
      distance: '174 miles',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Mover Dashboard</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">5</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Active Bids</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Package2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">3</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Upcoming Moves</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">12</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Completed Moves</h3>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Available Moves</h2>
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search by location..."
              />
            </div>
          </div>
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {availableMoves.map((move) => (
                <li key={move.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-blue-600 truncate">
                        {move.pickupLocation} → {move.dropoffLocation}
                      </p>
                      <div className="mt-2 flex items-center text-sm text-gray-500 space-x-4">
                        <span>Pickup: {new Date(move.pickupDate).toLocaleDateString()}</span>
                        <span>{move.distance}</span>
                        <span>{move.items} items</span>
                      </div>
                    </div>
                    <Button>View Details</Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}