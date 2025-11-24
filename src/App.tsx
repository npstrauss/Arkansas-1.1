import { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ProgramOverview from './components/ProgramOverview';
import InitiativesPrograms from './components/InitiativesPrograms';
import RuralHealthMap from './components/RuralHealthMap';
import Expenditures from './components/Expenditures';
import PerformanceDashboard from './components/PerformanceDashboard';

function App() {
  const [activeSection, setActiveSection] = useState('overview');

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <ProgramOverview />;
      case 'initiatives':
        return <InitiativesPrograms />;
      case 'map':
        return <RuralHealthMap />;
      case 'expenditures':
        return <Expenditures />;
      case 'performance':
        return <PerformanceDashboard />;
      default:
        return <ProgramOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation activeSection={activeSection} onNavigate={setActiveSection} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {activeSection === 'overview' && 'Program Overview'}
            {activeSection === 'initiatives' && 'Initiatives & Programs'}
            {activeSection === 'map' && 'Arkansas Rural Health Map'}
            {activeSection === 'expenditures' && 'Expenditures Over Time'}
            {activeSection === 'performance' && 'Performance Dashboard'}
          </h2>
        </div>

        {renderSection()}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Prototype developed by Alvarez & Marsal Public Sector Services — for Arkansas DFA RHTP proposal
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
