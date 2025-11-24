import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface County {
  id: string;
  name: string;
  fips_code: string;
  is_rural: boolean;
  created_at: string;
}

export interface Facility {
  id: string;
  name: string;
  county_name: string;
  latitude: number;
  longitude: number;
  type: 'FQHC' | 'Hospital' | 'Rural Health Clinic';
  created_at: string;
}

export interface KPI {
  id: string;
  name: string;
  initiative: 'HEART' | 'PACT' | 'RISE AR' | 'THRIVE';
  program: string;
  target_value: number;
  actual_value: number;
  created_at: string;
}

export interface Expenditure {
  id: string;
  year: number;
  start_date: string;
  end_date: string;
  annual_ceiling: number;
  planned_expenditure: number;
  created_at: string;
}
