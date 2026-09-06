export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ai_chat_logs: {
        Row: {
          ai_version: string | null
          conversation_id: string | null
          created_at: string
          id: string
          image_urls: string[] | null
          message: string
          response: string | null
          user_email: string | null
          user_id: string | null
        }
        Insert: {
          ai_version?: string | null
          conversation_id?: string | null
          created_at?: string
          id?: string
          image_urls?: string[] | null
          message: string
          response?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Update: {
          ai_version?: string | null
          conversation_id?: string | null
          created_at?: string
          id?: string
          image_urls?: string[] | null
          message?: string
          response?: string | null
          user_email?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      ai_settings: {
        Row: {
          id: string
          setting_key: string
          setting_value: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          id?: string
          setting_key: string
          setting_value: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          id?: string
          setting_key?: string
          setting_value?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      banned_users: {
        Row: {
          banned_by: string | null
          created_at: string
          id: string
          reason: string | null
          user_id: string
        }
        Insert: {
          banned_by?: string | null
          created_at?: string
          id?: string
          reason?: string | null
          user_id: string
        }
        Update: {
          banned_by?: string | null
          created_at?: string
          id?: string
          reason?: string | null
          user_id?: string
        }
        Relationships: []
      }
      feature_flags: {
        Row: {
          created_at: string
          description: string | null
          enabled: boolean
          flag_key: string
          id: string
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          enabled?: boolean
          flag_key: string
          id?: string
          name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          enabled?: boolean
          flag_key?: string
          id?: string
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          created_at: string
          email: string
          file_name: string | null
          id: string
          is_read: boolean
          message: string
          name: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email: string
          file_name?: string | null
          id?: string
          is_read?: boolean
          message: string
          name: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          file_name?: string | null
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          phone?: string | null
        }
        Relationships: []
      }
      ip_logs: {
        Row: {
          city: string | null
          country: string | null
          created_at: string
          id: string
          ip_address: string
          isp: string | null
          page_path: string | null
          region: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          ip_address: string
          isp?: string | null
          page_path?: string | null
          region?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string
          id?: string
          ip_address?: string
          isp?: string | null
          page_path?: string | null
          region?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      login_exports: {
        Row: {
          exported_at: string
          id: string
          user_id: string
        }
        Insert: {
          exported_at?: string
          id?: string
          user_id: string
        }
        Update: {
          exported_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          message: string
          sent_by: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          message: string
          sent_by?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          message?: string
          sent_by?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      page_visits: {
        Row: {
          city: string | null
          country: string | null
          id: string
          ip_address: string | null
          page_path: string
          user_agent: string | null
          user_id: string | null
          visited_at: string
        }
        Insert: {
          city?: string | null
          country?: string | null
          id?: string
          ip_address?: string | null
          page_path: string
          user_agent?: string | null
          user_id?: string | null
          visited_at?: string
        }
        Update: {
          city?: string | null
          country?: string | null
          id?: string
          ip_address?: string | null
          page_path?: string
          user_agent?: string | null
          user_id?: string | null
          visited_at?: string
        }
        Relationships: []
      }
      password_reset_otps: {
        Row: {
          attempts: number
          created_at: string
          email: string
          expires_at: string
          id: string
          max_attempts: number
          otp_hash: string
          used: boolean
        }
        Insert: {
          attempts?: number
          created_at?: string
          email: string
          expires_at: string
          id?: string
          max_attempts?: number
          otp_hash: string
          used?: boolean
        }
        Update: {
          attempts?: number
          created_at?: string
          email?: string
          expires_at?: string
          id?: string
          max_attempts?: number
          otp_hash?: string
          used?: boolean
        }
        Relationships: []
      }
      payment_requests: {
        Row: {
          amount_usd: number
          created_at: string
          id: string
          kind: string
          note: string | null
          plan_key: string | null
          proof_path: string | null
          rejection_reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          sender_name: string | null
          status: string
          transfer_reference: string | null
          updated_at: string
          user_email: string | null
          user_id: string
        }
        Insert: {
          amount_usd: number
          created_at?: string
          id?: string
          kind?: string
          note?: string | null
          plan_key?: string | null
          proof_path?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          sender_name?: string | null
          status?: string
          transfer_reference?: string | null
          updated_at?: string
          user_email?: string | null
          user_id: string
        }
        Update: {
          amount_usd?: number
          created_at?: string
          id?: string
          kind?: string
          note?: string | null
          plan_key?: string | null
          proof_path?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          sender_name?: string | null
          status?: string
          transfer_reference?: string | null
          updated_at?: string
          user_email?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payment_settings: {
        Row: {
          account_holder: string
          account_number: string
          bank_name: string
          created_at: string
          donations_enabled: boolean
          iban: string
          id: string
          instructions: string
          updated_at: string
        }
        Insert: {
          account_holder?: string
          account_number?: string
          bank_name?: string
          created_at?: string
          donations_enabled?: boolean
          iban?: string
          id?: string
          instructions?: string
          updated_at?: string
        }
        Update: {
          account_holder?: string
          account_number?: string
          bank_name?: string
          created_at?: string
          donations_enabled?: boolean
          iban?: string
          id?: string
          instructions?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          avatar_url: string | null
          city: string | null
          country: string | null
          created_at: string | null
          device_type: string | null
          display_name: string | null
          email: string | null
          id: string
          ip_address: string | null
          phone: string | null
          privacy_accepted: boolean | null
          privacy_accepted_at: string | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          display_name?: string | null
          email?: string | null
          id: string
          ip_address?: string | null
          phone?: string | null
          privacy_accepted?: boolean | null
          privacy_accepted_at?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          device_type?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
          ip_address?: string | null
          phone?: string | null
          privacy_accepted?: boolean | null
          privacy_accepted_at?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      programming_content: {
        Row: {
          category: string
          code_example: string | null
          created_at: string
          created_by: string | null
          description: string | null
          difficulty: string
          explanation: string | null
          id: string
          language: string
          order_index: number
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          code_example?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty?: string
          explanation?: string | null
          id?: string
          language: string
          order_index?: number
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          code_example?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          difficulty?: string
          explanation?: string | null
          id?: string
          language?: string
          order_index?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          category: string
          created_at: string
          details: Json | null
          difficulty: string
          id: string
          score: number
          total_questions: number
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          details?: Json | null
          difficulty: string
          id?: string
          score?: number
          total_questions?: number
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          details?: Json | null
          difficulty?: string
          id?: string
          score?: number
          total_questions?: number
          user_id?: string
        }
        Relationships: []
      }
      quiz_questions: {
        Row: {
          category: string
          challenge_prompt: string | null
          correct_index: number
          created_at: string
          created_by: string | null
          difficulty: string
          explanation: string | null
          id: string
          options: Json
          question: string
          question_type: string
          updated_at: string
        }
        Insert: {
          category: string
          challenge_prompt?: string | null
          correct_index?: number
          created_at?: string
          created_by?: string | null
          difficulty: string
          explanation?: string | null
          id?: string
          options?: Json
          question: string
          question_type?: string
          updated_at?: string
        }
        Update: {
          category?: string
          challenge_prompt?: string | null
          correct_index?: number
          created_at?: string
          created_by?: string | null
          difficulty?: string
          explanation?: string | null
          id?: string
          options?: Json
          question?: string
          question_type?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          content_key: string
          content_value: string
          created_at: string
          description: string | null
          id: string
          page: string
          style_overrides: Json
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          content_key: string
          content_value: string
          created_at?: string
          description?: string | null
          id?: string
          page?: string
          style_overrides?: Json
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          content_key?: string
          content_value?: string
          created_at?: string
          description?: string | null
          id?: string
          page?: string
          style_overrides?: Json
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          active: boolean
          created_at: string
          daily_chats: number
          daily_images: number
          duration_days: number
          features: Json
          id: string
          name_ar: string
          name_en: string
          order_index: number
          plan_key: string
          price_usd: number
          unlimited: boolean
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          daily_chats?: number
          daily_images?: number
          duration_days?: number
          features?: Json
          id?: string
          name_ar: string
          name_en: string
          order_index?: number
          plan_key: string
          price_usd: number
          unlimited?: boolean
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          daily_chats?: number
          daily_images?: number
          duration_days?: number
          features?: Json
          id?: string
          name_ar?: string
          name_en?: string
          order_index?: number
          plan_key?: string
          price_usd?: number
          unlimited?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      user_ai_limits: {
        Row: {
          created_at: string
          daily_limit: number
          id: string
          set_by: string | null
          unlimited: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          daily_limit?: number
          id?: string
          set_by?: string | null
          unlimited?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          daily_limit?: number
          id?: string
          set_by?: string | null
          unlimited?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_key: string
          badge_label: string
          earned_at: string
          id: string
          metadata: Json | null
          user_id: string
        }
        Insert: {
          badge_key: string
          badge_label: string
          earned_at?: string
          id?: string
          metadata?: Json | null
          user_id: string
        }
        Update: {
          badge_key?: string
          badge_label?: string
          earned_at?: string
          id?: string
          metadata?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          expires_at: string
          granted_by: string | null
          id: string
          plan_key: string
          source_request_id: string | null
          started_at: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at: string
          granted_by?: string | null
          id?: string
          plan_key: string
          source_request_id?: string | null
          started_at?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          granted_by?: string | null
          id?: string
          plan_key?: string
          source_request_id?: string | null
          started_at?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      withdrawals: {
        Row: {
          amount_usd: number
          completed_at: string | null
          created_at: string
          created_by: string | null
          destination: string | null
          id: string
          method: string
          note: string | null
          reference: string | null
          status: string
          updated_at: string
        }
        Insert: {
          amount_usd: number
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          destination?: string | null
          id?: string
          method?: string
          note?: string | null
          reference?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          amount_usd?: number
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          destination?: string | null
          id?: string
          method?: string
          note?: string | null
          reference?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_otps: { Args: never; Returns: undefined }
      get_active_subscription: {
        Args: { _user_id: string }
        Returns: {
          daily_chats: number
          daily_images: number
          expires_at: string
          plan_key: string
          unlimited: boolean
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "developer" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["developer", "user"],
    },
  },
} as const
