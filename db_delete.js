//https://www.npmjs.com/package/@replit/database
// Importer le module replit-database
const Database = require("@replit/database");

// Créer une instance de la classe Database
const db = new Database(process.env.REPLIT_DB_URL);

db.delete('2024-01-09-G2-FNC');
db.delete('2024-01-09-T1-DK');
