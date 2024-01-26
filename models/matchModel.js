// models/matchModel.js
const Database = require('@replit/database');

class MatchModel {
  constructor() {
    this.db = new Database(process.env.REPLIT_DB_URL);
  }

  addMatch(match) {
    let existingMatchTable = this.db.get('match') || [];

    // Vérifier si existingMatchTable est un tableau
    if (!Array.isArray(existingMatchTable) || existingMatchTable.length === 0) {
      // Si ce n'est pas un tableau ou s'il est vide, initialiser existingMatchTable avec les données par défaut
      existingMatchTable = [
        ['id', 'messageid', 'team1', 'team2', 'league', 'winner'],
        // Vous pouvez ajouter d'autres données par défaut ici si nécessaire
      ];
    } else {
      // Filtrer le premier élément du tableau s'il existe
      existingMatchTable = existingMatchTable.filter((item, index) => index !== 0);
    }

    existingMatchTable.push(match);
    this.db.set('match', existingMatchTable);
  }

  // Autres méthodes liées aux données des matchs
}

module.exports = MatchModel;
