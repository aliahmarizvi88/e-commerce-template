import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FAKE_API_URL = 'https://fakestoreapi.com';

const DB_PATH = path.resolve(__dirname, '../../api/db.json');

async function seedData() {
  if (!FAKE_API_URL) {
    console.error(
      'Error: FAKE_STORE_URL environment variable is not set. Check your "seed" script in package.json.'
    );
    process.exit(1);
  }

  console.log(`Starting data seeding from: ${FAKE_API_URL}/products`);

  try {
    const productsResponse = await axios.get(`${FAKE_API_URL}/products`);
    const productsData = productsResponse.data;

    const usersResponse = await axios.get(`${FAKE_API_URL}/users`);
    const usersData = usersResponse.data;

    const dataToWrite = {
      products: productsData,
      users: usersData,
      orders: [],
      admin: [],
    };

    fs.writeFileSync(DB_PATH, JSON.stringify(dataToWrite, null, 2));

    console.log(`Successfully fetched ${productsData.length} products.`);
    console.log(`Successfully fetched ${usersData.length} users.`);
    console.log(`Data written to ${DB_PATH}. Your local API is ready!`);
  } catch (error) {
    console.error('Error during data seeding:', error.message);
    process.exit(1);
  }
}

seedData();
