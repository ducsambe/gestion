import { Department, CompanyInfo, Bureau } from '../types';

export const BUREAUS: { [key: string]: Bureau[] } = {
  'land-cadastral': [
    {
      id: 'legal-studies',
      name: 'Bureau Études Juridiques et Conseil Fonciers',
      nameEn: 'Legal Studies and Land Advisory Office',
      nameFr: 'Bureau Études Juridiques et Conseil Fonciers',
      color: 'bg-blue-600',
      icon: 'Scale'
    },
    {
      id: 'technical-studies',
      name: 'Bureau Études Techniques et Topographiques',
      nameEn: 'Technical and Topographic Studies Office',
      nameFr: 'Bureau Études Techniques et Topographiques',
      color: 'bg-blue-500',
      icon: 'Map'
    },
    {
      id: 'administrative-procedures',
      name: 'Bureau Procédures à Suivre Administratives',
      nameEn: 'Administrative Procedures Office',
      nameFr: 'Bureau Procédures à Suivre Administratives',
      color: 'bg-blue-700',
      icon: 'FileCheck'
    }
  ],
  'financing': [
    {
      id: 'financial-engineering',
      name: 'Bureau Montage Financier et Ingénierie de Projet',
      nameEn: 'Financial Engineering and Project Management Office',
      nameFr: 'Bureau Montage Financier et Ingénierie de Projet',
      color: 'bg-orange-600',
      icon: 'Calculator'
    },
    {
      id: 'partnerships',
      name: 'Bureau Partenariat Apport et Suivi Investisseur',
      nameEn: 'Partnership and Investor Relations Office',
      nameFr: 'Bureau Partenariat Apport et Suivi Investisseur',
      color: 'bg-orange-500',
      icon: 'Handshake'
    },
    {
      id: 'coordination',
      name: 'Bureau Coordination Technique et Administrative',
      nameEn: 'Technical and Administrative Coordination Office',
      nameFr: 'Bureau Coordination Technique et Administrative',
      color: 'bg-orange-700',
      icon: 'Network'
    }
  ],
  'sales-management': [
    {
      id: 'legal-regulation',
      name: 'Bureau Suivi Juridique et Régulation Foncier',
      nameEn: 'Legal Monitoring and Land Regulation Office',
      nameFr: 'Bureau Suivi Juridique et Régulation Foncier',
      color: 'bg-gray-600',
      icon: 'Shield'
    },
    {
      id: 'commercialization',
      name: 'Bureau Commercialisation et Réseau de Vente',
      nameEn: 'Marketing and Sales Network Office',
      nameFr: 'Bureau Commercialisation et Réseau de Vente',
      color: 'bg-gray-500',
      icon: 'TrendingUp'
    },
    {
      id: 'property-management',
      name: 'Bureau Gestion Immobilier et Locative',
      nameEn: 'Property and Rental Management Office',
      nameFr: 'Bureau Gestion Immobilier et Locative',
      color: 'bg-gray-700',
      icon: 'Home'
    }
  ]
};

export const DEPARTMENTS: Department[] = [
  {
    id: 'land-cadastral',
    name: 'Département Gestion Foncier et Cadastrale',
    nameEn: 'Land and Cadastral Management Department',
    nameFr: 'Département Gestion Foncier et Cadastrale',
    color: 'bg-blue-700',
    icon: 'MapPin'
  },
  {
    id: 'financing',
    name: 'Département Financement Foncier et Immobilier',
    nameEn: 'Real Estate and Land Financing Department',
    nameFr: 'Département Financement Foncier et Immobilier',
    color: 'bg-orange-500',
    icon: 'CreditCard'
  },
  {
    id: 'sales-management',
    name: 'Département Vente et Gestion Immobilière',
    nameEn: 'Real Estate Sales and Management Department',
    nameFr: 'Département Vente et Gestion Immobilière',
    color: 'bg-gray-600',
    icon: 'Building'
  }
];

export const COMPANY_INFO: CompanyInfo = {
  name: 'GeoCasa Group',
  location: 'Yaoundé, Cameroun',
  openingHours: '08:00 - 18:00',
  phone: '+237 6XX XXX XXX',
  email: 'contact@geocasagroup.com'
};

export const TRANSLATIONS = {
  en: {
    login: 'Login',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    welcome: 'Welcome',
    selectLanguage: 'Select Language',
    selectDepartment: 'Select Department',
    dashboard: 'Dashboard',
    requests: 'Requests',
    settings: 'Settings',
    logout: 'Logout',
    openingHours: 'Opening Hours',
    location: 'Location',
    connectedAs: 'Connected as',
    device: 'Device',
    departments: {
      'land-cadastral': 'Land and Cadastral Management Department',
      'financing': 'Real Estate and Land Financing Department',
      'sales-management': 'Real Estate Sales and Management Department'
    }
  },
  fr: {
    login: 'Connexion',
    email: 'Email',
    password: 'Mot de passe',
    signIn: 'Se connecter',
    welcome: 'Bienvenue',
    selectLanguage: 'Choisir la langue',
    selectDepartment: 'Sélectionner le département',
    dashboard: 'Tableau de bord',
    requests: 'Demandes',
    settings: 'Paramètres',
    logout: 'Déconnexion',
    openingHours: 'Heures d\'ouverture',
    location: 'Localisation',
    connectedAs: 'Connecté en tant que',
    device: 'Appareil',
    departments: {
      'land-cadastral': 'Département Gestion Foncier et Cadastrale',
      'financing': 'Département Financement Foncier et Immobilier',
      'sales-management': 'Département Vente et Gestion Immobilière'
    }
  }
};