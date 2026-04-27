import type { Branch, ExamType, Semester } from './supabase/types'

const GH = 'https://github.com/Magniquick/mit-question-bank/raw/main'
const S1 = `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201`
const S2M = `${GH}/SEM2/CSE/2025/MIDSEM`

export type MitPaper = {
  title: string
  subject: string
  subject_code: string
  branch: Branch
  year: number
  semester: Semester
  exam_type: ExamType
  pdf_url: string
  slug: string
  download_count: number
}

export function yearGroup(sem: number) {
  return Math.ceil(sem / 2)
}

// ─── CYCLE DEFINITIONS ──────────────────────────────────────────────────────

export type Cycle = 'physics' | 'chemistry'

export type CycleSubject = {
  code: string
  name: string
  common?: boolean  // shared between both cycles
}

export const CYCLES: Record<Cycle, { label: string; color: string; subjects: CycleSubject[] }> = {
  physics: {
    label: 'Physics Cycle',
    color: 'from-blue-500 to-indigo-600',
    subjects: [
      { code: 'APE',   name: 'Applied Physics for Engineers' },
      { code: 'FME',   name: 'Fundamentals of Mechanical Engineering' },
      { code: 'FE',    name: 'Fundamentals of Electronics' },
      { code: 'OOPS',  name: 'Introduction to Object Oriented Programming', common: true },
      { code: 'CM-II', name: 'Computational Mathematics II', common: true },
      { code: 'ENG',   name: 'Communication Skills in English' },
    ],
  },
  chemistry: {
    label: 'Chemistry Cycle',
    color: 'from-emerald-500 to-teal-600',
    subjects: [
      { code: 'ACE',   name: 'Applied Chemistry for Engineering' },
      { code: 'EMSB',  name: 'Engineering Mechanics and Smart Buildings' },
      { code: 'FEE',   name: 'Fundamentals of Electrical Engineering' },
      { code: 'OOPS',  name: 'Introduction to Object Oriented Programming', common: true },
      { code: 'CM-II', name: 'Computational Mathematics II', common: true },
      { code: 'EVS',   name: 'Environmental Studies' },
    ],
  },
}

export function getCycleForBranch(branch: string): Cycle | null {
  if (branch === 'physics-cycle') return 'physics'
  if (branch === 'chemistry-cycle') return 'chemistry'
  return null
}

export function subjectSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

// ─── YEAR INFO ───────────────────────────────────────────────────────────────

export const YEAR_INFO: Record<number, { label: string; sems: string; branches: string; underUpdate?: boolean }> = {
  1: { label: 'Year 1', sems: 'Sem 1 & 2', branches: 'Physics Cycle · Chemistry Cycle' },
  2: { label: 'Year 2', sems: 'Sem 3 & 4', branches: 'All branches', underUpdate: true },
  3: { label: 'Year 3', sems: 'Sem 5 & 6', branches: 'All branches', underUpdate: true },
  4: { label: 'Year 4', sems: 'Sem 7 & 8', branches: 'All branches', underUpdate: true },
}

export const BRANCHES: Branch[] = ['CSE', 'ECE', 'EEE']

// ─── SUBJECT CODE MAP ────────────────────────────────────────────────────────

export const SUBJECT_CODES: Record<string, string> = {
  'Applied Physics for Engineers':                  'APE',
  'Fundamentals of Mechanical Engineering':         'FME',
  'Fundamentals of Electronics':                    'FE',
  'Introduction to Object Oriented Programming':    'OOPS',
  'Computational Mathematics II':                   'CM-II',
  'Communication Skills in English':                'ENG',
  'Applied Chemistry for Engineering':              'ACE',
  'Engineering Mechanics and Smart Buildings':      'EMSB',
  'Fundamentals of Electrical Engineering':         'FEE',
  'Environmental Studies':                          'EVS',
  // Legacy / Year 2-3
  'Calculus and Matrix Algebra':                    'CM-I',
  'Data Structures':                                'DS',
  'Computer Organization and Architecture':         'COA',
  'Engineering Mathematics III':                    'EM-III',
  'Switching Circuits and Logic Design':            'SCLD',
  'Software Design Using Object Oriented Paradigm': 'OOPS-II',
  'Database Systems':                               'DBMS',
  'Design and Analysis of Algorithms':              'DAA',
  'Embedded Systems':                               'ES',
  'Formal Languages and Automata Theory':           'FLAT',
  'Python Programming':                             'PY',
  'Programming in Java':                            'JAVA',
  'Compiler Design':                                'CD',
  'Computer Networks':                              'CN',
  'Operating Systems':                              'OS',
  'Software Engineering':                           'SE',
  'Distributed Systems':                            'DIST',
  'Digital Image Processing':                       'DIP',
  'Principles of Cryptography':                     'CRYPT',
  'Analog Electronic Circuits':                     'AEC',
  'Digital System Design':                          'DSD',
  'Network Analysis':                               'NA',
  'Signals and Systems':                            'S&S',
}

