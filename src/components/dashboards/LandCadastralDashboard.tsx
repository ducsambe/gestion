import React, { useState } from 'react';
import { 
  MapPin, 
  Scale, 
  Map, 
  FileCheck, 
  Users, 
  FileText, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const LandCadastralDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for charts
  const bureauData = [
    { name: 'Études Juridiques', value: 35, color: '#3B82F6' },
    { name: 'Études Techniques', value: 40, color: '#10B981' },
    { name: 'Procédures Admin', value: 25, color: '#F59E0B' }
  ];

  const monthlyData = [
    { month: 'Jan', juridique: 12, technique: 18, admin: 8 },
    { month: 'Fév', juridique: 15, technique: 22, admin: 12 },
    { month: 'Mar', juridique: 18, technique: 25, admin: 15 },
    { month: 'Avr', juridique: 22, technique: 28, admin: 18 }
  ];

  const statusData = [
    { name: 'Terminés', value: 156, color: '#10B981' },
    { name: 'En cours', value: 24, color: '#3B82F6' },
    { name: 'En attente', value: 8, color: '#F59E0B' },
    { name: 'Bloqués', value: 3, color: '#EF4444' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Department Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-6 lg:p-8 text-white shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 lg:space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">Gestion Foncière et Cadastrale</h1>
              <p className="text-blue-100 text-base lg:text-lg">Expertise juridique et technique foncière</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl lg:text-4xl font-bold">191</div>
            <div className="text-blue-200 text-sm lg:text-base">Dossiers totaux</div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">35</div>
              <div className="text-sm text-green-600 font-medium">+5 cette semaine</div>
            </div>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Études Juridiques</h3>
          <p className="text-sm text-gray-600">Dossiers en traitement</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Map className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">40</div>
              <div className="text-sm text-blue-600 font-medium">+8 cette semaine</div>
            </div>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Études Techniques</h3>
          <p className="text-sm text-gray-600">Relevés topographiques</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FileCheck className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">25</div>
              <div className="text-sm text-amber-600 font-medium">+2 cette semaine</div>
            </div>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Procédures Admin</h3>
          <p className="text-sm text-gray-600">En cours de validation</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">89</div>
              <div className="text-sm text-purple-600 font-medium">Clients actifs</div>
            </div>
          </div>
          <h3 className="font-semibold text-gray-900 mb-1">Clients</h3>
          <p className="text-sm text-gray-600">Base de données</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Distribution par Bureau */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Répartition par Bureau</h3>
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={bureauData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {bureauData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {bureauData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart - Évolution Mensuelle */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Évolution Mensuelle</h3>
            <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
              <BarChart className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="juridique" fill="#3B82F6" name="Juridique" radius={[4, 4, 0, 0]} />
                <Bar dataKey="technique" fill="#10B981" name="Technique" radius={[4, 4, 0, 0]} />
                <Bar dataKey="admin" fill="#F59E0B" name="Admin" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">État des Dossiers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statusData.map((status, index) => (
            <div key={index} className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${status.color}20` }}>
                {status.name === 'Terminés' && <CheckCircle className="w-6 h-6" style={{ color: status.color }} />}
                {status.name === 'En cours' && <Clock className="w-6 h-6" style={{ color: status.color }} />}
                {status.name === 'En attente' && <FileText className="w-6 h-6" style={{ color: status.color }} />}
                {status.name === 'Bloqués' && <AlertTriangle className="w-6 h-6" style={{ color: status.color }} />}
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{status.value}</div>
                <div className="text-sm text-gray-600">{status.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Activités Récentes</h3>
        <div className="space-y-4">
          {[
            { client: 'Jean Mballa', action: 'Titre foncier validé', bureau: 'Études Juridiques', time: '10:30', status: 'completed' },
            { client: 'Marie Nguema', action: 'Relevé topographique en cours', bureau: 'Études Techniques', time: '09:15', status: 'in-progress' },
            { client: 'Paul Essomba', action: 'Procédure administrative démarrée', bureau: 'Procédures Admin', time: '08:45', status: 'pending' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.status === 'completed' ? 'bg-green-100' :
                  activity.status === 'in-progress' ? 'bg-blue-100' : 'bg-yellow-100'
                }`}>
                  {activity.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-600" />}
                  {activity.status === 'in-progress' && <Clock className="w-5 h-5 text-blue-600" />}
                  {activity.status === 'pending' && <FileText className="w-5 h-5 text-yellow-600" />}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{activity.client}</div>
                  <div className="text-sm text-gray-600">{activity.action}</div>
                  <div className="text-xs text-gray-500">{activity.bureau}</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandCadastralDashboard;