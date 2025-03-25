import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface AuthFormData {
  email: string;
  password: string;
  fullName?: string;
  careerGoal?: string;
}

interface UseAuthFormProps {
  mode: 'login' | 'register';
  onSuccess?: () => void;
}

export function useAuthForm({ mode, onSuccess }: UseAuthFormProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (data: AuthFormData) => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!data.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!data.password) {
      newErrors.password = 'Password is required';
    } else if (data.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Additional register validations
    if (mode === 'register') {
      if (!data.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      if (!data.careerGoal) {
        newErrors.careerGoal = 'Career goal is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (formData: AuthFormData) => {
    if (!validateForm(formData)) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      if (mode === 'register') {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName
            }
          }
        });

        if (authError) {
          if (authError.message.includes('already registered')) {
            setErrors({ email: 'This email is already registered' });
          } else {
            throw authError;
          }
          return;
        }

        if (authData.user) {
          const { error: profileError } = await supabase
            .from('user_profiles')
            .insert([
              {
                id: authData.user.id,
                full_name: formData.fullName,
                career_goal: formData.careerGoal
              }
            ]);

          if (profileError) throw profileError;

          toast.success('Account created successfully! Please check your email to confirm your account.');
          onSuccess?.();
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setErrors({
              password: 'Invalid email or password'
            });
            return;
          }
          throw error;
        }

        toast.success('Logged in successfully!');
        navigate('/');
        onSuccess?.();
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast.error(errorMessage);
      
      if (errorMessage.includes('Email not confirmed')) {
        toast.error('Please check your email to confirm your account');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSubmit,
    loading,
    errors
  };
}