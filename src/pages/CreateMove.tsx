import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Truck, MapPin, Package2, Calendar } from 'lucide-react';
import { Button } from '../components/Button';
import { LocationStep } from '../components/moves/LocationStep';
import { InventoryStep } from '../components/moves/InventoryStep';
import { DateStep } from '../components/moves/DateStep';
import { ReviewStep } from '../components/moves/ReviewStep';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';
import type { MoveRequest } from '../lib/types';

const steps = [
  { id: 'location', name: 'Locations', icon: MapPin },
  { id: 'inventory', name: 'Inventory', icon: Package2 },
  { id: 'date', name: 'Date', icon: Calendar },
  { id: 'review', name: 'Review', icon: Truck },
];

export function CreateMove() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState('');
  const [moveData, setMoveData] = useState<Partial<MoveRequest>>({
    status: 'draft',
    inventory: [],
    bids: [],
  });

  const updateMoveData = (data: Partial<MoveRequest>) => {
    setMoveData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('movematch_token');
      if (!token) {
        throw new Error('Authentication required');
      }

      await api.moves.create(moveData, token);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create move request');
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate('/dashboard');
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return moveData.pickupLocation && moveData.dropoffLocation;
      case 1:
        return moveData.inventory && moveData.inventory.length > 0;
      case 2:
        return moveData.pickupDate;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress bar */}
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between mb-12">
            {steps.map((step, index) => (
              <li key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    index <= currentStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="ml-3 hidden sm:block">
                  <span className="text-sm font-medium text-gray-900">
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden sm:block w-12 h-0.5 ml-3 bg-gray-200" />
                )}
              </li>
            ))}
          </ol>
        </nav>

        {error && (
          <div className="mb-6 bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Step content */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          {currentStep === 0 && (
            <LocationStep data={moveData} onUpdate={updateMoveData} />
          )}
          {currentStep === 1 && (
            <InventoryStep data={moveData} onUpdate={updateMoveData} />
          )}
          {currentStep === 2 && (
            <DateStep data={moveData} onUpdate={updateMoveData} />
          )}
          {currentStep === 3 && (
            <ReviewStep data={moveData} onUpdate={updateMoveData} />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button variant="secondary" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentStep === 0 ? 'Cancel' : 'Back'}
          </Button>
          <Button onClick={handleNext} disabled={!isStepValid()}>
            {currentStep === steps.length - 1 ? 'Submit Request' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}