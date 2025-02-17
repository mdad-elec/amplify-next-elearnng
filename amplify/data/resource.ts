// amplify/backend/resource.ts
import { type ClientSchema, a, defineData, defineAuth } from "@aws-amplify/backend";

const auth = defineAuth({
  loginWith: {
    email: true,
    // Add external providers if needed
  },
  groups: ['Student', 'Teacher'] // Add user groups
});

const schema = a.schema({
  Student: a
    .model({
      name: a.string().required(),
      email: a.string().required(),
      class: a.string().required(),
      owner: a.string().required()
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(['Teacher']).to(['read'])
    ]),

  Teacher: a
    .model({
      name: a.string().required(),
      email: a.string().required(),
      owner: a.string().required()
    })
    .authorization((allow) => [
      allow.owner(),
      allow.groups(['Admin'])
    ])
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30
    }
  }
});

export const authConfig = auth;

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