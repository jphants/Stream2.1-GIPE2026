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
}

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  supabase = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  async getLabResults(filters?: LabFilters) {

    let query = this.supabase
      .from('LabResults')
      .select('*')
      .limit(10);

    // rango de fechas
    if (filters?.startDate) {
      query = query.gte('sample_date', filters.startDate);
    }

    if (filters?.endDate) {
      query = query.lte('sample_date', filters.endDate);
    }

    // temperatura
    if (filters?.temperatureGreater !== undefined) {
      query = query.gt(
        'temperature_c',
        filters.temperatureGreater
      );
    }

    if (filters?.temperatureEqual !== undefined) {
      query = query.eq(
        'temperature_c',
        filters.temperatureEqual
      );
    }

    // pH
    if (filters?.phGreater !== undefined) {
      query = query.gt(
        'ph',
        filters.phGreater
      );
    }

    if (filters?.phEqual !== undefined) {
      query = query.eq(
        'ph',
        filters.phEqual
      );
    }

    // estación
    if (filters?.stationName) {
      query = query.eq(
        'station_name',
        filters.stationName
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error(error);
      return [];
    }

    return data;
  }
}