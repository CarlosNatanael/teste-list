import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { Product } from '../types';

interface AddProductFormProps {
  onAdd: (product: Omit<Product, 'id' | 'isSelected' | 'hasPrice'>) => void;
  onCancel: () => void;
}

export default function AddProductForm({ onAdd, onCancel }: AddProductFormProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState<'un' | 'kg'>('un');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && quantity) {
      onAdd({
        name: name.trim(),
        quantity: parseFloat(quantity),
        unit,
        price: 0
      });
      setName('');
      setQuantity('');
      setUnit('un');
    }
  };

  return (
    <div className="bg-white border-2 border-blue-200 rounded-lg p-4 shadow-lg animate-slide-down">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Nome do produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
        </div>
        <div className="flex gap-2">
          <input
            type="number"
            step="0.001"
            placeholder="Quantidade"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as 'un' | 'kg')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="un">UN</option>
            <option value="kg">KG</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!name.trim() || !quantity}
            className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Check size={16} />
            Adicionar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors duration-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}