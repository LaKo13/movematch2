import { Plus, Package2, Clock, CheckCircle } from 'lucide-react';
import { Button } from '../Button';
import { Link } from 'react-router-dom';

export function CustomerDashboard() {
  const moves = [
    {
      id: 1,
      status: 'pending',
      pickupDate: '2024-04-15',
      pickupLocation: 'San Francisco, CA',
      dropoffLocation: 'Los Angeles, CA',
      bids: 3,
    },
    {
      id: 2,
      status: 'accepted',
      pickupDate: '2024-05-01',
      pickupLocation: 'Seattle, WA',
      dropoffLocation: 'Portland, OR',
      mover: 'Quick Movers Inc.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Moves</h1>
        <Link to="/moves/new">
          <Button>
            <Plus className="h-5 w-5 mr-2" />
            Create New Move
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Package2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">2</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Total Moves</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <Clock className="h-8 w-8 text-yellow-600" />
            <span className="text-2xl font-bold text-gray-900">1</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Pending Moves</h3>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">1</span>
          </div>
          <h3 className="text-sm font-medium text-gray-600">Completed Moves</h3>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {moves.map((move) => (
            <li key={move.id}>
              <Link
                to={`/moves/${move.id}`}
                className="block hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          move.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {move.status === 'pending' ? 'Pending Bids' : 'Accepted'}
                      </span>
                      <p className="text-sm font-medium text-blue-600 truncate">
                        {move.pickupLocation} → {move.dropoffLocation}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-500">
                        {move.status === 'pending' ? (
                          <span>{move.bids} bids received</span>
                        ) : (
                          <span>Mover: {move.mover}</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        Pickup: {new Date(move.pickupDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}