export type Branch = 'CSE' | 'ECE' | 'MECH' | 'CIVIL' | 'EEE' | 'IT'
export type ExamType = 'Mid-Sem' | 'End-Sem'
export type Semester = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export interface Paper {
  id: string
  title: string
  subject: string
  branch: Branch
  year: number
  semester: Semester
  exam_type: ExamType
  pdf_url: string
  slug: string
  download_count: number
  created_at: string
  updated_at: string
}

export interface Bookmark {
  id: string
  user_id: string
  paper_id: string
  created_at: string
  paper?: Paper
}

export interface Profile {
  id: string
  email: string
  is_admin: boolean
  created_at: string
}

export type Database = {
  public: {
    Tables: {
      papers: {
        Row: Paper
        Insert: {
          id?: string
          title: string
          subject: string
          branch: Branch
          year: number
          semester: number
          exam_type: ExamType
          pdf_url: string
          slug: string
          download_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: Partial<{
          title: string
          subject: string
          branch: Branch
          year: number
          semester: number
          exam_type: ExamType
          pdf_url: string
          slug: string
          download_count: number
        }>
        Relationships: []
      }
      bookmarks: {
        Row: Bookmark
        Insert: {
          id?: string
          user_id: string
          paper_id: string
          created_at?: string
        }
        Update: Partial<{
          user_id: string
          paper_id: string
        }>
        Relationships: []
      }
      profiles: {
        Row: Profile
        Insert: {
          id: string
          email: string
          is_admin?: boolean
          created_at?: string
        }
        Update: Partial<{
          email: string
          is_admin: boolean
        }>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
