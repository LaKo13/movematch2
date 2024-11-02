import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package2, MapPin, Calendar, DollarSign, Clock, MessageSquare } from 'lucide-react';
import { Button } from '../components/Button';
import { BidForm } from '../components/moves/BidForm';
import { BidList } from '../components/moves/BidList';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';
import type { MoveRequest, Bid } from '../lib/types';

export function MoveDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [move, setMove] = useState<MoveRequest | null>(null);
  const [showBidForm, setShowBidForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isMover = user?.userType === 'mover';
  const isCustomer = user?.userType === 'customer';
  const hasUserBid = move?.bids.some((bid) => bid.moverId === user?.id);

  useEffect(() => {
    const fetchMove = async () => {
      try {
        const token = localStorage.getItem('movematch_token');
        if (!token || !id) return;

        const response = await api.moves.getOne(id, token);
        setMove(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load move details');
      } finally {
        setLoading(false);
      }
    };

    fetchMove();
  }, [id]);

  const handleBidSubmit = async (bidData: Omit<Bid, 'id' | 'moverId' | 'moveRequestId' | 'status' | 'createdAt'>) => {
    try {
      const token = localStorage.getItem('movematch_token');
      if (!token || !id) return;

      await api.bids.create(id, bidData, token);
      const response = await api.moves.getOne(id, token);
      setMove(response.data);
      setShowBidForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit bid');
    }
  };

  const handleAcceptBid = async (bidId: string) => {
    try {
      const token = localStorage.getItem('movematch_token');
      if (!token || !id) return;

      await api.bids.accept(bidId, token);
      const response = await api.moves.getOne(id, token);
      setMove(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to accept bid');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!move) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <h2 className="text-xl font-medium text-gray-900">Move not found</h2>
            <p className="mt-2 text-gray-500">The requested move could not be found.</p>
            <Button onClick={() => navigate('/dashboard')} className="mt-4">
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Move Request Details</h1>
                <div className="mt-2 flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {move.status.charAt(0).toUpperCase() + move.status.slice(1)}
                  </span>
                  <span className="ml-4 text-sm text-gray-500">
                    ID: {move.id}
                  </span>
                </div>
              </div>
              {isMover && !hasUserBid && move.status === 'pending' && (
                <Button onClick={() => setShowBidForm(true)}>
                  Submit Bid
                </Button>
              )}
            </div>
          </div>

          {error && (
            <div className="px-6 py-4 bg-red-50 border-b border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Move Details */}
          <div className="px-6 py-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Location Details</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Pickup Location</p>
                    <p className="text-sm text-gray-500">
                      {move.pickupLocation.address}<br />
                      {move.pickupLocation.city}, {move.pickupLocation.state} {move.pickupLocation.zip}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Dropoff Location</p>
                    <p className="text-sm text-gray-500">
                      {move.dropoffLocation.address}<br />
                      {move.dropoffLocation.city}, {move.dropoffLocation.state} {move.dropoffLocation.zip}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Move Details</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Pickup Date</p>
                    <p className="text-sm text-gray-500">
                      {new Date(move.pickupDate).toLocaleDateString()}
                      {move.flexibleDate && (
                        <span className="ml-2 text-blue-600">(±7 days flexible)</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Package2 className="h-5 w-5 text-gray-400 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Inventory</p>
                    <p className="text-sm text-gray-500">
                      {move.inventory.length} items
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inventory List */}
          <div className="px-6 py-6 border-t border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Inventory</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {move.inventory.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                  <dl className="mt-2 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <dt>Category:</dt>
                      <dd>{item.category}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Quantity:</dt>
                      <dd>{item.quantity}</dd>
                    </div>
                    {item.specialHandling && (
                      <div className="mt-2 text-xs text-yellow-800 bg-yellow-100 px-2 py-1 rounded">
                        {item.specialHandling}
                      </div>
                    )}
                  </dl>
                </div>
              ))}
            </div>
          </div>

          {/* Bids Section */}
          {(isCustomer || isMover) && (
            <div className="px-6 py-6 border-t border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Bids ({move.bids.length})
              </h2>
              <BidList
                bids={move.bids}
                onAcceptBid={handleAcceptBid}
                isCustomer={isCustomer}
              />
            </div>
          )}
        </div>

        {/* Bid Form Modal */}
        {showBidForm && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <BidForm
                onSubmit={handleBidSubmit}
                onCancel={() => setShowBidForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}