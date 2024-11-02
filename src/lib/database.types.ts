export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          user_type: 'customer' | 'mover'
          company_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          user_type: 'customer' | 'mover'
          company_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          user_type?: 'customer' | 'mover'
          company_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      moves: {
        Row: {
          id: string
          customer_id: string
          status: 'draft' | 'pending' | 'accepted' | 'completed'
          pickup_date: string
          flexible_date: boolean
          pickup_address: string
          pickup_city: string
          pickup_state: string
          pickup_zip: string
          dropoff_address: string
          dropoff_city: string
          dropoff_state: string
          dropoff_zip: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          customer_id: string
          status: 'draft' | 'pending' | 'accepted' | 'completed'
          pickup_date: string
          flexible_date?: boolean
          pickup_address: string
          pickup_city: string
          pickup_state: string
          pickup_zip: string
          dropoff_address: string
          dropoff_city: string
          dropoff_state: string
          dropoff_zip: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          customer_id?: string
          status?: 'draft' | 'pending' | 'accepted' | 'completed'
          pickup_date?: string
          flexible_date?: boolean
          pickup_address?: string
          pickup_city?: string
          pickup_state?: string
          pickup_zip?: string
          dropoff_address?: string
          dropoff_city?: string
          dropoff_state?: string
          dropoff_zip?: string
          created_at?: string
          updated_at?: string
        }
      }
      inventory: {
        Row: {
          id: string
          move_id: string
          name: string
          category: string
          quantity: number
          description: string | null
          special_handling: string | null
          photos: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          move_id: string
          name: string
          category: string
          quantity: number
          description?: string | null
          special_handling?: string | null
          photos?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          move_id?: string
          name?: string
          category?: string
          quantity?: number
          description?: string | null
          special_handling?: string | null
          photos?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      bids: {
        Row: {
          id: string
          move_id: string
          mover_id: string
          amount: number
          estimated_duration: string
          message: string | null
          status: 'pending' | 'accepted' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          move_id: string
          mover_id: string
          amount: number
          estimated_duration: string
          message?: string | null
          status: 'pending' | 'accepted' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          move_id?: string
          mover_id?: string
          amount?: number
          estimated_duration?: string
          message?: string | null
          status?: 'pending' | 'accepted' | 'rejected'
          created_at?: string
          updated_at?: string
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
      [_ in never]: never
    }
  }
}