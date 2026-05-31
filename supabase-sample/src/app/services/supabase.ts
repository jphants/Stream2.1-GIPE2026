import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface LabFilters {
  startDate?: string;
  endDate?: string;

  temperatureGreater?: number;
  temperatureEqual?: number;

  phGreater?: number;
  phEqual?: number;

  stationName?: string;

  limit?: number;
}

export interface AlaFileFilters {
  startDate?: string;
  endDate?: string;

  codigo?: string;
  nombrePunto?: string;
  departamento?: string;
  punto?: string;
  reportNumber?: string;
  fechaMonitoreo?: string;
  horaMonitoreo?: string;

  raw?: Record<string, any>;
  limit?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  supabase = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  private handleResponse<T>(response: { data: T | null; error: any }): T[] {
    if (response.error) {
      console.error('Supabase query error:', response.error);
      return [];
    }

    return Array.isArray(response.data) ? response.data : [];
  }

  private applyLabFilters(query: any, filters?: LabFilters) {
    if (!filters) {
      return query;
    }

    if (filters.startDate) {
      query = query.gte('sample_date', filters.startDate);
    }

    if (filters.endDate) {
      query = query.lte('sample_date', filters.endDate);
    }

    if (filters.temperatureGreater !== undefined) {
      query = query.gt('temperature_c', filters.temperatureGreater);
    }

    if (filters.temperatureEqual !== undefined) {
      query = query.eq('temperature_c', filters.temperatureEqual);
    }

    if (filters.phGreater !== undefined) {
      query = query.gt('ph', filters.phGreater);
    }

    if (filters.phEqual !== undefined) {
      query = query.eq('ph', filters.phEqual);
    }

    if (filters.stationName) {
      query = query.eq('station_name', filters.stationName);
    }

    return query;
  }

  private applyAlaFilters(query: any, filters?: AlaFileFilters) {
    if (!filters) {
      return query;
    }

    if (filters.startDate) {
      query = query.gte('Fecha monitoreo', filters.startDate);
    }

    if (filters.endDate) {
      query = query.lte('Fecha monitoreo', filters.endDate);
    }

    if (filters.codigo) {
      query = query.eq('Codigo', filters.codigo);
    }

    if (filters.nombrePunto) {
      query = query.eq('Nombre Punto', filters.nombrePunto);
    }

    if (filters.departamento) {
      query = query.eq('Departamento', filters.departamento);
    }

    if (filters.punto) {
      query = query.eq('Punto', filters.punto);
    }

    if (filters.reportNumber) {
      query = query.eq('Nro del Informe del Ensayo análitico', filters.reportNumber);
    }

    if (filters.fechaMonitoreo) {
      query = query.eq('Fecha monitoreo', filters.fechaMonitoreo);
    }

    if (filters.horaMonitoreo) {
      query = query.eq('Hora Monitoreo', filters.horaMonitoreo);
    }

    if (filters.raw) {
      for (const key of Object.keys(filters.raw)) {
        const value = filters.raw[key];
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      }
    }

    return query;
  }

  async getLabResults(filters?: LabFilters) {
    const limit = filters?.limit ?? 10;

    let query = this.supabase
      .from('LabResults')
      .select('*')
      .limit(limit);

    query = this.applyLabFilters(query, filters);

    const response = await query;
    return this.handleResponse<any>(response);
  }

  async getAlaFiles(filters?: AlaFileFilters) {
    const limit = filters?.limit ?? 10;

    let query = this.supabase
      .from('ala_files')
      .select('*')
      .limit(limit);

    query = this.applyAlaFilters(query, filters);

    const response = await query;
    return this.handleResponse<any>(response);
  }
}