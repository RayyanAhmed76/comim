export type Role = 'teacher' | 'admin' | 'platform' | 'student'

export interface User {
  id: string
  name: string
  email: string
  role: Role
  initials: string
  title: string
  classIds?: string[]
}

export interface ClassRow {
  id: string
  name: string
  track: string
  headcount: number
  assignedContent: string
  progress: number
  status: 'In Progress' | 'Advanced' | 'Starting'
  teacher: string
  schoolYear: string
}

export interface Student {
  id: string
  name: string
  initials: string
  classId: string
  lastActivity: string
  progress: number
  finalQuiz: 'Open' | 'Completed' | 'Locked'
  email: string
}

export interface Attempt {
  id: string
  studentId: string
  exercise: string
  attempt: number
  date: string
  score: number
  status: 'Passed' | 'Needs Review'
  questions: { q: string; given: string; expected?: string; correct: boolean }[]
}

export interface Assignment {
  id: string
  classId: string
  content: string
  target: string
  progress: string
  dueDate: string
}

export interface Headset {
  id: string
  status: 'Connected' | 'Offline'
  assignedClass: string
  lastConnected: string
  location?: string
  student?: string
}

export interface LiveSession {
  id: string
  studentId: string
  studentName: string
  initials: string
  className: string
  exercise: string
  mode: 'Headset' | 'Web'
  minutes: number
}

export const CURRENT_YEAR = '2026–2027'

export const demoUsers: User[] = [
  {
    id: 'u-mf',
    name: 'Mounia Ferhat',
    email: 'm.ferhat@imc-maritime.ma',
    role: 'teacher',
    initials: 'MF',
    title: 'Teacher',
    classIds: ['2a', '2b', '3a'],
  },
  {
    id: 'u-ka',
    name: 'Karim Alaoui',
    email: 'k.alaoui@imc-maritime.ma',
    role: 'teacher',
    initials: 'KA',
    title: 'Teacher',
    classIds: ['3b'],
  },
  {
    id: 'u-so',
    name: 'Souhail Ouabi',
    email: 's.ouabi@imc-maritime.ma',
    role: 'admin',
    initials: 'SO',
    title: 'Establishment Administrator',
  },
  {
    id: 'u-ra',
    name: 'Rania Amrani',
    email: 'r.amrani@comim.ma',
    role: 'platform',
    initials: 'RA',
    title: 'COMIM Platform Administrator',
  },
  {
    id: 'u-yb',
    name: 'Yassine Bakkali',
    email: 'y.bakkali@eleves.imc-maritime.ma',
    role: 'student',
    initials: 'YB',
    title: 'Student',
    classIds: ['2a'],
  },
]

export const classes: ClassRow[] = [
  {
    id: '2a',
    name: '2A — Marine Mechanics',
    track: 'Mechanics',
    headcount: 24,
    assignedContent: 'Guided Tour · Ex.1 · Ex.2 · Ex.3',
    progress: 60,
    status: 'In Progress',
    teacher: 'Mounia Ferhat',
    schoolYear: CURRENT_YEAR,
  },
  {
    id: '2b',
    name: '2B — Deck Officer',
    track: 'Deck Officer',
    headcount: 19,
    assignedContent: 'Guided Tour · Ex.1 · Ex.2',
    progress: 50,
    status: 'In Progress',
    teacher: 'Mounia Ferhat',
    schoolYear: CURRENT_YEAR,
  },
  {
    id: '3a',
    name: '3A — Electrotechnics',
    track: 'Electrotechnics',
    headcount: 22,
    assignedContent: 'Guided Tour · Ex.1-3 · Final Quiz',
    progress: 85,
    status: 'Advanced',
    teacher: 'Karim Alaoui',
    schoolYear: CURRENT_YEAR,
  },
  {
    id: '3b',
    name: '3B — Boilermaking',
    track: 'Boilermaking',
    headcount: 17,
    assignedContent: 'Guided Tour · Ex.1',
    progress: 15,
    status: 'Starting',
    teacher: 'Karim Alaoui',
    schoolYear: CURRENT_YEAR,
  },
]

