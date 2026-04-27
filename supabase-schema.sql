-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Papers table
create table if not exists public.papers (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  subject text not null,
  branch text not null check (branch in ('CSE','ECE','MECH','CIVIL','EEE','IT')),
  year integer not null,
  semester integer not null check (semester between 1 and 8),
  exam_type text not null check (exam_type in ('Mid-Sem','End-Sem')),
  pdf_url text not null,
  slug text not null unique,
  download_count integer not null default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- Profiles table (linked to auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  is_admin boolean not null default false,
  created_at timestamptz default now() not null
);

-- Bookmarks table
create table if not exists public.bookmarks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  paper_id uuid references public.papers on delete cascade not null,
  created_at timestamptz default now() not null,
  unique (user_id, paper_id)
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, is_admin)
  values (new.id, new.email, false);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-update updated_at on papers
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists papers_updated_at on public.papers;
create trigger papers_updated_at
  before update on public.papers
  for each row execute procedure public.set_updated_at();

-- RLS Policies
alter table public.papers enable row level security;
alter table public.profiles enable row level security;
alter table public.bookmarks enable row level security;

-- Papers: anyone can read
create policy "Papers are viewable by everyone"
  on public.papers for select using (true);

-- Papers: only admins can insert/update/delete
create policy "Admins can manage papers"
  on public.papers for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

-- Profiles: users can read their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Bookmarks: users can manage their own bookmarks
create policy "Users can manage own bookmarks"
  on public.bookmarks for all
  using (auth.uid() = user_id);

-- Storage bucket for PDFs
insert into storage.buckets (id, name, public)
values ('papers', 'papers', true)
on conflict do nothing;

create policy "Anyone can read papers"
  on storage.objects for select
  using (bucket_id = 'papers');

create policy "Admins can upload papers"
  on storage.objects for insert
  with check (
    bucket_id = 'papers' and
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

create policy "Admins can delete papers"
  on storage.objects for delete
  using (
    bucket_id = 'papers' and
    exists (
      select 1 from public.profiles
      where id = auth.uid() and is_admin = true
    )
  );

-- Seed data
insert into public.papers (title, subject, branch, year, semester, exam_type, pdf_url, slug, download_count) values
('Data Structures and Algorithms - End Semester 2023', 'Data Structures and Algorithms', 'CSE', 2023, 3, 'End-Sem', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'dsa-end-sem-2023-cse-s3', 312),
('Operating Systems - Mid Semester 2023', 'Operating Systems', 'CSE', 2023, 5, 'Mid-Sem', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'os-mid-sem-2023-cse-s5', 198),
('Computer Networks - End Semester 2022', 'Computer Networks', 'CSE', 2022, 6, 'End-Sem', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'cn-end-sem-2022-cse-s6', 245),
('Database Management Systems - Mid Semester 2022', 'Database Management Systems', 'CSE', 2022, 4, 'Mid-Sem', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'dbms-mid-sem-2022-cse-s4', 179),
('Analog Circuits - End Semester 2023', 'Analog Circuits', 'ECE', 2023, 4, 'End-Sem', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'analog-circuits-end-sem-2023-ece-s4', 143),
('Digital Signal Processing - Mid Semester 2023', 'Digital Signal Processing', 'ECE', 2023, 6, 'Mid-Sem', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'dsp-mid-sem-2023-ece-s6', 121),
('Electromagnetic Theory - End Semester 2022', 'Electromagnetic Theory', 'ECE', 2022, 5, 'End-Sem', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'emt-end-sem-2022-ece-s5', 98),
('VLSI Design - Mid Semester 2022', 'VLSI Design', 'ECE', 2022, 7, 'Mid-Sem', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'vlsi-mid-sem-2022-ece-s7', 87),
('Thermodynamics - End Semester 2023', 'Thermodynamics', 'MECH', 2023, 3, 'End-Sem', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'thermo-end-sem-2023-mech-s3', 167),
('Fluid Mechanics - Mid Semester 2023', 'Fluid Mechanics', 'MECH', 2023, 5, 'Mid-Sem', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'fluid-mid-sem-2023-mech-s5', 134),
('Machine Design - End Semester 2022', 'Machine Design', 'MECH', 2022, 6, 'End-Sem', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'machine-design-end-sem-2022-mech-s6', 115),
('Engineering Mathematics - Mid Semester 2023', 'Engineering Mathematics', 'CSE', 2023, 1, 'Mid-Sem', 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', 'engg-math-mid-sem-2023-cse-s1', 421)
on conflict (slug) do nothing;
