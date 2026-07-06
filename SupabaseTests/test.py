from supabase import create_client

SUPABASE_URL = "https://dufgolgkicfcglrxjpjc.supabase.co"
SUPABASE_KEY = ""

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

tables = [
    "agricultural_site",
    "sensor_station",
    "field_measurement",
    "satellite_imagery",
    "water_assessment",
    "qa_qc_record",
    "ala_data_schema"
]

print("=== Backend Smoke Test ===\n")

passed = 0

for table in tables:
    try:
        result = supabase.table(table).select("*").limit(1).execute()

        print(f"[PASS] {table}")
        print(f"       Rows returned: {len(result.data)}")

        passed += 1

    except Exception as e:
        print(f"[FAIL] {table}")
        print(e)

print(f"\nPassed {passed}/{len(tables)} tests")