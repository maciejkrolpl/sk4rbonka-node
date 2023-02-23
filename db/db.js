import  pg_pkg from 'pg';
const {Client} = pg_pkg;

// const client = new Client({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'postgres',
//   password: process.env.DB_PASSWORD || '4nnMnBsr',
//   database: process.env.DB_DATABASE || 'postgres',
//   port: +process.env.DB_PORT || 5432,
//   SSL:  true
// });

const client = new Client({
  connectionString: 'postgres://maciek_psql_user:x7loDnKoS951swOGldSXsiHdQMCxX3r4@dpg-cfrjunpgp3jo1dr1ksvg-a/maciek_psql'
})

export default client;
