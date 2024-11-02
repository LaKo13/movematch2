import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormInput } from '../FormInput';
import type { MoveRequest } from '../../lib/types';

const locationSchema = z.object({
  pickupLocation: z.object({
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zip: z.string().min(5, 'ZIP code is required'),
  }),
  dropoffLocation: z.object({
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(2, 'State is required'),
    zip: z.string().min(5, 'ZIP code is required'),
  }),
});

type LocationForm = z.infer<typeof locationSchema>;

interface LocationStepProps {
  data: Partial<MoveRequest>;
  onUpdate: (data: Partial<MoveRequest>) => void;
}

export function LocationStep({ data, onUpdate }: LocationStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationForm>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      pickupLocation: data.pickupLocation,
      dropoffLocation: data.dropoffLocation,
    },
  });

  const onSubmit = (formData: LocationForm) => {
    onUpdate(formData);
  };

  return (
    <form onChange={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-1">
          Pickup Location
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Enter the address where your items will be picked up
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            label="Street Address"
            {...register('pickupLocation.address')}
            error={errors.pickupLocation?.address?.message}
          />
          <FormInput
            label="City"
            {...register('pickupLocation.city')}
            error={errors.pickupLocation?.city?.message}
          />
          <FormInput
            label="State"
            {...register('pickupLocation.state')}
            error={errors.pickupLocation?.state?.message}
          />
          <FormInput
            label="ZIP Code"
            {...register('pickupLocation.zip')}
            error={errors.pickupLocation?.zip?.message}
          />
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-1">
          Dropoff Location
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Enter the address where your items will be delivered
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            label="Street Address"
            {...register('dropoffLocation.address')}
            error={errors.dropoffLocation?.address?.message}
          />
          <FormInput
            label="City"
            {...register('dropoffLocation.city')}
            error={errors.dropoffLocation?.city?.message}
          />
          <FormInput
            label="State"
            {...register('dropoffLocation.state')}
            error={errors.dropoffLocation?.state?.message}
          />
          <FormInput
            label="ZIP Code"
            {...register('dropoffLocation.zip')}
            error={errors.dropoffLocation?.zip?.message}
          />
        </div>
      </div>
    </form>
  );
}