const Discord = require('discord.js');
const client = new Discord.Client();


// Put the Music module in the new Client object.
// This allows for easy access to all the modules
// functions and data.
client.music = require("discord.js-musicbot-addon");

// Now we start the music module.
client.music.start(client, {
  // Set the api key used for YouTube.
  // This is required to run the bot.
  youtubeKey: "AIzaSyAaHwF1J-aUv_wLiFlJ2uuFcnzbatV8sHs",
  // The PLAY command Object.
  botPrefix: "+music-",
  play: {
    // Usage text for the help command.
    usage: "{{prefix}}play some tunes",
    // Whether or not to exclude the command from the help command.
    exclude: false  
  },
  // Make it so anyone in the voice channel can skip the
  // currently playing song.
  anyoneCanSkip: true,
});


client.on('ready', async () => {
    console.log('ready');
});

client.on('message', (msg) => {
	console.log(msg.content);
});

client.login('NDY4MTEwMjI1OTQxOTg3MzI4.XKbhww.2hXTQT07JBsFR4k7jjccotKxHl8');
