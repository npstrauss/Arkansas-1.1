export const INITIATIVES = [
  {
    name: 'HEART',
    fullName: 'Healthy Eating, Active Recreation, & Transformation',
    funding: 150000000,
    programs: [
      { name: 'GROW Kids', fullName: 'Growing Resilient, Optimally Well Kids' },
      { name: 'FARM', fullName: 'Food Access & Regional Markets' },
      { name: 'MOVE', fullName: 'Mobilizing Opportunities for Vital Exercise' },
      { name: 'FAITH', fullName: 'Faith-based Access, Interventions, Transportation, & Health' },
      { name: 'HEAL', fullName: 'Healthcare Education and Advancement for Leadership' },
      { name: 'IMPACT', fullName: 'Integrated Models for Prevention, Access, Care and Transformation' }
    ]
  },
  {
    name: 'PACT',
    fullName: 'Promoting Access, Coordination, and Transformation',
    funding: 250000000,
    programs: [
      { name: 'ACCESS', fullName: 'Advancing Care Capacity, Engagement, and Screening Services' },
      { name: 'CINC', fullName: 'Community Integrated Networks for Care' },
      { name: 'ROADMAP', fullName: 'Regional Optimization of Access, Delivery, Mobility, and Practice' },
      { name: 'ScOPE', fullName: 'Scope of Practice Elevation' },
      { name: 'SAFE', fullName: 'System Acquisition & Facility Enhancement' }
    ]
  },
  {
    name: 'RISE AR',
    fullName: 'Recruitment, Innovation, Skills, and Education for AR Healthcare',
    funding: 250000000,
    programs: [
      { name: 'LEAD', fullName: 'Leadership Education, Advancement & Delivery' },
      { name: 'PATHWAY', fullName: 'Preparing Arkansas Talent for Health Workforce Advancement Yield' },
      { name: 'RETAIN', fullName: 'Recruit, Educate, Train, Advise, Integrate, Nurture' },
      { name: 'SKILL-UP', fullName: 'Strategic Knowledge, Innovation & Lifelong Learning for Upward Professionals' }
    ]
  },
  {
    name: 'THRIVE',
    fullName: 'Telehealth, Health-monitoring, and Response Innovation for Vital Expansion',
    funding: 350000000,
    programs: [
      { name: 'LIFELINE', fullName: 'Linking Infrastructure for Emergency Lifesaving and Integrated Network Expansion' },
      { name: 'HOME', fullName: 'Health Outcomes through Monitoring & Engagement' },
      { name: 'VIRTUAL', fullName: 'Virtual Innovation for Rural Telehealth, Utilization, Access, and Longevity' },
      { name: 'TECH Fund', fullName: 'Telehealth, Equipment, and Connectivity Hub Fund' }
    ]
  }
];

export const PROGRAM_TIMELINE = [
  { year: 1, start: '1/1/2025', end: '9/30/2027', ceiling: 200000000 },
  { year: 2, start: '10/1/2026', end: '9/30/2028', ceiling: 200000000 },
  { year: 3, start: '10/1/2027', end: '9/30/2029', ceiling: 200000000 },
  { year: 4, start: '10/1/2028', end: '9/30/2030', ceiling: 200000000 },
  { year: 5, start: '10/1/2029', end: '9/30/2031', ceiling: 200000000 }
];

export const INITIAL_EXPENDITURES = [
  { year: 1, planned: 185000000 },
  { year: 2, planned: 195000000 },
  { year: 3, planned: 178000000 },
  { year: 4, planned: 192000000 },
  { year: 5, planned: 188000000 }
];

export const SAMPLE_KPIS = [
  { name: 'Children Served with Nutrition Programs', initiative: 'HEART', program: 'GROW Kids', target: 10000, actual: 7250 },
  { name: 'Farmers Markets Established', initiative: 'HEART', program: 'FARM', target: 50, actual: 42 },
  { name: 'Community Recreation Programs', initiative: 'HEART', program: 'MOVE', target: 100, actual: 88 },
  { name: 'Faith-based Partnerships', initiative: 'HEART', program: 'FAITH', target: 75, actual: 68 },
  { name: 'Primary Care Access Points', initiative: 'PACT', program: 'ACCESS', target: 200, actual: 156 },
  { name: 'Integrated Care Networks', initiative: 'PACT', program: 'CINC', target: 25, actual: 18 },
  { name: 'Transportation Routes Established', initiative: 'PACT', program: 'ROADMAP', target: 40, actual: 35 },
  { name: 'Healthcare Workers Trained', initiative: 'RISE AR', program: 'LEAD', target: 500, actual: 420 },
  { name: 'Students in Pipeline Programs', initiative: 'RISE AR', program: 'PATHWAY', target: 1000, actual: 875 },
  { name: 'Healthcare Workers Retained', initiative: 'RISE AR', program: 'RETAIN', target: 300, actual: 245 },
  { name: 'Telehealth Connections', initiative: 'THRIVE', program: 'VIRTUAL', target: 5000, actual: 4200 },
  { name: 'Remote Monitoring Patients', initiative: 'THRIVE', program: 'HOME', target: 2000, actual: 1680 },
  { name: 'Broadband Access Points', initiative: 'THRIVE', program: 'LIFELINE', target: 150, actual: 128 }
];

