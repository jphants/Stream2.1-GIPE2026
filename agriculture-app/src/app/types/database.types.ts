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
      agricultural_site: {
        Row: {
          site_id: number
          site_name: string
          region: string | null
          latitude: number | null
          longitude: number | null
          elevation: number | null
          land_area: number | null
          crop_type: string | null
          created_at: string | null
        }
        Insert: {
          site_id?: never
          site_name: string
          region?: string | null
          latitude?: number | null
          longitude?: number | null
          elevation?: number | null
          land_area?: number | null
          crop_type?: string | null
          created_at?: string
        }
        Update: {
          site_id?: never
          site_name?: string
          region?: string | null
          latitude?: number | null
          longitude?: number | null
          elevation?: number | null
          land_area?: number | null
          crop_type?: string | null
          created_at?: string
        }
      }

      ala_data_schema: {
        Row: {
          schema_id: number
          data_source: string | null
          coordinate_system: string | null
          measurement_unit: string | null
          naming_standard: string | null
          georeference_method: string | null
          metadata_description: string | null
        }
        Insert: {
          schema_id?: never
          data_source?: string | null
          coordinate_system?: string | null
          measurement_unit?: string | null
          naming_standard?: string | null
          georeference_method?: string | null
          metadata_description?: string | null
        }
        Update: {
          schema_id?: never
          data_source?: string | null
          coordinate_system?: string | null
          measurement_unit?: string | null
          naming_standard?: string | null
          georeference_method?: string | null
          metadata_description?: string | null
        }
      }

      sensor_station: {
        Row: {
          station_id: number
          site_id: number
          sensor_name: string
          sensor_type: string | null
          sensor_model: string | null
          installation_date: string | null
          status: string | null
          created_at: string | null
        }
        Insert: {
          station_id?: never
          site_id: number
          sensor_name: string
          sensor_type?: string | null
          sensor_model?: string | null
          installation_date?: string | null
          status?: string | null
          created_at?: string
        }
        Update: {
          station_id?: never
          site_id?: number
          sensor_name?: string
          sensor_type?: string | null
          sensor_model?: string | null
          installation_date?: string | null
          status?: string | null
          created_at?: string
        }
      }

      water_assessment: {
        Row: {
          assessment_id: number
          site_id: number
          assessment_date: string
          water_quality: string | null
          irrigation_status: string | null
          water_availability: string | null
          notes: string | null
          created_at: string | null
        }
        Insert: {
          assessment_id?: never
          site_id: number
          assessment_date: string
          water_quality?: string | null
          irrigation_status?: string | null
          water_availability?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          assessment_id?: never
          site_id?: number
          assessment_date?: string
          water_quality?: string | null
          irrigation_status?: string | null
          water_availability?: string | null
          notes?: string | null
          created_at?: string
        }
      }

      field_measurement: {
        Row: {
          measurement_id: number
          station_id: number
          schema_id: number | null
          recorded_at: string
          soil_moisture: number | null
          temperature: number | null
          humidity: number | null
          rainfall: number | null
          ph_level: number | null
          created_at: string | null
        }
        Insert: {
          measurement_id?: never
          station_id: number
          schema_id?: number | null
          recorded_at: string
          soil_moisture?: number | null
          temperature?: number | null
          humidity?: number | null
          rainfall?: number | null
          ph_level?: number | null
          created_at?: string
        }
        Update: {
          measurement_id?: never
          station_id?: number
          schema_id?: number | null
          recorded_at?: string
          soil_moisture?: number | null
          temperature?: number | null
          humidity?: number | null
          rainfall?: number | null
          ph_level?: number | null
          created_at?: string
        }
      }

      qa_qc_record: {
        Row: {
          qa_id: number
          measurement_id: number
          checked_by: string
          validation_status: string | null
          checked_at: string | null
          remarks: string | null
        }
        Insert: {
          qa_id?: never
          measurement_id: number
          checked_by: string
          validation_status?: string | null
          checked_at?: string | null
          remarks?: string | null
        }
        Update: {
          qa_id?: never
          measurement_id?: number
          checked_by?: string
          validation_status?: string | null
          checked_at?: string | null
          remarks?: string | null
        }
      }

      satellite_imagery: {
        Row: {
          imagery_id: number
          site_id: number
          schema_id: number | null
          capture_date: string | null
          satellite_provider: string | null
          vegetation_index: number | null
          image_resolution: string | null
          imagery_path: string | null
          cloud_coverage: number | null
          created_at: string | null
        }
        Insert: {
          imagery_id?: never
          site_id: number
          schema_id?: number | null
          capture_date?: string | null
          satellite_provider?: string | null
          vegetation_index?: number | null
          image_resolution?: string | null
          imagery_path?: string | null
          cloud_coverage?: number | null
          created_at?: string
        }
        Update: {
          imagery_id?: never
          site_id?: number
          schema_id?: number | null
          capture_date?: string | null
          satellite_provider?: string | null
          vegetation_index?: number | null
          image_resolution?: string | null
          imagery_path?: string | null
          cloud_coverage?: number | null
          created_at?: string
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

    CompositeTypes: {
      [_ in never]: never
    }
  }
}