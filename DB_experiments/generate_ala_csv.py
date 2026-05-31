import csv
import random
from datetime import datetime, timedelta

# Number of entries to generate
NUM_ENTRIES = 20

# CSV output file
OUTPUT_FILE = "ala_sample_dummy.csv"

# Columns
columns = [
    "Codigo",
    "Nombre Punto",
    "Fecha monitoreo",
    "Hora Monitoreo",
    "Nro del Informe del Ensayo análitico",
    "Departamento",
    "Punto",
    
    # FISICOS - QUIMICOS
    "Aceites y Grasas",
    "Amoniaco-N",
    "Caudal",
    "Cianuro WAD",
    "Conductividad",
    "Demanda Bioquímica de Oxígeno (DBO5)",
    "Demanda Química de Oxígeno (DQO)",
    "Fosfatos-P",
    "Fósforo Total",
    "Nitratos-N",
    "Nitrógeno Total",
    "Oxígeno Disuelto",
    "pH",
    "Sólidos Disueltos Totales",
    "Sulfuros",
    "Temperatura",

    # INORGANICOS
    "Aluminio",
    "Antimonio",
    "Arsénico",
    "Bario",
    "Berilio",
    "Bismuto",
    "Boro",
    "Cadmio",
    "Calcio",
    "Cerio",
    "Cobalto",
    "Cobre",
    "Cromo Total",
    "Estaño",
    "Estroncio",
    "Galio",
    "Germanio",
    "Hafnio",
    "Hierro",
    "Lantanio",
    "Litio",
    "Lutecio",
    "Magnesio",
    "Manganeso",
    "Mercurio",
    "Molibdeno",
    "Niobio",
    "Niquel",
    "Plata",
    "Plomo",
    "Potasio",
    "Rubidio",
    "Selenio",
    "Sodio",
    "Talio",
    "Tantalio",
    "Teluro",
    "Titanio",
    "Torio",
    "Uranio",
    "Vanadio",
    "Wolframio",
    "Yterbio",
    "Zinc",
    "Zirconio",

    # MICROBIOLOGICO Y PARASITOLOGICOS
    "Coliformes Termotolerantes",
    "Coliformes Totales"
]

# Helper functions
def random_date():
    start_date = datetime(2010, 1, 1)
    end_date = datetime(2024, 12, 31)
    delta = end_date - start_date
    random_days = random.randint(0, delta.days)
    return (start_date + timedelta(days=random_days)).strftime("%d/%m/%Y")

def random_time():
    hour = random.randint(0, 23)
    minute = random.randint(0, 59)
    return f"{hour:02d}:{minute:02d}"

def random_report():
    return f"MA{random.randint(1000000,9999999)}-MA{random.randint(1000000,9999999)}"

def random_measure():
    return round(random.uniform(0.001, 5000), 5)

# Generate rows
rows = []

for i in range(NUM_ENTRIES):
    row = {
        "Codigo": f"RQuil",
        "Nombre Punto": "Río Quilca",
        "Fecha monitoreo": random_date(),
        "Hora Monitoreo": random_time(),
        "Nro del Informe del Ensayo análitico": random_report(),
        "Departamento": "AREQUIPA",
        "Punto": f"RQuil"
    }

    # Fill all remaining parameters
    for col in columns[7:]:
        row[col] = random_measure()

    rows.append(row)

# Write CSV
with open(OUTPUT_FILE, mode="w", newline="", encoding="utf-8") as file:
    writer = csv.DictWriter(file, fieldnames=columns)
    writer.writeheader()
    writer.writerows(rows)

print(f"CSV file '{OUTPUT_FILE}' generated with {NUM_ENTRIES} entries.")