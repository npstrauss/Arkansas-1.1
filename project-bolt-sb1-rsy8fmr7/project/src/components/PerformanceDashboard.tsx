import { useState, useMemo } from 'react';
import { SAMPLE_KPIS, INITIATIVES, ARKANSAS_COUNTIES, FACILITIES } from '../data/constants';
import { Filter, Search, Download, FileText, BarChart2 } from 'lucide-react';
import { getRuralAccessFootprint } from '../data/dataLoader';
import SummaryCards from './SummaryCards';
import KPICardGrid, { KPIDetailPanel } from './KPICardGrid';
import VisualAnalytics from './VisualAnalytics';

type StatusFilter = 'All' | 'On Track' | 'At Risk' | 'Off Track';

export default function PerformanceDashboard() {
  const [selectedInitiative, setSelectedInitiative] = useState<string>('All');
  const [selectedProgram, setSelectedProgram] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedKPI, setSelectedKPI] = useState<any>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const accessFootprint = getRuralAccessFootprint();

  const ruralAccessKPI = {
    name: 'Rural Access Footprint',
    initiative: 'Access & Infrastructure',
    program: 'All Programs',
    target: accessFootprint.target,
    actual: accessFootprint.actual,
    unit: 'counties'
  };

  const allKPIs = [ruralAccessKPI, ...SAMPLE_KPIS];

  const getStatus = (percentage: number) => {
    if (isNaN(percentage)) return 'Missing Data';
    if (percentage >= 90) return 'On Track';
    if (percentage >= 75) return 'At Risk';
    return 'Off Track';
  };

  const filteredKPIs = useMemo(() => {
    return allKPIs.filter(kpi => {
      const initiativeMatch = selectedInitiative === 'All' || kpi.initiative === selectedInitiative;
      const programMatch = selectedProgram === 'All' || kpi.program === selectedProgram;

      const percentage = (kpi.actual / kpi.target) * 100;
      const status = getStatus(percentage);
      const statusMatch = statusFilter === 'All' || status === statusFilter;

      const searchMatch = searchQuery === '' ||
        kpi.name.toLowerCase().includes(searchQuery.toLowerCase());

      return initiativeMatch && programMatch && statusMatch && searchMatch;
    });
  }, [selectedInitiative, selectedProgram, statusFilter, searchQuery, allKPIs]);

  const availablePrograms = useMemo(() => {
    if (selectedInitiative === 'All') return [];
    const initiative = INITIATIVES.find(i => i.name === selectedInitiative);
    return initiative ? initiative.programs : [];
  }, [selectedInitiative]);

  const summaryStats = useMemo(() => {
    let onTrack = 0, atRisk = 0, offTrack = 0;
    let totalPercentage = 0;
    let validCount = 0;

    allKPIs.forEach(kpi => {
      const percentage = (kpi.actual / kpi.target) * 100;
      if (!isNaN(percentage)) {
        totalPercentage += percentage;
        validCount++;

        if (percentage >= 90) onTrack++;
        else if (percentage >= 75) atRisk++;
        else offTrack++;
      }
    });

    const overallScore = validCount > 0 ? totalPercentage / validCount : 0;
    const ruralCounties = ARKANSAS_COUNTIES.filter(c => c.isRural).length;
    const totalFacilities = FACILITIES.length;

    return {
      overallScore,
      onTrack,
      atRisk,
      offTrack,
      countiesImpacted: ruralCounties,
      totalFacilities
    };
  }, [allKPIs]);

  const handleExport = (format: 'pdf' | 'csv') => {
    alert(`Export to ${format.toUpperCase()} - Feature coming soon!`);
    setShowExportMenu(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Performance Cockpit Dashboard</h2>
            <p className="text-blue-100">Real-time KPI tracking and analytics</p>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10">
                <button
                  onClick={() => handleExport('pdf')}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                >
                  <FileText className="w-4 h-4" />
                  Export to PDF
                </button>
                <button
                  onClick={() => handleExport('csv')}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                >
                  <BarChart2 className="w-4 h-4" />
                  Export to CSV
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <SummaryCards {...summaryStats} />

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 sticky top-0 z-10">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-900">KPI Explorer</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search KPIs
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type to search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="initiative-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Initiative
            </label>
            <select
              id="initiative-filter"
              value={selectedInitiative}
              onChange={(e) => {
                setSelectedInitiative(e.target.value);
                setSelectedProgram('All');
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Initiatives</option>
              {INITIATIVES.map((initiative) => (
                <option key={initiative.name} value={initiative.name}>
                  {initiative.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="program-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Program
            </label>
            <select
              id="program-filter"
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={selectedInitiative === 'All'}
            >
              <option value="All">All Programs</option>
              {availablePrograms.map((program) => (
                <option key={program.name} value={program.name}>
                  {program.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="On Track">On Track</option>
              <option value="At Risk">At Risk</option>
              <option value="Off Track">Off Track</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredKPIs.length} of {allKPIs.length} KPIs
          </p>
          {(selectedInitiative !== 'All' || selectedProgram !== 'All' || statusFilter !== 'All' || searchQuery !== '') && (
            <button
              onClick={() => {
                setSelectedInitiative('All');
                setSelectedProgram('All');
                setStatusFilter('All');
                setSearchQuery('');
              }}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Visual Analytics</h3>
        <VisualAnalytics kpis={allKPIs} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">KPI Performance Cards</h3>
        {filteredKPIs.length > 0 ? (
          <KPICardGrid kpis={filteredKPIs} onKPIClick={setSelectedKPI} />
        ) : (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No KPIs match your current filters</p>
            <button
              onClick={() => {
                setSelectedInitiative('All');
                setSelectedProgram('All');
                setStatusFilter('All');
                setSearchQuery('');
              }}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {selectedKPI && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSelectedKPI(null)}
          />
          <KPIDetailPanel kpi={selectedKPI} onClose={() => setSelectedKPI(null)} />
        </>
      )}
    </div>
  );
}
