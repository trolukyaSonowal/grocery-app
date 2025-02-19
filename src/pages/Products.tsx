import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sliders, ChevronDown } from 'lucide-react';
import { Navbar } from './Navbar'; // Import the Navbar

const products = [
  // ... keep your existing products array
];

const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Meat', 'Seafood', 'Pantry', 'Beverages'];
const priceRanges = ['All', 'Under ₹5', '₹5 - ₹10', '₹10 - ₹20', 'Over ₹20'];
const sortOptions = ['Price: Low to High', 'Price: High to Low', 'Rating: High to Low', 'Alphabetical'];

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [showOrganic, setShowOrganic] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (productId: number) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }
    console.log(`Added product ₹${productId} to cart`);
  };

  const filteredProducts = products
    .filter(product => {
      if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
      if (showOrganic && !product.organic) return false;
      
      if (selectedPriceRange !== 'All') {
        const price = product.price;
        if (selectedPriceRange === 'Under ₹5' && price >= 5) return false;
        if (selectedPriceRange === '₹5 - ₹10' && (price < 5 || price > 10)) return false;
        if (selectedPriceRange === '₹10 - ₹20' && (price < 10 || price > 20)) return false;
        if (selectedPriceRange === 'Over ₹20' && price <= 20) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      switch (selectedSort) {
        case 'Price: Low to High': return a.price - b.price;
        case 'Price: High to Low': return b.price - a.price;
        case 'Rating: High to Low': return b.rating - a.rating;
        case 'Alphabetical': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar /> {/* Add Navbar here */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">All Products</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 text-gray-600 md:hidden"
          >
            <Sliders className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 space-y-6`}>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Category</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-3 py-2 rounded-lg ${
                      selectedCategory === category
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <button
                    key={range}
                    onClick={() => setSelectedPriceRange(range)}
                    className={`block w-full text-left px-3 py-2 rounded-lg ${
                      selectedPriceRange === range
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={showOrganic}
                  onChange={(e) => setShowOrganic(e.target.checked)}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-gray-700">Organic Only</span>
              </label>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-end mb-6">
              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-emerald-600 font-medium">{product.category}</span>
                      {product.organic && (
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                          Organic
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">₹{product.price}</span>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 mr-2">★ {product.rating}</span>
                        <button
                          onClick={() => handleAddToCart(product.id)}
                          className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}