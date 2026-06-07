import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupabaseService } from '../../services/supabase.service';
import { Database } from '../../types/database.types';

type AgriculturalSite =
  Database['public']['Tables']['agricultural_site']['Row'];

@Component({
  selector: 'app-sites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sites.html',
})
export class SitesComponent implements OnInit {
  sites: AgriculturalSite[] = [];

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    const { data, error } = await this.supabase.client
      .from('agricultural_site')
      .select('*');

    if (error) {
      console.error(error);
      return;
    }

    this.sites = data;
  }
}