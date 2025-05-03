import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  BarChart2, 
  Barcode, 
  Menu, 
  X,
  ShoppingCart
} from 'lucide-react';

function Sidebar() {
  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { path: '/inventory', label: 'Inventory', icon: <Package size={20} /> },
    { path: '/campaigns', label: 'Campaigns', icon: <BarChart2 size={20} /> },
    { path: '/barcodes', label: 'Barcodes', icon: <Barcode size={20} /> },
  ];

  return (
    <>
      {/* Mobile toggle */}
      <button 
        onClick={toggleSidebar}
        className="fixed z-20 bottom-4 right-4 md:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg"
      >
        {expanded ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside 
        className={`bg-gray-800 text-white w-64 flex-shrink-0 fixed md:static inset-y-0 left-0 z-10 transform transition-transform duration-300 ease-in-out ${
          expanded ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <ShoppingCart size={24} className="text-blue-400" />
            <span className="text-xl font-bold">MarketPlace</span>
          </div>
        </div>
        <nav className="mt-5 px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
              onClick={() => setExpanded(false)}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {expanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={() => setExpanded(false)}
        />
      )}
    </>
  );
}

export default Sidebar;