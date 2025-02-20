// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   // Create a new user
//   const newUser = await prisma.user.create({
//     data: {
//       email: 'alice@example.com',
//       name: 'Alice',
//     },
//   });
//   console.log('Created user:', newUser);

//   // Fetch all users
//   const users = await prisma.user.findMany();
//   console.log('All users:', users);
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