export const ARKANSAS_COUNTIES = [
  { name: 'Arkansas', fipsCode: '05001', isRural: true, lat: 34.2544, lng: -91.1818 },
  { name: 'Ashley', fipsCode: '05003', isRural: true, lat: 33.3654, lng: -91.7676 },
  { name: 'Baxter', fipsCode: '05005', isRural: true, lat: 36.3698, lng: -92.4643 },
  { name: 'Bradley', fipsCode: '05011', isRural: true, lat: 33.6643, lng: -92.3765 },
  { name: 'Calhoun', fipsCode: '05013', isRural: true, lat: 33.4532, lng: -92.5432 },
  { name: 'Carroll', fipsCode: '05015', isRural: true, lat: 36.4032, lng: -93.5432 },
  { name: 'Clay', fipsCode: '05021', isRural: true, lat: 36.3987, lng: -90.3654 },
  { name: 'Howard', fipsCode: '05061', isRural: true, lat: 33.9843, lng: -93.8721 },
  { name: 'Izard', fipsCode: '05065', isRural: true, lat: 36.0654, lng: -91.7865 },
  { name: 'Lee', fipsCode: '05077', isRural: true, lat: 34.7345, lng: -90.7843 },
  { name: 'Marion', fipsCode: '05089', isRural: true, lat: 36.2398, lng: -92.7654 },
  { name: 'Montgomery', fipsCode: '05097', isRural: true, lat: 34.4876, lng: -93.7865 },
  { name: 'Nevada', fipsCode: '05099', isRural: true, lat: 33.6654, lng: -93.2543 },
  { name: 'Stone', fipsCode: '05137', isRural: true, lat: 35.8765, lng: -92.0987 },
  { name: 'Pulaski', fipsCode: '05119', isRural: false, lat: 34.7465, lng: -92.2896 }
];

export const FACILITIES = [
  { name: 'White River Rural Health Center', county: 'Baxter', lat: 36.3715, lng: -92.4746, type: 'FQHC' as const },
  { name: 'Community Health Centers of Arkansas', county: 'Arkansas', lat: 34.2544, lng: -91.1818, type: 'FQHC' as const },
  { name: 'East Arkansas Family Health Center', county: 'Lee', lat: 34.7345, lng: -90.7843, type: 'FQHC' as const },
  { name: 'Baxter Regional Medical Center', county: 'Baxter', lat: 36.3698, lng: -92.4643, type: 'Hospital' as const },
  { name: 'Ashley County Medical Center', county: 'Ashley', lat: 33.3654, lng: -91.7676, type: 'Hospital' as const },
  { name: 'Howard Memorial Hospital', county: 'Howard', lat: 33.9843, lng: -93.8721, type: 'Hospital' as const },
  { name: 'Jefferson Regional Medical Center', county: 'Pulaski', lat: 34.2254, lng: -92.0032, type: 'Hospital' as const },
  { name: 'Bradley County Medical Center', county: 'Bradley', lat: 33.6643, lng: -92.3765, type: 'Rural Health Clinic' as const },
  { name: 'Calhoun County Rural Health Clinic', county: 'Calhoun', lat: 33.4532, lng: -92.5432, type: 'Rural Health Clinic' as const },
  { name: 'Carroll County Rural Health', county: 'Carroll', lat: 36.4032, lng: -93.5432, type: 'Rural Health Clinic' as const },
  { name: 'Clay County Rural Clinic', county: 'Clay', lat: 36.3987, lng: -90.3654, type: 'Rural Health Clinic' as const },
  { name: 'Izard County Medical Center', county: 'Izard', lat: 36.0654, lng: -91.7865, type: 'Hospital' as const },
  { name: 'Marion County Rural Health', county: 'Marion', lat: 36.2398, lng: -92.7654, type: 'Rural Health Clinic' as const },
  { name: 'Montgomery County Medical', county: 'Montgomery', lat: 34.4876, lng: -93.7865, type: 'Rural Health Clinic' as const },
  { name: 'Nevada Regional Medical Center', county: 'Nevada', lat: 33.6654, lng: -93.2543, type: 'Hospital' as const },
  { name: 'Stone County Medical Center', county: 'Stone', lat: 35.8765, lng: -92.0987, type: 'Hospital' as const }
];
