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
    <main>
      <h1>My todos --- I have been edited</h1>
      <button onClick={createTodo}>+ new</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/nextjs/start/quickstart/nextjs-app-router-client-components/">
          Review next steps of this tutorial.
        </a>
      </div>
    </main>
  );
}