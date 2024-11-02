import { DollarSign, Clock, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../Button';
import type { Bid } from '../../lib/types';

interface BidListProps {
  bids: Bid[];
  onAcceptBid: (bidId: string) => void;
  isCustomer: boolean;
}

export function BidList({ bids, onAcceptBid, isCustomer }: BidListProps) {
  return (
    <div className="space-y-4">
      {bids.map((bid) => (
        <div
          key={bid.id}
          className={`bg-white rounded-lg p-4 shadow-sm border ${
            bid.status === 'accepted'
              ? 'border-green-200'
              : bid.status === 'rejected'
              ? 'border-red-200'
              : 'border-gray-200'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <DollarSign className="h-5 w-5 text-gray-400" />
                  <span className="text-lg font-medium text-gray-900">
                    ${bid.amount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="ml-1 text-sm text-gray-500">
                    {bid.estimatedDuration}
                  </span>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    bid.status === 'accepted'
                      ? 'bg-green-100 text-green-800'
                      : bid.status === 'rejected'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                </span>
              </div>
              {bid.message && (
                <div className="flex items-start">
                  <MessageSquare className="h-5 w-5 text-gray-400 mt-1" />
                  <p className="ml-2 text-sm text-gray-600">{bid.message}</p>
                </div>
              )}
              <div className="text-sm text-gray-500">
                Submitted by: {bid.mover.companyName || bid.mover.name}
              </div>
            </div>
            {isCustomer && bid.status === 'pending' && (
              <div className="flex space-x-2">
                <Button onClick={() => onAcceptBid(bid.id)}>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Accept Bid
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}