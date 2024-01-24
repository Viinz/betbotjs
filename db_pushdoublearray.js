//https://www.npmjs.com/package/@replit/database
// Importer le module replit-database
const Database = require("@replit/database");

// Créer une instance de la classe Database
const db = new Database(process.env.REPLIT_DB_URL);

db.set('match', [
  ['id', 'messageid', 'team1', 'team2', 'league', 'winner'], 
  [ '2024-01-09-G2-FNC', '1194351448310427659', 'G2', 'FNC', 'LEC', '' ],
  [ '2024-01-09-T1-DK', '1194350310181842964', 'T1', 'DK', 'LCK', '' ],
])