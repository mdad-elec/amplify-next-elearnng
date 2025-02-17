// app/teacher/page.tsx
"use client";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useRouter } from 'next/navigation';
import { fetchUserAttributes } from 'aws-amplify/auth';

const client = generateClient<Schema>();

export default function TeacherPage() {
  const [students, setStudents] = useState<Schema["Student"]["type"][]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadStudents = async () => {
      const { data: studentData } = await client.models.Student.list();
      setStudents(studentData);
    };

    loadStudents();
  }, []);

  return (
    <main>
      <h1>Teacher Portal</h1>
      <h2>Student List</h2>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.class}
          </li>
        ))}
      </ul>
      <button onClick={() => router.push('/')}>Logout</button>
    </main>
  );
}