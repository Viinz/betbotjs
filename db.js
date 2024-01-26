//https://www.npmjs.com/package/@replit/database
// Importer le module replit-database
const Database = require("@replit/database");

// Créer une instance de la classe Database
const db = new Database(process.env.REPLIT_DB_URL);

// db.set('pseudo', [
//   ['id', 'pseudo'], 
//   [ '319128072546680832', 'Bucheron75' ],
//   [ '220173276272394240', 'Smoumy' ],
// ])



db.getAll().then(console.log);

// const keyExists = async (key) => {
//   const exists = await db.list().then(keys => keys.includes(key));
//    console.log(exists);
// }

// let match = db.get('match');
// console.log(match);
// console.log(db.get('match'));



