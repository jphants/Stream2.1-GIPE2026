# SupabaseSample

This sample Angular app demonstrates how to connect to Supabase and retrieve records from a database table via a reusable service.

## How Supabase integration works

- `src/app/services/supabase.ts` creates a Supabase client using `createClient()`.
- The service queries the `LabResults` table using `.from('LabResults').select('*')`.
- Optional filters are applied for `sample_date`, `temperature_c`, `ph`, and `station_name`.
- `src/app/components/product-list/product-list.ts` calls `getLabResults()` and displays the returned rows.

## Configure Supabase credentials

Update `src/environments/environment.ts` with your Supabase project values:

```ts
export const environment = {
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseKey: 'your-public-anon-key',
};
```

## Run locally

```bash
cd supabase-sample
npm install
ng serve
```

Open `http://localhost:4200` in your browser.

## Customize the sample

- To use a different table, change `.from('LabResults')` in `src/app/services/supabase.ts`.
- To adjust filters, edit `LabFilters` and the conditional query builders in `getLabResults()`.
- To change the displayed component, edit `src/app/components/product-list/product-list.ts` and its template.

## Notes

This project already includes the `@supabase/supabase-js` dependency in `package.json`. The sample app uses Angular standalone components and dependency injection for the service.

