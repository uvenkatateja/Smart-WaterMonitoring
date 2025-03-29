import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

const signupSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSignupSuccess?: () => void;
}

const SignupForm = ({ onSignupSuccess }: SignupFormProps) => {
  const { signup, login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: SignupFormValues) {
    setLoading(true);
    setError('');
    
    try {
      // Create the user account
      await signup(values.email, values.password);
      
      // Auto sign in after successful signup
      await login(values.email, values.password);
      
      // Call the success callback if provided
      if (onSignupSuccess) {
        onSignupSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create an account');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="w-full shadow-lg border-water-100">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-water-800">Create an account</CardTitle>
        <CardDescription className="text-center">
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="name@example.com" 
                      type="email" 
                      className="bg-white" 
                      disabled={loading} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="••••••••" 
                      type="password" 
                      className="bg-white" 
                      disabled={loading} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="••••••••" 
                      type="password" 
                      className="bg-white" 
                      disabled={loading} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-water-600 hover:bg-water-700" disabled={loading}>
              {loading ? 'Creating account...' : 'Sign up'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="underline text-water-600 hover:text-water-700">
            Log in
          </Link>
        </div>
        <div className="text-center text-xs text-gray-500">
          By signing up, you agree to our{' '}
          <Link to="/terms" className="underline hover:text-water-700">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="underline hover:text-water-700">
            Privacy Policy
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;
