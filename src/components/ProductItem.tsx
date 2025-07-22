import React, { useState } from 'react';
import { Check, DollarSign, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface ProductItemProps {
  product: Product;
  onSelect: (id: string) => void;
  onUpdatePrice: (id: string, price: number) => void;
  onDelete: (id: string) => void;
}

export default function ProductItem({ product, onSelect, onUpdatePrice, onDelete }: ProductItemProps) {
  const [showPriceInput, setShowPriceInput] = useState(false);
  const [priceInput, setPriceInput] = useState(product.price.toString());

  const handlePriceSubmit = () => {
    const price = parseFloat(priceInput) || 0;
    onUpdatePrice(product.id, price);
    setShowPriceInput(false);
  };

  const calculateTotal = () => {
    return product.price * product.quantity;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className={`bg-white rounded-lg p-4 shadow-md border-l-4 transition-all duration-300 ${
      product.isSelected ? 'border-l-green-500 opacity-60' : 'border-l-blue-500'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{product.name}</h3>
          <p className="text-sm text-gray-600">
            {product.quantity} {product.unit.toUpperCase()}
          </p>
          {product.hasPrice && (
            <p className="text-lg font-semibold text-green-600">
              {formatPrice(calculateTotal())}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!product.isSelected && (
            <>
              <button
                onClick={() => setShowPriceInput(!showPriceInput)}
                className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-full transition-colors duration-200"
                title="Adicionar preço"
              >
                <DollarSign size={18} />
              </button>
              <button
                onClick={() => onSelect(product.id)}
                className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors duration-200"
                title="Adicionar ao carrinho"
              >
                <Check size={18} />
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors duration-200"
                title="Remover produto"
              >
                <Trash2 size={16} />
              </button>
            </>
          )}
        </div>
      </div>
      
      {showPriceInput && (
        <div className="mt-3 flex gap-2 animate-slide-down">
          <input
            type="number"
            step="0.01"
            placeholder="Preço"
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
          />
          <button
            onClick={handlePriceSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            OK
          </button>
        </div>
      )}
    </div>
  );
}