module.exports.config = {
	name: "موافقة",
	version: "1.0.2",
	hasPermssion: 2,
	credits: "ǺᎩᎧᏬᏰ",
	description: "",
	commandCategory: "Admin",
    cooldowns: 5
};


const dataPath = __dirname + "/cache/approvedThreads.json";
const dataPending = __dirname + "/cache/pendingdThreads.json";
const fs = require("fs");

module.exports.onLoad = () => {
	if (!fs.existsSync(dataPath)) fs.writeFileSync(dataPath, JSON.stringify([]));
  if (!fs.existsSync(dataPending)) fs.writeFileSync(dataPending, JSON.stringify([]));
}
module.exports.handleReply = async function ({ event, api, Currencies, handleReply, Users, args }) {
    if (handleReply.author != event.senderID) return;
    const { body, threadID, messageID, senderID } = event;
    const { type } = handleReply;
    let data = JSON.parse(fs.readFileSync(dataPath));
    let dataP = JSON.parse(fs.readFileSync(dataPending));
    let idBox = (args[0]) ? args[0] : threadID;
  switch (type) {
        case "انتظار": {
          switch (body) {
                case `إ`: {
   			data.push(idBox);
   			fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
   			api.sendMessage(`» تمت الموافقة على المجموعة بنجاح✅🥷🏻:\n${idBox}`, threadID, () => {
          dataP.splice(dataP.indexOf(idBox), 1);
    		fs.writeFileSync(dataPending, JSON.stringify(dataP, null, 2));
    	}, messageID)
        }
        }
      }
    }
  }