export const students: Student[] = [
  { id: 's-yb', name: 'Yassine Bakkali', initials: 'YB', classId: '2a', lastActivity: 'Sep 17, 2026', progress: 78, finalQuiz: 'Open', email: 'y.bakkali@eleves.imc-maritime.ma' },
  { id: 's-si', name: 'Salma Idrissi', initials: 'SI', classId: '2a', lastActivity: 'Sep 16, 2026', progress: 92, finalQuiz: 'Completed', email: 's.idrissi@eleves.imc-maritime.ma' },
  { id: 's-hm', name: 'Hamza Moutaouakil', initials: 'HM', classId: '2a', lastActivity: 'Sep 12, 2026', progress: 41, finalQuiz: 'Locked', email: 'h.moutaouakil@eleves.imc-maritime.ma' },
  { id: 's-na', name: 'Nada Amrani', initials: 'NA', classId: '2a', lastActivity: 'Sep 17, 2026', progress: 66, finalQuiz: 'Open', email: 'n.amrani@eleves.imc-maritime.ma' },
  { id: 's-kr', name: 'Karim Raji', initials: 'KR', classId: '2a', lastActivity: 'Sep 9, 2026', progress: 35, finalQuiz: 'Locked', email: 'k.raji@eleves.imc-maritime.ma' },
  { id: 's-il', name: 'Ikram Lahlou', initials: 'IL', classId: '2a', lastActivity: 'Sep 15, 2026', progress: 88, finalQuiz: 'Completed', email: 'i.lahlou@eleves.imc-maritime.ma' },
]

export const attempts: Attempt[] = [
  {
    id: 'a1',
    studentId: 's-yb',
    exercise: 'Startup Procedure',
    attempt: 3,
    date: 'Sep 16, 2026 · 09:05',
    score: 91,
    status: 'Passed',
    questions: [],
  },
  {
    id: 'a2',
    studentId: 's-yb',
    exercise: 'Repair',
    attempt: 1,
    date: 'Sep 15, 2026 · 14:12',
    score: 69,
    status: 'Needs Review',
    questions: [],
  },
  {
    id: 'a3',
    studentId: 's-yb',
    exercise: 'Startup Procedure',
    attempt: 2,
    date: 'Sep 14, 2026 · 11:20',
    score: 78,
    status: 'Passed',
    questions: [
      { q: 'What is the name of the valve that was just opened?', given: 'Suction valve', correct: true },
      { q: 'What vacuum threshold must be reached before the next step?', given: '90% in 15s', correct: true },
      { q: 'In what order should the suction and discharge valves be opened?', given: 'Discharge then suction', expected: 'suction then discharge', correct: false },
      { q: 'What must be done before opening the jacket water inlet?', given: 'Wait for the vacuum to rise', correct: true },
    ],
  },
  {
    id: 'a4',
    studentId: 's-yb',
    exercise: 'Startup Procedure',
    attempt: 1,
    date: 'Sep 12, 2026 · 10:02',
    score: 62,
    status: 'Needs Review',
    questions: [],
  },
  {
    id: 'a5',
    studentId: 's-yb',
    exercise: 'Identification',
    attempt: 2,
    date: 'Sep 10, 2026 · 09:41',
    score: 74,
    status: 'Passed',
    questions: [],
  },
  {
    id: 'a6',
    studentId: 's-yb',
    exercise: 'Identification',
    attempt: 1,
    date: 'Sep 10, 2026 · 09:14',
    score: 58,
    status: 'Needs Review',
    questions: [],
  },
]

export const assignments: Assignment[] = [
  { id: 'as1', classId: '2a', content: 'Guided Tour', target: 'Whole class (24)', progress: '24 / 24 completed', dueDate: 'Sep 05, 2026' },
  { id: 'as2', classId: '2a', content: 'Identification', target: 'Whole class (24)', progress: '21 / 24 completed', dueDate: 'Sep 08, 2026' },
  { id: 'as3', classId: '2a', content: 'Startup Procedure', target: 'Whole class (24)', progress: '16 / 24 completed', dueDate: 'Sep 12, 2026' },
  { id: 'as4', classId: '2a', content: 'Repair', target: '8 targeted students', progress: '3 / 8 completed', dueDate: 'Sep 22, 2026' },
  { id: 'as5', classId: '2a', content: 'Graded Exam', target: 'Whole class (24)', progress: '6 / 24 completed', dueDate: 'Sep 30, 2026' },
]

