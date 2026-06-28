# Agriculture App Frontend Handover

This Angular app already includes a Supabase integration layer for the frontend team. The goal of this handover is to make it easy to connect UI components to the database without needing to understand the lower-level client setup.

## 1. What is already wired up

The frontend currently has:

- A shared Supabase service in [src/app/services/supabase.service.ts](src/app/services/supabase.service.ts)
- A typed database contract in [src/app/types/database.types.ts](src/app/types/database.types.ts)
- A sample page that loads agricultural sites from Supabase in [src/app/pages/sites/sites.ts](src/app/pages/sites/sites.ts)
- The environment configuration in [src/environments/environment.ts](src/environments/environment.ts)

## 2. How the Supabase service works

The service is registered as a singleton with Angular and exposes a ready-to-use Supabase client instance:

```ts
constructor() {
  this.client = createClient<Database>(
    environment.supabaseUrl,
    environment.supabaseKey
  );
}
```

This means any component can inject the service and call Supabase directly through `this.supabase.client`.

## 3. Frontend integration pattern

### Inject the service into a component

Use the service in any Angular component like this:

```ts
import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-example',
  template: '',
})
export class ExampleComponent implements OnInit {
  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    const { data, error } = await this.supabase.client
      .from('agricultural_site')
      .select('*');

    if (error) {
      console.error(error);
      return;
    }

    console.log(data);
  }
}
```

### Use the typed database model

The database schema is already defined in [src/app/types/database.types.ts](src/app/types/database.types.ts). This gives frontend developers autocomplete and type safety for table names and row shapes.

Example:

```ts
import { Database } from '../../types/database.types';

type AgriculturalSite =
  Database['public']['Tables']['agricultural_site']['Row'];
```

## 4. Environment configuration

Before running the app, update the Supabase credentials in [src/environments/environment.ts](src/environments/environment.ts):

```ts
export const environment = {
  production: false,
  supabaseUrl: 'https://your-project.supabase.co',
  supabaseKey: 'your-anon-or-service-role-key',
};
```

Important notes:

- Do not commit real keys to Git.
- Use the anon key for frontend-safe read access.
- Use a service role key only in trusted backend/server contexts, not in browser code.

## 5. Current example: loading agricultural sites

The sample page at [src/app/pages/sites/sites.ts](src/app/pages/sites/sites.ts) demonstrates the expected flow:

1. Inject `SupabaseService`
2. Call `this.supabase.client.from('table').select('*')`
3. Handle `error` and `data`
4. Store the result in component state

This is the pattern to reuse for other pages such as:

- sensor stations
- water assessments
- field measurements
- satellite imagery

## 6. Common query patterns for the frontend team

### Read data

```ts
const { data, error } = await this.supabase.client
  .from('agricultural_site')
  .select('*');
```

### Filter data

```ts
const { data, error } = await this.supabase.client
  .from('sensor_station')
  .select('*')
  .eq('site_id', 1);
```

### Insert data

```ts
const { data, error } = await this.supabase.client
  .from('water_assessment')
  .insert({
    site_id: 1,
    assessment_date: '2026-06-27',
    water_quality: 'Good',
  });
```

### Update data

```ts
const { data, error } = await this.supabase.client
  .from('agricultural_site')
  .update({ region: 'North' })
  .eq('site_id', 1);
```

### Delete data

```ts
const { data, error } = await this.supabase.client
  .from('agricultural_site')
  .delete()
  .eq('site_id', 1);
```

## 7. Frontend guidance for new features

When building a new screen:

- Keep database access inside a component or a dedicated service wrapper.
- Avoid putting raw Supabase calls directly into templates.
- Handle loading and error states clearly in the UI.
- Prefer typed responses from [src/app/types/database.types.ts](src/app/types/database.types.ts).
- Keep row transformations in the component or a small helper layer rather than in the global service.

## 8. Run the app locally

From the project root:

```bash
cd agriculture-app
npm install
ng serve
```

Then open:

```text
http://localhost:4200/
```

## 9. Recommended handover checklist

- Confirm the Supabase project URL and API key are configured in [src/environments/environment.ts](src/environments/environment.ts)
- Verify that the target table names match the database schema
- Add loading, empty, and error UI states to each new data-driven page
- Reuse the existing service pattern instead of creating a second client instance
- Keep Supabase-specific logic centralized so future backend changes are easier to manage
