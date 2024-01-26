const Discord = require('discord.js');
const MatchModel = require('./models/matchModel');
const MatchView = require('./views/matchView');
const MatchController = require('./controllers/matchController');

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

const matchModel = new MatchModel();
const matchView = new MatchView();
const matchController = new MatchController(matchModel, matchView);

client.on('messageCreate', (message) => matchController.handleCommand(message));
client.on('messageReactionAdd', (reaction, user) => matchController.handleReaction(reaction, user));

client.once('ready', () => {
  console.log('Bot prêt');
  // Autres initialisations si nécessaires
});

client.login(process.env.TOKEN);
