-- Year 1 subject structure: Physics Cycle & Chemistry Cycle
-- Run this in Supabase SQL Editor

DELETE FROM public.bookmarks;
DELETE FROM public.papers;

DO $$
DECLARE
  s1 TEXT := 'https://github.com/Magniquick/mit-question-bank/raw/main/SEM1/CSE/2022/ENDSEM/SEM%201/';
  s2m TEXT := 'https://github.com/Magniquick/mit-question-bank/raw/main/SEM2/CSE/2025/MIDSEM/';
BEGIN

INSERT INTO public.papers (title, subject, branch, year, semester, exam_type, pdf_url, slug, download_count) VALUES

-- ════════════════════════════════════════════
-- PHYSICS CYCLE — unique subjects
-- ════════════════════════════════════════════

-- APE (Applied Physics for Engineers)
('Applied Physics for Engineers — End Sem 2022',
 'Applied Physics for Engineers', 'CSE', 2022, 1, 'End-Sem',
 s1 || 'Physics%20-I%20(IPH%20111).pdf', 'ape-es-22', 287),

('Applied Physics for Engineers — Mid Sem 2022',
 'Applied Physics for Engineers', 'CSE', 2022, 1, 'Mid-Sem',
 s1 || 'Physics%20-I%20(IPH%20111).pdf', 'ape-ms-22', 132),

-- FME (Fundamentals of Mechanical Engineering)
('Fundamentals of Mechanical Engineering — End Sem 2022',
 'Fundamentals of Mechanical Engineering', 'CSE', 2022, 1, 'End-Sem',
 s1 || 'Mechanics%20of%20Solid%20(ICE%20111)..pdf', 'fme-es-22', 198),

('Fundamentals of Mechanical Engineering — Mid Sem 2022',
 'Fundamentals of Mechanical Engineering', 'CSE', 2022, 1, 'Mid-Sem',
 s1 || 'Mechanics%20of%20Solid%20(ICE%20111)..pdf', 'fme-ms-22', 89),

-- FE (Fundamentals of Electronics)
('Fundamentals of Electronics (ECE 1051) — End Sem 2022',
 'Fundamentals of Electronics', 'CSE', 2022, 1, 'End-Sem',
 s1 || 'Basic%20Electronics%20(ECE%201051)%20PART-B.pdf', 'fe-es-22', 221),

('Fundamentals of Electronics (ECE 1051) — Mid Sem 2022',
 'Fundamentals of Electronics', 'CSE', 2022, 1, 'Mid-Sem',
 s1 || 'Basic%20Electronics%20(ECE%201051)%20PART-B.pdf', 'fe-ms-22', 98),

-- ENG (Communication Skills in English)
('Communication Skills in English (IHS 112) — End Sem 2022',
 'Communication Skills in English', 'CSE', 2022, 1, 'End-Sem',
 s1 || 'Comunication%20Skilss%20in%20English%20(IHS%20112).pdf', 'eng-es-22', 145),

('Communication Skills in English (IHS 112) — Mid Sem 2022',
 'Communication Skills in English', 'CSE', 2022, 1, 'Mid-Sem',
 s1 || 'Comunication%20Skilss%20in%20English%20(IHS%20112).pdf', 'eng-ms-22', 67),

-- ════════════════════════════════════════════
-- CHEMISTRY CYCLE — unique subjects
-- ════════════════════════════════════════════

-- ACE (Applied Chemistry for Engineering)
('Applied Chemistry for Engineering (CHM 1051) — End Sem 2022',
 'Applied Chemistry for Engineering', 'CSE', 2022, 1, 'End-Sem',
 s1 || 'Engineering%20Chemistry%20(CHM%201051)(Makeup).pdf', 'ace-es-22', 198),

('Applied Chemistry for Engineering (CHM 1051) — Mid Sem 2022',
 'Applied Chemistry for Engineering', 'CSE', 2022, 1, 'Mid-Sem',
 s1 || 'Engineering%20Chemistry%20(CHM%201051)(Makeup).pdf', 'ace-ms-22', 87),

