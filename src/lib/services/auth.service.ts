import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/supabase/database.types';
import type { User } from '@/types';

export class AuthService {
  private static supabase = createClientComponentClient<Database>();

  static async getCurrentUser(): Promise<User | null> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await this.supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  static async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    
    if (error) throw error;
    return data;
  }

  static async signUp(email: string, password: string, username: string) {
    try {
      // First check if username is taken
      const { data: existingUser, error: usernameError } = await this.supabase
        .from('users')
        .select('username')
        .eq('username', username.trim())
        .single();

      if (usernameError && usernameError.code !== 'PGRST116') {
        throw usernameError;
      }

      if (existingUser) {
        throw new Error('Username already taken');
      }

      // Then attempt to create the auth user
      const { data, error: signUpError } = await this.supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            username: username.trim(),
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) throw signUpError;

      // Create the user profile
      if (data.user) {
        const { error: profileError } = await this.supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: email.trim().toLowerCase(),
            username: username.trim(),
            wallet_balance: 0,
          });

        if (profileError) {
          // If profile creation fails, cleanup auth user
          await this.supabase.auth.admin.deleteUser(data.user.id);
          throw profileError;
        }
      }

      return data;
    } catch (error: any) {
      if (error.message.includes('duplicate key')) {
        throw new Error('Email already registered');
      }
      throw error;
    }
  }

  static async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }
}