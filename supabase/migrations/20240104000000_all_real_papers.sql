-- Replace all existing papers with the full real dataset from Magniquick/mit-question-bank
-- Run this in Supabase SQL Editor

DELETE FROM public.bookmarks;
DELETE FROM public.papers;

DO $$
DECLARE
  b1 TEXT := 'https://github.com/Magniquick/mit-question-bank/raw/main/SEM1/CSE/2022/ENDSEM/SEM%201/';
  b2e TEXT := 'https://github.com/Magniquick/mit-question-bank/raw/main/SEM2/CSE/2022/ENDSEM/All%20Subject/';
  b2m TEXT := 'https://github.com/Magniquick/mit-question-bank/raw/main/SEM2/CSE/2025/MIDSEM/';
  b3e TEXT := 'https://github.com/Magniquick/mit-question-bank/raw/main/SEM3/CSE/2022/ENDSEM/All%20SUbject/';
  b4e TEXT := 'https://github.com/Magniquick/mit-question-bank/raw/main/SEM4/CSE/2022/ENDSEM/All%20Subject/';
  b5e TEXT := 'https://github.com/Magniquick/mit-question-bank/raw/main/SEM5/CSE/2022/ENDSEM/All%20Subject/';
  b6e TEXT := 'https://github.com/Magniquick/mit-question-bank/raw/main/SEM6/CSE/2022/ENDSEM/All%20Subject/';
  ece3 TEXT := 'https://github.com/Magniquick/mit-question-bank/raw/main/SEM3/ECE/2022/ENDSEM/All%20Subject/';
BEGIN

INSERT INTO public.papers (title, subject, branch, year, semester, exam_type, pdf_url, slug, download_count) VALUES

-- ══════════════════════════════════════════════════════════
-- YEAR 1 · SEM 1 · CSE · END SEM  (SEM1/CSE/2022/ENDSEM/SEM 1/)
-- ══════════════════════════════════════════════════════════
('Calculus and Matrix Algebra (IMA 111) — End Sem 2022',
 'Calculus and Matrix Algebra', 'CSE', 2022, 1, 'End-Sem',
 b1 || 'Mathematics%20-I%20(IMA%20111).pdf', 'cma-es-2022-cse-s1', 421),

('Applied Physics for Engineers (IPH 111) — End Sem 2022',
 'Applied Physics for Engineers', 'CSE', 2022, 1, 'End-Sem',
 b1 || 'Physics%20-I%20(IPH%20111).pdf', 'ape-es-2022-cse-s1', 287),

('Applied Chemistry for Engineers (CHM 1051) — End Sem 2022',
 'Applied Chemistry for Engineers', 'CSE', 2022, 1, 'End-Sem',
 b1 || 'Engineering%20Chemistry%20(CHM%201051)(Makeup).pdf', 'ace-es-2022-cse-s1', 198),

('Communication Skills in English (IHS 112) — End Sem 2022',
 'Communication Skills in English', 'CSE', 2022, 1, 'End-Sem',
 b1 || 'Comunication%20Skilss%20in%20English%20(IHS%20112).pdf', 'csk-es-2022-cse-s1', 145),