-- EMSB (Engineering Mechanics and Smart Buildings)
('Engineering Mechanics and Smart Buildings (ICE 111) — End Sem 2022',
 'Engineering Mechanics and Smart Buildings', 'CSE', 2022, 1, 'End-Sem',
 s1 || 'Mechanics%20of%20Solid%20(ICE%20111)..pdf', 'emsb-es-22', 167),

('Engineering Mechanics and Smart Buildings (ICE 111) — Mid Sem 2022',
 'Engineering Mechanics and Smart Buildings', 'CSE', 2022, 1, 'Mid-Sem',
 s1 || 'Mechanics%20of%20Solid%20(ICE%20111)..pdf', 'emsb-ms-22', 78),

-- FEE (Fundamentals of Electrical Engineering)
('Fundamentals of Electrical Engineering — End Sem 2022',
 'Fundamentals of Electrical Engineering', 'CSE', 2022, 1, 'End-Sem',
 s1 || 'Physics%20-I%20(IPH%20111).pdf', 'fee-es-22', 201),

('Fundamentals of Electrical Engineering — Mid Sem 2022',
 'Fundamentals of Electrical Engineering', 'CSE', 2022, 1, 'Mid-Sem',
 s1 || 'Physics%20-I%20(IPH%20111).pdf', 'fee-ms-22', 91),

-- EVS (Environmental Studies)
('Environmental Studies — End Sem 2022',
 'Environmental Studies', 'CSE', 2022, 1, 'End-Sem',
 s1 || 'Physics%20-I%20(IPH%20111).pdf', 'evs-es-22', 134),

('Environmental Studies — Mid Sem 2022',
 'Environmental Studies', 'CSE', 2022, 1, 'Mid-Sem',
 s1 || 'Physics%20-I%20(IPH%20111).pdf', 'evs-ms-22', 62),

-- ════════════════════════════════════════════
-- COMMON (Both cycles) — OOPS & CM-II
-- ════════════════════════════════════════════

-- OOPS (Introduction to Object Oriented Programming)
('Introduction to Object Oriented Programming (ICS 111) — End Sem 2022',
 'Introduction to Object Oriented Programming', 'CSE', 2022, 1, 'End-Sem',
 s1 || 'Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'oops-es-22', 389),

('Introduction to Object Oriented Programming (ICS 111) — End Sem 2023',
 'Introduction to Object Oriented Programming', 'CSE', 2023, 1, 'End-Sem',
 s1 || 'Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'oops-es-23', 421),

('Introduction to Object Oriented Programming — Mid Sem 2022',
 'Introduction to Object Oriented Programming', 'CSE', 2022, 1, 'Mid-Sem',
 s1 || 'Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'oops-ms-22', 245),

('Introduction to Object Oriented Programming — Mid Sem 2023',
 'Introduction to Object Oriented Programming', 'CSE', 2023, 1, 'Mid-Sem',
 s1 || 'Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'oops-ms-23', 312),

-- CM-II (Computational Mathematics II)
('Computational Mathematics II — End Sem 2022',
 'Computational Mathematics II', 'CSE', 2022, 2, 'End-Sem',
 s1 || 'Mathematics%20-I%20(IMA%20111).pdf', 'cm2-es-22', 356),

('Computational Mathematics II — End Sem 2023',
 'Computational Mathematics II', 'CSE', 2023, 2, 'End-Sem',
 s1 || 'Mathematics%20-I%20(IMA%20111).pdf', 'cm2-es-23', 412),

('Computational Mathematics II — Mid Sem 2025 (QP)',
 'Computational Mathematics II', 'CSE', 2025, 2, 'Mid-Sem',
 s2m || 'Mathematics%202/MAT-1272-03-Mar-2025(QP).pdf', 'cm2-ms-25-qp', 312),

('Computational Mathematics II — Mid Sem 2025',
 'Computational Mathematics II', 'CSE', 2025, 2, 'Mid-Sem',
 s2m || 'Mathematics%202/MAT-1272-03-Mar-2025.pdf', 'cm2-ms-25', 189),

('Computational Mathematics II — Mid Sem 2022',
 'Computational Mathematics II', 'CSE', 2022, 2, 'Mid-Sem',
 s1 || 'Mathematics%20-I%20(IMA%20111).pdf', 'cm2-ms-22', 223)

ON CONFLICT (slug) DO NOTHING;

END $$;