export const rubricSteps = [
  'Checking levels before startup',
  'Opening the intake valves',
  'Priming the circuit',
  'Starting the unit',
  'Checking initial tightness',
  'Gradual ramp-up',
  'Stabilizing the pressure',
  'Monitoring temperatures',
  'Adjusting regulation parameters',
  'Final instrument check',
  'Checking compliance',
  'Confirming operational status',
  'Logging startup parameters',
]

export const quizBank = [
  { id: 'q1', question: 'Which valve must be opened first during startup?', theme: 'Procedure' },
  { id: 'q2', question: 'What must be done before opening the ejector cover?', theme: 'Safety' },
  { id: 'q3', question: 'What is the purpose of the demister?', theme: 'Components' },
  { id: 'q4', question: 'What is the maximum accepted salinity threshold?', theme: 'Components' },
  { id: 'q5', question: 'What PPE should be worn before working on the ejector?', theme: 'Safety' },
]

export const liveSessions: LiveSession[] = [
  { id: 'ls1', studentId: 's-kr', studentName: 'Karim Raji', initials: 'KR', className: '2A — Marine Mechanics', exercise: 'Startup Procedure', mode: 'Headset', minutes: 14 },
  { id: 'ls2', studentId: 's-na', studentName: 'Nada Amrani', initials: 'NA', className: '2A — Marine Mechanics', exercise: 'Guided Tour', mode: 'Web', minutes: 6 },
  { id: 'ls3', studentId: 's-hb', studentName: 'Hiba Bensouda', initials: 'HB', className: '3A — Electrotechnics', exercise: 'Repair', mode: 'Headset', minutes: 2 },
]

export const headsets: Headset[] = [
  { id: '#A-01', status: 'Connected', assignedClass: '2A — Marine Mechanics', lastConnected: 'Today · 09:12' },
  { id: '#A-02', status: 'Connected', assignedClass: '2A — Marine Mechanics', lastConnected: 'Today · 08:47' },
  { id: '#A-03', status: 'Offline', assignedClass: '2B — Deck Officer', lastConnected: 'Yesterday · 17:30' },
  { id: '#A-04', status: 'Connected', assignedClass: '2A — Marine Mechanics', lastConnected: 'Today · 09:05', location: 'VR Room · Station 4', student: 'Yassine Bakkali' },
  { id: '#A-05', status: 'Offline', assignedClass: 'Unassigned', lastConnected: 'Sep 12, 2026' },
  { id: '#A-06', status: 'Connected', assignedClass: '3A — Electrotechnics', lastConnected: 'Today · 09:20' },
]

export const auditSchool = [
  { author: 'Mounia Ferhat', role: 'Teacher', action: 'Score adjustment', target: 'Y. Bakkali · Final Quiz: 78% → 82%', time: 'Sep 17, 2026 · 09:12' },
  { author: 'Mounia Ferhat', role: 'Teacher', action: 'Final quiz opened', target: 'Class 2A · student N. Amrani', time: 'Sep 16, 2026 · 16:40' },
  { author: 'Souhail Ouabi', role: 'Client Admin', action: 'User creation', target: 'Student account · I. Lahlou (2A)', time: 'Sep 15, 2026 · 11:03' },
  { author: 'Karim Alaoui', role: 'Teacher', action: 'Session viewing', target: 'Live session · H. Idrissi (3A)', time: 'Sep 14, 2026 · 10:22' },
  { author: 'Souhail Ouabi', role: 'Client Admin', action: 'Class creation', target: '3B — Boilermaking, 2026–2027', time: 'Sep 02, 2026 · 08:55' },
]

export const establishments = [
  { id: 'imc', name: 'Institut Maritime de Casablanca', plan: 'Establishment', seats: 180, admin: 'Souhail Ouabi', expiry: 'Aug 31, 2027', status: 'Active' as const },
  { id: 'lma', name: "Lycée Maritime d'Agadir", plan: 'Establishment', seats: 120, admin: 'Fatima Zahra Idrissi', expiry: 'Jun 15, 2027', status: 'Active' as const },
  { id: 'imt', name: 'Institut Maritime de Tanger', plan: 'Discovery', seats: 40, admin: 'Anas Bennis', expiry: 'Sep 30, 2026', status: 'Active' as const },
  { id: 'cfa', name: 'CFA Maritime de Safi', plan: 'Establishment', seats: 90, admin: 'Nabil Chraibi', expiry: 'Jan 01, 2027', status: 'Suspended' as const },
]

