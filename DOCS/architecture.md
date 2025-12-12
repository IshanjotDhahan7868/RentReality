# Architecture (V1)

User (browser)
    ↓
Next.js Frontend (pages: Home, Explorer, Learn, About)
    ↓
Next.js API Routes
    - /api/affordability
    - /api/can-i-buy
    - /api/explorer
    - /api/ai/explain
    ↓
Postgres (Supabase)
    - regions
    - time_periods
    - metrics
    - metric_values

Data Ingestion (offline / scripts)
    - Python scripts:
        - ingest_rent_from_CMHCCSV.py
        - ingest_income_from_StatCan.py
        - ingest_rates_from_BoC.py
    - These connect to Postgres and upsert data.

AI Layer
    - /api/ai/explain calls OpenAI API
    - Modes:
        - "affordability" → explain user’s situation
        - "explorer" → explain current chart view
        - later: "report" → generate monthly summary
