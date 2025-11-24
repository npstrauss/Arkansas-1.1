import { TrendingUp, AlertTriangle, CheckCircle, XCircle, MapPin, Building2 } from 'lucide-react';
import { useState } from 'react';

interface SummaryCardsProps {
  overallScore: number;
  onTrack: number;
  atRisk: number;
  offTrack: number;
  countiesImpacted: number;
  totalFacilities: number;
}

export default function SummaryCards({
  overallScore,
  onTrack,
  atRisk,
  offTrack,
  countiesImpacted,
  totalFacilities
}: SummaryCardsProps) {
  const [showModal, setShowModal] = useState<string | null>(null);

  const cards = [
    {
      id: 'score',
      title: 'RHTP Overall Performance',
      value: `${overallScore.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      description: 'Weighted average of all KPI achievement'
    },
    {
      id: 'initiatives',
      title: 'Initiative Status',
      value: `${onTrack + atRisk + offTrack}`,
      subtitle: `${onTrack} On Track / ${atRisk} At Risk / ${offTrack} Off Track`,
      icon: AlertTriangle,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600',
      description: 'Status distribution across all initiatives'
    },
    {
      id: 'counties',
      title: 'Counties Impacted',
      value: countiesImpacted.toString(),
      icon: MapPin,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      description: 'Rural counties with active programs'
    },
    {
      id: 'facilities',
      title: 'Rural Facilities',
      value: totalFacilities.toString(),
      icon: Building2,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      description: 'Healthcare facilities in rural areas'
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => setShowModal(card.id)}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <card.icon className={`w-6 h-6 ${card.iconColor}`} />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-2">{card.title}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-1">{card.value}</p>
            {card.subtitle && (
              <p className="text-xs text-gray-500">{card.subtitle}</p>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(null)}
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {cards.find(c => c.id === showModal)?.title}
              </h2>
              <button
                onClick={() => setShowModal(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              {cards.find(c => c.id === showModal)?.description}
            </p>
            <div className="space-y-4">
              {showModal === 'score' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Performance Breakdown:</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Average Achievement:</span>
                      <span className="font-semibold">{overallScore.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              )}
              {showModal === 'initiatives' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-700">On Track</span>
                    </div>
                    <span className="text-xl font-bold text-green-700">{onTrack}</span>
                  </div>
                  <div className="flex items-center justify-between bg-yellow-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium text-gray-700">At Risk</span>
                    </div>
                    <span className="text-xl font-bold text-yellow-700">{atRisk}</span>
                  </div>
                  <div className="flex items-center justify-between bg-red-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="font-medium text-gray-700">Off Track</span>
                    </div>
                    <span className="text-xl font-bold text-red-700">{offTrack}</span>
                  </div>
                </div>
              )}
              {showModal === 'counties' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Geographic Coverage:</p>
                  <p className="text-lg font-semibold text-gray-900">{countiesImpacted} rural counties have active healthcare programs</p>
                </div>
              )}
              {showModal === 'facilities' && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Healthcare Infrastructure:</p>
                  <p className="text-lg font-semibold text-gray-900">{totalFacilities} healthcare facilities serving rural populations</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
