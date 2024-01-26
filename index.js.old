console.log('RUN');
// Importer le module discord.js
const Discord = require('discord.js');

// Importer le module replit-database
const Database = require('@replit/database');

// Créer un client Discord avec les intents voulus
const { 
  Client, 
  GatewayIntentBits, 
  Partials,
  EmbedBuilder
} = Discord;

const client = new Client({
  intents:[
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ], 
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.Reaction,
  ] 
});

const emoji1 = '🔵'; // L'émoticône de la première équipe
const emoji2 = '🔴';

// Créer une instance de la classe Database
const db = new Database(process.env.REPLIT_DB_URL);

// Se connecter à Discord avec le token du bot
client.login(process.env['TOKEN']);

// Quand le bot est prêt, set status
client.once('ready', () => {
  console.log('ready');
  client.user.setPresence({
    status: "online",
    activity: {
        name: "Betting on match",
        type: "PLAYING"
    }
  });
});

// Quand le bot reçoit un message, exécuter cette fonction
client.on('messageCreate', async function (message) {
  console.log(message.content);
  // Si le message commence par "!setmatch"
  if (message.content.startsWith('!setmatch')) {
   var dataReturned = setMatch(message);
    // Ajouter le match à la DB
    let newEntry = [ dataReturned['matchId'], 
                      dataReturned['messageId'], 
                      dataReturned['team1'], 
                      dataReturned['team2'], 
                      dataReturned['league'], 
                      ''
                     ]
    let existingMatchTable = db.get('match');
    console.log(typeof existingMatchTable)
    existingMatchTable.push(newEntry);
    await db.set('match', existingMatchTable);
  }
});

// Quand un utilisateur ajoute une réaction à un message, exécuter cette fonction
client.on('messageReactionAdd', async (reaction, user) => {
  console.log('reaction');
  if (reaction.partial) {
    // If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
    try {
      await reaction.fetch();
    } catch (error) {
      console.error('Something went wrong when fetching the message:', error);
      // Return as `reaction.message.author` may be undefined/null
      return;
    }
  }

  const messageId = reaction.message.id;
  console.log(messageId);
  const embedMessage = await reaction.message.channel.messages.fetch(messageId);
  // Récupérer le premier message embed du message
  const embed = embedMessage.embeds[0];
  // Récupérer le premier field du message embed
  const field = embed.fields[0];
  // Afficher le nom et la valeur du field dans la console
  console.log(field.name); // id
  console.log(field.value); // 1234
  // checkAndRemoveVote(reaction, user, field.value);
  console.log('checkAndRemoveVote');
  // Récupérer l'émoticône de la réaction
  const emoji = reaction.emoji.name;
  console.log(emoji);
  // Vérifier si l'émoticône correspond à une des équipes
  if (emoji === emoji1 || emoji === emoji2) {
    console.log('if emoji');
    // Récupérer les autres réactions du message
    const reactions = reaction.message.reactions.cache;
    // Parcourir les autres réactions
    for (const otherReaction of reactions.values()) {
    // Si la réaction est différente de celle ajoutée
      if (otherReaction !== reaction) {
        console.log('different')
        // console.log(otherReaction);
        // console.log(reaction);
        await otherReaction.fetch();
        // Si l'utilisateur a réagi à cette réaction
        if (otherReaction.users.cache.has(user.id)) {
          console.log('has user ID');
          // Retirer la réaction de l'utilisateur
          await otherReaction.users.remove(user.id);
        }
      }
    }
  }
});

function setMatch(message) {
  // Extraire les noms des équipes avec une expression régulière
  const regex = /!setmatch\s+(.+)\s+(.+)\s+(.+)/;
  const match = message.content.match(regex);
  // Si l'expression régulière correspond
  if (match) {
    // Avoir la date du jour
    let todayDate = new Date().toISOString().slice(0, 10);
    // Générer un identifiant unique pour le match
    let matchId = todayDate+'-'+match[1]+'-'+match[2];
    // Créer un message embed qui affiche les informations du match
    let embed = new EmbedBuilder()
      .setTitle(
        `Match ${match[1]} - ${match[2]}`
      )
      .setDescription(
        `Emoji ${emoji1} pour ${match[1]} \n Emoji ${emoji2} pour ${match[2]}`
      )
      .addFields(
        { name: 'id', value: matchId }
      );
    // Envoyer le message embed dans le même canal
    message.channel
      .send({ embeds: [embed] })
      .then(sentMessage => {
      // Ajouter les réactions correspondant aux émoticônes des équipes
      sentMessage.react(emoji1);
      sentMessage.react(emoji2);
    });

    return {
      'messageId' : message.id,
      'matchId' : matchId,
      'team1' : match[1],
      'team2' : match[2],
      'league' : match[3],
    };
  }
}

// Créer une fonction qui vérifie si une personne a déjà voté et qui supprime son ancien vote
function checkAndRemoveVote(reaction, user, id) {
 
}
