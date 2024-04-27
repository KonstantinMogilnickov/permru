const {Client} = require('pg');

const connectionString = 'postgres://postgres.nufjprhaavfxuywgsnwn:Asdf654km!1234@aws-0-eu-central-1.pooler.supabase.com:5432/postgres';

const client = new Client({
    connectionString: connectionString,
    });

module.exports = {client};
