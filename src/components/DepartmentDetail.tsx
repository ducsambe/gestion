import React from 'react';
import { ArrowLeft, CheckCircle, Star, Users, Award } from 'lucide-react';
import { DEPARTMENTS } from '../constants';
import { Language } from '../types';
import LanguageSwitcher from './LanguageSwitcher';
import AnimatedBackground from './AnimatedBackground';

interface DepartmentDetailProps {
  departmentId: string;
  onBack: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const DepartmentDetail: React.FC<DepartmentDetailProps> = ({
  departmentId,
  onBack,
  language,
  setLanguage
}) => {
  const department = DEPARTMENTS.find(d => d.id === departmentId);

  if (!department) {
    return null;
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      {/* Language Switcher - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher language={language} onLanguageChange={setLanguage} />
      </div>

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-xl border border-white/30 hover:bg-white/20 transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>{language === 'en' ? 'Back' : 'Retour'}</span>
        </button>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Department Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-[3rem] transform rotate-2 scale-105"></div>
                <div className="relative bg-white/10 backdrop-blur-2xl rounded-[3rem] p-8 border border-white/30 shadow-2xl">
                  <img
                    src={department.image}
                    alt={language === 'en' ? department.nameEn : department.nameFr}
                    className="w-full h-80 object-cover rounded-2xl shadow-lg"
                  />
                  
                  {/* Stats Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="flex items-center justify-center mb-2">
                            <Users className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="text-2xl font-bold text-gray-900">50+</div>
                          <div className="text-xs text-gray-600">
                            {language === 'en' ? 'Experts' : 'Experts'}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center mb-2">
                            <Award className="w-5 h-5 text-orange-600" />
                          </div>
                          <div className="text-2xl font-bold text-gray-900">15+</div>
                          <div className="text-xs text-gray-600">
                            {language === 'en' ? 'Years' : 'Années'}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-center mb-2">
                            <Star className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div className="text-2xl font-bold text-gray-900">98%</div>
                          <div className="text-xs text-gray-600">
                            {language === 'en' ? 'Success' : 'Succès'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Department Information */}
            <div className="order-1 lg:order-2 text-white space-y-8">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                    {language === 'en' ? department.nameEn : department.nameFr}
                  </span>
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full mb-6"></div>
                <p className="text-xl text-blue-100 leading-relaxed">
                  {language === 'en' ? department.descriptionEn : department.description}
                </p>
              </div>

              {/* Services List */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  {language === 'en' ? 'Our Services' : 'Nos Services'}
                </h3>
                <div className="space-y-4">
                  {department.services.map((service, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <p className="text-blue-100 text-lg">{service}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <button
                  onClick={onBack}
                  className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center space-x-3 group shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  <span className="text-lg">
                    {language === 'en' ? 'Get Started' : 'Commencer'}
                  </span>
                  <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300 rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;