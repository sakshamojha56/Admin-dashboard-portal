import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create categories
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
    },
  });

  const clothing = await prisma.category.upsert({
    where: { slug: 'clothing' },
    update: {},
    create: {
      name: 'Clothing',
      slug: 'clothing',
    },
  });

  const books = await prisma.category.upsert({
    where: { slug: 'books' },
    update: {},
    create: {
      name: 'Books',
      slug: 'books',
    },
  });

  const home = await prisma.category.upsert({
    where: { slug: 'home-garden' },
    update: {},
    create: {
      name: 'Home & Garden',
      slug: 'home-garden',
    },
  });

  console.log('✅ Categories created:', { electronics, clothing, books, home });

  // Create a default admin user
  const adminPassword = await import('bcryptjs').then(m => m.default.hash('admin123', 10));
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created:', admin.email);

  // Create sample products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { id: 'sample-laptop' },
      update: {},
      create: {
        id: 'sample-laptop',
        name: 'Gaming Laptop',
        description: 'High-performance laptop for gaming and creative work',
        price: 1299.99,
        stock: 15,
        categoryId: electronics.id,
        userId: admin.id,
        image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500',
      },
    }),
    prisma.product.upsert({
      where: { id: 'sample-phone' },
      update: {},
      create: {
        id: 'sample-phone',
        name: 'Smartphone Pro',
        description: 'Latest flagship smartphone with advanced features',
        price: 899.99,
        stock: 25,
        categoryId: electronics.id,
        userId: admin.id,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
      },
    }),
    prisma.product.upsert({
      where: { id: 'sample-tshirt' },
      update: {},
      create: {
        id: 'sample-tshirt',
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt',
        price: 29.99,
        stock: 100,
        categoryId: clothing.id,
        userId: admin.id,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      },
    }),
    prisma.product.upsert({
      where: { id: 'sample-jeans' },
      update: {},
      create: {
        id: 'sample-jeans',
        name: 'Denim Jeans',
        description: 'Classic fit denim jeans',
        price: 59.99,
        stock: 50,
        categoryId: clothing.id,
        userId: admin.id,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
      },
    }),
    prisma.product.upsert({
      where: { id: 'sample-book' },
      update: {},
      create: {
        id: 'sample-book',
        name: 'The Great Novel',
        description: 'A bestselling fiction novel',
        price: 24.99,
        stock: 30,
        categoryId: books.id,
        userId: admin.id,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
      },
    }),
    prisma.product.upsert({
      where: { id: 'sample-plant' },
      update: {},
      create: {
        id: 'sample-plant',
        name: 'Indoor Plant',
        description: 'Beautiful indoor plant for home decoration',
        price: 34.99,
        stock: 5,
        categoryId: home.id,
        userId: admin.id,
        image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500',
      },
    }),
  ]);

  console.log('✅ Products created:', products.length);
  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
