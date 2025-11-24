import { useState } from 'react';
import { PROGRAM_TIMELINE, INITIAL_EXPENDITURES } from '../data/constants';
import { BarChart3, Edit3 } from 'lucide-react';

export default function Expenditures() {
  const [expenditures, setExpenditures] = useState(
    INITIAL_EXPENDITURES.map(e => ({ ...e }))
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatCurrencyShort = (amount: number) => {
    return `$${(amount / 1000000).toFixed(0)}M`;
  };

  const handleExpenditureChange = (year: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    setExpenditures(prev =>
      prev.map(e => e.year === year ? { ...e, planned: numValue } : e)
    );
  };

  const maxValue = 200000000;
  const chartHeight = 300;

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Annual Expenditures vs Ceiling</h3>
        </div>

        <div className="mb-8">
          <div className="flex items-end justify-around gap-4 pb-4 border-b-2 border-gray-300" style={{ height: chartHeight }}>
            {expenditures.map((exp) => {
              const ceilingPercent = (200000000 / maxValue) * 100;
              const plannedPercent = (exp.planned / maxValue) * 100;
              const isOverBudget = exp.planned > 200000000;

              return (
                <div key={exp.year} className="flex flex-col items-center flex-1">
                  <div className="relative w-full flex flex-col items-center justify-end" style={{ height: chartHeight - 20 }}>
                    <div
                      className="absolute bottom-0 w-full border-t-2 border-dashed border-gray-400"
                      style={{ bottom: `${ceilingPercent}%` }}
                    ></div>
                    <div
                      className={`w-full max-w-[80px] rounded-t-lg transition-all ${
                        isOverBudget ? 'bg-red-500' : 'bg-teal-500'
                      }`}
                      style={{ height: `${Math.min(plannedPercent, 100)}%` }}
                    >
                      <div className="text-white text-xs font-semibold text-center pt-2">
                        {formatCurrencyShort(exp.planned)}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-700 mt-2">Year {exp.year}</div>
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-end gap-4 mt-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-4 h-4 bg-teal-500 rounded"></div>
              <span className="text-gray-600">Planned</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-12 h-0.5 border-t-2 border-dashed border-gray-400"></div>
              <span className="text-gray-600">Ceiling ($200M)</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 pr-4 font-semibold text-gray-900">Year</th>
                <th className="text-left py-3 pr-4 font-semibold text-gray-900">Start</th>
                <th className="text-left py-3 pr-4 font-semibold text-gray-900">End</th>
                <th className="text-right py-3 pr-4 font-semibold text-gray-900">Annual Ceiling</th>
                <th className="text-right py-3 pr-4 font-semibold text-gray-900">Planned Expenditure</th>
                <th className="text-right py-3 font-semibold text-gray-900">% of Ceiling</th>
              </tr>
            </thead>
            <tbody>
              {expenditures.map((exp, idx) => {
                const timeline = PROGRAM_TIMELINE[idx];
                const percentage = (exp.planned / 200000000) * 100;
                const isOverBudget = exp.planned > 200000000;

                return (
                  <tr key={exp.year} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 pr-4 text-gray-900 font-medium">Year {exp.year}</td>
                    <td className="py-3 pr-4 text-gray-600">{timeline.start}</td>
                    <td className="py-3 pr-4 text-gray-600">{timeline.end}</td>
                    <td className="py-3 pr-4 text-right text-gray-900">{formatCurrency(200000000)}</td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center justify-end gap-2">
                        <Edit3 className="w-3 h-3 text-gray-400" />
                        <input
                          type="number"
                          value={exp.planned}
                          onChange={(e) => handleExpenditureChange(exp.year, e.target.value)}
                          className="w-32 px-2 py-1 text-right border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </td>
                    <td className={`py-3 text-right font-semibold ${
                      isOverBudget ? 'text-red-600' : percentage >= 90 ? 'text-yellow-600' : 'text-teal-600'
                    }`}>
                      {percentage.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-300 bg-gray-50">
                <td colSpan={3} className="py-3 pr-4 font-bold text-gray-900">Total</td>
                <td className="py-3 pr-4 text-right font-bold text-gray-900">
                  {formatCurrency(1000000000)}
                </td>
                <td className="py-3 pr-4 text-right font-bold text-gray-900">
                  {formatCurrency(expenditures.reduce((sum, e) => sum + e.planned, 0))}
                </td>
                <td className="py-3 text-right font-bold text-gray-900">
                  {((expenditures.reduce((sum, e) => sum + e.planned, 0) / 1000000000) * 100).toFixed(1)}%
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <span className="font-semibold">Note:</span> Adjust planned expenditures in the table to see real-time updates in the chart above. Values over the $200M ceiling will be highlighted in red.
        </p>
      </div>
    </div>
  );
}
