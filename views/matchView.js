// views/matchView.js
const { EmbedBuilder } = require('discord.js');

class MatchView {
  constructor() {}

  createMatchEmbed(matchData) {
    // Créer un message embed avec les informations du match
    return new EmbedBuilder()
      .setTitle(`Match ${matchData.team1} - ${matchData.team2}`)
      .setDescription(`Emoji ${matchData.emoji1} pour ${matchData.team1} \n Emoji ${matchData.emoji2} pour ${matchData.team2}`)
      .addFields(
        { name: 'id', value: matchData.matchId }
      );
  }

  // Autres méthodes liées à la manipulation des messages Discord
}

module.exports = MatchView;
