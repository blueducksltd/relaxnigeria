const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env');
  process.exit(1);
}

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['super-admin', 'admin'], default: 'admin' },
  name: { type: String },
});

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = 'admin@relaxnigeria.com';
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 12);

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log('Admin already exists');
    } else {
      await Admin.create({
        email,
        password: hashedPassword,
        role: 'super-admin',
        name: 'Super Admin',
      });
      console.log('Admin user created successfully');
      console.log('Email:', email);
      console.log('Password:', password);
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
}

seed();
