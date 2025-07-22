import React, { useState } from 'react';
import { ArrowLeft, Store, Calendar } from 'lucide-react';
import { Product, Store as StoreType } from '../types';

interface TotalInterfaceProps {
  products: Product[];
  store: StoreType;
  onGoBack: () => void;
  onFinishShopping: () => void;
  onUpdateStore: (name: string) => void;
  totalValue: number;
}

export default function TotalInterface({ 
  products, 
  store, 
  onGoBack, 
  onFinishShopping, 
  onUpdateStore,
  totalValue 
}: TotalInterfaceProps) {
  const [showStoreInput, setShowStoreInput] = useState(false);
  const [storeInput, setStoreInput] = useState(store.name);

  const allProducts = products.filter(p => p.isSelected || p.hasPrice);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleStoreSubmit = () => {
    onUpdateStore(storeInput);
    setShowStoreInput(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4">
      <div className="max-w-md mx-auto">
        <header className="flex items-center gap-4 mb-6">
          <button
            onClick={onGoBack}
            className="p-2 text-gray-600 hover:bg-white hover:text-gray-800 rounded-full transition-colors duration-200"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 flex-1">Resumo Final</h1>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Store className="text-blue-500" size={20} />
            {showStoreInput ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  placeholder="Nome da loja"
                  value={storeInput}
                  onChange={(e) => setStoreInput(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
                <button
                  onClick={handleStoreSubmit}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200"
                >
                  OK
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowStoreInput(true)}
                className="flex-1 text-left"
              >
                <span className="text-lg font-medium text-gray-800">
                  {store.name || 'Clique para adicionar loja'}
                </span>
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="text-gray-500" size={20} />
            <span className="text-gray-600">{formatDate(store.date)}</span>
          </div>

          <div className="border-t pt-4">
            <h2 className="text-xl font-bold text-center text-green-600 mb-4">
              Total: {formatPrice(totalValue)}
            </h2>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 text-center">Lista de Compras</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {allProducts.map((product) => (
              <div key={product.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    {product.quantity} {product.unit.toUpperCase()}
                  </p>
                </div>
                <div className="text-right">
                  {product.hasPrice ? (
                    <>
                      <p className="text-sm text-gray-500">
                        {formatPrice(product.price)} x {product.quantity}
                      </p>
                      <p className="font-semibold text-gray-800">
                        {formatPrice(product.price * product.quantity)}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-400">Sem preço</p>
                  )}
                </div>
              </div>
            ))}
            
            {allProducts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Nenhum produto adicionado</p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onFinishShopping}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-lg font-bold text-lg shadow-lg transition-all duration-200 hover:shadow-xl"
        >
          Finalizar Carrinho
        </button>
      </div>
    </div>
  );
}