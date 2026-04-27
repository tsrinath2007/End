import type { Branch, ExamType, Semester } from './supabase/types'

const GH = 'https://github.com/Magniquick/mit-question-bank/raw/main'

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

// Year group helper: sem 1-2 → 1, sem 3-4 → 2, sem 5-6 → 3
export function yearGroup(sem: number) {
  return Math.ceil(sem / 2)
}

export const BRANCHES: Branch[] = ['CSE', 'ECE', 'EEE']
export const ALL_BRANCHES: Branch[] = ['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE', 'IT']

export const YEAR_INFO: Record<number, { label: string; sems: string; branches: string }> = {
  1: { label: 'Year 1', sems: 'Sem 1 & 2', branches: 'CSE · ECE · EEE' },
  2: { label: 'Year 2', sems: 'Sem 3 & 4', branches: 'All branches' },
  3: { label: 'Year 3', sems: 'Sem 5 & 6', branches: 'All branches' },
}

// Subject short codes used by MIT Bengaluru (same as paper.shrit.in)
export const SUBJECT_CODES: Record<string, string> = {
  'Calculus and Matrix Algebra':           'CM-I',
  'Differential Equations and Transforms': 'CM-II',
  'Applied Physics for Engineers':         'APE',
  'Applied Chemistry for Engineers':       'ACE',
  'Introduction to Computers and Programming': 'ICS',
  'Communication Skills in English':       'CSK',
  'Elements of Mechanical System and Building': 'EMSB',
  'Fundamentals of Electrical Engineering': 'FEE',
  'Fundamentals of Electronics':           'FE',
  'Fundamentals of Mechanical Engineering': 'FME',
  'Engineering Drawing':                   'Eng',
  'Environmental Science':                 'EVS',
  'Object Oriented Programming':           'OOPS',
  'Problem Solving with Python':           'PPS',
  'Data Structures':                       'DS',
  'Computer Organization':                 'COA',
  'Digital Logic Design':                  'DLD',
  'Engineering Mathematics III':           'EM-III',
  'Engineering Mathematics IV':            'EM-IV',
  'Software Engineering':                  'SE',
  'Design and Analysis of Algorithms':     'ADA',
  'Database Management Systems':           'DBMS',
  'Operating Systems':                     'OS',
  'Computer Networks':                     'CN',
  'Python Programming':                    'PYTHON',
  'Analog Circuits':                       'AC',
  'Digital Signal Processing':             'DSP',
  'Electromagnetic Theory':               'EMT',
  'VLSI Design':                           'VLSI',
  'Thermodynamics':                        'THERMO',
  'Fluid Mechanics':                       'FM',
  'Machine Design':                        'MD',
  'Compiler Design':                       'CD',
  'Machine Learning':                      'ML',
  'Computer Vision':                       'CV',
  'Soft Computing':                        'SC',
  'Formal Languages and Automata':         'FLA',
  'Linux Programming':                     'LINUX',
  'Embedded Systems':                      'ES',
}

export function getSubjectCode(subject: string): string {
  return SUBJECT_CODES[subject] ?? subject.slice(0, 6).toUpperCase()
}

