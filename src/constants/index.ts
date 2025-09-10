import { Department, CompanyInfo } from '../types';

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
    welcome: 'Welcome to',
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
    welcome: 'Bienvenue chez',
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