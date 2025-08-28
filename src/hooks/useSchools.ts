import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface School {
  id: number;
  name: string;
  suburb: string | null;
  postcode: string | null;
  active: boolean;
}

export function useSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchools = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('schools')
        .select('*')
        .eq('active', true)
        .order('name', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      setSchools(data || []);
    } catch (err) {
      console.error('Error fetching schools:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch schools');
    } finally {
      setLoading(false);
    }
  };

  const addSchool = async (name: string, suburb?: string, postcode?: string) => {
    try {
      const { error } = await supabase
        .from('schools')
        .insert([{
          name: name.trim(),
          suburb: suburb?.trim() || null,
          postcode: postcode?.trim() || null,
          active: true
        }]);

      if (error) {
        throw error;
      }

      // Refresh the schools list
      await fetchSchools();
      return true;
    } catch (err) {
      console.error('Error adding school:', err);
      throw err;
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  return {
    schools,
    loading,
    error,
    addSchool,
    refetch: fetchSchools
  };
}