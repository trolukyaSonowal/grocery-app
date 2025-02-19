import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBasket, Search, ShoppingCart, Menu } from 'lucide-react';

const featuredProducts = [
  {
    id: 1,
    name: 'Fresh Organic Avocados',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=400',
    category: 'Fruits',
  },
  {
    id: 2,
    name: 'Farm Fresh Eggs',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=400',
    category: 'Dairy',
  },
  {
    id: 3,
    name: 'Organic Spinach',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400',
    category: 'Vegetables',
  },
  {
    id: 4,
    name: 'Whole Grain Bread',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
    category: 'Bakery',
  },
];

const categories = [
  { name: 'Fruits & Vegetables', icon: '🥬' },
  { name: 'Dairy & Eggs', icon: '🥛' },
  { name: 'Bakery', icon: '🥖' },
  { name: 'Meat & Fish', icon: '🥩' },
  { name: 'Pantry', icon: '🥫' },
  { name: 'Beverages', icon: '🧃' },
];

export function Home() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false'); // Update login state
    setIsLoggedIn(false); // Update UI state
    navigate('/'); // Redirect to home page
  };

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }
    console.log('Item added to cart');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button className="p-2 rounded-md text-gray-400 lg:hidden">
                <Menu className="h-6 w-6" />
              </button>
              <Link to="/" className="flex items-center space-x-2">
                <ShoppingBasket className="h-8 w-8 text-emerald-600" />
                <span className="text-xl font-bold text-gray-900">GreenMart</span>
              </Link>
            </div>

            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2">
                <ShoppingCart className="h-6 w-6 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </button>

              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-500 to-green-600 h-96">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-4">Fresh Groceries Delivered</h1>
            <p className="text-xl mb-8">Shop from our wide selection of fresh, organic produce and groceries</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
            >
              <span className="text-3xl mb-2 block">{category.icon}</span>
              <h3 className="text-sm font-medium text-gray-900">{category.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-sm text-emerald-600 font-medium">{product.category}</span>
                <h3 className="text-lg font-medium text-gray-900 mt-1">{product.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  <button
                    onClick={handleAddToCart}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}