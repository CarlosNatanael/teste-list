export interface Product {
  id: string;
  name: string;
  quantity: number;
  unit: 'un' | 'kg';
  price: number;
  isSelected: boolean;
  hasPrice: boolean;
}

export interface Store {
  name: string;
  date: string;
}