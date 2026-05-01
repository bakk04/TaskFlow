import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data to avoid duplicates on re-run
  await prisma.user.deleteMany();
  await prisma.project.deleteMany();

  await prisma.user.create({
    data: { email: 'admin@taskflow.com', password: 'password123', name: 'Admin' }
  });

  await prisma.project.createMany({
    data: [
      { name: 'App Mobile', color: '#3498db' },
      { name: 'API Back', color: '#2ecc71' },
    ]
  });

  console.log('Seed done!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
