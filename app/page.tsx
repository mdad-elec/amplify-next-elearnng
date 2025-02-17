"use client";

import { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

export default function Home() {
  const router = useRouter();
  const [userGroups, setUserGroups] = useState<string[]>([]);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const session = await Auth.currentSession();
      const groups = session.getIdToken().payload["cognito:groups"] || [];
      setUserGroups(groups);
      
      if (groups.includes("Students")) {
        router.push("/student");
      } else if (groups.includes("Teachers")) {
        router.push("/teacher");
      }
    } catch (error) {
      // User not logged in
    }
  }

  if (userGroups.length > 0) return null; // Redirecting

  return (
    <main className="login-container">
      <h1>School Portal</h1>
      <Authenticator>
        {({ signOut }) => (
          <div className="auth-wrapper">
            <p>You're logged in!</p>
            <button onClick={signOut}>Sign out</button>
          </div>
        )}
      </Authenticator>
    </main>
  );
}