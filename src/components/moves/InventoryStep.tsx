import { useState } from 'react';
import { Plus, X, Upload } from 'lucide-react';
import { Button } from '../Button';
import { FormInput } from '../FormInput';
import type { MoveRequest, InventoryItem } from '../../lib/types';

const categories = [
  'Furniture',
  'Electronics',
  'Kitchen',
  'Bedroom',
  'Living Room',
  'Office',
  'Other',
];

interface InventoryStepProps {
  data: Partial<MoveRequest>;
  onUpdate: (data: Partial<MoveRequest>) => void;
}

export function InventoryStep({ data, onUpdate }: InventoryStepProps) {
  const [items, setItems] = useState<InventoryItem[]>(data.inventory || []);
  const [currentItem, setCurrentItem] = useState<Partial<InventoryItem>>({
    category: categories[0],
  });

  const addItem = () => {
    if (currentItem.name && currentItem.category && currentItem.quantity) {
      const newItem: InventoryItem = {
        id: Math.random().toString(36).slice(2),
        name: currentItem.name,
        category: currentItem.category,
        quantity: currentItem.quantity,
        description: currentItem.description,
        photos: [],
        specialHandling: currentItem.specialHandling,
      };

      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      onUpdate({ inventory: updatedItems });
      setCurrentItem({ category: categories[0] });
    }
  };

  const removeItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    onUpdate({ inventory: updatedItems });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-1">Add Items</h2>
        <p className="text-sm text-gray-500 mb-4">
          List all items that need to be moved
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormInput
            label="Item Name"
            value={currentItem.name || ''}
            onChange={(e) =>
              setCurrentItem({ ...currentItem, name: e.target.value })
            }
          />
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={currentItem.category}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, category: e.target.value })
              }
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <FormInput
            label="Quantity"
            type="number"
            min="1"
            value={currentItem.quantity || ''}
            onChange={(e) =>
              setCurrentItem({
                ...currentItem,
                quantity: parseInt(e.target.value, 10),
              })
            }
          />
          <FormInput
            label="Special Handling Instructions"
            value={currentItem.specialHandling || ''}
            onChange={(e) =>
              setCurrentItem({ ...currentItem, specialHandling: e.target.value })
            }
          />
          <div className="sm:col-span-2">
            <FormInput
              label="Description"
              value={currentItem.description || ''}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, description: e.target.value })
              }
            />
          </div>
        </div>

        <div className="mt-4">
          <Button onClick={addItem}>
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      {items.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Item List ({items.length})
          </h3>
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                    <div className="mt-1 text-sm text-gray-500">
                      <span className="mr-4">
                        Category: {item.category}
                      </span>
                      <span>Quantity: {item.quantity}</span>
                    </div>
                    {item.specialHandling && (
                      <p className="mt-1 text-sm text-gray-500">
                        Special handling: {item.specialHandling}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}