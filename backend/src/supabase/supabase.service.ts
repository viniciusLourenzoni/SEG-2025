import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService implements OnModuleInit, OnModuleDestroy {
  private client!: any;

  private readonly supabaseUrl = process.env.SUPABASE_URL!;
  private readonly supabaseKey = process.env.SUPABASE_KEY!;

  onModuleInit() {
    this.client = createClient(this.supabaseUrl, this.supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  onModuleDestroy() {
    this.client = undefined;
  }

  getClient(): any {
    if (!this.client) {
      throw new Error('Supabase client is not initialized.');
    }
    return this.client;
  }
}
