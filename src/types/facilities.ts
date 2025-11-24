export type FacilityType = "FQHC" | "Hospital" | "Rural Health Clinic";

export interface RuralArea {
  id: string;
  countyName: string;
  state: string;
  fipsCode: string;
  isRural: boolean;
  eligibility: string;
}

export interface FqhcFacility {
  id: string;
  name: string;
  address: string;
  city: string;
  county: string;
  zip: string;
  type: "FQHC";
}

export interface HospitalFacility {
  id: string;
  licenseNumber: string;
  name: string;
  facilityType: string;
  address: string;
  city: string;
  county: string;
  zip: string;
  phone: string;
  totalBeds: string;
  type: "Hospital";
}

export interface RuralHealthClinic {
  id: string;
  medicareProviderNumber: string;
  name: string;
  legalName: string;
  address: string;
  city: string;
  county: string;
  zip: string;
  phone: string;
  administrator: string;
  providerBased: string;
  type: "Rural Health Clinic";
}

export interface RuralHealthFacility {
  id: string;
  name: string;
  type: FacilityType;
  address: string;
  city: string;
  county: string;
  zip: string;
  latitude: number | null;
  longitude: number | null;
  ruralAreaId?: string;
}

export interface FacilitySummary {
  totalFacilities: number;
  ruralHospitals: number;
  ruralFQHCs: number;
  ruralHealthClinics: number;
  uniqueRuralCounties: number;
}
