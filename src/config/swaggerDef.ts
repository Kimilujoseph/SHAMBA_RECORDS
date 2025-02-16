export const signupSchema = {
  tags: ["User Management"],
  summary: "User Signup",
  description: "Registers a new user in the system",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["username", "email", "password", "role"],
          properties: {
            username: { type: "string", example: "johndoe" },
            email: {
              type: "string",
              format: "email",
              example: "johndoe@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "mysecurepassword",
            },
            role: { type: "string", example: "passenger" },
          },
        },
      },
    },
  },
  responses: {
    201: { description: "User created successfully" },
    400: { description: "Bad request" },
    500: { description: "Internal server error" },
  },
};

export const signinSchema = {
  tags: ["User Management"],
  summary: "User Sign-In",
  description: "Authenticates a user and returns an access token.",
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "timothy@gmail.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "yourpassword123",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "User signed in successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "User signed in successfully",
              },
              data: {
                type: "object",
                properties: {
                  _id: {
                    type: "string",
                    example: "67b0ecd78064234340be8d4d",
                  },
                  name: {
                    type: "string",
                    example: "Timothy Joseph",
                  },
                  email: {
                    type: "string",
                    example: "timothy@gmail.com",
                  },
                  role: {
                    type: "string",
                    example: "passenger",
                  },
                  createdAt: {
                    type: "string",
                    format: "date-time",
                    example: "2025-02-15T19:36:55.646Z",
                  },
                  updatedAt: {
                    type: "string",
                    format: "date-time",
                    example: "2025-02-15T19:36:55.646Z",
                  },
                  token: {
                    type: "string",
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                  },
                },
              },
            },
          },
        },
      },
    },
    400: {
      description: "Invalid email or password",
    },
    500: {
      description: "Internal server error",
    },
  },
};
