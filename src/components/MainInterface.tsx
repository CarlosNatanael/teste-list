import React, { useState } from 'react';
import { Plus, ShoppingCart, Receipt } from 'lucide-react';
import { Product } from '../types';
import ProductItem from './ProductItem';
import AddProductForm from './AddProductForm';

interface MainInterfaceProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id' | 'isSelected' | 'hasPrice'>) => void;
  onSelectProduct: (id: string) => void;
  onUpdatePrice: (id: string, price: number) => void;
  onDeleteProduct: (id: string) => void;
  onGoToCart: () => void;
  onGoToTotal: () => void;
  totalValue: number;
}

export default function MainInterface({ 
  products, 
  onAddProduct, 
  onSelectProduct, 
  onUpdatePrice, 
  onDeleteProduct, 
  onGoToCart, 
  onGoToTotal,
  totalValue 
}: MainInterfaceProps) {
  const [showAddForm, setShowAddForm] = useState(false);

  const availableProducts = products.filter(p => !p.isSelected);
  const selectedCount = products.filter(p => p.isSelected).length;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Lista de Compras</h1>
          <div className="bg-white rounded-lg p-3 shadow-md">
            <p className="text-sm text-gray-600">Total atual</p>
            <p className="text-xl font-bold text-green-600">{formatPrice(totalValue)}</p>
          </div>
        </header>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium shadow-md transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Adicionar
          </button>
          <button
            onClick={onGoToCart}
            className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-lg font-medium shadow-md transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2 relative"
          >
            <ShoppingCart size={20} />
            Carrinho
            {selectedCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {selectedCount}
              </span>
            )}
          </button>
          <button
            onClick={onGoToTotal}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium shadow-md transition-all duration-200 hover:shadow-lg flex items-center justify-center gap-2"
          >
            <Receipt size={20} />
            Total
          </button>
        </div>

        <div className="space-y-4">
          {showAddForm && (
            <AddProductForm
              onAdd={onAddProduct}
              onCancel={() => setShowAddForm(false)}
            />
          )}
          
          {availableProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onUpdatePrice={onUpdatePrice}
              onDelete={onDeleteProduct}
            />
          ))}
          
          {availableProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum produto na lista</p>
              <p className="text-gray-400">Clique em "Adicionar" para começar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}