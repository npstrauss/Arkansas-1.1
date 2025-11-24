import { useState } from 'react';
import { INITIATIVES } from '../data/constants';
import { Filter } from 'lucide-react';

export default function InitiativesPrograms() {
  const [selectedInitiative, setSelectedInitiative] = useState<string>('All');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const filteredInitiatives = selectedInitiative === 'All'
    ? INITIATIVES
    : INITIATIVES.filter(i => i.name === selectedInitiative);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Filter className="w-5 h-5 text-gray-500" />
        <label htmlFor="initiative-filter" className="text-sm font-medium text-gray-700">
          Filter by Initiative:
        </label>
        <select
          id="initiative-filter"
          value={selectedInitiative}
          onChange={(e) => setSelectedInitiative(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="All">All Initiatives</option>
          {INITIATIVES.map((initiative) => (
            <option key={initiative.name} value={initiative.name}>
              {initiative.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInitiatives.map((initiative) => (
          <div
            key={initiative.name}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-blue-900">{initiative.name}</h3>
                <span className="text-lg font-semibold text-teal-700">
                  {formatCurrency(initiative.funding)}
                </span>
              </div>
              <p className="text-sm text-gray-600">{initiative.fullName}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Programs</h4>
              <ul className="space-y-2">
                {initiative.programs.map((program) => (
                  <li
                    key={program.name}
                    className="flex items-start gap-2 text-sm"
                  >
                    <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-teal-500"></span>
                    <div>
                      <span className="font-medium text-gray-900">{program.name}</span>
                      <span className="text-gray-500"> — {program.fullName}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Total Program Count:</span> {filteredInitiatives.reduce((acc, i) => acc + i.programs.length, 0)} programs across {filteredInitiatives.length} {filteredInitiatives.length === 1 ? 'initiative' : 'initiatives'}
        </p>
      </div>
    </div>
  );
}
