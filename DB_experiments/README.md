# DB Experiments

This folder contains dataset documentation and data generation tools for water quality monitoring experiments.

## Contents

- `db_doc.md`: variable dictionary describing the water quality dataset columns.
- `generate_ala_csv.py`: Python script that generates a sample CSV file named `ala_sample_dummy.csv`.

## How to use

1. Install Python if you do not already have it.
2. Run the generator from the `DB_experiments` folder:

```bash
cd DB_experiments
python generate_ala_csv.py
```

3. The script creates `ala_sample_dummy.csv` with 20 example rows and the same column names used in `db_doc.md`.

## Why this is useful

- `db_doc.md` helps you understand the expected dataset fields and units.
- `ala_sample_dummy.csv` can be used as a test import for a Supabase table or as sample input when you build database integration.

## Importing into Supabase

If you want to use this data with the `supabase-sample` project, create a table in Supabase with the column names from `db_doc.md` and import the generated CSV.

Then update `supabase-sample/src/app/services/supabase.ts` to query the matching table name and columns.
