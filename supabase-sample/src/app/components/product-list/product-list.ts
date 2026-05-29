import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { SupabaseService } from '../../services/supabase';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductList {
  private readonly supabaseService = inject(SupabaseService);

  readonly products = signal<any[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.loadProducts();
  }

  private async loadProducts(): Promise<void> {
    try {
      const data = await this.supabaseService.getLabResults({
        startDate: '2026-01-01',
        endDate: '2026-01-30'
      });
      this.products.set(Array.isArray(data) ? data : []);
    } catch (err) {
      this.error.set('Unable to load products.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }
}
