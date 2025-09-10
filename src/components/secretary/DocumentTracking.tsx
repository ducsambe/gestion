import React, { useState } from 'react';
import { 
  Eye, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  User,
  Calendar,
  MapPin,
  Search,
  Filter,
  Download,
  MessageSquare
} from 'lucide-react';

interface DocumentProgress {
  id: string;
  clientName: string;
  requestType: string;
  currentBureau: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  progress: number;
  createdAt: Date;
  updatedAt: Date;
  urgency: 'low' | 'medium' | 'high';
  steps: DocumentStep[];
  comments: Comment[];
}

interface DocumentStep {
  id: string;
  bureauName: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  startDate?: Date;
  endDate?: Date;
  comment?: string;
}

interface Comment {
  id: string;
  author: string;
  message: string;
  date: Date;
  bureau: string;
}

const DocumentTracking: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedDocument, setSelectedDocument] = useState<DocumentProgress | null>(null);

  // Mock data
  const [documents] = useState<DocumentProgress[]>([
    {
      id: '1',
      clientName: 'Jean Mballa',
      requestType: 'Titre Foncier',
      currentBureau: 'Bureau Études Juridiques',
      status: 'in-progress',
      progress: 65,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date(),
      urgency: 'high',
      steps: [
        { id: '1', bureauName: 'Secrétariat', status: 'completed', startDate: new Date('2024-01-15'), endDate: new Date('2024-01-15') },
        { id: '2', bureauName: 'Bureau Études Juridiques', status: 'in-progress', startDate: new Date('2024-01-16') },
        { id: '3', bureauName: 'Bureau Procédures Admin', status: 'pending' }
      ],
      comments: [
        { id: '1', author: 'Marie Secrétaire', message: 'Dossier reçu et vérifié', date: new Date('2024-01-15'), bureau: 'Secrétariat' },
        { id: '2', author: 'Paul Juriste', message: 'Vérification des documents en cours', date: new Date('2024-01-16'), bureau: 'Bureau Études Juridiques' }
      ]
    },
    {
      id: '2',
      clientName: 'Marie Nguema',
      requestType: 'Étude Topographique',
      currentBureau: 'Bureau Études Techniques',
      status: 'in-progress',
      progress: 25,
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date(),
      urgency: 'medium',
      steps: [
        { id: '1', bureauName: 'Secrétariat', status: 'completed', startDate: new Date('2024-01-16'), endDate: new Date('2024-01-16') },
        { id: '2', bureauName: 'Bureau Études Techniques', status: 'in-progress', startDate: new Date('2024-01-17') }
      ],
      comments: [
        { id: '1', author: 'Marie Secrétaire', message: 'Documents transmis au bureau technique', date: new Date('2024-01-16'), bureau: 'Secrétariat' }
      ]
    },
    {
      id: '3',
      clientName: 'Paul Essomba',
      requestType: 'Bornage de Terrain',
      currentBureau: 'Bureau Procédures Admin',
      status: 'completed',
      progress: 100,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date(),
      urgency: 'low',
      steps: [
        { id: '1', bureauName: 'Secrétariat', status: 'completed', startDate: new Date('2024-01-10'), endDate: new Date('2024-01-10') },
        { id: '2', bureauName: 'Bureau Études Juridiques', status: 'completed', startDate: new Date('2024-01-11'), endDate: new Date('2024-01-13') },
        { id: '3', bureauName: 'Bureau Procédures Admin', status: 'completed', startDate: new Date('2024-01-14'), endDate: new Date('2024-01-18') }
      ],
      comments: [
        { id: '1', author: 'Marie Secrétaire', message: 'Dossier complet reçu', date: new Date('2024-01-10'), bureau: 'Secrétariat' },
        { id: '2', author: 'Paul Juriste', message: 'Vérification juridique terminée', date: new Date('2024-01-13'), bureau: 'Bureau Études Juridiques' },
        { id: '3', author: 'Admin Proc', message: 'Procédure administrative finalisée', date: new Date('2024-01-18'), bureau: 'Bureau Procédures Admin' }
      ]
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

  const filteredDocuments = documents.filter(doc => {
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
              <Eye className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Suivi des Documents</h1>
              <p className="text-blue-100">Visualisation du processus de traitement des documents</p>
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
                  <option value="in-progress">En cours</option>
                  <option value="completed">Terminés</option>
                  <option value="blocked">Bloqués</option>
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
                  <button
                    onClick={() => setSelectedDocument(doc)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Voir Détails</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Type de demande</p>
                    <p className="font-medium text-gray-900">{doc.requestType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Bureau actuel</p>
                    <p className="font-medium text-gray-900">{doc.currentBureau}</p>
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
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${doc.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Steps Preview */}
                <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                  {doc.steps.map((step, index) => (
                    <div key={step.id} className="flex items-center space-x-2 min-w-max">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(step.status)}`}>
                        {getStatusIcon(step.status)}
                      </div>
                      <span className="text-sm text-gray-700">{step.bureauName}</span>
                      {index < doc.steps.length - 1 && (
                        <div className="w-8 h-0.5 bg-gray-300"></div>
                      )}
                    </div>
                  ))}
                </div>
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

      {/* Document Detail Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedDocument.clientName}</h2>
                  <p className="text-blue-100">{selectedDocument.requestType}</p>
                </div>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="text-white hover:text-gray-200 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Document Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Statut</p>
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${getStatusColor(selectedDocument.status)}`}>
                      {getStatusIcon(selectedDocument.status)}
                      <span>{getStatusText(selectedDocument.status)}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Urgence</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(selectedDocument.urgency)}`}>
                      {selectedDocument.urgency === 'high' ? 'Urgent' : selectedDocument.urgency === 'medium' ? 'Moyen' : 'Faible'}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Date de création</p>
                    <p className="font-medium text-gray-900">{selectedDocument.createdAt.toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Dernière mise à jour</p>
                    <p className="font-medium text-gray-900">{selectedDocument.updatedAt.toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Étapes du processus</h3>
                <div className="space-y-4">
                  {selectedDocument.steps.map((step, index) => (
                    <div key={step.id} className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getStatusColor(step.status)}`}>
                        {getStatusIcon(step.status)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{step.bureauName}</h4>
                        <p className="text-sm text-gray-600">
                          {step.status === 'completed' && step.startDate && step.endDate && 
                            `Du ${step.startDate.toLocaleDateString('fr-FR')} au ${step.endDate.toLocaleDateString('fr-FR')}`
                          }
                          {step.status === 'in-progress' && step.startDate && 
                            `Démarré le ${step.startDate.toLocaleDateString('fr-FR')}`
                          }
                          {step.status === 'pending' && 'En attente de traitement'}
                        </p>
                        {step.comment && (
                          <p className="text-sm text-gray-700 mt-1 italic">"{step.comment}"</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Commentaires ({selectedDocument.comments.length})</span>
                </h3>
                <div className="space-y-4">
                  {selectedDocument.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{comment.author}</span>
                          <span className="text-sm text-gray-500">• {comment.bureau}</span>
                        </div>
                        <span className="text-sm text-gray-500">{comment.date.toLocaleDateString('fr-FR')}</span>
                      </div>
                      <p className="text-gray-700">{comment.message}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Télécharger</span>
                </button>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentTracking;