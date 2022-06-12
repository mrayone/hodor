import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const profileAdmin = await prisma.profile.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      description: 'Admin profile and your permissions',
      permissions: {
        create: [
          {
            name: 'create',
            value: 'all',
          },
          {
            name: 'update',
            value: 'all',
          },
          {
            name: 'read',
            value: 'all',
          },
        ],
      },
    },
  });

  const profileUser = await prisma.profile.upsert({
    where: { name: 'User' },
    update: {},
    create: {
      name: 'User',
      description: 'Profile to users on platform',
      permissions: {
        create: [
          {
            name: 'create',
            value: 'owner',
          },
          {
            name: 'update',
            value: 'owner',
          },
          {
            name: 'read',
            value: 'owner',
          },
        ],
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
