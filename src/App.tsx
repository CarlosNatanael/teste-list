import React, { useState } from 'react';
import { Product, Store } from './types';
import MainInterface from './components/MainInterface';
import CartInterface from './components/CartInterface';
import TotalInterface from './components/TotalInterface';

type Screen = 'main' | 'cart' | 'total';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [products, setProducts] = useState<Product[]>([]);
  const [store, setStore] = useState<Store>({
    name: '',
    date: new Date().toISOString()
  });

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addProduct = (productData: Omit<Product, 'id' | 'isSelected' | 'hasPrice'>) => {
    const newProduct: Product = {
      ...productData,
      id: generateId(),
      isSelected: false,
      hasPrice: false
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const selectProduct = (id: string) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, isSelected: true } : p
    ));
  };

  const updatePrice = (id: string, price: number) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, price, hasPrice: true } : p
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const updateStore = (name: string) => {
    setStore(prev => ({ ...prev, name }));
  };

  const finishShopping = () => {
    setProducts([]);
    setStore({ name: '', date: new Date().toISOString() });
    setCurrentScreen('main');
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      if (product.hasPrice) {
        return total + (product.price * product.quantity);
      }
      return total;
    }, 0);
  };

  const totalValue = calculateTotal();

  return (
    <div className="min-h-screen">
      {currentScreen === 'main' && (
        <MainInterface
          products={products}
          onAddProduct={addProduct}
          onSelectProduct={selectProduct}
          onUpdatePrice={updatePrice}
          onDeleteProduct={deleteProduct}
          onGoToCart={() => setCurrentScreen('cart')}
          onGoToTotal={() => setCurrentScreen('total')}
          totalValue={totalValue}
        />
      )}
      
      {currentScreen === 'cart' && (
        <CartInterface
          products={products}
          onGoBack={() => setCurrentScreen('main')}
          onFinishShopping={finishShopping}
        />
      )}
      
      {currentScreen === 'total' && (
        <TotalInterface
          products={products}
          store={store}
          onGoBack={() => setCurrentScreen('main')}
          onFinishShopping={finishShopping}
          onUpdateStore={updateStore}
          totalValue={totalValue}
        />
      )}
    </div>
  );
}

export default App;