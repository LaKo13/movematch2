import { Check } from 'lucide-react';
import type { MoveRequest } from '../../lib/types';

interface ReviewStepProps {
  data: Partial<MoveRequest>;
  onUpdate: (data: Partial<MoveRequest>) => void;
}

export function ReviewStep({ data }: ReviewStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-1">
          Review Your Move Details
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Please review all details before submitting your request
        </p>

        <div className="mt-6 border-t border-gray-200">
          <dl className="divide-y divide-gray-200">
            <div className="py-4">
              <dt className="text-sm font-medium text-gray-500">
                Pickup Location
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {data.pickupLocation?.address}
                <br />
                {data.pickupLocation?.city}, {data.pickupLocation?.state}{' '}
                {data.pickupLocation?.zip}
              </dd>
            </div>

            <div className="py-4">
              <dt className="text-sm font-medium text-gray-500">
                Dropoff Location
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {data.dropoffLocation?.address}
                <br />
                {data.dropoffLocation?.city}, {data.dropoffLocation?.state}{' '}
                {data.dropoffLocation?.zip}
              </dd>
            </div>

            <div className="py-4">
              <dt className="text-sm font-medium text-gray-500">Move Date</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {new Date(data.pickupDate || '').toLocaleDateString()}
                {data.flexibleDate && (
                  <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Flexible (±7 days)
                  </span>
                )}
              </dd>
            </div>

            <div className="py-4">
              <dt className="text-sm font-medium text-gray-500">
                Inventory ({data.inventory?.length} items)
              </dt>
              <dd className="mt-1 space-y-2">
                {data.inventory?.map((item) => (
                  <div
                    key={item.id}
                    className="text-sm text-gray-900 flex items-start"
                  >
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <div>
                      <span className="font-medium">{item.name}</span> (
                      {item.quantity}) - {item.category}
                      {item.specialHandling && (
                        <p className="text-sm text-gray-500 mt-1">
                          Special handling: {item.specialHandling}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}