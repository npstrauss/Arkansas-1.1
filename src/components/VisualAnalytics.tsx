import { BarChart3, PieChart, Activity } from 'lucide-react';

interface KPI {
  name: string;
  initiative: string;
  program: string;
  target: number;
  actual: number;
}

interface VisualAnalyticsProps {
  kpis: KPI[];
}

export default function VisualAnalytics({ kpis }: VisualAnalyticsProps) {
  const getInitiativePerformance = () => {
    const initiatives = ['HEART', 'PACT', 'RISE AR', 'THRIVE'];
    return initiatives.map(initiative => {
      const initiativeKPIs = kpis.filter(kpi => kpi.initiative === initiative);
      if (initiativeKPIs.length === 0) return { name: initiative, percentage: 0 };

      const avgPercentage = initiativeKPIs.reduce((sum, kpi) => {
        const pct = (kpi.actual / kpi.target) * 100;
        return sum + (isNaN(pct) ? 0 : pct);
      }, 0) / initiativeKPIs.length;

      return { name: initiative, percentage: avgPercentage };
    });
  };

  const getStatusDistribution = () => {
    let onTrack = 0, atRisk = 0, offTrack = 0;

    kpis.forEach(kpi => {
      const percentage = (kpi.actual / kpi.target) * 100;
      if (isNaN(percentage)) return;
      if (percentage >= 90) onTrack++;
      else if (percentage >= 75) atRisk++;
      else offTrack++;
    });

    const total = onTrack + atRisk + offTrack;
    return [
      { label: 'On Track', count: onTrack, percentage: (onTrack / total) * 100, color: 'bg-green-500' },
      { label: 'At Risk', count: atRisk, percentage: (atRisk / total) * 100, color: 'bg-yellow-500' },
      { label: 'Off Track', count: offTrack, percentage: (offTrack / total) * 100, color: 'bg-red-500' }
    ];
  };

  const getAchievementRanges = () => {
    const ranges = [
      { label: '0-50%', min: 0, max: 50, count: 0, color: 'bg-red-400' },
      { label: '50-75%', min: 50, max: 75, count: 0, color: 'bg-orange-400' },
      { label: '75-90%', min: 75, max: 90, count: 0, color: 'bg-yellow-400' },
      { label: '90-100%', min: 90, max: 100, count: 0, color: 'bg-green-400' }
    ];

    kpis.forEach(kpi => {
      const percentage = (kpi.actual / kpi.target) * 100;
      if (isNaN(percentage)) return;

      for (const range of ranges) {
        if (percentage >= range.min && percentage < range.max) {
          range.count++;
          break;
        }
        if (percentage >= 90 && range.label === '90-100%') {
          range.count++;
          break;
        }
      }
    });

    return ranges;
  };

  const initiativePerformance = getInitiativePerformance();
  const statusDistribution = getStatusDistribution();
  const achievementRanges = getAchievementRanges();
  const maxInitiativePerf = Math.max(...initiativePerformance.map(i => i.percentage), 100);
  const maxRangeCount = Math.max(...achievementRanges.map(r => r.count), 1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Initiative Performance</h3>
        </div>
        <div className="space-y-4">
          {initiativePerformance.map((initiative, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{initiative.name}</span>
                <span className="text-sm font-bold text-gray-900">{initiative.percentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all"
                  style={{ width: `${(initiative.percentage / maxInitiativePerf) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="w-5 h-5 text-teal-600" />
          <h3 className="text-lg font-semibold text-gray-900">KPI Status Distribution</h3>
        </div>
        <div className="space-y-4">
          {statusDistribution.map((status, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{status.label}</span>
                <span className="text-sm font-bold text-gray-900">
                  {status.count} ({status.percentage.toFixed(0)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full ${status.color} transition-all`}
                  style={{ width: `${status.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total KPIs:</span>
            <span className="font-bold text-gray-900">
              {statusDistribution.reduce((sum, s) => sum + s.count, 0)}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Achievement Range</h3>
        </div>
        <div className="space-y-4">
          {achievementRanges.map((range, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{range.label}</span>
                <span className="text-sm font-bold text-gray-900">{range.count} KPIs</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full ${range.color} transition-all`}
                  style={{ width: `${(range.count / maxRangeCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
