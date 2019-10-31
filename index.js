// require the discord.js module
const fs = require('fs');
const Discord = require('discord.js');
const request = require('request');
const { prefix, token } = require('./config.json');
const rp = require('request-promise');

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
var imageArray = [];
var ranImage;
var today = new Date();
let time;
let timeSet = '18:35';
setInterval(function() {
	today = new Date();
	time = today.getHours() + ':' + today.getMinutes();
	console.log(time);
	return time;
}, 30000);

setInterval(function() {
	if (time == timeSet) {
		rp('https://www.reddit.com/r/memes/top.json?limit=100')
			.then((body) => {
				var parsedData = JSON.parse(body);
				parsedData.data.children.forEach((imageUrl) => {
					var imageCreator = imageUrl.data.url;
					imageArray.push(imageCreator);
				});
			})
			.catch((err) => {
				console.log('Error!', err);
			});
		rp('https://www.reddit.com/r/memes/rising.json?limit=100')
			.then((body) => {
				var parsedData = JSON.parse(body);
				parsedData.data.children.forEach((imageUrl) => {
					var imageCreator = imageUrl.data.url;
					imageArray.push(imageCreator);
				});
			})
			.catch((err) => {
				console.log('Error!', err);
			});
		rp('https://www.reddit.com/r/memes/new.json?limit=100')
			.then((body) => {
				var parsedData = JSON.parse(body);
				parsedData.data.children.forEach((imageUrl) => {
					var imageCreator = imageUrl.data.url;
					imageArray.push(imageCreator);
				});
			})
			.catch((err) => {
				console.log('Error!', err);
			});
		rp('https://www.reddit.com/r/dankmemes/rising.json?limit=100')
			.then((body) => {
				var parsedData = JSON.parse(body);
				parsedData.data.children.forEach((imageUrl) => {
					var imageCreator = imageUrl.data.url;
					imageArray.push(imageCreator);
				});
			})
			.catch((err) => {
				console.log('Error!', err);
			});
		rp('https://www.reddit.com/r/dankmemes/top.json?limit=100')
			.then((body) => {
				var parsedData = JSON.parse(body);
				parsedData.data.children.forEach((imageUrl) => {
					var imageCreator = imageUrl.data.url;
					imageArray.push(imageCreator);
				});
			})
			.catch((err) => {
				console.log('Error!', err);
			});
		rp('https://www.reddit.com/r/dankmemes/new.json?limit=100')
			.then((body) => {
				var parsedData = JSON.parse(body);
				parsedData.data.children.forEach((imageUrl) => {
					var imageCreator = imageUrl.data.url;
					imageArray.push(imageCreator);
				});
			})
			.catch((err) => {
				console.log('Error!', err);
			});
		rp('https://www.reddit.com/r/wholesomememes/rising.json?limit=100')
			.then((body) => {
				var parsedData = JSON.parse(body);
				parsedData.data.children.forEach((imageUrl) => {
					var imageCreator = imageUrl.data.url;
					imageArray.push(imageCreator);
				});
			})
			.catch((err) => {
				console.log('Error!', err);
			});
		console.log('Number of Memes: ' + imageArray.length);
	}
}, 30000);

function trigger_func() {
	ranImage = imageArray;
}
setTimeout(function() {
	trigger_func();
}, 10000);

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
	client.user.setActivity('Joe', { type: 'PLAYING' });
});

client.on('message', (message) => {
	if (message.author.bot) return;
	//server log
	var logChannel = client.channels.get('567838697870065664');
	var currentdate = new Date();
	var datetime =
		currentdate.getMonth() +
		1 +
		'/' +
		currentdate.getDate() +
		'/' +
		currentdate.getFullYear() +
		' @ ' +
		currentdate.getHours() +
		':' +
		currentdate.getMinutes() +
		':' +
		currentdate.getSeconds();

	if (!message.content.startsWith(`${prefix}`)) {
		logChannel.send(' - ' + message.member.user.tag + ': ' + '"' + message.content + '"' + '\n' + datetime);
	}
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'meme') {
		if (time == timeSet) {
			message.channel.send('Refreshing memes, try again in one minute!');
			return;
		} else {
			var item = ranImage[Math.floor(Math.random() * ranImage.length)];
			message.channel.send(item);
		}
	} else if (command === 'amazing') {
		request('https://meme-api.herokuapp.com/gimme/EarthPorn', function(error, response, body) {
			if (!error) {
				var parsedData = JSON.parse(body);
				var EarthPorn = parsedData['url'];
				var title = parsedData['title'];
				message.channel.send('*' + title + '* ' + '\n' + EarthPorn);
			}
		});
	}

	//Kick and Ban Chunk
	if (command === 'kick') {
		const member = message.mentions.members.first();
		if (message.member.hasPermission([ 'BAN_MEMBERS', 'KICK_MEMBERS' ])) {
			if (!member) {
				return message.reply(`This user is as real as the moon landings!`);
			}
			if (!member.kickable) {
				return message.reply(`I can't kick this user. Sorry!`);
			}
			if (member) {
				const reason = args.join(' ').slice(22);
				console.log(reason);
				member
					.kick(reason)
					.then(() =>
						message.channel.send(
							message.author +
								' kicked: ' +
								member +
								' for ' +
								'"' +
								reason +
								'"' +
								' :airplane_departure: ' +
								':flag_kp:'
						)
					);
				logChannel.send(
					'** ' + message.author.username + ' kicked: ' + member + '"' + reason + '"' + '\n' + datetime + '**'
				);
			}
		}
		if (!message.member.hasPermission([ 'KICK_MEMBERS', 'BAN_MEMBERS' ])) {
			return message.reply('You have an inferior role to do this, peasant.');
		}
	} else if (command === 'ban') {
		const member = message.mentions.members.first();
		if (message.member.hasPermission([ 'BAN_MEMBERS', 'KICK_MEMBERS' ])) {
			if (!member) {
				return message.reply(`This user is as real as the moon landings!`);
			}
			if (!member.bannable) {
				return message.reply(`I can't kick this user. Sorry!`);
			}
			if (member) {
				const reason = args.join(' ').slice(22);
				console.log(reason);
				member
					.kick(reason)
					.then(() =>
						message.channel.send(
							message.author +
								' banned ' +
								member +
								' for ' +
								'"' +
								reason +
								'"' +
								' :airplane_departure: ' +
								':flag_kp:'
						)
					);
				logChannel.send(
					'** ' + message.author.username + ' banned ' + member + '"' + reason + '"' + '\n' + datetime + '**'
				);
			}
		}

		if (!message.member.hasPermission([ 'KICK_MEMBERS', 'BAN_MEMBERS' ])) {
			return message.reply('You have an inferior role to do this, peasant.');
		}
	} else if (command === `server`) {
		//aditional commands
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	} else if (command === `user-info`) {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	} else if (command === 'goodnight') {
		message.channel.send(`Goodnight, ${message.author.username}\n `);
	} else if (command === 'loveyou') {
		message.channel.send(`Love you too daddy ${message.author.username}\n `);
	} else if (command === 'purge') {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply("that doesn't seem to be a valid number.");
		} else if (amount <= 1 || amount > 100) {
			return message.reply('fool! Between 1-99!');
		}

		message.channel.bulkDelete(amount, true).catch((err) => {
			console.error(err);
			message.channel.send('This purge was unsucessful, unlike other times...');
		});
	}
});
// login to Discord with your app's token
client.login(process.env.TOKEN);