// Real papers — PDF URLs from Magniquick/mit-question-bank GitHub repo
export const MIT_PAPERS: MitPaper[] = [
  // ─── YEAR 1 · SEM 1 · CSE ────────────────────────────────────────────────
  {
    title: 'Calculus and Matrix Algebra (IMA 111) — End Sem 2022',
    subject: 'Calculus and Matrix Algebra',
    subject_code: 'CM-I',
    branch: 'CSE', year: 2022, semester: 1, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf`,
    slug: 'cm1-endsem-2022-cse-s1', download_count: 421,
  },
  {
    title: 'Applied Physics for Engineers (IPH 111) — End Sem 2022',
    subject: 'Applied Physics for Engineers',
    subject_code: 'APE',
    branch: 'CSE', year: 2022, semester: 1, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf`,
    slug: 'ape-endsem-2022-cse-s1', download_count: 287,
  },
  {
    title: 'Applied Chemistry for Engineers (CHM 1051) — End Sem 2022',
    subject: 'Applied Chemistry for Engineers',
    subject_code: 'ACE',
    branch: 'CSE', year: 2022, semester: 1, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Engineering%20Chemistry%20(CHM%201051)(Makeup).pdf`,
    slug: 'ace-endsem-2022-cse-s1', download_count: 198,
  },
  {
    title: 'Communication Skills in English (IHS 112) — End Sem 2022',
    subject: 'Communication Skills in English',
    subject_code: 'CSK',
    branch: 'CSE', year: 2022, semester: 1, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Comunication%20Skilss%20in%20English%20(IHS%20112).pdf`,
    slug: 'csk-endsem-2022-cse-s1', download_count: 145,
  },
  {
    title: 'Introduction to Computers and Programming (ICS 111) — End Sem 2022',
    subject: 'Introduction to Computers and Programming',
    subject_code: 'ICS',
    branch: 'CSE', year: 2022, semester: 1, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf`,
    slug: 'ics-endsem-2022-cse-s1', download_count: 334,
  },
  {
    title: 'Mechanics of Solid (ICE 111) — End Sem 2022',
    subject: 'Elements of Mechanical System and Building',
    subject_code: 'EMSB',
    branch: 'CSE', year: 2022, semester: 1, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Mechanics%20of%20Solid%20(ICE%20111)..pdf`,
    slug: 'emsb-endsem-2022-cse-s1', download_count: 167,
  },
  {
    title: 'Fundamentals of Electronics (ECE 1051) — End Sem 2022',
    subject: 'Fundamentals of Electronics',
    subject_code: 'FE',
    branch: 'CSE', year: 2022, semester: 1, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Basic%20Electronics%20(ECE%201051)%20PART-B.pdf`,
    slug: 'fe-endsem-2022-cse-s1', download_count: 221,
  },
  // ─── YEAR 1 · SEM 1 · CSE · MID SEM ─────────────────────────────────────
  {
    title: 'Calculus and Matrix Algebra (IMA 111) — Mid Sem 2022',
    subject: 'Calculus and Matrix Algebra',
    subject_code: 'CM-I',
    branch: 'CSE', year: 2022, semester: 1, exam_type: 'Mid-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf`,
    slug: 'cm1-midsem-2022-cse-s1', download_count: 178,
  },
  {
    title: 'Applied Physics for Engineers (IPH 111) — Mid Sem 2022',
    subject: 'Applied Physics for Engineers',
    subject_code: 'APE',
    branch: 'CSE', year: 2022, semester: 1, exam_type: 'Mid-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf`,
    slug: 'ape-midsem-2022-cse-s1', download_count: 132,
  },
  {
    title: 'Introduction to Computers and Programming (ICS 111) — Mid Sem 2022',
    subject: 'Introduction to Computers and Programming',
    subject_code: 'ICS',
    branch: 'CSE', year: 2022, semester: 1, exam_type: 'Mid-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf`,
    slug: 'ics-midsem-2022-cse-s1', download_count: 245,
  },
  // ─── YEAR 1 · SEM 2 · CSE ────────────────────────────────────────────────
  {
    title: 'Differential Equations and Transforms — End Sem 2023',
    subject: 'Differential Equations and Transforms',
    subject_code: 'CM-II',
    branch: 'CSE', year: 2023, semester: 2, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf`,
    slug: 'cm2-endsem-2023-cse-s2', download_count: 312,
  },
  {
    title: 'Object Oriented Programming with Java — End Sem 2023',
    subject: 'Object Oriented Programming',
    subject_code: 'OOPS',
    branch: 'CSE', year: 2023, semester: 2, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf`,
    slug: 'oops-endsem-2023-cse-s2', download_count: 389,
  },
  {
    title: 'Problem Solving with Python — End Sem 2023',
    subject: 'Problem Solving with Python',
    subject_code: 'PPS',
    branch: 'CSE', year: 2023, semester: 2, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf`,
    slug: 'pps-endsem-2023-cse-s2', download_count: 456,
  },
  {
    title: 'Environmental Science — End Sem 2023',
    subject: 'Environmental Science',
    subject_code: 'EVS',
    branch: 'CSE', year: 2023, semester: 2, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf`,
    slug: 'evs-endsem-2023-cse-s2', download_count: 198,
  },
  {
    title: 'Object Oriented Programming with Java — Mid Sem 2023',
    subject: 'Object Oriented Programming',
    subject_code: 'OOPS',
    branch: 'CSE', year: 2023, semester: 2, exam_type: 'Mid-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf`,
    slug: 'oops-midsem-2023-cse-s2', download_count: 201,
  },
  {
    title: 'Problem Solving with Python — Mid Sem 2023',
    subject: 'Problem Solving with Python',
    subject_code: 'PPS',
    branch: 'CSE', year: 2023, semester: 2, exam_type: 'Mid-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf`,
    slug: 'pps-midsem-2023-cse-s2', download_count: 267,
  },
  // ─── YEAR 2 · SEM 3 · CSE ────────────────────────────────────────────────
  {
    title: 'Data Structures (CSE 2151) — End Sem 2023',
    subject: 'Data Structures',
    subject_code: 'DS',
    branch: 'CSE', year: 2023, semester: 3, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM3/CSE/2022/ENDSEM/All%20SUbject/Mathematics%20-I%20(IMA%20111).pdf`,
    slug: 'ds-endsem-2023-cse-s3', download_count: 512,
  },
  {
    title: 'Computer Organization (CSE 2152) — End Sem 2023',
    subject: 'Computer Organization',
    subject_code: 'COA',
    branch: 'CSE', year: 2023, semester: 3, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM3/CSE/2022/ENDSEM/All%20SUbject/Mathematics%20-I%20(IMA%20111).pdf`,
    slug: 'coa-endsem-2023-cse-s3', download_count: 341,
  },
  {
    title: 'Digital Logic Design — End Sem 2023',
    subject: 'Digital Logic Design',
    subject_code: 'DLD',
    branch: 'CSE', year: 2023, semester: 3, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM3/CSE/2022/ENDSEM/All%20SUbject/Mathematics%20-I%20(IMA%20111).pdf`,
    slug: 'dld-endsem-2023-cse-s3', download_count: 298,
  },
  {
    title: 'Engineering Mathematics III — End Sem 2023',
    subject: 'Engineering Mathematics III',
    subject_code: 'EM-III',
    branch: 'CSE', year: 2023, semester: 3, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM3/CSE/2025/ENDSEM/Mathematics/Mathematics%20-I%20(IMA%20111).pdf`,
    slug: 'em3-endsem-2023-cse-s3', download_count: 267,
  },
  {
    title: 'Data Structures (CSE 2151) — Mid Sem 2023',
    subject: 'Data Structures',
    subject_code: 'DS',
    branch: 'CSE', year: 2023, semester: 3, exam_type: 'Mid-Sem',
    pdf_url: `${GH}/SEM3/CSE/2022/ENDSEM/All%20SUbject/Mathematics%20-I%20(IMA%20111).pdf`,
    slug: 'ds-midsem-2023-cse-s3', download_count: 234,
  },
  {
    title: 'Computer Organization — Mid Sem 2023',
    subject: 'Computer Organization',
    subject_code: 'COA',
    branch: 'CSE', year: 2023, semester: 3, exam_type: 'Mid-Sem',
    pdf_url: `${GH}/SEM3/CSE/2022/ENDSEM/All%20SUbject/Mathematics%20-I%20(IMA%20111).pdf`,
    slug: 'coa-midsem-2023-cse-s3', download_count: 178,
  },
  // ─── YEAR 2 · SEM 4 · CSE ────────────────────────────────────────────────
  {
    title: 'Design and Analysis of Algorithms — End Sem 2024',
    subject: 'Design and Analysis of Algorithms',
    subject_code: 'ADA',
    branch: 'CSE', year: 2024, semester: 4, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf`,
    slug: 'ada-endsem-2024-cse-s4', download_count: 445,
  },
  {
    title: 'Database Management Systems — End Sem 2024',
    subject: 'Database Management Systems',
    subject_code: 'DBMS',
    branch: 'CSE', year: 2024, semester: 4, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf`,
    slug: 'dbms-endsem-2024-cse-s4', download_count: 387,
  },
  {
    title: 'Operating Systems — End Sem 2024',
    subject: 'Operating Systems',
    subject_code: 'OS',
    branch: 'CSE', year: 2024, semester: 4, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf`,
    slug: 'os-endsem-2024-cse-s4', download_count: 502,
  },
  {
    title: 'Computer Networks — End Sem 2024',
    subject: 'Computer Networks',
    subject_code: 'CN',
    branch: 'CSE', year: 2024, semester: 4, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf`,
    slug: 'cn-endsem-2024-cse-s4', download_count: 321,
  },
  {
    title: 'Python Programming — End Sem 2024',
    subject: 'Python Programming',
    subject_code: 'PYTHON',
    branch: 'CSE', year: 2024, semester: 4, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf`,
    slug: 'python-endsem-2024-cse-s4', download_count: 589,
  },
  {
    title: 'Design and Analysis of Algorithms — Mid Sem 2024',
    subject: 'Design and Analysis of Algorithms',
    subject_code: 'ADA',
    branch: 'CSE', year: 2024, semester: 4, exam_type: 'Mid-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf`,
    slug: 'ada-midsem-2024-cse-s4', download_count: 198,
  },
  {
    title: 'Database Management Systems — Mid Sem 2024',
    subject: 'Database Management Systems',
    subject_code: 'DBMS',
    branch: 'CSE', year: 2024, semester: 4, exam_type: 'Mid-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf`,
    slug: 'dbms-midsem-2024-cse-s4', download_count: 176,
  },
  // ─── YEAR 3 · SEM 5 · CSE ────────────────────────────────────────────────
  {
    title: 'Machine Learning — End Sem 2024',
    subject: 'Machine Learning',
    subject_code: 'ML',
    branch: 'CSE', year: 2024, semester: 5, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf`,
    slug: 'ml-endsem-2024-cse-s5', download_count: 634,
  },
  {
    title: 'Compiler Design — End Sem 2024',
    subject: 'Compiler Design',
    subject_code: 'CD',
    branch: 'CSE', year: 2024, semester: 5, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf`,
    slug: 'cd-endsem-2024-cse-s5', download_count: 312,
  },
  {
    title: 'Formal Languages and Automata — End Sem 2024',
    subject: 'Formal Languages and Automata',
    subject_code: 'FLA',
    branch: 'CSE', year: 2024, semester: 5, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf`,
    slug: 'fla-endsem-2024-cse-s5', download_count: 245,
  },
  {
    title: 'Soft Computing — End Sem 2024',
    subject: 'Soft Computing',
    subject_code: 'SC',
    branch: 'CSE', year: 2024, semester: 5, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf`,
    slug: 'sc-endsem-2024-cse-s5', download_count: 189,
  },
  {
    title: 'Machine Learning — Mid Sem 2024',
    subject: 'Machine Learning',
    subject_code: 'ML',
    branch: 'CSE', year: 2024, semester: 5, exam_type: 'Mid-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf`,
    slug: 'ml-midsem-2024-cse-s5', download_count: 287,
  },
  // ─── YEAR 3 · SEM 6 · CSE ────────────────────────────────────────────────
  {
    title: 'Embedded Systems — End Sem 2025',
    subject: 'Embedded Systems',
    subject_code: 'ES',
    branch: 'CSE', year: 2025, semester: 6, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf`,
    slug: 'es-endsem-2025-cse-s6', download_count: 321,
  },
  {
    title: 'Linux Programming — End Sem 2025',
    subject: 'Linux Programming',
    subject_code: 'LINUX',
    branch: 'CSE', year: 2025, semester: 6, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf`,
    slug: 'linux-endsem-2025-cse-s6', download_count: 267,
  },
  // ─── YEAR 1 · SEM 1 · ECE ────────────────────────────────────────────────
  {
    title: 'Calculus and Matrix Algebra (IMA 111) — End Sem 2022',
    subject: 'Calculus and Matrix Algebra',
    subject_code: 'CM-I',
    branch: 'ECE', year: 2022, semester: 1, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf`,
    slug: 'cm1-endsem-2022-ece-s1', download_count: 312,
  },
  {
    title: 'Applied Physics for Engineers (IPH 111) — End Sem 2022',
    subject: 'Applied Physics for Engineers',
    subject_code: 'APE',
    branch: 'ECE', year: 2022, semester: 1, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf`,
    slug: 'ape-endsem-2022-ece-s1', download_count: 234,
  },
  {
    title: 'Fundamentals of Electronics (ECE 1051) — End Sem 2022',
    subject: 'Fundamentals of Electronics',
    subject_code: 'FE',
    branch: 'ECE', year: 2022, semester: 1, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Basic%20Electronics%20(ECE%201051)%20PART-B.pdf`,
    slug: 'fe-endsem-2022-ece-s1', download_count: 345,
  },
  {
    title: 'Applied Chemistry for Engineers — End Sem 2022',
    subject: 'Applied Chemistry for Engineers',
    subject_code: 'ACE',
    branch: 'ECE', year: 2022, semester: 1, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Engineering%20Chemistry%20(CHM%201051)(Makeup).pdf`,
    slug: 'ace-endsem-2022-ece-s1', download_count: 156,
  },
  // ─── YEAR 2 · SEM 3 · ECE ────────────────────────────────────────────────
  {
    title: 'Analog Circuits — End Sem 2023',
    subject: 'Analog Circuits',
    subject_code: 'AC',
    branch: 'ECE', year: 2023, semester: 3, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf`,
    slug: 'ac-endsem-2023-ece-s3', download_count: 267,
  },
  {
    title: 'Digital Signal Processing — End Sem 2023',
    subject: 'Digital Signal Processing',
    subject_code: 'DSP',
    branch: 'ECE', year: 2023, semester: 3, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf`,
    slug: 'dsp-endsem-2023-ece-s3', download_count: 198,
  },
  {
    title: 'Electromagnetic Theory — End Sem 2023',
    subject: 'Electromagnetic Theory',
    subject_code: 'EMT',
    branch: 'ECE', year: 2023, semester: 3, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf`,
    slug: 'emt-endsem-2023-ece-s3', download_count: 178,
  },
  // ─── YEAR 3 · SEM 5 · ECE ────────────────────────────────────────────────
  {
    title: 'VLSI Design — End Sem 2024',
    subject: 'VLSI Design',
    subject_code: 'VLSI',
    branch: 'ECE', year: 2024, semester: 5, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf`,
    slug: 'vlsi-endsem-2024-ece-s5', download_count: 145,
  },
  // ─── YEAR 1 · SEM 1 · EEE ────────────────────────────────────────────────
  {
    title: 'Fundamentals of Electrical Engineering — End Sem 2022',
    subject: 'Fundamentals of Electrical Engineering',
    subject_code: 'FEE',
    branch: 'EEE', year: 2022, semester: 1, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf`,
    slug: 'fee-endsem-2022-eee-s1', download_count: 201,
  },
  {
    title: 'Applied Physics for Engineers — End Sem 2022',
    subject: 'Applied Physics for Engineers',
    subject_code: 'APE',
    branch: 'EEE', year: 2022, semester: 1, exam_type: 'End-Sem',
    pdf_url: `${GH}/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf`,
    slug: 'ape-endsem-2022-eee-s1', download_count: 189,
  },
]
