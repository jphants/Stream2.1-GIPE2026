# generate a csv with registers of the form:
# id, timestamp, sensor_id, water_level, conductivity, pH, dissolved oxygen, turbidity
# generate it as if the sensor is sending data every 15 mins for x period of time, for a total of 3 sensors
import csv
import random
from datetime import datetime, timedelta


def generate_sensor_data(
    start_time,
    days=7,
    interval_minutes=15,
    sensor_ids=None,
    output_file="water_quality_data.csv"
):
    """
    Generate synthetic water quality sensor data.

    Columns:
    "id, timestamp, sensor_id, water_level, conductivity, pH,
    dissolved_oxygen, turbidity
    """

    if sensor_ids is None:
        sensor_ids = ["SENSOR_001", "SENSOR_002", "SENSOR_003"]

    total_intervals = int((days * 24 * 60) / interval_minutes)

    with open(output_file, "w", newline="") as csvfile:
        writer = csv.writer(csvfile)

        writer.writerow([
            "id",
            "timestamp",
            "sensor_id",
            "water_level",
            "conductivity",
            "pH",
            "dissolved_oxygen",
            "turbidity"
        ])

        current_time = start_time
        record_id = 1

        for _ in range(total_intervals):
            for sensor_id in sensor_ids:

                # Simulate realistic values with small variations
                water_level = round(random.uniform(1.5, 3.5), 2)          # meters
                conductivity = round(random.uniform(200, 800), 1)         # µS/cm
                ph = round(random.uniform(6.5, 8.5), 2)
                dissolved_oxygen = round(random.uniform(5.0, 12.0), 2)   # mg/L
                turbidity = round(random.uniform(0.5, 20.0), 2)           # NTU

                writer.writerow([
                    record_id,
                    current_time.isoformat(),
                    sensor_id,
                    water_level,
                    conductivity,
                    ph,
                    dissolved_oxygen,
                    turbidity
                ])
                record_id += 1

            current_time += timedelta(minutes=interval_minutes)

    print(f"Generated {output_file}")


if __name__ == "__main__":
    generate_sensor_data(
        start_time=datetime(2025, 1, 1, 0, 0, 0),
        days=30,  # Change to any period length
        interval_minutes=15
    )