import { PROGRAM_TIMELINE } from '../data/constants';
import { DollarSign, Calendar, Building2, MapPin } from 'lucide-react';
import { getFacilitySummary, getCountyFacilities } from '../data/dataLoader';

export default function ProgramOverview() {
  const summary = getFacilitySummary();
  const countyFacilities = getCountyFacilities();
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Program Summary</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>5-year rural health transformation program</li>
                <li>Total proposed funding: <span className="font-semibold text-gray-900">$1,000,000,000</span> across four core initiatives</li>
                <li>Annual grant structure: each year operates as a separate grant with a <span className="font-semibold text-gray-900">$200M</span> expenditure ceiling</li>
              </ul>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed">
                  The Arkansas RHTP will support transformation across approximately{' '}
                  <span className="font-semibold text-gray-900">{summary.uniqueRuralCounties}</span> rural counties
                  currently served by{' '}
                  <span className="font-semibold text-gray-900">{summary.ruralHospitals}</span> hospitals,{' '}
                  <span className="font-semibold text-gray-900">{summary.ruralFQHCs}</span> FQHCs, and{' '}
                  <span className="font-semibold text-gray-900">{summary.ruralHealthClinics}</span> rural health clinics.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-teal-50 rounded-lg">
              <Calendar className="w-6 h-6 text-teal-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Program Timeframe</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 pr-4 font-semibold text-gray-700">Year</th>
                      <th className="text-left py-2 pr-4 font-semibold text-gray-700">Start</th>
                      <th className="text-left py-2 pr-4 font-semibold text-gray-700">End</th>
                      <th className="text-right py-2 font-semibold text-gray-700">Ceiling</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PROGRAM_TIMELINE.map((row) => (
                      <tr key={row.year} className="border-b border-gray-100">
                        <td className="py-2 pr-4 text-gray-900">Year {row.year}</td>
                        <td className="py-2 pr-4 text-gray-600">{row.start}</td>
                        <td className="py-2 pr-4 text-gray-600">{row.end}</td>
                        <td className="py-2 text-right text-gray-900 font-medium">{formatCurrency(row.ceiling)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-emerald-50 rounded-lg">
            <Building2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rural Health Facilities in Arkansas</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-gray-900">{countyFacilities.filter(c => c.total >= 1).length}</div>
                <div className="text-sm text-gray-600 mt-1">
                  <MapPin className="inline w-3 h-3 mr-1" />
                  Rural Counties with ≥ 1 Facility
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{summary.ruralHospitals}</div>
                <div className="text-sm text-gray-600 mt-1">Rural Hospitals</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{summary.ruralFQHCs}</div>
                <div className="text-sm text-gray-600 mt-1">Rural FQHCs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{summary.ruralHealthClinics}</div>
                <div className="text-sm text-gray-600 mt-1">Rural Health Clinics</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">County-Level Facility Distribution</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">County</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700"># Hospitals</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700"># FQHCs</th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700"># Clinics</th>
              </tr>
            </thead>
            <tbody>
              {countyFacilities.map((county) => (
                <tr key={county.county} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-900 font-medium">{county.county}</td>
                  <td className="py-3 px-4 text-center text-gray-700">{county.hospitals}</td>
                  <td className="py-3 px-4 text-center text-gray-700">{county.fqhcs}</td>
                  <td className="py-3 px-4 text-center text-gray-700">{county.ruralHealthClinics}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-gray-300 bg-gray-50 font-semibold">
                <td className="py-3 px-4 text-gray-900">Total</td>
                <td className="py-3 px-4 text-center text-gray-900">{summary.ruralHospitals}</td>
                <td className="py-3 px-4 text-center text-gray-900">{summary.ruralFQHCs}</td>
                <td className="py-3 px-4 text-center text-gray-900">{summary.ruralHealthClinics}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
