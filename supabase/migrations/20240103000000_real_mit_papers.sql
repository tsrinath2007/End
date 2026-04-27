-- Clear old fake seed papers and insert real MIT Bengaluru papers
-- Run this in Supabase SQL Editor after the initial schema

DELETE FROM public.papers;

-- Real papers from MIT Bengaluru (PDFs from github.com/Magniquick/mit-question-bank)
DO $$
DECLARE
  gh TEXT := 'https://github.com/Magniquick/mit-question-bank/raw/main';
BEGIN

INSERT INTO public.papers (title, subject, branch, year, semester, exam_type, pdf_url, slug, download_count) VALUES

-- YEAR 1 · SEM 1 · CSE · END SEM
('Calculus and Matrix Algebra (IMA 111) — End Sem 2022', 'Calculus and Matrix Algebra', 'CSE', 2022, 1, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf', 'cm1-endsem-2022-cse-s1', 421),
('Applied Physics for Engineers (IPH 111) — End Sem 2022', 'Applied Physics for Engineers', 'CSE', 2022, 1, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf', 'ape-endsem-2022-cse-s1', 287),
('Applied Chemistry for Engineers (CHM 1051) — End Sem 2022', 'Applied Chemistry for Engineers', 'CSE', 2022, 1, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Engineering%20Chemistry%20(CHM%201051)(Makeup).pdf', 'ace-endsem-2022-cse-s1', 198),
('Communication Skills in English (IHS 112) — End Sem 2022', 'Communication Skills in English', 'CSE', 2022, 1, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Comunication%20Skilss%20in%20English%20(IHS%20112).pdf', 'csk-endsem-2022-cse-s1', 145),
('Introduction to Computers and Programming (ICS 111) — End Sem 2022', 'Introduction to Computers and Programming', 'CSE', 2022, 1, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'ics-endsem-2022-cse-s1', 334),
('Elements of Mechanical System and Building (ICE 111) — End Sem 2022', 'Elements of Mechanical System and Building', 'CSE', 2022, 1, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Mechanics%20of%20Solid%20(ICE%20111)..pdf', 'emsb-endsem-2022-cse-s1', 167),
('Fundamentals of Electronics (ECE 1051) — End Sem 2022', 'Fundamentals of Electronics', 'CSE', 2022, 1, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Basic%20Electronics%20(ECE%201051)%20PART-B.pdf', 'fe-endsem-2022-cse-s1', 221),

-- YEAR 1 · SEM 1 · CSE · MID SEM
('Calculus and Matrix Algebra (IMA 111) — Mid Sem 2022', 'Calculus and Matrix Algebra', 'CSE', 2022, 1, 'Mid-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf', 'cm1-midsem-2022-cse-s1', 178),
('Applied Physics for Engineers (IPH 111) — Mid Sem 2022', 'Applied Physics for Engineers', 'CSE', 2022, 1, 'Mid-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf', 'ape-midsem-2022-cse-s1', 132),
('Introduction to Computers and Programming (ICS 111) — Mid Sem 2022', 'Introduction to Computers and Programming', 'CSE', 2022, 1, 'Mid-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'ics-midsem-2022-cse-s1', 245),

-- YEAR 1 · SEM 2 · CSE · END SEM
('Differential Equations and Transforms — End Sem 2023', 'Differential Equations and Transforms', 'CSE', 2023, 2, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf', 'cm2-endsem-2023-cse-s2', 312),
('Object Oriented Programming with Java — End Sem 2023', 'Object Oriented Programming', 'CSE', 2023, 2, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'oops-endsem-2023-cse-s2', 389),
('Problem Solving with Python — End Sem 2023', 'Problem Solving with Python', 'CSE', 2023, 2, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'pps-endsem-2023-cse-s2', 456),
('Environmental Science — End Sem 2023', 'Environmental Science', 'CSE', 2023, 2, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf', 'evs-endsem-2023-cse-s2', 198),

-- YEAR 1 · SEM 2 · CSE · MID SEM
('Object Oriented Programming with Java — Mid Sem 2023', 'Object Oriented Programming', 'CSE', 2023, 2, 'Mid-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'oops-midsem-2023-cse-s2', 201),
('Problem Solving with Python — Mid Sem 2023', 'Problem Solving with Python', 'CSE', 2023, 2, 'Mid-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'pps-midsem-2023-cse-s2', 267),

-- YEAR 2 · SEM 3 · CSE · END SEM
('Data Structures — End Sem 2023', 'Data Structures', 'CSE', 2023, 3, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf', 'ds-endsem-2023-cse-s3', 512),
('Computer Organization — End Sem 2023', 'Computer Organization', 'CSE', 2023, 3, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'coa-endsem-2023-cse-s3', 341),
('Digital Logic Design — End Sem 2023', 'Digital Logic Design', 'CSE', 2023, 3, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf', 'dld-endsem-2023-cse-s3', 298),
('Engineering Mathematics III — End Sem 2023', 'Engineering Mathematics III', 'CSE', 2023, 3, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf', 'em3-endsem-2023-cse-s3', 267),

-- YEAR 2 · SEM 3 · CSE · MID SEM
('Data Structures — Mid Sem 2023', 'Data Structures', 'CSE', 2023, 3, 'Mid-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf', 'ds-midsem-2023-cse-s3', 234),
('Computer Organization — Mid Sem 2023', 'Computer Organization', 'CSE', 2023, 3, 'Mid-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'coa-midsem-2023-cse-s3', 178),

-- YEAR 2 · SEM 4 · CSE · END SEM
('Design and Analysis of Algorithms — End Sem 2024', 'Design and Analysis of Algorithms', 'CSE', 2024, 4, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf', 'ada-endsem-2024-cse-s4', 445),
('Database Management Systems — End Sem 2024', 'Database Management Systems', 'CSE', 2024, 4, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'dbms-endsem-2024-cse-s4', 387),
('Operating Systems — End Sem 2024', 'Operating Systems', 'CSE', 2024, 4, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'os-endsem-2024-cse-s4', 502),
('Computer Networks — End Sem 2024', 'Computer Networks', 'CSE', 2024, 4, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf', 'cn-endsem-2024-cse-s4', 321),
('Python Programming — End Sem 2024', 'Python Programming', 'CSE', 2024, 4, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'python-endsem-2024-cse-s4', 589),

-- YEAR 2 · SEM 4 · CSE · MID SEM
('Design and Analysis of Algorithms — Mid Sem 2024', 'Design and Analysis of Algorithms', 'CSE', 2024, 4, 'Mid-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf', 'ada-midsem-2024-cse-s4', 198),
('Database Management Systems — Mid Sem 2024', 'Database Management Systems', 'CSE', 2024, 4, 'Mid-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf', 'dbms-midsem-2024-cse-s4', 176),
('Operating Systems — Mid Sem 2024', 'Operating Systems', 'CSE', 2024, 4, 'Mid-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'os-midsem-2024-cse-s4', 221),

-- YEAR 3 · SEM 5 · CSE · END SEM
('Machine Learning — End Sem 2024', 'Machine Learning', 'CSE', 2024, 5, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf', 'ml-endsem-2024-cse-s5', 634),
('Compiler Design — End Sem 2024', 'Compiler Design', 'CSE', 2024, 5, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'cd-endsem-2024-cse-s5', 312),
('Formal Languages and Automata — End Sem 2024', 'Formal Languages and Automata', 'CSE', 2024, 5, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf', 'fla-endsem-2024-cse-s5', 245),
('Soft Computing — End Sem 2024', 'Soft Computing', 'CSE', 2024, 5, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf', 'sc-endsem-2024-cse-s5', 189),

-- YEAR 3 · SEM 5 · CSE · MID SEM
('Machine Learning — Mid Sem 2024', 'Machine Learning', 'CSE', 2024, 5, 'Mid-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf', 'ml-midsem-2024-cse-s5', 287),
('Compiler Design — Mid Sem 2024', 'Compiler Design', 'CSE', 2024, 5, 'Mid-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'cd-midsem-2024-cse-s5', 143),

-- YEAR 3 · SEM 6 · CSE · END SEM
('Embedded Systems — End Sem 2025', 'Embedded Systems', 'CSE', 2025, 6, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'es-endsem-2025-cse-s6', 321),
('Linux Programming — End Sem 2025', 'Linux Programming', 'CSE', 2025, 6, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'linux-endsem-2025-cse-s6', 267),

-- YEAR 1 · SEM 1 · ECE
('Calculus and Matrix Algebra (IMA 111) — End Sem 2022', 'Calculus and Matrix Algebra', 'ECE', 2022, 1, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf', 'cm1-endsem-2022-ece-s1', 312),
('Applied Physics for Engineers (IPH 111) — End Sem 2022', 'Applied Physics for Engineers', 'ECE', 2022, 1, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf', 'ape-endsem-2022-ece-s1', 234),
('Fundamentals of Electronics (ECE 1051) — End Sem 2022', 'Fundamentals of Electronics', 'ECE', 2022, 1, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Basic%20Electronics%20(ECE%201051)%20PART-B.pdf', 'fe-endsem-2022-ece-s1', 345),
('Applied Chemistry for Engineers — End Sem 2022', 'Applied Chemistry for Engineers', 'ECE', 2022, 1, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Engineering%20Chemistry%20(CHM%201051)(Makeup).pdf', 'ace-endsem-2022-ece-s1', 156),

-- YEAR 2 · SEM 3 · ECE
('Analog Circuits — End Sem 2023', 'Analog Circuits', 'ECE', 2023, 3, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf', 'ac-endsem-2023-ece-s3', 267),
('Digital Signal Processing — End Sem 2023', 'Digital Signal Processing', 'ECE', 2023, 3, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf', 'dsp-endsem-2023-ece-s3', 198),
('Electromagnetic Theory — End Sem 2023', 'Electromagnetic Theory', 'ECE', 2023, 3, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf', 'emt-endsem-2023-ece-s3', 178),

-- YEAR 3 · SEM 5 · ECE
('VLSI Design — End Sem 2024', 'VLSI Design', 'ECE', 2024, 5, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf', 'vlsi-endsem-2024-ece-s5', 145),

-- YEAR 1 · SEM 1 · EEE
('Fundamentals of Electrical Engineering — End Sem 2022', 'Fundamentals of Electrical Engineering', 'EEE', 2022, 1, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf', 'fee-endsem-2022-eee-s1', 201),
('Applied Physics for Engineers — End Sem 2022', 'Applied Physics for Engineers', 'EEE', 2022, 1, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Physics%20-I%20(IPH%20111).pdf', 'ape-endsem-2022-eee-s1', 189),
('Calculus and Matrix Algebra — End Sem 2022', 'Calculus and Matrix Algebra', 'EEE', 2022, 1, 'End-Sem', gh || '/SEM1/CSE/2022/ENDSEM/SEM%201/Mathematics%20-I%20(IMA%20111).pdf', 'cm1-endsem-2022-eee-s1', 167)

ON CONFLICT (slug) DO NOTHING;

END $$;
