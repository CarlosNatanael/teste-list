import React, { useState } from 'react';
import { ArrowLeft, Search, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface CartInterfaceProps {
  products: Product[];
  onGoBack: () => void;
  onFinishShopping: () => void;
}

export default function CartInterface({ products, onGoBack, onFinishShopping }: CartInterfaceProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const selectedProducts = products.filter(p => p.isSelected);
  const filteredProducts = selectedProducts.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4">
      <div className="max-w-md mx-auto">
        <header className="flex items-center gap-4 mb-6">
          <button
            onClick={onGoBack}
            className="p-2 text-gray-600 hover:bg-white hover:text-gray-800 rounded-full transition-colors duration-200"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800 flex-1">Carrinho</h1>
          <div className="bg-white rounded-lg px-3 py-1 shadow-md">
            <span className="text-sm text-gray-600">{selectedProducts.length} itens</span>
          </div>
        </header>

        <div className="bg-white rounded-lg shadow-md mb-6 flex items-center gap-3 p-3">
          <Search className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Pesquisar produtos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 outline-none text-gray-700"
          />
        </div>

        <div className="space-y-3 mb-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg p-4 shadow-md border-l-4 border-l-green-500">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">
                    {product.quantity} {product.unit.toUpperCase()}
                  </p>
                </div>
                {product.hasPrice && (
                  <p className="text-lg font-semibold text-green-600">
                    {formatPrice(product.price * product.quantity)}
                  </p>
                )}
              </div>
            </div>
          ))}
          
          {filteredProducts.length === 0 && selectedProducts.length === 0 && (
            <div className="text-center py-12">
              <ShoppingBag className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500 text-lg">Carrinho vazio</p>
              <p className="text-gray-400">Adicione produtos na lista principal</p>
            </div>
          )}
          
          {searchTerm && filteredProducts.length === 0 && selectedProducts.length > 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum produto encontrado</p>
              <p className="text-gray-400">Tente outro termo de busca</p>
            </div>
          )}
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