const request = require('request');

const schedule = require('node-schedule');
const Discord = require('discord.js');
const client = new Discord.Client();
const {prefix, token} = require('./config.json');

var log = log;
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

var j = schedule.scheduleJob('* * * * *', function(){
 

});

client.on('message', message => {
    if(message.author.bot) return;
    var logChannel = client.channels.get("your_log_channel");
    var currentdate = new Date();
    var datetime = (currentdate.getMonth()+1)  + "/"
                + currentdate.getDate() + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();

    if(!message.content.startsWith(`${prefix}`)){

    logChannel.send(" - " + message.member.user.tag + ": " + '"' +  message.content + '"' + "\n" + datetime) ;
    }
    //log chunk end; kick/ban chunk begin.

    if (!message.content.startsWith(prefix) || message.author.bot) return;

      const args = message.content.slice(prefix.length).split(/ +/);
      const command = args.shift().toLowerCase();
    if (command === "kick") {
      const member = message.mentions.members.first()
      if(message.member.hasPermission(['BAN_MEMBERS', 'KICK_MEMBERS'])){
        if (!member) {
          return message.reply(`This user is as real as the moon landings!`)
        }
        if (!member.kickable) {
          return message.reply(`I can't kick this user. Sorry!`)
        }
        if(member){
          const reason = args.join(" ").slice(22);
          console.log(reason);
          member.kick(reason).then(() => message.channel.send(message.author+" kicked: "+member+ " for "+'"'+reason+'"'+" :airplane_departure: "+":flag_kp:"));
          logChannel.send("** "+message.author.username+" kicked: "+member+'"'+reason+'"'+"\n"+datetime+"**")
        }
      }
      if(!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])){
        return message.reply("You have an inferior role to do this, peasant.")
      }
    }
    if (command === "ban") {
      const member = message.mentions.members.first()
      if(message.member.hasPermission(['BAN_MEMBERS', 'KICK_MEMBERS'])){
        if (!member) {
          return message.reply(`This user is as real as the moon landings!`)
        }
        if (!member.bannable) {
          return message.reply(`I can't kick this user. Sorry!`)
        }
        if(member){
          const reason = args.join(" ").slice(22);
          console.log(reason);
          member.kick(reason).then(() => message.channel.send(message.author+" banned "+member+ " for "+'"'+reason+'"'+" :airplane_departure: "+":flag_kp:"));
          logChannel.send("** "+message.author.username+" banned "+member+'"'+reason+'"'+"\n"+datetime+"**")
        }
      }
      if(!message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])){
        return message.reply("You have an inferior role to do this, peasant.")
      }
    }
    if(command === "meme"){
      request('https://meme-api.herokuapp.com/gimme', function(error, response, body){
        if(!error){
          var parsedData = JSON.parse(body);
          var cursedImg = parsedData["url"];
          message.channel.send(cursedImg);
        }
      })

    };
    if(command === "cursed"){
      request('https://meme-api.herokuapp.com/gimme/cursedimages', function(error, response, body){
        if(!error){
          var parsedData = JSON.parse(body);
          var cursedImg = parsedData["url"];
          message.channel.send(cursedImg);
        }
      })

    }
    else if(command === "amazing"){
      request('https://meme-api.herokuapp.com/gimme/EarthPorn', function(error, response, body){
        if(!error){
          var parsedData = JSON.parse(body);
          var EarthPorn = parsedData["url"];
          var title = parsedData["title"];
          message.channel.send("*" + title + "* " + "\n" +  EarthPorn);
        }
      })

    }
    else if(command === "og"){
      request('https://meme-api.herokuapp.com/gimme/OldSchoolCool', function(error, response, body){
        if(!error){
          var parsedData = JSON.parse(body);
          var OldSchoolCool = parsedData["url"];
          var title = parsedData["title"];
          message.channel.send("*" + title + "* " + "\n" +  OldSchoolCool);
        }
      })

    }
    else if(command === "history"){
      request('https://meme-api.herokuapp.com/gimme/HistoryPorn', function(error, response, body){
        if(!error){
          var parsedData = JSON.parse(body);
          var ColorizedHistory = parsedData["url"];
          var title = parsedData["title"];
          message.channel.send("*" + title + "* " + "\n" + ColorizedHistory);
        }
      })

    }
    else if(command === "wholesome"){
      request('https://meme-api.herokuapp.com/gimme/wholesomememes', function(error, response, body){
        if(!error){
          var parsedData = JSON.parse(body);
          var wholesomememes = parsedData["url"];
          var title = parsedData["title"];
          message.channel.send("*" + title + "* " + "\n" + wholesomememes);
        }
      })

    }
  })



client.login(token)
