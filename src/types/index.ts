export interface User {
  id: string;
  name: string;
  email: string;
  departments: Department[];
  currentDepartment?: Department;
}

export interface Department {
  id: string;
  name: string;
  nameEn: string;
  nameFr: string;
  color: string;
  icon: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export type Language = 'en' | 'fr';

export interface CompanyInfo {
  name: string;
  location: string;
  openingHours: string;
  phone: string;
  email: string;
}