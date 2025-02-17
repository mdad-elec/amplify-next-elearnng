"use client";

import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Auth } from "aws-amplify";

const client = generateClient<Schema>();

export default function TeacherPage() {
  const [teachers, setTeachers] = useState<Array<Schema["Teacher"]["type"]>>([]);

  useEffect(() => {
    fetchTeachers();
    checkUserRole();
  }, []);

  async function checkUserRole() {
    const session = await Auth.currentSession();
    const groups = session.getIdToken().payload["cognito:groups"] || [];
    if (!groups.includes("Teachers")) {
      window.location.href = "/";
    }
  }

  function fetchTeachers() {
    client.models.Teacher.observeQuery().subscribe({
      next: ({ items }) => setTeachers([...items]),
    });
  }

  return (
    <main>
      <h1>Teacher Portal</h1>
      <div className="teacher-list">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="teacher-card">
            <h3>{teacher.teacherName}</h3>
            <p>Email: {teacher.teacherEmail}</p>
          </div>
        ))}
      </div>
    </main>
  );
}