//https://www.npmjs.com/package/@replit/database
// Importer le module replit-database
const Database = require("@replit/database");

// Créer une instance de la classe Database
const db = new Database(process.env.REPLIT_DB_URL);

// Récupérer le tableau existant
let array = db.get ("myArray") || db ["myArray"];

// Ajouter la nouvelle entrée
array.push ([10, 11, 12]);

// Mettre à jour le tableau dans la base de données
db.set ("myArray", array);

db.getAll().then(console.log);

// const keyExists = async (key) => {
  const exists = await db.list().then(keys => keys.includes(key));
   console.log(exists);
}

// keyExists('pseudo');
