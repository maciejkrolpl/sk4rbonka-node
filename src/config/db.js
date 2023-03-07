import pg_pkg from 'pg'
const { Client } = pg_pkg

const client = new Client({
    connectionString: process.env.DB_URL,
})

export default client
