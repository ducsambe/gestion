import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { User as UserType, Department, DocumentFlow } from '../types';
import Header from './Header';
import LandCadastralDashboard from './dashboards/LandCadastralDashboard';
import FinancinDashboard from './dashboards/FinancingDashboard';
import SalesManagementDashboard from './dashboards/SalesManagementDashboard';

interface DashboardProps {
  user: UserType;
  department: Department;
  onLogout: () => void;
  t: (key: string) => string;
  language: string;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  department, 
  onLogout, 
  t, 
  language 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState('Desktop');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock document flow data
  const [documentFlows] = useState<DocumentFlow[]>([
    {
      id: '1',
      clientName: 'Jean Mballa',
      requestType: 'Titre Foncier',
      currentBureau: 'legal-studies',
      status: 'in-progress',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date(),
      progress: 65
    },
    {
      id: '2',
      clientName: 'Marie Nguema',
      requestType: 'Étude Topographique',
      currentBureau: 'technical-studies',
      status: 'pending',
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date(),
      progress: 25
    },
    {
      id: '3',
      clientName: 'Paul Essomba',
      requestType: 'Procédure Administrative',
      currentBureau: 'administrative-procedures',
      status: 'completed',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date(),
      progress: 100
    }
  ]);

  useEffect(() => {
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
  }, []);

  const renderDepartmentDashboard = () => {
    switch (department.id) {
      case 'land-cadastral':
        return <LandCadastralDashboard />;
      case 'financing':
        return <FinancingDashboard />;
      case 'sales-management':
        return <SalesManagementDashboard />;
      default:
        return <LandCadastralDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} t={t} />
      
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 p-6 max-w-7xl mx-auto">
          {renderDepartmentDashboard()}
        </main>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;