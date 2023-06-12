const { useHistory } = require('discord-player');
const { ChatInputCommand } = require('../../classes/Commands');
const { queueEmbedResponse, requireSessionConditions } = require('../../modules/music');

module.exports = new ChatInputCommand({
  global: true,
  data: { description: 'Display the current history' },
  run: async (client, interaction) => {
    const { emojis } = client.container;
    const { member, guild } = interaction;

    // Check conditions/state
    if (!requireSessionConditions(interaction, true, false, false)) return;

    // Check has history
    const history = useHistory(guild.id);
    if (!history) {
      interaction.reply({ content: `${ emojis.error } ${ member }, history is currently empty. You should totally \`/play\` something - but that's just my opinion.` });
      return;
    }

    // Show history, interactive
    queueEmbedResponse(interaction, history, 'History');
  }
});
