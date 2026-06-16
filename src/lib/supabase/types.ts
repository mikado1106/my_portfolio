export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          image_url: string | null;
          tech_stack: string[];
          live_url: string | null;
          github_url: string | null;
          category: string;
          featured: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          image_url?: string | null;
          tech_stack?: string[];
          live_url?: string | null;
          github_url?: string | null;
          category?: string;
          featured?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          image_url?: string | null;
          tech_stack?: string[];
          live_url?: string | null;
          github_url?: string | null;
          category?: string;
          featured?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      certifications: {
        Row: {
          id: string;
          title: string;
          issuer: string;
          issue_date: string;
          expiry_date: string | null;
          credential_id: string | null;
          credential_url: string | null;
          image_url: string | null;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          issuer: string;
          issue_date: string;
          expiry_date?: string | null;
          credential_id?: string | null;
          credential_url?: string | null;
          image_url?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          issuer?: string;
          issue_date?: string;
          expiry_date?: string | null;
          credential_id?: string | null;
          credential_url?: string | null;
          image_url?: string | null;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      experiences: {
        Row: {
          id: string;
          company: string;
          role: string;
          description: string;
          start_date: string;
          end_date: string | null;
          is_current: boolean;
          tech_stack: string[];
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          company: string;
          role: string;
          description: string;
          start_date: string;
          end_date?: string | null;
          is_current?: boolean;
          tech_stack?: string[];
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          company?: string;
          role?: string;
          description?: string;
          start_date?: string;
          end_date?: string | null;
          is_current?: boolean;
          tech_stack?: string[];
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string;
          proficiency: number;
          icon_name: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          proficiency?: number;
          icon_name?: string | null;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          proficiency?: number;
          icon_name?: string | null;
          sort_order?: number;
          created_at?: string;
        };
      };
    };
  };
};

export type Project = Database["public"]["Tables"]["projects"]["Row"];
export type Certification = Database["public"]["Tables"]["certifications"]["Row"];
export type Experience = Database["public"]["Tables"]["experiences"]["Row"];
export type Skill = Database["public"]["Tables"]["skills"]["Row"];
