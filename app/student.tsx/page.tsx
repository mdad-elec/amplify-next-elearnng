"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Auth } from "aws-amplify";

const client = generateClient<Schema>();

export default function StudentPage() {
  const [students, setStudents] = useState<Array<Schema["Student"]["type"]>>([]);

  useEffect(() => {
    fetchStudents();
    checkUserRole();
  }, []);

  async function checkUserRole() {
    const session = await Auth.currentSession();
    const groups = session.getIdToken().payload["cognito:groups"] || [];
    if (!groups.includes("Students")) {
      window.location.href = "/";
    }
  }

  function fetchStudents() {
    client.models.Student.observeQuery().subscribe({
      next: ({ items }) => setStudents([...items]),
    });
  }

  return (
    <main>
      <h1>Student Portal</h1>
      <div className="student-list">
        {students.map((student) => (
          <div key={student.id} className="student-card">
            <h3>{student.studentName}</h3>
            <p>Class: {student.studentClass}</p>
            <p>Email: {student.studentEmail}</p>
          </div>
        ))}
      </div>
    </main>
  );
}