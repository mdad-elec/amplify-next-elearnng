// app/page.tsx
"use client";

import { Authenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import { fetchUserAttributes } from 'aws-amplify/auth';

Amplify.configure(outputs);

export default function Home() {
  const router = useRouter();

  const checkUserRole = async () => {
    try {
      const user = await fetchUserAttributes();
      const groups = user['cognito:groups'] || [];
      
      if (groups.includes('Student')) {
        router.push('/student');
      } else if (groups.includes('Teacher')) {
        router.push('/teacher');
      }
    } catch (error) {
      console.error('Error checking user role:', error);
    }
  };

  return (
    <Authenticator>
      {({ user }) => {
        if (user) {
          checkUserRole();
          return <div>Loading...</div>;
        }
        
        return (
          <div className="login-container">
            <h1>School Portal</h1>
            <Authenticator.SignIn />
          </div>
        );
      }}
    </Authenticator>
  );
}