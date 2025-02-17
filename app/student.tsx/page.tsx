// app/student/page.tsx
"use client";

import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { useRouter } from 'next/navigation';
import { fetchUserAttributes } from 'aws-amplify/auth';

const client = generateClient<Schema>();

export default function StudentPage() {
  const [student, setStudent] = useState<Schema["Student"]["type"]>();
  const router = useRouter();

  useEffect(() => {
    const loadStudentData = async () => {
      const user = await fetchUserAttributes();
      const { data: studentData } = await client.models.Student.list({
        filter: { owner: { eq: user.sub } }
      });
      
      if (studentData.length > 0) {
        setStudent(studentData[0]);
      }
    };

    loadStudentData();
  }, []);

  return (
    <main>
      <h1>Student Portal</h1>
      {student && (
        <div>
          <h2>{student.name}</h2>
          <p>Class: {student.class}</p>
          <p>Email: {student.email}</p>
        </div>
      )}
      <button onClick={() => router.push('/')}>Logout</button>
    </main>
  );
}