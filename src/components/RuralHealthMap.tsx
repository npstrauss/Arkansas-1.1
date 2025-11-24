import { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Filter, Search } from 'lucide-react';
import { getRuralHealthFacilities, getFacilitySummary } from '../data/dataLoader';
import 'leaflet/dist/leaflet.css';

const hospitalIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0iI2VmNDQ0NCIvPjxwYXRoIGQ9Ik0xMiA4VjE2TTggMTJIMTYiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

const fqhcIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0iIzM2ODdhZCIvPjxwYXRoIGQ9Ik04IDEwSDE2VjE4SDhWMTBaTTEwIDZIMTRWMTBIMTBWNloiIGZpbGw9IndoaXRlIi8+PC9zdmc+',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

const clinicIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0iIzE0Yjg5NiIvPjxyZWN0IHg9IjgiIHk9IjkiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IndoaXRlIi8+PC9zdmc+',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30]
});

const multipleIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNCIgZmlsbD0iI2Y5N2MxNiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIi8+PHRleHQgeD0iMTYiIHk9IjIxIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+KzwvdGV4dD48L3N2Zz4=',
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36]
});

const getIcon = (type: string) => {
  switch (type) {
    case 'Hospital':
      return hospitalIcon;
    case 'FQHC':
      return fqhcIcon;
    case 'Rural Health Clinic':
      return clinicIcon;
    default:
      return hospitalIcon;
  }
};

export default function RuralHealthMap() {
  const facilities = getRuralHealthFacilities();
  const summary = getFacilitySummary();

  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(
    new Set(['FQHC', 'Hospital', 'Rural Health Clinic'])
  );
  const [selectedCounty, setSelectedCounty] = useState<string>('All');

  const toggleType = (type: string) => {
    const newTypes = new Set(selectedTypes);
    if (newTypes.has(type)) {
      newTypes.delete(type);
    } else {
      newTypes.add(type);
    }
    setSelectedTypes(newTypes);
  };

  const filteredFacilities = useMemo(() => {
    return facilities.filter(facility => {
      if (!facility.latitude || !facility.longitude) return false;
      const typeMatch = selectedTypes.has(facility.type);
      const countyMatch = selectedCounty === 'All' || facility.county === selectedCounty;
      return typeMatch && countyMatch;
    });
  }, [facilities, selectedTypes, selectedCounty]);

  const groupedByLocation = useMemo(() => {
    const groups = new Map<string, typeof filteredFacilities>();

    filteredFacilities.forEach(facility => {
      const key = `${facility.latitude},${facility.longitude}`;
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(facility);
    });

    return Array.from(groups.values());
  }, [filteredFacilities]);

  const uniqueCounties = useMemo(() => {
    return Array.from(new Set(facilities.map(f => f.county))).sort();
  }, [facilities]);

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <div>
            <span className="font-semibold text-blue-900">Rural counties: </span>
            <span className="text-blue-700">{summary.uniqueRuralCounties}</span>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <span className="font-semibold text-blue-900">Hospitals: </span>
              <span className="text-blue-700">{summary.ruralHospitals}</span>
            </div>
            <span className="text-blue-400">|</span>
            <div>
              <span className="font-semibold text-blue-900">FQHCs: </span>
              <span className="text-blue-700">{summary.ruralFQHCs}</span>
            </div>
            <span className="text-blue-400">|</span>
            <div>
              <span className="font-semibold text-blue-900">Clinics: </span>
              <span className="text-blue-700">{summary.ruralHealthClinics}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Facility Types:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {['FQHC', 'Hospital', 'Rural Health Clinic'].map((type) => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTypes.has(type)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 text-gray-500" />
          <label htmlFor="county-filter" className="text-sm font-medium text-gray-700">
            Filter by County:
          </label>
          <select
            id="county-filter"
            value={selectedCounty}
            onChange={(e) => setSelectedCounty(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="All">All Counties</option>
            {uniqueCounties.map((county) => (
              <option key={county} value={county}>
                {county}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Arkansas Rural Health Facilities Map</h3>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-gray-600">FQHC</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-600">Hospital</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-teal-500"></div>
              <span className="text-gray-600">Clinic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span className="text-gray-600">Multiple</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border-2 border-gray-200" style={{ height: '600px' }}>
          <MapContainer
            center={[34.7465, -92.2896]}
            zoom={7}
            minZoom={7}
            maxZoom={12}
            maxBounds={[
              [32.5, -95.0],
              [36.5, -89.5]
            ]}
            maxBoundsViscosity={1.0}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {groupedByLocation.map((locationGroup, index) => {
              const firstFacility = locationGroup[0];
              const isMultiple = locationGroup.length > 1;

              return (
                <Marker
                  key={`location-${index}`}
                  position={[firstFacility.latitude!, firstFacility.longitude!]}
                  icon={isMultiple ? multipleIcon : getIcon(firstFacility.type)}
                >
                  <Popup maxWidth={300}>
                    <div className="p-2">
                      {isMultiple ? (
                        <>
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {locationGroup.length} Facilities at this Location
                          </h4>
                          <div className="space-y-3 max-h-60 overflow-y-auto">
                            {locationGroup.map((facility, idx) => (
                              <div key={facility.id} className={idx > 0 ? 'pt-3 border-t border-gray-200' : ''}>
                                <h5 className="font-semibold text-gray-800 text-sm">{facility.name}</h5>
                                <p className="text-sm text-gray-700">
                                  <span className="font-medium">Type:</span> {facility.type}
                                </p>
                                <p className="text-sm text-gray-700">
                                  <span className="font-medium">County:</span> {facility.county}
                                </p>
                                <p className="text-xs text-gray-600">
                                  {facility.address}<br />
                                  {facility.city}, AR {facility.zip}
                                </p>
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <>
                          <h4 className="font-semibold text-gray-900 mb-1">{firstFacility.name}</h4>
                          <p className="text-sm text-gray-700 mb-1">
                            <span className="font-medium">Type:</span> {firstFacility.type}
                          </p>
                          <p className="text-sm text-gray-700 mb-1">
                            <span className="font-medium">County:</span> {firstFacility.county}
                          </p>
                          <p className="text-sm text-gray-600">
                            {firstFacility.address}<br />
                            {firstFacility.city}, AR {firstFacility.zip}
                          </p>
                        </>
                      )}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>

      <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
        <p className="text-sm text-teal-900">
          <span className="font-semibold">Showing:</span> {filteredFacilities.length} facilities
          {selectedCounty !== 'All' && ` in ${selectedCounty} County`}
        </p>
      </div>
    </div>
  );
}
