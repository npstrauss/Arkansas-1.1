import processedData from './processedData.json';
import type {
  RuralArea,
  RuralHealthFacility,
  FacilitySummary
} from '../types/facilities';

export interface CountyFacilities {
  county: string;
  hospitals: number;
  fqhcs: number;
  ruralHealthClinics: number;
  total: number;
}

export function getRuralAreas(): RuralArea[] {
  return processedData.ruralAreas as RuralArea[];
}

export function getRuralHealthFacilities(): RuralHealthFacility[] {
  return processedData.facilities as RuralHealthFacility[];
}

export function getFacilitySummary(): FacilitySummary {
  return processedData.summary as FacilitySummary;
}

export function getCountyFacilities(): CountyFacilities[] {
  const facilities = getRuralHealthFacilities();
  const countyMap = new Map<string, CountyFacilities>();

  facilities.forEach(facility => {
    if (!countyMap.has(facility.county)) {
      countyMap.set(facility.county, {
        county: facility.county,
        hospitals: 0,
        fqhcs: 0,
        ruralHealthClinics: 0,
        total: 0
      });
    }

    const county = countyMap.get(facility.county)!;
    county.total++;

    if (facility.type === 'Hospital') {
      county.hospitals++;
    } else if (facility.type === 'FQHC') {
      county.fqhcs++;
    } else if (facility.type === 'Rural Health Clinic') {
      county.ruralHealthClinics++;
    }
  });

  return Array.from(countyMap.values()).sort((a, b) =>
    a.county.localeCompare(b.county)
  );
}

export function getRuralAccessFootprint() {
  const ruralAreas = getRuralAreas();
  const facilities = getRuralHealthFacilities();

  const normalizeCountyName = (name: string) => {
    return name.replace(/ County$/i, '').trim();
  };

  const countiesWithFacilities = new Set(
    facilities.map(f => normalizeCountyName(f.county))
  );

  const ruralCounties = new Set(
    ruralAreas.map(area => normalizeCountyName(area.countyName))
  );

  const countiesServed = Array.from(ruralCounties).filter(
    county => countiesWithFacilities.has(county)
  ).length;

  const totalRuralCounties = ruralCounties.size;
  const percentage = totalRuralCounties > 0
    ? (countiesServed / totalRuralCounties) * 100
    : 0;

  return {
    target: totalRuralCounties,
    actual: countiesServed,
    percentage: percentage
  };
}
