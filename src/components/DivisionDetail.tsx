import React from 'react';
import { ArrowLeft, Building, Users, Award, Star, ArrowRight } from 'lucide-react';
import { DIVISIONS } from '../constants';
import { User, Office } from '../types';
import LanguageSwitcher from './LanguageSwitcher';
import AnimatedBackground from './AnimatedBackground';

interface DivisionDetailProps {
  divisionId: string;
  user: User;
  onBack: () => void;
  onSelectOffice: (officeId: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const DivisionDetail: React.FC<DivisionDetailProps> = ({
  divisionId,
  user,
  onBack,
  onSelectOffice,
  language,
  setLanguage
}) => {
  const division = DIVISIONS.find(d => d.id === divisionId);

  if (!division) {
    return null;
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      {/* Language Switcher - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher language={language as any} onLanguageChange={setLanguage as any} />
      </div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Retour</span>
        </button>
      </div>

      <div className="relative z-10 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          
          {/* User Header */}
          <div className="mb-12 pt-16">
            <div className="bg-white/10 backdrop-blur-2xl rounded-[3rem] p-8 border border-white/30 shadow-2xl">
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                
                {/* User Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src="/default.png"
                    alt={user.name}
                    className="w-24 h-24 rounded-2xl object-cover border-4 border-white/30 shadow-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300';
                    }}
                  />
                </div>

                {/* User Information */}
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">{user.name}</h1>
                  <p className="text-blue-100 text-lg mb-4">{user.email}</p>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    <span className={`px-4 py-2 ${division.color} text-white rounded-full text-sm font-medium`}>
                      {division.nameFr}
                    </span>
                    <span className="px-4 py-2 bg-blue-500/30 text-blue-100 rounded-full text-sm border border-blue-400/30">
                      Superviseur
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Division Header */}
          <div className="text-center mb-12">
            <div className={`w-16 h-16 ${division.color} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl`}>
              <Building className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {language === 'en' ? division.nameEn : division.nameFr}
              </span>
            </h2>
            <p className="text-blue-100 text-xl max-w-3xl mx-auto leading-relaxed mb-6">
              {language === 'en' ? division.descriptionEn : division.description}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto"></div>
          </div>

          {/* Division Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/30 text-center">
              <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">45+</div>
              <div className="text-blue-100">Personnel Total</div>
            </div>
            <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/30 text-center">
              <Award className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">8+</div>
              <div className="text-blue-100">Années d'Expérience</div>
            </div>
            <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/30 text-center">
              <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-blue-100">Taux d'Efficacité</div>
            </div>
          </div>

          {/* Offices Section */}
          <div>
            <div className="text-center mb-12">
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Bureaux Spécialisés
              </h3>
              <p className="text-blue-100 text-lg">
                {division.offices.length} bureaux à votre disposition
              </p>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mt-4"></div>
            </div>

            <div className="space-y-12">
              {division.offices.map((office, index) => (
                <div
                  key={office.id}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fadeIn ${
                    index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'
                  }`}
                  style={{ animationDelay: `${index * 0.3}s` }}
                >
                  {/* Office Image */}
                  <div className={`${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-[3rem] transform rotate-1 scale-105"></div>
                      <div className="relative bg-white/10 backdrop-blur-2xl rounded-[3rem] p-6 border border-white/30 shadow-2xl">
                        <img
                          src={office.image}
                          alt={language === 'en' ? office.nameEn : office.nameFr}
                          className="w-full h-64 object-cover rounded-2xl shadow-lg"
                        />
                        
                        {/* Office Stats */}
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3">
                            <div className="grid grid-cols-3 gap-3 text-center">
                              <div>
                                <Users className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                                <div className="text-sm font-bold text-gray-900">12+</div>
                                <div className="text-xs text-gray-600">Employés</div>
                              </div>
                              <div>
                                <Award className="w-4 h-4 text-pink-600 mx-auto mb-1" />
                                <div className="text-sm font-bold text-gray-900">5+</div>
                                <div className="text-xs text-gray-600">Projets</div>
                              </div>
                              <div>
                                <Star className="w-4 h-4 text-yellow-600 mx-auto mb-1" />
                                <div className="text-sm font-bold text-gray-900">98%</div>
                                <div className="text-xs text-gray-600">Qualité</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Office Information */}
                  <div className={`text-white space-y-6 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div>
                      <div className={`w-12 h-12 ${office.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                        <Building className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          {language === 'en' ? office.nameEn : office.nameFr}
                        </span>
                      </h4>
                      <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mb-4"></div>
                      <p className="text-lg text-blue-100 leading-relaxed mb-6">
                        {language === 'en' ? office.descriptionEn : office.description}
                      </p>
                    </div>

                    {/* Office Features */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-blue-100">Équipe spécialisée</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-blue-100">Outils modernes</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span className="text-blue-100">Processus optimisés</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                      <button
                        onClick={() => onSelectOffice(office.id)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center space-x-3 shadow-xl hover:shadow-2xl transform hover:scale-105 group"
                      >
                        <span className="text-lg">Accéder au Bureau</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Information */}
          <div className="text-center mt-16 text-blue-100 text-sm space-y-3">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium">Excellence Opérationnelle</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="font-medium">Innovation Continue</span>
              </div>
            </div>
            <p className="font-medium">GeoCasa Group - {division.nameFr}</p>
            <p>Yaoundé, Cameroun • +237 6XX XXX XXX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DivisionDetail;