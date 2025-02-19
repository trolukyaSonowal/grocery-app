import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  BarChart,
  Truck,
  TagIcon,

  Calendar,
  TrendingUp,
  Settings,
  Box,

  Search,
  Plus,
} from 'lucide-react';

const stats = [
  { name: 'Total Orders', value: '156', change: '+12%', icon: ShoppingCart },
  { name: 'Total Products', value: '89', change: '+5%', icon: Package },
  { name: 'Active Users', value: '2,345', change: '+18%', icon: Users },
  { name: 'Revenue', value: 'Rupees  12,456', change: '+24%', icon: BarChart },
];


const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Inventory', icon: Box },
  { name: 'Orders', icon: ShoppingCart },
  { name: 'Products', icon: Package },
  { name: 'Customers', icon: Users },
  { name: 'Suppliers', icon: Truck },
  { name: 'Promotions', icon: TagIcon },
  { name: 'Analytics', icon: TrendingUp },
  { name: 'Settings', icon: Settings },
];

export function Admin() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <LayoutDashboard className="h-6 w-6 text-emerald-600" />
          <span className="ml-3 text-lg font-semibold text-gray-900">Grocery Admin</span>
        </div>
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors Rupees  {
                activeTab === item.name
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="mt-1 text-gray-500">Welcome back, Admin</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <Link
              to="/admin/add-item"
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Item
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="h-6 w-6 text-emerald-600" />
                <span
                  className={`text-sm font-medium Rupees  {
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <h3 className="text-sm font-medium text-gray-500">{stat.name}</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>


        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingCart className="h-5 w-5 text-emerald-600 mr-2" />
              <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
            </div>
            <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
              View All Orders
            </button>
          </div>
          <div className="p-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  {
                    id: '#1234',
                    customer: 'John Doe',
                    status: 'Delivered',
                    items: 5,
                    total: 'Rupees  156.00',
                  },
                ].map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full Rupees  {
                          order.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'Processing'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.items} items</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.total}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-emerald-600 hover:text-emerald-700 font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calendar Section */}
        <div className="mt-8 bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center">
            <Calendar className="h-5 w-5 text-emerald-600 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Upcoming Deliveries</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  supplier: 'Fresh Farms Inc.',
                  items: 'Fresh Produce',
                  time: '9:00 AM',
                  status: 'Scheduled',
                },
              ].map((delivery, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{delivery.supplier}</h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full Rupees  {
                        delivery.status === 'En Route'
                          ? 'bg-blue-100 text-blue-800'
                          : delivery.status === 'Scheduled'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {delivery.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{delivery.items}</p>
                  <p className="text-sm text-gray-500 mt-1">Expected: {delivery.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}