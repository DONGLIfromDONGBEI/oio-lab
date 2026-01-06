import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, type, locale } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    // Fallback for Demo Mode (if Supabase is not configured)
    if (!supabase) {
      console.log('⚠️ Supabase not configured. Operating in DEMO MODE.');
      console.log('Received booking:', { email, type, locale });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return NextResponse.json({ success: true, message: 'Demo mode: success' });
    }

    const { error } = await supabase
      .from('waiting_list')
      .insert([
        { 
          email, 
          type, 
          locale,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ success: false, error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Request processing error:', error);
    return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
  }
}