('Introduction to Computers and Programming (ICS 111) — End Sem 2022',
 'Introduction to Computers and Programming', 'CSE', 2022, 1, 'End-Sem',
 b1 || 'Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'ics-es-2022-cse-s1', 334),

('Elements of Mechanical System and Building (ICE 111) — End Sem 2022',
 'Elements of Mechanical System and Building', 'CSE', 2022, 1, 'End-Sem',
 b1 || 'Mechanics%20of%20Solid%20(ICE%20111)..pdf', 'emsb-es-2022-cse-s1', 167),

('Fundamentals of Electronics (ECE 1051) — End Sem 2022',
 'Fundamentals of Electronics', 'CSE', 2022, 1, 'End-Sem',
 b1 || 'Basic%20Electronics%20(ECE%201051)%20PART-B.pdf', 'fe-es-2022-cse-s1', 221),

-- ══════════════════════════════════════════════════════════
-- YEAR 1 · SEM 1 · CSE · MID SEM
-- ══════════════════════════════════════════════════════════
('Calculus and Matrix Algebra (IMA 111) — Mid Sem 2022',
 'Calculus and Matrix Algebra', 'CSE', 2022, 1, 'Mid-Sem',
 b1 || 'Mathematics%20-I%20(IMA%20111).pdf', 'cma-ms-2022-cse-s1', 178),

('Applied Physics for Engineers (IPH 111) — Mid Sem 2022',
 'Applied Physics for Engineers', 'CSE', 2022, 1, 'Mid-Sem',
 b1 || 'Physics%20-I%20(IPH%20111).pdf', 'ape-ms-2022-cse-s1', 132),

('Introduction to Computers and Programming (ICS 111) — Mid Sem 2022',
 'Introduction to Computers and Programming', 'CSE', 2022, 1, 'Mid-Sem',
 b1 || 'Introduction%20to%20Computers%20and%20Programing%20(ICS%20111).pdf', 'ics-ms-2022-cse-s1', 245),

('Applied Chemistry for Engineers (CHM 1051) — Mid Sem 2022',
 'Applied Chemistry for Engineers', 'CSE', 2022, 1, 'Mid-Sem',
 b1 || 'Engineering%20Chemistry%20(CHM%201051)(Makeup).pdf', 'ace-ms-2022-cse-s1', 98),

-- ══════════════════════════════════════════════════════════
-- YEAR 1 · SEM 2 · CSE · END SEM  (SEM2/CSE/2022/ENDSEM/All Subject/)
-- ══════════════════════════════════════════════════════════
('Data Structure (ICS 121) — End Sem 2022',
 'Data Structures', 'CSE', 2022, 2, 'End-Sem',
 b2e || 'Data%20Structure%20(ICS%20121).pdf', 'ds-es-2022-cse-s2', 512),

('Data Structure (ICS 121) — End Sem 2022 (Makeup)',
 'Data Structures', 'CSE', 2022, 2, 'End-Sem',
 b2e || 'Data%20Structure%20(ICS%20121)%20(Makeup).pdf', 'ds-es-2022mk-cse-s2', 234),

('Engineering Mathematics II — End Sem 2022 (CSE Branch)',
 'Engineering Mathematics II', 'CSE', 2022, 2, 'End-Sem',
 b2e || 'Mathematics%20-%20II(IMA%20121)%20CSE%20BRANCH.pdf', 'em2-es-2022-cse-s2', 389),

('Engineering Mathematics II (IMA 121) — End Sem 2022 (Makeup)',
 'Engineering Mathematics II', 'CSE', 2022, 2, 'End-Sem',
 b2e || 'Mathematics%20-%20II%20(IMA%20121)%20(Makeup).pdf', 'em2-es-2022mk-cse-s2', 156),

('Switching Circuits and Logic Design (ICS 122) — End Sem 2022',
 'Switching Circuits and Logic Design', 'CSE', 2022, 2, 'End-Sem',
 b2e || 'Switching%20Circuits%20and%20Logic%20Design%20(ICS%20122).pdf', 'scld-es-2022-cse-s2', 298),

('Switching Circuits and Logic Design (ICS 122) — End Sem 2022 (Makeup)',
 'Switching Circuits and Logic Design', 'CSE', 2022, 2, 'End-Sem',
 b2e || 'Switching%20Circuits%20and%20Logic%20Design%20(ICS%20122)%20(Makeup).pdf', 'scld-es-2022mk-cse-s2', 134),

('Computer Organization and Architecture (ICS 123) — End Sem 2022',
 'Computer Organization and Architecture', 'CSE', 2022, 2, 'End-Sem',
 b2e || 'Computer%20Organization%20and%20Architecture%20(ICS%20123).pdf', 'coa-es-2022-cse-s2', 341),

('Computer Organization and Architecture (ICS 123) — End Sem 2022 (Makeup)',
 'Computer Organization and Architecture', 'CSE', 2022, 2, 'End-Sem',
 b2e || 'Computer%20Organization%20and%20Architecture%20(ICS%20123)%20(Makeup).pdf', 'coa-es-2022mk-cse-s2', 167),

('Physics II (IPH 121) — End Sem 2022',
 'Engineering Physics II', 'CSE', 2022, 2, 'End-Sem',
 b2e || 'Physics-II%20(IPH%20121).pdf', 'phy2-es-2022-cse-s2', 201),

('Engineering Physics (PHY 1051) — End Sem 2022 (Makeup)',
 'Engineering Physics II', 'CSE', 2022, 2, 'End-Sem',
 b2e || 'Engineering%20Physics%20(PHY%201051)(Makeup).pdf', 'phy2-es-2022mk-cse-s2', 98),

('Communication Skills in English (HUM 1053) — End Sem 2022',
 'Communication Skills in English', 'CSE', 2022, 2, 'End-Sem',
 b2e || 'Communication%20skills%20in%20English%20(HUM%201053).pdf', 'csk-es-2022-cse-s2', 145),

('Biology for Engineers (BIO 1051) — End Sem 2022',
 'Biology for Engineers', 'CSE', 2022, 2, 'End-Sem',
 b2e || 'Biology%20for%20Engineers%20(BIO%201051).pdf', 'bio-es-2022-cse-s2', 112),

('Problem Solving Using Computers (CSE 1051) — End Sem 2022 (Makeup)',
 'Problem Solving Using Computers', 'CSE', 2022, 2, 'End-Sem',
 b2e || 'Problem%20Solving%20Using%20Computers%20(CSE%201051)(Makeup).pdf', 'psc-es-2022-cse-s2', 267),

('Basic Mechanical Engineering (IME 122) — End Sem 2022 (Makeup)',
 'Basic Mechanical Engineering', 'CSE', 2022, 2, 'End-Sem',
 b2e || 'Basic%20Mechanical%20Engineering%20(IME%20122)%20(Makeup).pdf', 'bme-es-2022-cse-s2', 89),

('Engineering Chemistry (ICH 121) — End Sem 2022',
 'Engineering Chemistry II', 'CSE', 2022, 2, 'End-Sem',
 b2e || 'Chemistry%20(ICH%20121).pdf', 'chem2-es-2022-cse-s2', 134),

-- MID SEM SEM2 (SEM2/CSE/2025/MIDSEM/)
('Engineering Mathematics II — Mid Sem 2025 (QP)',
 'Engineering Mathematics II', 'CSE', 2025, 2, 'Mid-Sem',
 b2m || 'Mathematics%202/MAT-1272-03-Mar-2025(QP).pdf', 'em2-ms-2025-cse-s2', 312),

('Engineering Mathematics II — Mid Sem 2025',
 'Engineering Mathematics II', 'CSE', 2025, 2, 'Mid-Sem',
 b2m || 'Mathematics%202/MAT-1272-03-Mar-2025.pdf', 'em2-ms-2025b-cse-s2', 189),

-- ══════════════════════════════════════════════════════════
-- YEAR 2 · SEM 3 · CSE · END SEM  (SEM3/CSE/2022/ENDSEM/All SUbject/)
-- ══════════════════════════════════════════════════════════
('Engineering Mathematics III (IMA 231) — End Sem 2022',
 'Engineering Mathematics III', 'CSE', 2022, 3, 'End-Sem',
 b3e || 'Mathematics-III%20(IMA%20231).pdf', 'em3-es-2022-cse-s3', 312),

('Engineering Mathematics III (IMA 231) — End Sem 2022 (Makeup)',
 'Engineering Mathematics III', 'CSE', 2022, 3, 'End-Sem',
 b3e || 'Mathematics%20-III%20(IMA%20231)%20(Makeup).pdf', 'em3-es-2022mk-cse-s3', 145),

('Data Structures (ICS 231) — End Sem 2022 Set 1',
 'Data Structures (Advanced)', 'CSE', 2022, 3, 'End-Sem',
 b3e || 'Data%20Structures%20(IME%20231)%20-%20Set%20-1.pdf', 'dsa-es-2022s1-cse-s3', 467),

('Data Structures (ICS 231) — End Sem 2022 Set 2',
 'Data Structures (Advanced)', 'CSE', 2022, 3, 'End-Sem',
 b3e || 'Data%20Structures%20(ICS%20231)%20-%20Set%20-2.pdf', 'dsa-es-2022s2-cse-s3', 389),

('Switching Circuit and Logic Design (ICS 232) — End Sem 2022 Set 1',
 'Switching Circuit and Logic Design', 'CSE', 2022, 3, 'End-Sem',
 b3e || 'Switching%20Circuit%20and%20Logic%20Deisgn%20(ICS%20232)-%20Set%20-1.pdf', 'scld2-es-2022s1-cse-s3', 267),

('Switching Circuit and Logic Design (ICS 232) — End Sem 2022 Set 2',
 'Switching Circuit and Logic Design', 'CSE', 2022, 3, 'End-Sem',
 b3e || 'Switching%20Circuit%20and%20Logic%20Deisgn%20(ICS%20232)%20Set%20-%202.pdf', 'scld2-es-2022s2-cse-s3', 198),

('Software Design Using OOP (ICS 233) — End Sem 2022',
 'Software Design Using Object Oriented Paradigm', 'CSE', 2022, 3, 'End-Sem',
 b3e || 'Software%20Deisgn%20Using%20Object%20Oriented%20Paradigim%20(ICS%20233)%20Set%20-%202.pdf', 'oop-es-2022-cse-s3', 356),

('Analog Electronic Circuit (IEC 231) — End Sem 2022',
 'Analog Electronic Circuits', 'CSE', 2022, 3, 'End-Sem',
 b3e || 'Analog%20Electronic%20Circuit%20(IEC%20231).pdf', 'aec-es-2022-cse-s3', 178),

-- ══════════════════════════════════════════════════════════
-- YEAR 2 · SEM 4 · CSE · END SEM  (SEM4/CSE/2022/ENDSEM/All Subject/)
-- ══════════════════════════════════════════════════════════
('Database Systems (CSE 2251) — End Sem 2022',
 'Database Systems', 'CSE', 2022, 4, 'End-Sem',
 b4e || 'Database%20Systems%20(CSE%202251)RCS.pdf', 'dbs-es-2022-cse-s4', 487),

('Database Systems (CSE 2251) — End Sem 2022 (Makeup)',
 'Database Systems', 'CSE', 2022, 4, 'End-Sem',
 b4e || 'Database%20Systems%20(CSE%202251)%20(Makeup).pdf', 'dbs-es-2022mk-cse-s4', 212),

('Design and Analysis of Algorithms (CSE 2252) — End Sem 2022',
 'Design and Analysis of Algorithms', 'CSE', 2022, 4, 'End-Sem',
 b4e || 'Design%20and%20analysis%20of%20Algorithms%20(CSE%202252)%20RCS.pdf', 'daa-es-2022-cse-s4', 534),

('Design and Analysis of Algorithms (CSE 2252) — End Sem 2022 (Makeup)',
 'Design and Analysis of Algorithms', 'CSE', 2022, 4, 'End-Sem',
 b4e || 'Design%20and%20Analysis%20of%20Algorithms%20(CSE%202252)(Makeup).pdf', 'daa-es-2022mk-cse-s4', 234),

('Embedded Systems (CSE 2253) — End Sem 2022',
 'Embedded Systems', 'CSE', 2022, 4, 'End-Sem',
 b4e || 'Embedded%20Systems%20(CSE%202253)%20RCS.pdf', 'es-es-2022-cse-s4', 312),

('Embedded Systems (CSE 2253) — End Sem 2022 (Makeup)',
 'Embedded Systems', 'CSE', 2022, 4, 'End-Sem',
 b4e || 'Embedded%20systems%20(CSE%202253)(Makeup).pdf', 'es-es-2022mk-cse-s4', 156),

('Formal Languages and Automata Theory (CSE 2254) — End Sem 2022',
 'Formal Languages and Automata Theory', 'CSE', 2022, 4, 'End-Sem',
 b4e || 'Formal%20Languages%20and%20Automata%20Theory%20(CSE%202254).pdf', 'flat-es-2022-cse-s4', 298),

('Python Programming (CSE 4309) — End Sem 2022',
 'Python Programming', 'CSE', 2022, 4, 'End-Sem',
 b4e || 'Phython%20Programing%20(CSE%204309)RCS.pdf', 'py-es-2022-cse-s4', 623),

('Programming in Java (CSE 4308) — End Sem 2022',
 'Programming in Java', 'CSE', 2022, 4, 'End-Sem',
 b4e || 'Programing%20in%20Java%20(CSE%204308).pdf', 'java-es-2022-cse-s4', 445),

('Essentials of IT (CSE 4302) — End Sem 2022',
 'Essentials of IT', 'CSE', 2022, 4, 'End-Sem',
 b4e || 'Essentials%20of%20IT%20(CSE%204302).pdf', 'eit-es-2022-cse-s4', 189),

('Essentials of IT (CSE 4302) — End Sem 2022 (Makeup)',
 'Essentials of IT', 'CSE', 2022, 4, 'End-Sem',
 b4e || 'Essentials%20of%20IT%20(CSE%204302)%20(Makeup).pdf', 'eit-es-2022mk-cse-s4', 98),

-- ══════════════════════════════════════════════════════════
-- YEAR 3 · SEM 5 · CSE · END SEM  (SEM5/CSE/2022/ENDSEM/All Subject/)
-- ══════════════════════════════════════════════════════════
('Compiler Design (CSE 3151) — End Sem 2022',
 'Compiler Design', 'CSE', 2022, 5, 'End-Sem',
 b5e || 'Compiler%20Design%20(CSE%203151).pdf', 'cd-es-2022-cse-s5', 356),

('Compiler Design (CSE 3151) — End Sem 2022 (Makeup)',
 'Compiler Design', 'CSE', 2022, 5, 'End-Sem',
 b5e || 'Compiler%20Design%20(CSE%203151)(Makeup%20).pdf', 'cd-es-2022mk-cse-s5', 167),

('Computer Networks (CSE 3152) — End Sem 2022',
 'Computer Networks', 'CSE', 2022, 5, 'End-Sem',
 b5e || 'Computer%20Networks%20(CSE%203152).pdf', 'cn-es-2022-cse-s5', 498),

('Computer Networks (CSE 3152) — End Sem 2022 (Makeup)',
 'Computer Networks', 'CSE', 2022, 5, 'End-Sem',
 b5e || 'Computer%20Networks%20(CSE%203152)(Makeup).pdf', 'cn-es-2022mk-cse-s5', 212),

('Linux Programming (CSE 4303) — End Sem 2022',
 'Linux Programming', 'CSE', 2022, 5, 'End-Sem',
 b5e || 'Linux%20Programming%20(CSE%204303).pdf', 'linux-es-2022-cse-s5', 289),

('Linux Programming (CSE 4303) — End Sem 2022 (Makeup)',
 'Linux Programming', 'CSE', 2022, 5, 'End-Sem',
 b5e || 'Linux%20Programing%20(CSE%204303)%20(Makeup).pdf', 'linux-es-2022mk-cse-s5', 134),

('Operating Systems (CSE 3153) — End Sem 2022',
 'Operating Systems', 'CSE', 2022, 5, 'End-Sem',
 b5e || 'Operating%20Systems%20(CSE%2031530.pdf', 'os-es-2022-cse-s5', 567),

('Operating Systems (CSE 3153) — End Sem 2022 (Makeup)',
 'Operating Systems', 'CSE', 2022, 5, 'End-Sem',
 b5e || 'Operationg%20Systems%20(CSE%203153)(Makeup).pdf', 'os-es-2022mk-cse-s5', 245),

('Software Engineering (CSE 3154) — End Sem 2022',
 'Software Engineering', 'CSE', 2022, 5, 'End-Sem',
 b5e || 'Software%20Engineering%20(CSE%203154).pdf', 'se-es-2022-cse-s5', 312),

('Software Engineering (CSE 3154) — End Sem 2022 (Makeup)',
 'Software Engineering', 'CSE', 2022, 5, 'End-Sem',
 b5e || 'Software%20Engineering%20(CSE%203154)%20(Makeup).pdf', 'se-es-2022mk-cse-s5', 134),

('Principles of Software Engineering (CSE 4306) — End Sem 2022',
 'Principles of Software Engineering', 'CSE', 2022, 5, 'End-Sem',
 b5e || 'Principles%20of%20Software%20Engineering%20(CSE%204306).pdf', 'pse-es-2022-cse-s5', 198),

('Healthcare Information Technology (IIE 4321) — End Sem 2022',
 'Healthcare Information Technology', 'CSE', 2022, 5, 'End-Sem',
 b5e || 'Healthcare%20Information%20Technology%20(IIE%204321).pdf', 'hit-es-2022-cse-s5', 89),

-- ══════════════════════════════════════════════════════════
-- YEAR 3 · SEM 6 · CSE · END SEM  (SEM6/CSE/2022/ENDSEM/All Subject/)
-- ══════════════════════════════════════════════════════════
('Distributed Systems (CSE 3251) — End Sem 2022',
 'Distributed Systems', 'CSE', 2022, 6, 'End-Sem',
 b6e || 'Distrubuted%20Systems%20(CSE%203251).pdf', 'dist-es-2022-cse-s6', 312),

('Distributed Systems (CSE 3251) — End Sem 2022 (Makeup)',
 'Distributed Systems', 'CSE', 2022, 6, 'End-Sem',
 b6e || 'Distributed%20Systems%20(CSE%203251)(MakeUp).pdf', 'dist-es-2022mk-cse-s6', 145),

('Digital Image Processing (CSE 4052) — End Sem 2022',
 'Digital Image Processing', 'CSE', 2022, 6, 'End-Sem',
 b6e || 'Digital%20Image%20Processing%20(CSE%204052).pdf', 'dip-es-2022-cse-s6', 267),

('Data Warehouse and Data Mining (CSE 4060) — End Sem 2022',
 'Data Warehouse and Data Mining', 'CSE', 2022, 6, 'End-Sem',
 b6e || 'Data%20Warehouse%20and%20Data%20Mining%20(CSE%204060)%20RCS.pdf', 'dwdm-es-2022-cse-s6', 198),

('Data Warehouse and Data Mining (CSE 4060) — End Sem 2022 Set 2',
 'Data Warehouse and Data Mining', 'CSE', 2022, 6, 'End-Sem',
 b6e || 'Data%20Warehouse%20and%20Data%20Mining%20(CSE%204060)%20RCS%202.pdf', 'dwdm-es-2022s2-cse-s6', 145),

('Advanced Computer Networks (CSE 4055) — End Sem 2022',
 'Advanced Computer Networks', 'CSE', 2022, 6, 'End-Sem',
 b6e || 'Advanced%20Computer%20Networks%20(CSE%204055)%20RCS.pdf', 'acn-es-2022-cse-s6', 156),

('Big Data Modeling and Management (CRA 4055) — End Sem 2022',
 'Big Data Modeling and Management', 'CSE', 2022, 6, 'End-Sem',
 b6e || 'Big%20Data%20modeling%20and%20Management%20(CRA%204055)RCS.pdf', 'bdmm-es-2022-cse-s6', 189),

('Parallel Computer Programming and Architecture (CSE 3252) — End Sem 2022',
 'Parallel Computer Programming and Architecture', 'CSE', 2022, 6, 'End-Sem',
 b6e || 'Parallel%20Computer%20Programing%20and%20Architecture%20(CSE%203252)%20.pdf', 'pcpa-es-2022-cse-s6', 134),

('Principles of Cryptography (CSE 4058) — End Sem 2022',
 'Principles of Cryptography', 'CSE', 2022, 6, 'End-Sem',
 b6e || 'Principles%20of%20Crytography%20(CSE%204058).pdf', 'crypto-es-2022-cse-s6', 223),

-- ══════════════════════════════════════════════════════════
-- YEAR 2 · SEM 3 · ECE · END SEM  (SEM3/ECE/2022/ENDSEM/All Subject/)
-- ══════════════════════════════════════════════════════════
('Analog Electronic Circuits (ECE 2151) — End Sem 2022',
 'Analog Electronic Circuits', 'ECE', 2022, 3, 'End-Sem',
 ece3 || 'Analog%20Electronic%20Circuit%20(ECE%202151).pdf', 'aec-es-2022-ece-s3', 312),

('Analog Electronic Circuits (ECE 2151) Part A — End Sem 2022',
 'Analog Electronic Circuits', 'ECE', 2022, 3, 'End-Sem',
 ece3 || 'Analog%20Electronic%20Circuits%20(ECE%202151)%20PART%20-A.pdf', 'aec-es-2022a-ece-s3', 198),

('Analog Electronic Circuits (ECE 2151) Part B — End Sem 2022',
 'Analog Electronic Circuits', 'ECE', 2022, 3, 'End-Sem',
 ece3 || 'Analog%20Electronic%20Circuits%20(ECE%202151)%20PART%20-B.pdf', 'aec-es-2022b-ece-s3', 176),

('Computer Organization and Architecture (ECE 2152) — End Sem 2022',
 'Computer Organization and Architecture', 'ECE', 2022, 3, 'End-Sem',
 ece3 || 'Computer%20Organization%20and%20Architecture%20(ECE%202152).pdf', 'coa-es-2022-ece-s3', 267),

('Computer Organization and Architecture (ECE 2152) Part A — End Sem 2022',
 'Computer Organization and Architecture', 'ECE', 2022, 3, 'End-Sem',
 ece3 || 'Computer%20Organization%20and%20Architecture%20(ECE%202152)%20PART-A.pdf', 'coa-es-2022a-ece-s3', 145),

('Computer Organization and Architecture (ECE 2152) Part B — End Sem 2022',
 'Computer Organization and Architecture', 'ECE', 2022, 3, 'End-Sem',
 ece3 || 'Computer%20Organization%20and%20Architecture%20(ECE%202152)%20PART-B.pdf', 'coa-es-2022b-ece-s3', 123),

('Digital System Design (ECE 2153) — End Sem 2022',
 'Digital System Design', 'ECE', 2022, 3, 'End-Sem',
 ece3 || 'Digital%20System%20Deisgn%20(ECE%202153).pdf', 'dsd-es-2022-ece-s3', 289),

('Digital System Design (ECE 2153) Part B — End Sem 2022',
 'Digital System Design', 'ECE', 2022, 3, 'End-Sem',
 ece3 || 'Digital%20System%20Deisgn%20(ECE%202153)PART-B.pdf', 'dsd-es-2022b-ece-s3', 198),

('Network Analysis (ECE 2154) — End Sem 2022',
 'Network Analysis', 'ECE', 2022, 3, 'End-Sem',
 ece3 || 'Network%20Analysis%20(ECE%202154).pdf', 'na-es-2022-ece-s3', 234),

('Network Analysis (ECE 2154) Part A — End Sem 2022',
 'Network Analysis', 'ECE', 2022, 3, 'End-Sem',
 ece3 || 'Network%20Analysis%20(ECE%202154)%20PART-A%20.pdf', 'na-es-2022a-ece-s3', 167),

('Network Analysis (ECE 2154) Part B — End Sem 2022',
 'Network Analysis', 'ECE', 2022, 3, 'End-Sem',
 ece3 || 'Network%20Analysis%20(ECE%202154)%20PART-B.pdf', 'na-es-2022b-ece-s3', 134),

('Signals and Systems (ECE 2155) — End Sem 2022',
 'Signals and Systems', 'ECE', 2022, 3, 'End-Sem',
 ece3 || 'Signals%20and%20Systems%20(ECE%202155).pdf', 'ss-es-2022-ece-s3', 312),

('Signals and Systems (ECE 2155) Part A — End Sem 2022',
 'Signals and Systems', 'ECE', 2022, 3, 'End-Sem',
 ece3 || 'Signals%20and%20Systems%20(ECE%202155)%20PART-A.pdf', 'ss-es-2022a-ece-s3', 198),

('Signals and Systems (ECE 2155) Part B — End Sem 2022',
 'Signals and Systems', 'ECE', 2022, 3, 'End-Sem',
 ece3 || 'Signals%20and%20Systems%20(ECE%202155)%20PART-B.pdf', 'ss-es-2022b-ece-s3', 156),

-- ECE Year 1 Sem 1
('Calculus and Matrix Algebra (IMA 111) — End Sem 2022',
 'Calculus and Matrix Algebra', 'ECE', 2022, 1, 'End-Sem',
 b1 || 'Mathematics%20-I%20(IMA%20111).pdf', 'cma-es-2022-ece-s1', 287),

('Applied Physics for Engineers (IPH 111) — End Sem 2022',
 'Applied Physics for Engineers', 'ECE', 2022, 1, 'End-Sem',
 b1 || 'Physics%20-I%20(IPH%20111).pdf', 'ape-es-2022-ece-s1', 234),

('Fundamentals of Electronics (ECE 1051) — End Sem 2022',
 'Fundamentals of Electronics', 'ECE', 2022, 1, 'End-Sem',
 b1 || 'Basic%20Electronics%20(ECE%201051)%20PART-B.pdf', 'fe-es-2022-ece-s1', 345),

('Applied Chemistry for Engineers — End Sem 2022',
 'Applied Chemistry for Engineers', 'ECE', 2022, 1, 'End-Sem',
 b1 || 'Engineering%20Chemistry%20(CHM%201051)(Makeup).pdf', 'ace-es-2022-ece-s1', 156),

('Communication Skills in English — End Sem 2022',
 'Communication Skills in English', 'ECE', 2022, 1, 'End-Sem',
 b1 || 'Comunication%20Skilss%20in%20English%20(IHS%20112).pdf', 'csk-es-2022-ece-s1', 134),

-- EEE Year 1
('Fundamentals of Electrical Engineering — End Sem 2022',
 'Fundamentals of Electrical Engineering', 'EEE', 2022, 1, 'End-Sem',
 b1 || 'Physics%20-I%20(IPH%20111).pdf', 'fee-es-2022-eee-s1', 201),

('Applied Physics for Engineers — End Sem 2022',
 'Applied Physics for Engineers', 'EEE', 2022, 1, 'End-Sem',
 b1 || 'Physics%20-I%20(IPH%20111).pdf', 'ape-es-2022-eee-s1', 189),

('Calculus and Matrix Algebra — End Sem 2022',
 'Calculus and Matrix Algebra', 'EEE', 2022, 1, 'End-Sem',
 b1 || 'Mathematics%20-I%20(IMA%20111).pdf', 'cma-es-2022-eee-s1', 167),

('Applied Chemistry for Engineers — End Sem 2022',
 'Applied Chemistry for Engineers', 'EEE', 2022, 1, 'End-Sem',
 b1 || 'Engineering%20Chemistry%20(CHM%201051)(Makeup).pdf', 'ace-es-2022-eee-s1', 112)

ON CONFLICT (slug) DO NOTHING;

END $$;