export function getSubjectCode(subject: string): string {
  return SUBJECT_CODES[subject] ?? subject.slice(0, 6).toUpperCase()
}

// ─── REAL PAPERS ─────────────────────────────────────────────────────────────

export const MIT_PAPERS: MitPaper[] = [
  // PHYSICS CYCLE - END SEM
  { title: 'Applied Physics for Engineers — End Sem 2022', subject: 'Applied Physics for Engineers', subject_code: 'APE', branch: 'CSE', year: 2022, semester: 1, exam_type: 'End-Sem', pdf_url: `${S1}/Physics%20-I%20(IPH%20111).pdf`, slug: 'ape-es-2022-s1', download_count: 287 },
  { title: 'Fundamentals of Electronics (ECE 1051) — End Sem 2022', subject: 'Fundamentals of Electronics', subject_code: 'FE', branch: 'CSE', year: 2022, semester: 1, exam_type: 'End-Sem', pdf_url: `${S1}/Basic%20Electronics%20(ECE%201051)%20PART-B.pdf`, slug: 'fe-es-2022-s1', download_count: 221 },
  { title: 'Introduction to OOP (ICS 111) — End Sem 2022', subject: 'Introduction to Object Oriented Programming', subject_code: 'OOPS', branch: 'CSE', year: 2022, semester: 1, exam_type: 'End-Sem', pdf_url: `${S1}/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf`, slug: 'oops-es-2022-s1', download_count: 389 },
  { title: 'Communication Skills in English (IHS 112) — End Sem 2022', subject: 'Communication Skills in English', subject_code: 'ENG', branch: 'CSE', year: 2022, semester: 1, exam_type: 'End-Sem', pdf_url: `${S1}/Comunication%20Skilss%20in%20English%20(IHS%20112).pdf`, slug: 'eng-es-2022-s1', download_count: 145 },
  // CHEMISTRY CYCLE - END SEM
  { title: 'Applied Chemistry for Engineering (CHM 1051) — End Sem 2022', subject: 'Applied Chemistry for Engineering', subject_code: 'ACE', branch: 'CSE', year: 2022, semester: 1, exam_type: 'End-Sem', pdf_url: `${S1}/Engineering%20Chemistry%20(CHM%201051)(Makeup).pdf`, slug: 'ace-es-2022-s1', download_count: 198 },
  { title: 'Engineering Mechanics and Smart Buildings (ICE 111) — End Sem 2022', subject: 'Engineering Mechanics and Smart Buildings', subject_code: 'EMSB', branch: 'CSE', year: 2022, semester: 1, exam_type: 'End-Sem', pdf_url: `${S1}/Mechanics%20of%20Solid%20(ICE%20111)..pdf`, slug: 'emsb-es-2022-s1', download_count: 167 },
  // SHARED (both cycles) - MID SEM
  { title: 'Computational Mathematics II — Mid Sem 2025 (QP)', subject: 'Computational Mathematics II', subject_code: 'CM-II', branch: 'CSE', year: 2025, semester: 2, exam_type: 'Mid-Sem', pdf_url: `${S2M}/Mathematics%202/MAT-1272-03-Mar-2025(QP).pdf`, slug: 'cm2-ms-2025-qp', download_count: 312 },
  { title: 'Computational Mathematics II — Mid Sem 2025', subject: 'Computational Mathematics II', subject_code: 'CM-II', branch: 'CSE', year: 2025, semester: 2, exam_type: 'Mid-Sem', pdf_url: `${S2M}/Mathematics%202/MAT-1272-03-Mar-2025.pdf`, slug: 'cm2-ms-2025', download_count: 189 },
]
