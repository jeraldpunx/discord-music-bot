// Calling Packages
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json");
bot.warnings = require("./warnings.json");

// bot.music = require("discord.js-musicbot-addon");

// // Now we start the music module.
// bot.music.start(bot, {
//   // Set the api key used for YouTube.
//   // This is required to run the bot.
//   youtubeKey: "AIzaSyAaHwF1J-aUv_wLiFlJ2uuFcnzbatV8sHs",
//   // The PLAY command Object.
//   botPrefix: "+music-",
//   play: {
//     // Usage text for the help command.
//     usage: "{{prefix}}play some tunes",
//     // Whether or not to exclude the command from the help command.
//     exclude: false  
//   },
//   // Make it so anyone in the voice channel can skip the
//   // currently playing song.
//   anyoneCanSkip: true,
// });

// Global Settings
const prefix = '+'; // This is the prefix, you can change it to whatever you want.

// Listener Event: Runs whenever the bot sends a ready event (when it first starts for example)
bot.on('ready', async () => {

    // We can post into the console that the bot launched.
    console.log('- - - - Good Job Desi! Bot is now on. - - - -');

    bot.user.setActivity('Scheduled Shutdown ;(', {
            type: 'LISTENING'
        }) // or 'PLAYING' 'LISTENING' 'STREAMING'
        .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'name'}\n---------------------------------`)) // just console logs it | dont really need if you dont want it
        .catch(console.error)

    bot.user.setStatus('dnd') // Can be 'Online' , 'idle' , 'invisible' or 'dnd' (do not disturb) 

});

// Listener Event: Runs whenever a message is received.
bot.on('message', async message => {

    // Variables - Variables make it easy to call things, since it requires less typing.
    let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    let sender = message.author; // This variable takes the message, and finds who the author is.
    let cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
    let args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.

    // Commands

    // Hello
    if (msg === prefix + 'SUPPORT') { // This checks if msg (the message but in all caps), is the same as the prefix + the command in all caps.

        // Now, let's send a response.
        message.channel.send('You have called for support.'); // This 'sends' the message to the channel the message was in. You can change what is in the message to whatever you want.
        message.author.send('*You have called for support. A staff member will assist you shortly.*')
        message.channel.send('<@&467383766172696577> , ' + message.author + ' has requested for support!')



    }
    if (msg === prefix + 'MEMBERCOUNT') {
        message.channel.send(`Total members: ${message.guild.memberCount}`);
    }



    // Hello
    if (msg === prefix) { // This checks if msg (the message but in all caps), is the same as the prefix + the command in all caps.

        // Now, let's send a response.
        message.channel.send('Theehold! ' + message.author + ' this is the Base Command!'); // This 'sends' the message to the channel the message was in. You can change what is in the message to whatever you want.
    }




    // Hello
    if (msg === prefix + 'HELLO') { // This checks if msg (the message but in all caps), is the same as the prefix + the command in all caps.

        // Now, let's send a response.
        message.channel.send('Hello ' + message.author + ' !'); // This 'sends' the message to the channel the message was in. You can change what is in the message to whatever you want.

    }


    // Help
    if (msg === prefix + 'HELP') { // This checks if msg (the message but in all caps), is the same as the prefix + the command in all caps.

        // Now, let's send a response.
        message.channel.send('Help? No worries! ' + message.author + ' , Check your DMs!');
        message.author.send('```Skyverse Entertainment >> Coded by xDesi with Massive Help from MilaDog >> Prefix >> +\n \n \n Commands and More Information: \n Help - Shows this Menu \n Hello - Say Hello to Blaze Bot! \n *Purge(S)* - Removes a Specific Amount of Messages from a Channel. \n Support - Use this if you need immediate help from a Staff Member at Skyverse. \n Membercount - Counts the total number of players and bots in the server. \n *Announce(S)* - Announces Messages in the #annonucements Channel. \n Userinfo - Get Information about a User. \n \n \n *The Server IP, Website, and Rules can be found in #information. Thanks!* \n *(S) indicates a Staff Role is required in order to use a specific command.*```'); // This 'sends' the message to the channel the message was in. You can change what is in the message to whatever you want.


    }


    // Purge
    if (msg.startsWith(prefix + 'PURGE')) { // This time we have to use startsWith, since we will be adding a number to the end of the command.
        // We have to wrap this in an async since awaits only work in them.
        async function purge() {
            message.delete(); // Let's delete the command message, so it doesn't interfere with the messages we are going to delete.

            // Now, we want to check if the user has the `bot-commander` role, you can change this to whatever you want.
            if (!message.member.roles.find("name", "Staff")) { // This checks to see if they DONT have it, the "!" inverts the true/false
                message.channel.send('You need the \`Staff\` role to use this command.'); // This tells the user in chat that they need the role.
                return; // this returns the code, so the rest doesn't run.
            }

            // We want to check if the argument is a number
            if (isNaN(args[0])) {
                // Sends a message to the channel.
                message.channel.send('Wrong usage. Please use a number less than 100 as your Argument. \n Usage: ' + prefix + 'purge <amount>'); //\n means new line.
                // Cancels out of the script, so the rest doesn't run.
                return;
            }

            const fetched = await message.channel.fetchMessages({
                limit: args[0]
            }); // This grabs the last number(args) of messages in the channel.
            console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting

            // Deleting the messages
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.
        }

        // We want to make sure we call the function whenever the purge command is run.
        purge(); // Make sure this is inside the if(msg.startsWith)

    }




    if (msg.startsWith(prefix + 'USERINFO')) {

        let member = message.mentions.members.first();

        let embed = new Discord.RichEmbed()
            .setAuthor(member.user.tag, member.user.displayAvatarURL)
            .setTitle(`Information on User: ` + member.user.tag)
            .setThumbnail(member.user.displayAvatarURL)
            .setFooter("Given by Skyverse Bot")
            .setTimestamp()
            .setDescription("----------------------------------------------------------")
            .setColor("#0000FF")
            .addField("Full Username: ", `${member.user.username}#${member.user.discriminator}`, true)
            .addField("ID: ", member.user.id, true)
            .addField("Status: ", member.user.presence.status, true)
            .addField("Nickname: ", member.nickname, true)
            .addField(`Bot?`, member.user.bot, false)
            .addField("Created at: ", member.user.createdAt, false);

        message.channel.send({
            embed: embed
        });

    }

    if (msg.startsWith(prefix + 'ANNOUNCE')) {

        if (!message.member.hasPermission("Support Team")) return;

        let announceMessage = args.join(" ");
        if (!announceMessage) return message.channel.send("```Use: +announce <Message>```");

        let announceChannel = message.guild.channels.find(`name`, "announcements");

        let announceEmbed = new Discord.RichEmbed()
            .setColor("#23E5F3")
            .setFooter(`~  ${message.author.username}`)
            .setTimestamp()
            .addField("- - - Announcement - - -", announceMessage);

        announceChannel.send(message.author + ' issued a Announcement - @everyone')
        announceChannel.send(announceEmbed);

    }




    if (msg.startsWith(prefix + 'SAY')) {

        if (!message.member.hasPermission("Support Team")) return;

        let announceMessage = args.join(" ");
        if (!announceMessage) return message.channel.send("```Use: +say <Message>```");

        let announceChannel = message.guild.channels.find(`name`, "general");


        announceChannel.send(announceEmbed);

    }

    if (msg.startsWith(prefix + 'BAN')) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot do that!");

        let bUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if (!bUser) return message.channel.send(`Try **${prefix}ban <User / ID> <Reason>**`);

        let bReason = args.join(" ").slice(22);

        if (bReason < 1) return message.channel.send("Supply a reason.");

        if (bUser.id === message.author.id) return message.channel.send("You cannot ban yourself!");
        if (bUser.highestRole.position >= message.member.highestRole.position) return message.channel.send("You cannot ban someone higher than you!");

        message.channel.send("```User has been banned!```");

        let banEmbed = new Discord.RichEmbed()
            .setAuthor(bot.user.username + `\tBAN`, bot.user.displayAvatarURL)
            .setColor("#711822")
            .setFooter("Skyverse Bot")
            .setTimestamp()
            .addField("Banned User: ", `${bUser}`, true)
            .addField("ID", `${bUser.user.id}`, true)
            .addField("Banned by: ", `<@${message.author.id}>`, false)
            .addField("Banned In: ", message.channel, false)
            .addField("Time of Ban: ", message.createdAt, true)
            .addField("Reason: ", bReason, false);

        let bkickChannel = message.guild.channels.find(`name`, "logs");
        if (!bkickChannel) return message.channel.send("Cannot find #logs channel.");

        message.guild.member(bUser).ban(bReason);
        bkickChannel.send(banEmbed);


    }

    if (msg.startsWith(prefix + 'UNBAN')) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot do that!");

        let ubUser = args[0];
        if (!ubUser) return message.channel.send(`Try **${prefix}unban <User ID> <Reason>**`);

        let ubReason = args.join(" ").slice(22);

        if (ubReason < 1) return message.channel.send("Supply a reason.");

        if (ubUser === message.author.id) return message.channel.send("You cannot unban yourself!");

        message.channel.send("```User has been unbanned!```");

        let unbanEmbed = new Discord.RichEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL)
            .setColor("#711822")
            .setFooter("Skyverse Bot")
            .setTimestamp()
            .setDescription("~Unban~")
            .addField("Unbanned User: ", `${bUser}`)
            .addField("Unbanned by: ", `<@${message.author.id}>`)
            .addField("Time of Ban: ", message.createdAt)
            .addField("Reason: ", bReason);

        let ubkickChannel = message.guild.channels.find(`name`, "logs");
        if (!ubkickChannel) return message.channel.send("Cannot find #logs channel.");

        message.guild.unban(ubUser);
        ubkickChannel.send(unbanEmbed);

    }

    if (msg.startsWith(prefix + 'KICK')) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot do that!");

        let kUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if (!kUser) return message.channel.send(`Try **${prefix}kick <User> <Reason>**`);

        let kReason = args.join(" ").slice(22);

        if (kReason < 1) return message.channel.send("Supply a reason.");

        if (kUser.id === message.author.id) return message.channel.send("You cannot kick yourself!");
        if (kUser.highestRole.position >= message.member.highestRole.position) return message.channel.send("You cannot kick someone higher than you!");

        message.channel.send("```User has been kicked!```");

        let kickEmbed = new Discord.RichEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL)
            .setColor("#711822")
            .setFooter("Skyverse Bot")
            .setTimestamp()
            .setDescription("~Kick~")
            .addField("Kicked User: ", `${kUser}`)
            .addField("Kicked by: ", `<@${message.author.id}>`)
            .addField("Kicked In: ", message.channel)
            .addField("Time of Kick: ", message.createdAt)
            .addField("Reason: ", kReason);

        let kickChannel = message.guild.channels.find(`name`, "logs");
        if (!kickChannel) return message.channel.send("Cannot find #logs channel.");

        message.guild.member(kUser).kick(kReason)
        kickChannel.send(kickEmbed);

    }

    if (msg.startsWith(prefix + 'WARN')) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot do that!.");
        let toWarn = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);

        if (!toWarn) return message.channel.send(`Try **${prefix}warn <User> <Channel> <Reason>**`);

        if (!toWarn.id === message.author.id) return message.channel.send("You cannot warn yourself");
        if (toWarn.highestRole.position >= message.member.highestRole.position) return message.channel.send("You cannot mute someone that is higher / has the same role as you / yourself.");
        if (toWarn.hasPermissions("MANAGE_MESSAGES")) return message.channel.send("Can't warn them");

        let reason = args.join(" ").slice(44);
        let channel = message.mentions.channels.first();

        if (!warns[toWarn.id]) warns[toWarn.id] = {
            warns: 0
        };

        warns[toWarn.id].warns++;

        fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
            if (err) throw (err);
        });

        let warnEmbed = new Discord.RichEmbed()
            .setDescription("----------------------------------------------------------------------------")
            .setAuthor("Warning | " + toWarn.user.tag, toWarn.user.displayAvatarURL)
            .setColor("#fc6400")
            .setFooter(`ID: ${toWarn.id}`)
            .setTimestamp()
            .addField("Warned User: ", toWarn.user.tag, true)
            .addField("Warned By: ", message.author.tag, true)
            .addField("Channel: ", channel, true)
            .addField("Reason: ", reason);

        let warnchannel = message.guild.channels.find(`name`, "logs");
        if (!warnchannel) return message.channel.send("Couldn't find the channel");

        message.channel.send(":thumbsup: **_They have been warned!_**");
        warnchannel.send(warnEmbed);

        let pmEmbed = new Discord.RichEmbed()
            .setAuthor(message.guild.name, bot.user.displayAvatarURL)
            .setTimestamp()
            .setFooter("Skyverse Bot")
            .addField("You have been warned for: ", `**${reason}**`);

        message.mentions.users.first().send(pmEmbed);

    }

    if (msg.startsWith(prefix + 'MUTE')) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot do that!");

        let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if (!toMute) return message.channel.send(`Try **${prefix}mute <User / ID> <Reason> <Length>**`);

        if (toMute.id === message.author.id) return message.channel.send("You cannot mute yourself.");
        if (toMute.highestRole.position >= message.member.highestRole.position) return message.channel.send("You cannot mute someone that is higher / has the same role as you.");

        let role = message.guild.roles.find(r => r.name === "Network Mute");
        if (!role) {
            try {
                role = await message.guild.createRole({
                    name: "Network Mute",
                    color: "#000000",
                    permissions: []
                });

                message.guild.channel.forEach(async (channel, id) => {
                    await channel.overwritePermissions(role, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SPEAK: false
                    });
                });
            } catch (e) {
                console.log(e.stack);
            }
        }

        if (toMute.roles.has(role.id)) return message.channel.send("This user is already muted!");

        let mutetime = args[1];
        if (!mutetime) return message.channel.send("You didn't supply a length.");

        await toMute.addRole(role)
            .then(message.channel.send(`${toMute} has been muted for ${ms(ms(mutetime))}`));

        setTimeout(function() {
            toMute.removeRole(role.id);
            message.channel.send(`${toMute} has been unmuted`);

        }, ms(mutetime));

    }

    if (msg.startsWith(prefix + 'UNMUTE')) {

        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You cannot do that!.");

        let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
        if (!toMute) return message.channel.send(`Try **${prefix}unmute <User>**`);

        let role = message.guild.roles.find(r => r.name === "Network Mute");

        if (!role || !toMute.roles.has(role.id)) return message.channel.send("This user is not muted!");

        await toMute.removeRole(role);

        delete bot.mutes[toMute.id];

        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
            if (err) throw err;
            console.log(`I have unmuted ${toMute.user.tag}.`);
        });

    }

});


bot.login('NDY4MTEwMjI1OTQxOTg3MzI4.XKbhww.2hXTQT07JBsFR4k7jjccotKxHl8');
