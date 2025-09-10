import React, { useState } from 'react';
import { 
  Send, 
  User, 
  FileText, 
  ArrowRight, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Search,
  Filter
} from 'lucide-react';

interface ClientDocument {
  id: string;
  clientName: string;
  requestType: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  status: 'pending' | 'routed' | 'processing';
  createdAt: Date;
  assignedBureau?: string;
  documents: string[];
}

const DocumentRouting: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  // Mock data
  const [clientDocuments] = useState<ClientDocument[]>([
    {
      id: '1',
      clientName: 'Jean Mballa',
      requestType: 'Titre Foncier',
      description: 'Demande de titre foncier pour terrain à Yaoundé',
      urgency: 'high',
      status: 'pending',
      createdAt: new Date('2024-01-15'),
      documents: ['CNI.pdf', 'Acte_vente.pdf', 'Plan_terrain.pdf']
    },
    {
      id: '2',
      clientName: 'Marie Nguema',
      requestType: 'Étude Topographique',
      description: 'Relevé topographique pour construction',
      urgency: 'medium',
      status: 'routed',
      createdAt: new Date('2024-01-16'),
      assignedBureau: 'technical-studies',
      documents: ['CNI.pdf', 'Autorisation.pdf']
    },
    {
      id: '3',
      clientName: 'Paul Essomba',
      requestType: 'Bornage de Terrain',
      description: 'Bornage officiel du terrain',
      urgency: 'low',
      status: 'processing',
      createdAt: new Date('2024-01-10'),
      assignedBureau: 'legal-studies',
      documents: ['CNI.pdf', 'Titre_propriete.pdf', 'Plan_cadastral.pdf']
    }
  ]);

  const bureaus = [
    { id: 'legal-studies', name: 'Bureau Études Juridiques', color: 'bg-blue-600' },
    { id: 'technical-studies', name: 'Bureau Études Techniques', color: 'bg-green-600' },
    { id: 'administrative-procedures', name: 'Bureau Procédures Admin', color: 'bg-amber-600' }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'routed': return <Send className="w-4 h-4 text-blue-600" />;
      case 'processing': return <CheckCircle className="w-4 h-4 text-green-600" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'routed': return 'Routé';
      case 'processing': return 'En traitement';
      default: return 'Inconnu';
    }
  };

  const handleRouteDocument = (documentId: string, bureauId: string) => {
    // Here you would implement the routing logic
    alert(`Document ${documentId} routé vers ${bureaus.find(b => b.id === bureauId)?.name}`);
  };

  const filteredDocuments = clientDocuments.filter(doc => {
    const matchesSearch = doc.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.requestType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl p-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Routage des Documents</h1>
              <p className="text-blue-100">Assignation des documents aux bureaux spécialisés</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
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
                  <option value="routed">Routés</option>
                  <option value="processing">En traitement</option>
                </select>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {filteredDocuments.length} document(s) trouvé(s)
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="p-6">
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <User className="w-5 h-5 text-gray-600" />
                        <h3 className="text-lg font-semibold text-gray-900">{doc.clientName}</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(doc.urgency)}`}>
                        {doc.urgency === 'high' ? 'Urgent' : doc.urgency === 'medium' ? 'Moyen' : 'Faible'}
                      </span>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(doc.status)}
                        <span className="text-sm text-gray-600">{getStatusText(doc.status)}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Type de demande</p>
                        <p className="font-medium text-gray-900">{doc.requestType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Date de création</p>
                        <p className="font-medium text-gray-900">{doc.createdAt.toLocaleDateString('fr-FR')}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-1">Description</p>
                      <p className="text-gray-900">{doc.description}</p>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Documents joints ({doc.documents.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {doc.documents.map((docName, index) => (
                          <span key={index} className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
                            <FileText className="w-4 h-4" />
                            <span>{docName}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {doc.assignedBureau && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 mb-1">Bureau assigné</p>
                        <span className={`inline-flex items-center space-x-2 px-3 py-1 ${bureaus.find(b => b.id === doc.assignedBureau)?.color} text-white rounded-lg text-sm`}>
                          <span>{bureaus.find(b => b.id === doc.assignedBureau)?.name}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Routing Actions */}
                {doc.status === 'pending' && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-3">Assigner à un bureau :</p>
                    <div className="flex flex-wrap gap-3">
                      {bureaus.map((bureau) => (
                        <button
                          key={bureau.id}
                          onClick={() => handleRouteDocument(doc.id, bureau.id)}
                          className={`flex items-center space-x-2 px-4 py-2 ${bureau.color} text-white rounded-lg hover:opacity-90 transition-opacity`}
                        >
                          <ArrowRight className="w-4 h-4" />
                          <span className="text-sm">{bureau.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
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

export default DocumentRouting;