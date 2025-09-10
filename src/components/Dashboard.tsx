import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Clock, 
  MapPin, 
  User, 
  Smartphone, 
  Menu,
  Bell,
  Settings,
  FileText,
  LogOut,
  CreditCard,
  Building
} from 'lucide-react';
import { User as UserType, Department } from '../types';
import { COMPANY_INFO } from '../constants';

interface DashboardProps {
  user: UserType;
  department: Department;
  onLogout: () => void;
  t: (key: string) => string;
  language: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user, department, onLogout, t, language }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [deviceInfo, setDeviceInfo] = useState('Desktop');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    // Detect device type
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth >= 768;
    
    if (isMobile && !isTablet) {
      setDeviceInfo('Mobile');
    } else if (isTablet) {
      setDeviceInfo('Tablet');
    } else {
      setDeviceInfo('Desktop');
    }

    return () => clearInterval(timer);
  }, []);

  const iconMap = {
    MapPin,
    CreditCard,
    Building
  };

  const DepartmentIcon = iconMap[department.icon as keyof typeof iconMap];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">GeoCasa Group</h1>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="font-medium">{t('openingHours')}: {COMPANY_INFO.openingHours}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">{COMPANY_INFO.location}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="font-medium">{t('connectedAs')}: {user.name}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Smartphone className="w-4 h-4" />
                <span className="font-medium">{t('device')}: {deviceInfo}</span>
              </div>
              
              <div className="text-blue-600 font-bold text-base">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={onLogout}
                className="p-2 rounded-xl hover:bg-red-50 transition-colors duration-200 group"
              >
                <LogOut className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out`}>
          <div className="p-6">
            {/* Current Department Display */}
            <div className={`p-6 rounded-2xl ${department.color} bg-opacity-10 mb-8 border border-gray-100`}>
              <div className="flex items-center space-x-3">
                <div className={`p-3 ${department.color} rounded-xl shadow-lg`}>
                  <DepartmentIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm leading-tight">
                    {language === 'en' ? department.nameEn : department.nameFr}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Département actuel</p>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-2">
              <a
                href="#"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
              >
                <FileText className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{t('requests')}</span>
              </a>
              
              <a
                href="#"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all duration-200 group"
              >
                <Building2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Dossiers</span>
              </a>
              
              <a
                href="#"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-gray-50 hover:text-gray-700 transition-all duration-200 group"
              >
                <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">Clients</span>
              </a>
              
              <a
                href="#"
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
              >
                <Settings className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{t('settings')}</span>
              </a>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
                {t('dashboard')} - {language === 'en' ? department.nameEn : department.nameFr}
              </h2>
              <p className="text-gray-600 text-lg">
                Gérez efficacement les activités de votre département
              </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Demandes en cours</h3>
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">24</p>
                <p className="text-sm text-green-600 font-medium">+3 depuis hier</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Dossiers traités</h3>
                  <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">156</p>
                <p className="text-sm text-orange-600 font-medium">Ce mois</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">Clients actifs</h3>
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">89</p>
                <p className="text-sm text-gray-600 font-medium">Total</p>
              </div>
            </div>

            {/* Department Activities Section */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">
                  Activités du département
                </h3>
              </div>
              <div className="p-6">
                <div className="text-center py-16">
                  <div className={`w-20 h-20 ${department.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <DepartmentIcon className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">
                    {language === 'en' ? department.nameEn : department.nameFr}
                  </h4>
                  <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                    Tableau de bord spécialisé pour la gestion des activités et des processus 
                    de ce département. Les fonctionnalités détaillées seront ajoutées selon 
                    vos besoins spécifiques.
                  </p>
                  <div className="mt-8">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200">
                      Commencer à travailler
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;