export const components = [
  { name: 'Separator tank', definition: 'Evaporation and separation take place under vacuum.', note: 'The largest volume — vapor/liquid evaporation and separation happen here.' },
  { name: 'Evaporator plates', definition: 'Heated plates where seawater turns into vapor.', note: 'Heated by jacket water — look for the fitting on the hot side.' },
  { name: 'Condenser plates', definition: 'Cooled plates where the vapor turns back into liquid.', note: 'Cooled by seawater — opposite temperature direction to the evaporator.' },
  { name: 'Demister', definition: 'Screen that retains seawater droplets.', note: 'Located between the evaporator and the condenser, in the path of the vapor.' },
  { name: 'Salinometer', definition: 'Measures the salt content of the produced water.', note: 'The only instrument monitored by the automatic quality valve.' },
  { name: 'Combined ejector', definition: 'Discharges brine and gases, maintains the vacuum.', note: 'Two functions at once — liquid and gas extraction.' },
]

export const machineParts = ['SEPARATOR TANK', 'EVAPORATOR', 'CONDENSER', 'EJECTOR'] as const

export const identificationOptions = ['Evaporator plates', 'Condenser plates', 'Demister', 'Separator tank']

export const startupSteps = [
  'Open the suction valve',
  'Open the discharge valve',
  'Open the overboard discharge valve',
  'Close the air vent screw',
  'Start the ejector pump',
  'Wait for the vacuum to rise (90% / 15s)',
  'Open jacket water inlet',
  'Open seawater feed',
  'Start distillation',
  'Check salinity',
  'Stabilize flow',
  'Confirm instruments',
  'Log parameters',
]

export const repairSteps = [
  'Notice the rise in brine level',
  'Compare the readings and make the diagnosis',
  'Order the installation to stop',
  'Lock out the installation (lockout point)',
  'Drain the circuit',
  'Open the ejector cover',
  'Inspect the nozzle',
  'Replace the worn part',
  'Reassemble and torque',
  'Remove lockout and restart',
]

export const finalQuizQuestions = [
  {
    id: 'fq1',
    theme: 'Safety',
    multi: true,
    q: 'What must be done before opening the ejector cover?',
    options: [
      'Confirm lockout/tag-out',
      'Check that the vacuum has actually settled',
      'Cut the general power supply of the ship',
      'Wait for the end of the watch',
    ],
    correct: [0, 1],
    media: '3D — Combined ejector',
  },
  {
    id: 'fq2',
    theme: 'Components',
    multi: false,
    q: 'What is the purpose of the demister?',
    options: ['Heat seawater', 'Retain seawater droplets', 'Measure salinity', 'Prime the circuit'],
    correct: [1],
    media: '3D — Demister',
  },
  {
    id: 'fq3',
    theme: 'Components',
    multi: false,
    q: 'What instrument measures the salt content of the produced water?',
    options: ['The pressure gauge', 'The salinometer', 'The thermometer', 'The flow meter'],
    correct: [1],
    media: '3D — Salinometer',
  },
  {
    id: 'fq4',
    theme: 'Components',
    multi: false,
    q: 'What does the combined ejector do?',
    options: [
      'It heats the seawater',
      'It discharges brine and gases, and maintains the vacuum',
      'It cools the condenser plates',
      'It measures salinity',
    ],
    correct: [1],
    media: '3D — Combined ejector',
  },
  {
    id: 'fq5',
    theme: 'Procedure',
    multi: false,
    q: 'Which plates are cooled by seawater?',
    options: ['The evaporator plates', 'The condenser plates', 'The demister', 'The separator tank'],
    correct: [1],
    media: '3D — Condenser plates',
  },
]

export const finalQuizReview = [
  {
    q: 'What must be done before opening the ejector cover?',
    given: 'Confirm lockout; check that the vacuum has settled',
    correct: true,
  },
  {
    q: 'What is the role of the demister?',
    given: 'Retain seawater droplets',
    correct: true,
  },
  {
    q: 'What instrument measures the salt content of the produced water?',
    given: 'The pressure gauge',
    expected: 'the salinometer',
    correct: false,
  },
  {
    q: 'What does the combined ejector do?',
    given: 'It heats the seawater',
    expected: 'it discharges brine and gases, and maintains the vacuum',
    correct: false,
  },
  {
    q: 'Which plates are cooled by seawater?',
    given: 'The condenser plates',
    correct: true,
  },
]
