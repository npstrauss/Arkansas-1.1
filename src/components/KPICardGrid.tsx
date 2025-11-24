import { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, X } from 'lucide-react';

interface KPI {
  name: string;
  initiative: string;
  program: string;
  target: number;
  actual: number;
  unit?: string;
}

interface KPICardGridProps {
  kpis: KPI[];
  onKPIClick: (kpi: KPI) => void;
}

export default function KPICardGrid({ kpis, onKPIClick }: KPICardGridProps) {
  const getStatus = (percentage: number) => {
    if (isNaN(percentage)) return { label: 'Missing Data', color: 'bg-gray-100 border-gray-300', textColor: 'text-gray-600', barColor: 'bg-gray-400' };
    if (percentage >= 90) return { label: 'On Track', color: 'bg-green-50 border-green-300', textColor: 'text-green-700', barColor: 'bg-green-500' };
    if (percentage >= 75) return { label: 'At Risk', color: 'bg-yellow-50 border-yellow-300', textColor: 'text-yellow-700', barColor: 'bg-yellow-500' };
    return { label: 'Off Track', color: 'bg-red-50 border-red-300', textColor: 'text-red-700', barColor: 'bg-red-500' };
  };

  const getTrendIcon = (percentage: number) => {
    if (isNaN(percentage)) return <Minus className="w-4 h-4 text-gray-400" />;
    if (percentage >= 90) return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (percentage >= 75) return <Minus className="w-4 h-4 text-yellow-600" />;
    return <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {kpis.map((kpi, idx) => {
        const percentage = (kpi.actual / kpi.target) * 100;
        const status = getStatus(percentage);

        return (
          <div
            key={idx}
            onClick={() => onKPIClick(kpi)}
            className={`${status.color} border-2 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all`}
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-900 flex-1 pr-2">{kpi.name}</h4>
              {getTrendIcon(percentage)}
            </div>

            <div className="mb-3">
              <div className="flex items-baseline gap-2 mb-1">
                <span className={`text-3xl font-bold ${status.textColor}`}>
                  {isNaN(percentage) ? 'N/A' : `${percentage.toFixed(1)}%`}
                </span>
              </div>
              <p className="text-xs text-gray-600">
                {kpi.actual.toLocaleString()} / {kpi.target.toLocaleString()} {kpi.unit || ''}
              </p>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
              <div
                className={`h-full ${status.barColor} transition-all`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600 font-medium">{kpi.initiative}</span>
              <span className={`px-2 py-1 rounded-full font-semibold ${status.color}`}>
                {status.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface KPIDetailPanelProps {
  kpi: KPI | null;
  onClose: () => void;
}

export function KPIDetailPanel({ kpi, onClose }: KPIDetailPanelProps) {
  if (!kpi) return null;

  const percentage = (kpi.actual / kpi.target) * 100;
  const getStatus = (percentage: number) => {
    if (isNaN(percentage)) return { label: 'Missing Data', color: 'bg-gray-100 border-gray-300', textColor: 'text-gray-600' };
    if (percentage >= 90) return { label: 'On Track', color: 'bg-green-50 border-green-300', textColor: 'text-green-700' };
    if (percentage >= 75) return { label: 'At Risk', color: 'bg-yellow-50 border-yellow-300', textColor: 'text-yellow-700' };
    return { label: 'Off Track', color: 'bg-red-50 border-red-300', textColor: 'text-red-700' };
  };

  const status = getStatus(percentage);

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white shadow-2xl z-50 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 pr-4">{kpi.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 flex-shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className={`${status.color} border-2 rounded-lg p-4 mb-6`}>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Achievement</p>
            <p className={`text-5xl font-bold ${status.textColor} mb-2`}>
              {isNaN(percentage) ? 'N/A' : `${percentage.toFixed(1)}%`}
            </p>
            <p className={`text-sm font-semibold px-3 py-1 rounded-full inline-block ${status.color}`}>
              {status.label}
            </p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Target</p>
            <p className="text-2xl font-bold text-gray-900">
              {kpi.target.toLocaleString()} {kpi.unit || ''}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Actual</p>
            <p className="text-2xl font-bold text-gray-900">
              {kpi.actual.toLocaleString()} {kpi.unit || ''}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 mb-1">Remaining</p>
            <p className="text-2xl font-bold text-gray-900">
              {(kpi.target - kpi.actual).toLocaleString()} {kpi.unit || ''}
            </p>
          </div>
        </div>

        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Initiative:</span>
            <span className="text-sm font-semibold text-gray-900">{kpi.initiative}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Program:</span>
            <span className="text-sm font-semibold text-gray-900">{kpi.program}</span>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Trend Analysis</h3>
          <div className="h-32 bg-white rounded flex items-center justify-center border border-blue-100">
            <p className="text-xs text-gray-500">Trend chart placeholder</p>
          </div>
        </div>

        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Notes</h3>
          <p className="text-sm text-gray-600">
            Performance tracking notes and insights will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
