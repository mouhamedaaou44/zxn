module.exports.config = {
  name: "المطور",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ǺᎩᎧᏬᏰ",
  description: "تحقق من معلومات مسؤول البوت.",
  commandCategory: "Information adminbot",
  usages: "ad",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
  var link = [
"https://i.imgur.com/1oZ60Hu.jpeg",
  //Replace the image link here, remember to pay attention to the " and the , between the links
    ];
  var callback = () => api.sendMessage({body:`🔰󰟰مـعـــــلومـــات الـمــالك󰟰🔰

\📝ُالإســـم: Ǻ Ꭹ Ꭷ Ꮼ Ᏸ

\󰟥العـــــــمر : 18 سنة

\ُ🌍ُالبــــــــلـد : الــجــــزائــر 🇩🇿

\󰣐الــــولايــــــــة: مـــيـلــة 

\󰂆رابط الملف شخصي :https://www.facebook.com/profile.php?id=100033556746363/

\󰟪الــتـيـلـيجــرام: t.me/ayoubzx🐉🌀


\⏬﷽★☬قُآلََ رَبًيَ لَِمًآ حًـشُرتٌنِيَ أعٌمًى وٌقُدٍ کُْنِتٌُ بًصّيَرآ قُآلَ کَْذَِلَِکَْ أتٌتٌکْ آيَآتٌنِآ فُنِسِيَتٌهّآ وٌکَْذَِلَِـك آلَيَـوٌمً تٌُنِـسِى☬★﷽⏬


\️╭ 𝒇𝒂𝒄𝒆𝒃𝒐𝒐𝒌 ╮
│┈╭──┐│
│┈│┌─┘│
│┌┘└─┐│
│└┐┌─┘│
│┈││┈┈│
│┈└┘┈┈│
╰─────╯`,attachment: fs.createReadStream(__dirname + "/cache/1.jpeg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpeg")); 
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.jpeg")).on("close",() => callback());
   };