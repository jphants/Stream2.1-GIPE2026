import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { SupabaseService } from '../../services/supabase';

@Component({
  selector: 'app-ala-files',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ala-file-list.html',
  styleUrls: ['./product-list.css'],
})
export class AlaFileList {
  private readonly supabaseService = inject(SupabaseService);

  readonly products = signal<any[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  constructor() {
    this.loadAlaFiles();
  }

  private async loadAlaFiles(): Promise<void> {
    try {
      const data = await this.supabaseService.getAlaFiles();
      this.products.set(Array.isArray(data) ? data : []);
    } catch (err) {
      this.error.set('Unable to load ALA files.');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }
}