module.exports.run = async ({ event, api, args, Threads, handleReply, Users }) => {
	const { threadID, messageID, senderID } = event;
	let data = JSON.parse(fs.readFileSync(dataPath));
  let dataP = JSON.parse(fs.readFileSync(dataPending));
  let msg = "";
  var lydo = args.splice(2).join(" ");
  let idBox = (args[0]) ? args[0] : threadID;
        if (args[0] == "قائمة" || args[0] == "ق") {
    	msg = `=====「 GC THAT HAD BEEN APPROVED: ${data.length} 」 ====`;
    	let count = 0;
    	for (e of data) {
        let threadInfo = await api.getThreadInfo(e);
          let threadName = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(e);
    		msg += `\n〘${count+=1}〙» ${threadName}\n${e}`;
    	}
    	api.sendMessage(msg, threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "a",
        })
    }, messageID);
        }
     else if (args[0] == "pending" || args[0] == "p") {
    	msg = `=====「 مجموعات تحتاج إلى الموافقة: ${dataP.length} 」 ====`;
    	let count = 0;
    	for (e of dataP) {
        let threadInfo = await api.getThreadInfo(e);
          let threadName = threadInfo.threadName ? threadInfo.threadName : await Users.getNameUser(e);
    		msg += `\n〘${count+=1}〙» ${threadName}\n${e}`;
    	}
    	api.sendMessage(msg, threadID, (error, info) => {
        global.client.handleReply.push({
            name: this.config.name,
            messageID: info.messageID,
            author: event.senderID,
            type: "pending",
        })
    }, messageID);
     }
       else if (args[0] == "مساعدة" || args[0] == "م") {
         const tst = (await Threads.getData(String(event.threadID))).data || {};
  const pb = (tst.hasOwnProperty("PREFIX")) ? tst.PREFIX : global.config.PREFIX;
  const nmdl = this.config.name
  const cre = this.config.credits
        return api.sendMessage(`=====「 APPROVE 」=====\n\n${pb}${nmdl} l/list => انظر قائمة الصناديق المعتمدة\n\n${pb}${nmdl} p/قيد الانتظار => راجع قائمة الصناديق غير المعتمدة\n\n${pb}${nmdl} d/حذف => مع معرف لإزالته من قائمة الروبوتات المستخدمة\n\n${pb}${nmdl} => قم بإرفاق معرف لتصفح هذا المربع\n\n⇒ ${cre} ⇐`, threadID, messageID);
       }
      
    else if (args[0] == "حذف" || args[0] == "ح") {
    	idBox = (args[1]) ? args[1] : event.threadID;
      if (isNaN(parseInt(idBox))) return api.sendMessage("[ خـطـأ ] ليس رقما", threadID, messageID);
    	if (!data.includes(idBox)) return api.sendMessage("[ خـطـأ ] لم تتم الموافقة على مجموعتك!", threadID, messageID);
      api.sendMessage(`[ OK ] تمت إزالة مجموعتك من قائمة التصفح من قبل المشرف للسبب: ${lydo}`, idBox);
    	api.sendMessage(`[ OK ] تمت إزالة مجموعتك من قائمة الربوت المسموح بها`, threadID, () => {
    		data.splice(data.indexOf(idBox), 1);
    		fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    	}, messageID)
    }
    else if (isNaN(parseInt(idBox))) api.sendMessage("[ خـطـأ ] المعرف الذي أدخلته غير صالح", threadID, messageID);
    else if (data.includes(idBox)) api.sendMessage(`[ - ] ID ${idBox} pre-approved!`, threadID, messageID);
   	else api.sendMessage("[ OK ] تمت الموافقة على مجموعتك من قبل المشرف✅🥷🏻", idBox, (error, info) => {
   		api.changeNickname(` 『 ${global.config.PREFIX} 』 ☞ ${(!global.config.BOTNAME) ? "" : global.config.BOTNAME}`, idBox, global.data.botID);
      const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
   let admID = "100033556746363";    
  
      api.getUserInfo(parseInt(admID), (err, data) => {
      if(err){ return console.log(err)}
     var obj = Object.keys(data);
    var firstname = data[obj].name.replace("@", "");  
      
      axios.get('https://api.satou-chan.xyz/api/endpoint/happy').then(res => {
	let ext = res.data.url.substring(res.data.url.lastIndexOf(".") + 1);
	let callback = function () {
      api.sendMessage({body: `❒❒ BOT متصل الآن ❒❒\n=====================\n⚠️يُحظر تمامًا إرسال البريد العشوائي إلى الروبوت، إذا كنت تريد إرسال بريد عشوائي، فاقبل العواقب!!⚠️\n=====================\n➪ BOT: ${global.config.BOTNAME}\n➪ Prefix: ${global.config.PREFIX}\n➪ Users: ${global.data.allUserID.length}\n➪ Groups: ${global.data.allThreadID.length}\n=====================\n[]---------------------------------------[]\nUse '${global.config.PREFIX}مساعدة' لعرض الأوامر المتوفرة!\n[]---------------------------------------[]\n⌨ مصنوع بواسطة: ${firstname}\n`, mentions: [{
                           tag: firstname,
                           id: admID,
                           fromIndex: 0,
                 }],
						attachment: fs.createReadStream(__dirname + `/cache/duyet.${ext}`)
					}, idBox,() => fs.unlinkSync(__dirname + `/cache/duyet.${ext}`));
				};
				request(res.data.url).pipe(fs.createWriteStream(__dirname + `/cache/duyet.${ext}`)).on("close", callback);
			}) 
      })
   		if (error) return api.sendMessage("[ خـطـأ ] حدث خطأ ما، تأكد من صحة المعرف الذي أدخلته ومن وجود الروبوت في الصندوق!", threadID, messageID);
   		else {
   			data.push(idBox);
   			fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
   			api.sendMessage(`[ OK ] تمت الموافقة على الصندوق بنجاح✅🥷🏻:\n${idBox}`, threadID, () => {
          dataP.splice(dataP.indexOf(idBox), 1);
    		fs.writeFileSync(dataPending, JSON.stringify(dataP, null, 2));
    	}, messageID)
        }
   	});
              }