# Stream2.1-GIPE2026

This repository contains two main areas:

- `supabase-sample`: an Angular sample application demonstrating how to connect to Supabase, fetch records from a table, and display them in a component.
- `DB_experiments`: data documentation and sample generation tools for the water quality monitoring dataset.

## Repository structure

- `supabase-sample/`
  - `src/app/services/supabase.ts`: sample Supabase service that creates a client and queries the `LabResults` table.
  - `src/app/components/product-list/product-list.ts`: sample component that uses the service to load data and render it.
  - `src/environments/environment.ts`: placeholder configuration for `supabaseUrl` and `supabaseKey`.
- `DB_experiments/`
  - `db_doc.md`: dataset variable dictionary and column descriptions.
  - `generate_ala_csv.py`: script to generate a sample CSV file with dummy water quality values.

## How to integrate the Supabase sample

1. Open `supabase-sample/src/environments/environment.ts`.
2. Replace `HTTPS` with your Supabase project URL and `KEY` with your Supabase API key.

Example:

```ts
export const environment = {
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseKey: 'your-public-anon-key',
};
```

3. Confirm your Supabase table schema. The sample service expects a table named `LabResults` with fields such as:
   - `sample_date`
   - `temperature_c`
   - `ph`
   - `station_name`

4. Run the Angular app:

```bash
cd supabase-sample
npm install
ng serve
```

5. Open the app at `http://localhost:4200`.

### How the sample works

- `supabase-sample/src/app/services/supabase.ts` creates a Supabase client with `createClient()`.
- `getLabResults()` queries `LabResults`, selects `*`, applies optional filters, and returns the result.
- `supabase-sample/src/app/components/product-list/product-list.ts` calls `getLabResults()` with a date range and displays the returned records.

### Adapting the sample to your dataset

- If your table name is different, update `.from('LabResults')` in `supabase-sample/src/app/services/supabase.ts`.
- Update filter field names if your schema uses different column names.
- Add or remove filters in `getLabResults()` as needed.

## DB experiments

The `DB_experiments` folder contains dataset documentation and helper scripts:

- `DB_experiments/db_doc.md`: variable dictionary for the water quality dataset.
- `DB_experiments/generate_ala_csv.py`: generates a dummy CSV file `ala_sample_dummy.csv` with sample records.

### Using the DB experiments files

From the `DB_experiments` folder, run:

```bash
python generate_ala_csv.py
```

This creates a CSV file that can be used as a starting point for importing test data into Supabase or for understanding column names and expected formats.

For more details, see `DB_experiments/README.md`.

