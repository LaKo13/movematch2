import { useState } from 'react';
import { Button } from '../Button';
import { FormInput } from '../FormInput';
import type { Bid } from '../../lib/types';

interface BidFormProps {
  onSubmit: (bid: Omit<Bid, 'id' | 'moverId' | 'moveRequestId' | 'status' | 'createdAt'>) => void;
  onCancel: () => void;
}

export function BidForm({ onSubmit, onCancel }: BidFormProps) {
  const [amount, setAmount] = useState('');
  const [estimatedDuration, setEstimatedDuration] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !estimatedDuration) {
      setError('Please fill in all required fields');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    onSubmit({
      amount: parsedAmount,
      estimatedDuration,
      message,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Submit Your Bid</h2>
        <p className="mt-1 text-sm text-gray-500">
          Please provide your bid details below
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <FormInput
        label="Bid Amount ($)"
        type="number"
        min="0"
        step="0.01"
        required
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <FormInput
        label="Estimated Duration"
        placeholder="e.g., 2 days"
        required
        value={estimatedDuration}
        onChange={(e) => setEstimatedDuration(e.target.value)}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Additional Message
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Any additional information about your bid..."
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Submit Bid
        </Button>
      </div>
    </form>
  );
}