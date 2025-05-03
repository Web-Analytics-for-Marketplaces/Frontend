import React from 'react';
import { LogOut, Bell, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Header() {
  const { user, signout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-medium leading-6 text-gray-900 truncate">
            Marketplace Dashboard
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-500 focus:outline-none">
            <Bell size={20} />
          </button>
          <button className="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-500 focus:outline-none">
            <Settings size={20} />
          </button>
          <div className="relative">
            <div className="flex items-center space-x-3">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-gray-900">{user?.username}</span>
                <span className="text-xs text-gray-500">{user?.email}</span>
              </div>
              <button 
                onClick={signout}
                className="p-1 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
                title="Sign out"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;