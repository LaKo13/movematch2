import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { FormInput } from '../FormInput';
import type { MoveRequest } from '../../lib/types';

interface DateStepProps {
  data: Partial<MoveRequest>;
  onUpdate: (data: Partial<MoveRequest>) => void;
}

export function DateStep({ data, onUpdate }: DateStepProps) {
  const [isFlexible, setIsFlexible] = useState(data.flexibleDate || false);
  const [pickupDate, setPickupDate] = useState(data.pickupDate || '');

  const handleDateChange = (date: string) => {
    setPickupDate(date);
    onUpdate({ pickupDate: date, flexibleDate: isFlexible });
  };

  const handleFlexibleChange = (flexible: boolean) => {
    setIsFlexible(flexible);
    onUpdate({ pickupDate, flexibleDate: flexible });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-1">
          Choose Your Move Date
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Select your preferred pickup date
        </p>

        <div className="space-y-4">
          <div>
            <FormInput
              label="Preferred Pickup Date"
              type="date"
              value={pickupDate}
              onChange={(e) => handleDateChange(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="flexible-date"
              checked={isFlexible}
              onChange={(e) => handleFlexibleChange(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="flexible-date" className="text-sm text-gray-700">
              I'm flexible with the pickup date (±7 days)
            </label>
          </div>

          {isFlexible && (
            <div className="bg-blue-50 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Calendar className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Flexible Date Selected
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      Movers can propose dates within 7 days before or after your
                      preferred date. This flexibility may help you get better
                      rates and more bids.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}