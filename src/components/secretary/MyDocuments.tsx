import React, { useState } from 'react';
import { 
  FileText, 
  Eye, 
  Download, 
  Search, 
  Filter,
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertTriangle,
  Edit
} from 'lucide-react';

interface MyDocument {
  id: string;
  clientName: string;
  requestType: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  createdAt: Date;
  updatedAt: Date;
  assignedBureau: string;
  urgency: 'low' | 'medium' | 'high';
  progress: number;
  documents: string[];
}

const MyDocuments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterUrgency, setFilterUrgency] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');

  // Mock data - documents created by the secretary
  const [myDocuments] = useState<MyDocument[]>([
    {
      id: '1',
      clientName: 'Jean Mballa',
      requestType: 'Titre Foncier',
      status: 'in-progress',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date(),
      assignedBureau: 'Bureau Études Juridiques',
      urgency: 'high',
      progress: 65,
      documents: ['CNI.pdf', 'Acte_vente.pdf', 'Plan_terrain.pdf']
    },
    {
      id: '2',
      clientName: 'Marie Nguema',
      requestType: 'Étude Topographique',
      status: 'in-progress',
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date(),
      assignedBureau: 'Bureau Études Techniques',
      urgency: 'medium',
      progress: 25,
      documents: ['CNI.pdf', 'Autorisation.pdf']
    },
    {
      id: '3',
      clientName: 'Paul Essomba',
      requestType: 'Bornage de Terrain',
      status: 'completed',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-18'),
      assignedBureau: 'Bureau Procédures Admin',
      urgency: 'low',
      progress: 100,
      documents: ['CNI.pdf', 'Titre_propriete.pdf', 'Plan_cadastral.pdf']
    },
    {
      id: '4',
      clientName: 'Alice Nkomo',
      requestType: 'Certificat de Propriété',
      status: 'pending',
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20'),
      assignedBureau: 'En attente d\'assignation',
      urgency: 'medium',
      progress: 0,
      documents: ['CNI.pdf', 'Contrat_achat.pdf']
    },
    {
      id: '5',
      clientName: 'Robert Fouda',
      requestType: 'Régularisation Foncière',
      status: 'blocked',
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-19'),
      assignedBureau: 'Bureau Études Juridiques',
      urgency: 'high',
      progress: 40,
      documents: ['CNI.pdf', 'Ancien_titre.pdf', 'Justificatifs.pdf']
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'blocked': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'blocked': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'in-progress': return 'En cours';
      case 'pending': return 'En attente';
      case 'blocked': return 'Bloqué';
      default: return 'Inconnu';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredDocuments = myDocuments.filter(doc => {
    const matchesSearch = doc.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.requestType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    const matchesUrgency = filterUrgency === 'all' || doc.urgency === filterUrgency;
    return matchesSearch && matchesStatus && matchesUrgency;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return b.createdAt.getTime() - a.createdAt.getTime();
      case 'client':
        return a.clientName.localeCompare(b.clientName);
      case 'status':
        return a.status.localeCompare(b.status);
      case 'urgency':
        const urgencyOrder = { high: 3, medium: 2, low: 1 };
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      default:
        return 0;
    }
  });

  const getStatusStats = () => {
    const stats = {
      total: myDocuments.length,
      pending: myDocuments.filter(d => d.status === 'pending').length,
      inProgress: myDocuments.filter(d => d.status === 'in-progress').length,
      completed: myDocuments.filter(d => d.status === 'completed').length,
      blocked: myDocuments.filter(d => d.status === 'blocked').length
    };
    return stats;
  };

  const stats = getStatusStats();

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Mes Documents</h1>
                <p className="text-blue-100">Documents que j'ai créés et gérés</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{stats.total}</div>
              <div className="text-blue-200 text-sm">Documents totaux</div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-600 font-medium">En attente</p>
                  <p className="text-2xl font-bold text-yellow-800">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">En cours</p>
                  <p className="text-2xl font-bold text-blue-800">{stats.inProgress}</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Terminés</p>
                  <p className="text-2xl font-bold text-green-800">{stats.completed}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Bloqués</p>
                  <p className="text-2xl font-bold text-red-800">{stats.blocked}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par client ou type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="pending">En attente</option>
                  <option value="in-progress">En cours</option>
                  <option value="completed">Terminés</option>
                  <option value="blocked">Bloqués</option>
                </select>
                <select
                  value={filterUrgency}
                  onChange={(e) => setFilterUrgency(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">Toutes urgences</option>
                  <option value="high">Urgent</option>
                  <option value="medium">Moyen</option>
                  <option value="low">Faible</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="date">Trier par date</option>
                <option value="client">Trier par client</option>
                <option value="status">Trier par statut</option>
                <option value="urgency">Trier par urgence</option>
              </select>
              <div className="text-sm text-gray-600">
                {sortedDocuments.length} document(s) affiché(s)
              </div>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="p-6">
          <div className="space-y-4">
            {sortedDocuments.map((doc) => (
              <div key={doc.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{doc.clientName}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(doc.urgency)}`}>
                      {doc.urgency === 'high' ? 'Urgent' : doc.urgency === 'medium' ? 'Moyen' : 'Faible'}
                    </span>
                    <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${getStatusColor(doc.status)}`}>
                      {getStatusIcon(doc.status)}
                      <span>{getStatusText(doc.status)}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                      <span className="text-sm">Modifier</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">Voir</span>
                    </button>
                    <button className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                      <span className="text-sm">Télécharger</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Type de demande</p>
                    <p className="font-medium text-gray-900">{doc.requestType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Bureau assigné</p>
                    <p className="font-medium text-gray-900">{doc.assignedBureau}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date de création</p>
                    <p className="font-medium text-gray-900">{doc.createdAt.toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Dernière mise à jour</p>
                    <p className="font-medium text-gray-900">{doc.updatedAt.toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progression</span>
                    <span className="text-sm text-gray-600">{doc.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        doc.status === 'completed' ? 'bg-green-600' :
                        doc.status === 'blocked' ? 'bg-red-600' :
                        'bg-blue-600'
                      }`}
                      style={{ width: `${doc.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Documents */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Documents joints ({doc.documents.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {doc.documents.map((docName, index) => (
                      <span key={index} className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 cursor-pointer transition-colors">
                        <FileText className="w-4 h-4" />
                        <span>{docName}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sortedDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document trouvé</h3>
              <p className="text-gray-600">Aucun document ne correspond à vos critères de recherche.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyDocuments;