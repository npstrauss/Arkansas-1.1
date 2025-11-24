const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const ARKANSAS_COUNTY_COORDS = {
  'arkansas': { lat: 34.2739, lon: -91.3468 },
  'ashley': { lat: 33.2025, lon: -91.7879 },
  'baxter': { lat: 36.3156, lon: -92.3918 },
  'benton': { lat: 36.3729, lon: -94.2088 },
  'boone': { lat: 36.2967, lon: -93.1154 },
  'bradley': { lat: 33.4539, lon: -92.2401 },
  'calhoun': { lat: 33.5556, lon: -92.5557 },
  'carroll': { lat: 36.3967, lon: -93.5488 },
  'chicot': { lat: 33.2964, lon: -91.2701 },
  'clark': { lat: 34.0917, lon: -93.1154 },
  'clay': { lat: 36.3951, lon: -90.3468 },
  'cleburne': { lat: 35.5267, lon: -92.0154 },
  'cleveland': { lat: 33.8739, lon: -92.1968 },
  'columbia': { lat: 33.2328, lon: -93.2088 },
  'conway': { lat: 35.2267, lon: -92.8918 },
  'craighead': { lat: 35.8356, lon: -90.7043 },
  'crawford': { lat: 35.5967, lon: -94.2701 },
  'crittenden': { lat: 35.2356, lon: -90.3088 },
  'cross': { lat: 35.2917, lon: -90.7879 },
  'dallas': { lat: 33.9556, lon: -92.6401 },
  'desha': { lat: 33.8739, lon: -91.2701 },
  'drew': { lat: 33.6017, lon: -91.7318 },
  'faulkner': { lat: 35.1356, lon: -92.3918 },
  'franklin': { lat: 35.5267, lon: -93.8918 },
  'fulton': { lat: 36.3951, lon: -91.7879 },
  'garland': { lat: 34.5017, lon: -93.0557 },
  'grant': { lat: 34.2328, lon: -92.4401 },
  'greene': { lat: 36.1356, lon: -90.5557 },
  'hempstead': { lat: 33.7739, lon: -93.6401 },
  'hot spring': { lat: 34.2917, lon: -92.8918 },
  'howard': { lat: 34.0917, lon: -94.1154 },
  'independence': { lat: 35.7267, lon: -91.4918 },
  'izard': { lat: 36.0967, lon: -91.9401 },
  'jackson': { lat: 35.5967, lon: -91.2088 },
  'jefferson': { lat: 34.2328, lon: -91.9401 },
  'johnson': { lat: 35.5267, lon: -93.3918 },
  'lafayette': { lat: 33.2739, lon: -93.5557 },
  'lawrence': { lat: 36.0356, lon: -91.0557 },
  'lee': { lat: 34.7739, lon: -90.7879 },
  'lincoln': { lat: 33.9556, lon: -91.7318 },
  'little river': { lat: 33.6017, lon: -94.2701 },
  'logan': { lat: 35.2267, lon: -93.6401 },
  'lonoke': { lat: 34.7739, lon: -91.8918 },
  'madison': { lat: 35.9967, lon: -93.7318 },
  'marion': { lat: 36.2967, lon: -92.6401 },
  'miller': { lat: 33.3739, lon: -93.8918 },
  'mississippi': { lat: 35.8356, lon: -90.1154 },
  'monroe': { lat: 34.7739, lon: -91.2088 },
  'montgomery': { lat: 34.5017, lon: -93.6401 },
  'nevada': { lat: 33.7739, lon: -93.2088 },
  'newton': { lat: 35.9967, lon: -93.1154 },
  'ouachita': { lat: 33.6017, lon: -92.8918 },
  'perry': { lat: 35.0356, lon: -92.8918 },
  'phillips': { lat: 34.4128, lon: -90.7043 },
  'pike': { lat: 34.0917, lon: -93.6401 },
  'poinsett': { lat: 35.5967, lon: -90.7043 },
  'polk': { lat: 34.5017, lon: -94.2701 },
  'pope': { lat: 35.4267, lon: -93.0557 },
  'prairie': { lat: 34.7739, lon: -91.4918 },
  'pulaski': { lat: 34.7489, lon: -92.2746 },
  'randolph': { lat: 36.2967, lon: -91.0557 },
  'st. francis': { lat: 34.9556, lon: -90.7879 },
  'saline': { lat: 34.6739, lon: -92.6401 },
  'scott': { lat: 35.1356, lon: -94.1154 },
  'searcy': { lat: 35.9967, lon: -92.6401 },
  'sebastian': { lat: 35.2267, lon: -94.3918 },
  'sevier': { lat: 34.0917, lon: -94.3918 },
  'sharp': { lat: 36.1356, lon: -91.6401 },
  'stone': { lat: 35.8356, lon: -92.1154 },
  'union': { lat: 33.2328, lon: -92.6401 },
  'van buren': { lat: 35.5967, lon: -92.3918 },
  'washington': { lat: 36.0356, lon: -94.1154 },
  'white': { lat: 35.2917, lon: -91.7318 },
  'woodruff': { lat: 35.1356, lon: -91.0557 },
  'yell': { lat: 35.1356, lon: -93.3918 }
};

function normalizeCountyName(county) {
  return county
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/county/gi, '')
    .trim();
}

function looseCountyMatch(county1, county2) {
  const normalized1 = normalizeCountyName(county1);
  const normalized2 = normalizeCountyName(county2);
  return normalized1 === normalized2;
}

function loadRuralAreas() {
  const wb = XLSX.readFile(path.join(__dirname, '../src/data/rural-health-areas-data-set.xlsx'));
  const sheet = wb.Sheets['County_Eligibility'];
  const data = XLSX.utils.sheet_to_json(sheet);

  return data
    .filter(row => row.State === 'AR')
    .map(row => ({
      id: row.FIPS_2023,
      countyName: row.County_Name_2023,
      state: row.State,
      fipsCode: row.FIPS_2023,
      isRural: row.County_Eligibility !== 'Not Fully FORHP Rural',
      eligibility: row.County_Eligibility
    }));
}

function loadHospitals() {
  const wb = XLSX.readFile(path.join(__dirname, '../src/data/Hospital-Provider-List-02.04.2025.xlsx'));
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet, { range: 3 });

  return data.map((row, index) => ({
    id: `hospital-${index}`,
    licenseNumber: String(row['License #'] || ''),
    name: row['Doing Business As'] || '',
    facilityType: row['Facility Type'] || '',
    address: row['Physical Address'] || '',
    city: row['Physical Address City'] || '',
    county: row['Physical Address County'] || '',
    zip: String(row['Physical Address Zip Code'] || ''),
    phone: row['Phone Number'] || '',
    totalBeds: String(row['Total Licensed Beds (Acute + Recup)'] || ''),
    type: 'Hospital'
  }));
}

function loadRuralHealthClinics() {
  const wb = XLSX.readFile(path.join(__dirname, '../src/data/Rural-Health-Clinics-Provider-List-02.03.2025.xlsx'));
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(sheet, { range: 3 });

  return data.map((row, index) => ({
    id: `rhc-${index}`,
    medicareProviderNumber: row['Medicare\r\nProvider\r\nNo.'] || '',
    name: row['Name'] || '',
    legalName: row['Legal Name'] || '',
    address: row['Physical Address'] || '',
    city: row['Physical Address City'] || '',
    county: row['County'] || '',
    zip: String(row['Physical Address Zipcode'] || ''),
    phone: row['Phone \r\nNo.'] || '',
    administrator: row['Administrator'] || '',
    providerBased: row['Freestanding\r\nor\r\nProvider-Based'] || '',
    type: 'Rural Health Clinic'
  }));
}

function loadFQHCs() {
  const filePaths = [
    path.join(__dirname, '../src/data/Arkansas+ FQHC Health-Centers-11-19-2025 copy.xlsx'),
    path.join(__dirname, '../src/data/Arkansas+ FQHC Health-Centers-11-19-2025.xlsx')
  ];

  const cityToCountyMap = createCityToCountyMap();

  for (const filePath of filePaths) {
    try {
      const wb = XLSX.readFile(filePath);
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet);

      if (data && data.length > 0) {
        console.log(`Loaded ${data.length} FQHCs from ${path.basename(filePath)}`);
        return data.map((row, index) => {
          const city = row['City'] || row['Physical Address City'] || '';
          let county = row['County'] || row['Physical Address County'] || '';

          if (!county && city) {
            county = cityToCountyMap[city.toLowerCase().trim()] || '';
          }

          return {
            id: `fqhc-${index}`,
            name: row['Name'] || row['Facility Name'] || row['FQHC Name'] || row['Health Center Name'] || '',
            address: row['Address'] || row['Street Address'] || row['Physical Address'] || '',
            city: city,
            county: county,
            zip: String(row['Zip'] || row['Zip Code'] || row['ZIP Code'] || row['Physical Address Zip Code'] || '').split('-')[0],
            type: 'FQHC'
          };
        }).filter(f => f.county);
      }
    } catch (error) {
      console.warn(`Error loading ${path.basename(filePath)}:`, error.message);
    }
  }

  console.warn('FQHC files appear to be empty or invalid');
  return [];
}

function createCityToCountyMap() {
  const hospitals = loadHospitals();
  const clinics = loadRuralHealthClinics();

  const map = {};
  [...hospitals, ...clinics].forEach(facility => {
    if (facility.city && facility.county) {
      const cityKey = facility.city.toLowerCase().trim();
      if (!map[cityKey]) {
        map[cityKey] = facility.county;
      }
    }
  });

  return map;
}

function createUnifiedDataset() {
  const ruralAreas = loadRuralAreas();
  const hospitals = loadHospitals();
  const clinics = loadRuralHealthClinics();
  const fqhcs = loadFQHCs();

  const ruralCounties = new Set(
    ruralAreas
      .filter(area => area.isRural)
      .map(area => normalizeCountyName(area.countyName))
  );

  const facilities = [];
  const unmatchedByFile = {
    hospitals: [],
    clinics: [],
    fqhcs: []
  };

  const addFacility = (facility, fileType) => {
    const normalizedCounty = normalizeCountyName(facility.county);

    if (!ruralCounties.has(normalizedCounty)) {
      unmatchedByFile[fileType].push({
        name: facility.name,
        county: facility.county,
        city: facility.city
      });
      return;
    }

    const ruralArea = ruralAreas.find(area =>
      looseCountyMatch(area.countyName, facility.county) && area.isRural
    );

    const coords = ARKANSAS_COUNTY_COORDS[normalizedCounty];

    facilities.push({
      id: facility.id,
      name: facility.name,
      type: facility.type,
      address: facility.address,
      city: facility.city,
      county: facility.county,
      zip: facility.zip,
      latitude: coords?.lat || null,
      longitude: coords?.lon || null,
      ruralAreaId: ruralArea?.id
    });
  };

  hospitals.forEach(f => addFacility(f, 'hospitals'));
  clinics.forEach(f => addFacility(f, 'clinics'));
  fqhcs.forEach(f => addFacility(f, 'fqhcs'));

  return { facilities, unmatchedByFile };
}

function calculateSummary(facilities) {
  const ruralHospitals = facilities.filter(f => f.type === 'Hospital').length;
  const ruralFQHCs = facilities.filter(f => f.type === 'FQHC').length;
  const ruralHealthClinics = facilities.filter(f => f.type === 'Rural Health Clinic').length;

  const uniqueCounties = new Set(
    facilities.map(f => normalizeCountyName(f.county))
  );

  return {
    totalFacilities: facilities.length,
    ruralHospitals,
    ruralFQHCs,
    ruralHealthClinics,
    uniqueRuralCounties: uniqueCounties.size
  };
}

const { facilities, unmatchedByFile } = createUnifiedDataset();
const summary = calculateSummary(facilities);

console.log('\n=== UNIFIED RURAL HEALTH FACILITIES ===');
console.log('\nFacilities by Type:');
console.log('  Hospitals:', summary.ruralHospitals);
console.log('  FQHCs:', summary.ruralFQHCs);
console.log('  Rural Health Clinics:', summary.ruralHealthClinics);
console.log('  Total Facilities:', summary.totalFacilities);

console.log('\nRural Counties Matched:', summary.uniqueRuralCounties);

console.log('\nUnmatched Rows by File:');
console.log('  Hospitals:', unmatchedByFile.hospitals.length, 'facilities in non-rural counties');
console.log('  FQHCs:', unmatchedByFile.fqhcs.length, 'facilities in non-rural counties');
console.log('  Rural Health Clinics:', unmatchedByFile.clinics.length, 'facilities in non-rural counties');

if (unmatchedByFile.hospitals.length > 0) {
  console.log('\n  Hospital unmatched counties:', [...new Set(unmatchedByFile.hospitals.map(f => f.county))].join(', '));
}
if (unmatchedByFile.fqhcs.length > 0) {
  console.log('  FQHC unmatched counties:', [...new Set(unmatchedByFile.fqhcs.map(f => f.county))].join(', '));
}
if (unmatchedByFile.clinics.length > 0) {
  console.log('  Clinic unmatched counties:', [...new Set(unmatchedByFile.clinics.map(f => f.county))].join(', '));
}

const output = {
  facilities,
  summary,
  ruralAreas: loadRuralAreas()
};

const outputPath = path.join(__dirname, '../src/data/processedData.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log('\nData written to:', outputPath);
