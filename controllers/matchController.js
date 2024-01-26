// controllers/matchController.js
class MatchController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  handleCommand(message) {
    const matchData = this.parseMatchCommand(message.content);

    if (matchData) {
      this.model.addMatch(matchData);

      this.view.createMatchEmbed(matchData).then(embed => {
        // Envoyer le message embed dans le même canal
        message.channel.send({ embeds: [embed] }).then(sentMessage => {
          // Ajouter les réactions correspondant aux émoticônes des équipes
          sentMessage.react(matchData.emoji1);
          sentMessage.react(matchData.emoji2);
        });
      });
    }
  }

  handleReaction(reaction, user) {
    // Logique pour traiter les réactions
    // Vous pouvez appeler des méthodes spécifiques du modèle pour gérer les réactions
    // et mettre à jour la base de données en conséquence.
  }

  parseMatchCommand(command) {
    const regex = /!setmatch\s+(.+)\s+(.+)\s+(.+)/;
    const match = command.match(regex);

    if (match) {
      return {
        messageId: null, // Mettez à jour avec la valeur appropriée si nécessaire
        matchId: this.generateUniqueId(match[1], match[2]),
        team1: match[1],
        team2: match[2],
        league: match[3],
        emoji1: '🔵', // Mettez à jour avec la valeur appropriée
        emoji2: '🔴', // Mettez à jour avec la valeur appropriée
      };
    }

    return null;
  }

  generateUniqueId(team1, team2) {
    const todayDate = new Date().toISOString().slice(0, 10);
    return `${todayDate}-${team1}-${team2}`;
  }

  // Autres méthodes de gestion d'événements et de logique métier
}

module.exports = MatchController;
