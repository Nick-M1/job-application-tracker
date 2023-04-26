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
          details: string
          result: Database["public"]["Enums"]["result"]
          stage_id: string
          stage_number: number
          timestamp: string
          title: string
        }
        Insert: {
          details: string
          result?: Database["public"]["Enums"]["result"]
          stage_id?: string
          stage_number: number
          timestamp?: string
          title: string
        }
        Update: {
          details?: string
          result?: Database["public"]["Enums"]["result"]
          stage_id?: string
          stage_number?: number
          timestamp?: string
          title?: string
        }
      }
      tblTodoCategory: {
        Row: {
          id: string
          title: string
          user_id: string
        }
        Insert: {
          id?: string
          title?: string
          user_id: string
        }
        Update: {
          id?: string
          title?: string
          user_id?: string
        }
      }
      tblTodoItem: {
        Row: {
          category_id: string
          created_at: string | null
          id: string
          is_completed: boolean
          text: string
          user_id: string
        }
        Insert: {
          category_id: string
          created_at?: string | null
          id?: string
          is_completed?: boolean
          text?: string
          user_id: string
        }
        Update: {
          category_id?: string
          created_at?: string | null
          id?: string
          is_completed?: boolean
          text?: string
          user_id?: string
        }
      }
      tblTodoSubitem: {
        Row: {
          created_at: string | null
          id: string
          is_completed: boolean
          text: string
          todoitem_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_completed?: boolean
          text?: string
          todoitem_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_completed?: boolean
          text?: string
          todoitem_id?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_todo_items_and_subitems: {
        Args: {
          query_category_id: string
        }
        Returns: {
          todo_item_id: string
          todo_item_text: string
          todo_item_is_completed: boolean
          todo_subitem_id: string
          todo_subitem_text: string
          todo_subitem_is_completed: boolean
        }[]
      }
    }
    Enums: {
      result: "waiting" | "success" | "rejection"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
