# DB Experiments

This folder contains dataset documentation and instructions on how to query the API in Supabase.

## Available tables

### Sensor readings
Schema (columns):

- `id` (integer): sequential identifier for each register
- `timestamp` (ISO 8601 string): measurement datetime
- `sensor_id` (string)
- `water_level` (numeric)
- `conductivity` (numeric)
- `pH` (numeric)
- `dissolved_oxygen` (numeric)
- `turbidity` (numeric)

Notes:

- Measurement fields are numeric values only. Any symbols such as `<`, `>`, or `~` have been removed from generated data so the fields contain plain numbers suitable for numeric queries and aggregations.

### ALA results (FINAL DB WILL NOT HAVE THIS MANY VARIABLES, WAITING FOR STREAM 1.2 TO EVALUATE)
This table contains analytical lab results with the following (representative) fields:

- `Codigo`, `Nombre Punto`, `Fecha monitoreo`, `Hora Monitoreo`, `Nro del Informe del Ensayo análitico`, `Departamento`, `Punto`
- FISICOS - QUIMICOS: `Aceites y Grasas`, `Amoniaco-N`, `Caudal`, `Cianuro WAD`, `Conductividad`, `Demanda Bioquímica de Oxígeno (DBO5)`, `Demanda Química de Oxígeno (DQO)`, `Fosfatos-P`, `Fósforo Total`, `Nitratos-N`, `Nitrógeno Total`, `Oxígeno Disuelto`, `pH`, `Sólidos Disueltos Totales`, `Sulfuros`, `Temperatura`
- INORGANICOS: `Aluminio`, `Antimonio`, `Arsénico`, `Bario`, `Berilio`, `Bismuto`, `Boro`, `Cadmio`, `Calcio`, `Cerio`, `Cobalto`, `Cobre`, `Cromo Total`, `Estaño`, `Estroncio`, `Galio`, `Germanio`, `Hafnio`, `Hierro`, `Lantanio`, `Litio`, `Lutecio`, `Magnesio`, `Manganeso`, `Mercurio`, `Molibdeno`, `Niobio`, `Niquel`, `Plata`, `Plomo`, `Potasio`, `Rubidio`, `Selenio`, `Sodio`, `Talio`, `Tantalio`, `Teluro`, `Titanio`, `Torio`, `Uranio`, `Vanadio`, `Wolframio`, `Yterbio`, `Zinc`, `Zirconio`
- MICROBIOLOGICO Y PARASITOLOGICOS: `Coliformes Termotolerantes`, `Coliformes Totales`

## Angular environment file
Add your Supabase URL and anon key to `src/environments/environment.ts` like this:

```ts
export const environment = {
  supabaseUrl: 'https://lcpcpuirgwpvjjapjlgb.supabase.co',
  supabaseKey: 'YOUR_ANON_KEY_HERE',
};
```

## How to do queries

### Sample Angular service connecting to Supabase
Install the official client:

```bash
npm install @supabase/supabase-js
```

Create a simple service that wraps the Supabase client:

```ts
// src/app/services/supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Example: filters with one <, one >, one =
  async queryWithThreeFilters() {
    const { data, error } = await this.supabase
      .from('sensor_readings')
      .select('*')
      .lt('water_level', 2.0)       // less than
      .gt('conductivity', 300)     // greater than
      .eq('sensor_id', 'SENSOR_001'); // equal
    if (error) throw error;
    return data;
  }

  // Example: query for a given time interval
  async queryForInterval(startIso: string, endIso: string) {
    const { data, error } = await this.supabase
      .from('sensor_readings')
      .select('*')
      .gte('timestamp', startIso)
      .lte('timestamp', endIso);
    if (error) throw error;
    return data;
  }
}
```

### Usage from a component

```ts
import { Component, OnInit } from '@angular/core';
import { SupabaseService } from './services/supabase.service';

@Component({ selector: 'app-root', template: '<pre>{{result | json}}</pre>' })
export class AppComponent implements OnInit {
  result: any;
  constructor(private sb: SupabaseService) {}

  async ngOnInit() {
    // Three-filters example
    this.result = await this.sb.queryWithThreeFilters();

    // Interval example (ISO strings)
    // const data = await this.sb.queryForInterval('2025-01-01T00:00:00Z', '2025-01-07T23:59:59Z');
  }
}
```

Notes:

- Replace `YOUR_ANON_KEY_HERE` with your Supabase anon/public key. Do not commit service keys or secret keys to source control.
- The `sensor_readings` table stores numeric measurements; use numeric comparisons (`.lt`, `.gt`, `.eq`, `.gte`, `.lte`) for filters and aggregations.
