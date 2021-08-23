# Handlelister

## Lokal utvikling
Opprett env-fil i root mappe: 

```
# .env.development
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_PROJECT_ID="projectId"

SANITY_STUDIO_API_DATASET="production"
SANITY_STUDIO_API_PROJECT_ID="projectId"
```

Og env-fil i studio-mappe:
```
SANITY_STUDIO_API_DATASET="production"
SANITY_STUDIO_API_PROJECT_ID="projectId"
```
Så kjører du
```
npm i
npm run dev
```