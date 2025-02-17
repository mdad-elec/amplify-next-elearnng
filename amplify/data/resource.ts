import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Student: a
    .model({
      studentName: a.string().required(),
      studentEmail: a.string().required(),
      studentClass: a.string().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
    
  Teacher: a
    .model({
      teacherName: a.string().required(),
      teacherEmail: a.string().required(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== FRONTEND USAGE EXAMPLES =============================================
// To use in your frontend components:

// 1. List all students
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

// List students
const { data: students } = await client.models.Student.list();

// List teachers
const { data: teachers } = await client.models.Teacher.list();

// Create a new student
await client.models.Student.create({
  studentName: "John Doe",
  studentEmail: "john@school.com",
  studentClass: "10-A"
});

// Create a new teacher
await client.models.Teacher.create({
  teacherName: "Jane Smith",
  teacherEmail: "jane@school.com"
});
=========================================================================*/