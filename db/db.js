import  pg_pkg from 'pg';
const {Client} = pg_pkg;

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '4nnMnBsr',
  database: process.env.DB_DATABASE || 'postgres',
  port: process.env.DB_PORT || 5432,
  SSL: process.env.DB_SSL || true
});

export default client;
