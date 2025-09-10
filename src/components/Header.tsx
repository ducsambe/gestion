import React, { useState, useEffect } from 'react';
import { 
  User as UserIcon, 
  LogOut, 
  Clock, 
  Calendar,
  Building2,
  Monitor,
  Smartphone,
  Tablet
} from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  t: (key: string) => string;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, t }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [sessionTime, setSessionTime] = useState(0);
  const [deviceType, setDeviceType] = useState('Desktop');

  // Update current time every second
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  // Track session time
  useEffect(() => {
    const sessionInterval = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(sessionInterval);
  }, []);

  // Detect device type
  useEffect(() => {
    const detectDevice = () => {
      const userAgent = navigator.userAgent;
      const isMobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
      const isTablet = /iPad|Android/i.test(userAgent) && window.innerWidth >= 768;
      
      if (isMobile && !isTablet) {
        setDeviceType('Mobile');
      } else if (isTablet) {
        setDeviceType('Tablet');
      } else {
        setDeviceType('Desktop');
      }
    };

    detectDevice();
    window.addEventListener('resize', detectDevice);
    return () => window.removeEventListener('resize', detectDevice);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatSessionTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const getDeviceIcon = () => {
    switch (deviceType) {
      case 'Mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'Tablet':
        return <Tablet className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Section - Company Logo & Department */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">GeoCasa Group</h1>
                <p className="text-sm text-gray-600">
                  {user.currentDepartment?.nameFr || 'Système de gestion'}
                </p>
              </div>
            </div>
          </div>

          {/* Center Section - Time & Date Display */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-4 bg-gray-50 rounded-2xl px-6 py-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 font-mono">
                    {formatTime(currentTime)}
                  </div>
                  <div className="text-xs text-gray-500">Heure actuelle</div>
                </div>
              </div>
              
              <div className="w-px h-12 bg-gray-300"></div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                <div className="text-center">
                  <div className="text-sm font-semibold text-gray-900 capitalize">
                    {formatDate(currentTime)}
                  </div>
                  <div className="text-xs text-gray-500">Date du jour</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - User Info & Session */}
          <div className="flex items-center space-x-4">
            
            {/* Session Time Counter */}
            <div className="hidden md:flex items-center space-x-2 bg-blue-50 rounded-xl px-4 py-2 border border-blue-100">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div className="text-center">
                <div className="text-sm font-bold text-blue-900 font-mono">
                  {formatSessionTime(sessionTime)}
                </div>
                <div className="text-xs text-blue-600">Temps de session</div>
              </div>
            </div>

            {/* User Profile Section */}
            <div className="flex items-center space-x-4 bg-gray-50 rounded-2xl px-4 py-2 border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                  <div className="text-xs text-gray-600 flex items-center space-x-1">
                    {getDeviceIcon()}
                    <span>{deviceType}</span>
                  </div>
                </div>
              </div>
              
              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-xl transition-all duration-200 border border-red-200 hover:border-red-300 group"
                title="Se déconnecter"
              >
                <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="hidden lg:inline text-sm font-medium">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Time Display */}
        <div className="lg:hidden pb-4">
          <div className="flex items-center justify-center space-x-6 bg-gray-50 rounded-xl px-4 py-3">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900 font-mono">
                  {formatTime(currentTime)}
                </div>
                <div className="text-xs text-gray-500">Heure</div>
              </div>
            </div>
            
            <div className="w-px h-8 bg-gray-300"></div>
            
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="text-center">
                <div className="text-sm font-bold text-blue-900 font-mono">
                  {formatSessionTime(sessionTime)}
                </div>
                <div className="text-xs text-gray-500">Session</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;