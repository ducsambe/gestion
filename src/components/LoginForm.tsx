import React, { useState } from 'react';
import { Mail, Lock, LogIn, Loader } from 'lucide-react';
import { LoginCredentials } from '../types';

interface LoginFormProps {
  onLogin: (credentials: LoginCredentials) => void;
  loading: boolean;
  t: (key: string) => string;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, loading, t }) => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
          <input
            type="email"
            value={credentials.email}
            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            placeholder={t('email')}
            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 text-lg"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-300" />
          <input
            type="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            placeholder={t('password')}
            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 text-lg"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 group disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          {loading ? (
            <>
              <Loader className="w-6 h-6 animate-spin" />
              <span className="text-lg">Connexion en cours...</span>
            </>
          ) : (
            <>
              <LogIn className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              <span className="text-lg">{t('signIn')}</span>
            </>
          )}
        </button>
      </form>

      {/* Demo credentials hint */}
      {/* <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
        <p className="text-sm text-blue-200 font-semibold mb-3 text-center">Comptes de démonstration:</p>
        <div className="text-xs text-blue-100 space-y-2">
          <p>jean@geocasagroup.com / password (2 depts)</p>
          <p>marie@geocasagroup.com / password (1 dept)</p>
          <p>paul@geocasagroup.com / password (all depts)</p>
        </div>
      </div> */}
    </div>
  );
};

export default LoginForm;