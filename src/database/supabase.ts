export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tblApplications: {
        Row: {
          application_id: string
          company_name: string
          created_at: string
          stage_1: string | null
          stage_2: string | null
          stage_3: string | null
          stage_4: string | null
          stage_5: string | null
          title: string
          user_id: string
        }
        Insert: {
          application_id?: string
          company_name?: string
          created_at?: string
          stage_1?: string | null
          stage_2?: string | null
          stage_3?: string | null
          stage_4?: string | null
          stage_5?: string | null
          title?: string
          user_id: string
        }
        Update: {
          application_id?: string
          company_name?: string
          created_at?: string
          stage_1?: string | null
          stage_2?: string | null
          stage_3?: string | null
          stage_4?: string | null
          stage_5?: string | null
          title?: string
          user_id?: string
        }
      }
      tblStages: {
        Row: {
          company_name: string
          details: string
          result: Database["public"]["Enums"]["result"]
          stage_id: string
          stage_number: number
          timestamp: string
          title: string
        }
        Insert: {
          company_name?: string
          details: string
          result?: Database["public"]["Enums"]["result"]
          stage_id?: string
          stage_number: number
          timestamp?: string
          title: string
        }
        Update: {
          company_name?: string
          details?: string
          result?: Database["public"]["Enums"]["result"]
          stage_id?: string
          stage_number?: number
          timestamp?: string
          title?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      result: "waiting" | "success" | "rejection"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
