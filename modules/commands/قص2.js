module.exports.config = {
  name: 'قص',
  version: '1.1.1',
  hasPermssion: 0,
  credits: 'ǺᎩᎧᏬᏰ',
  description: 'قص خلفية صورتك',
  commandCategory: 'Tools',
  usages: 'الرد على الصور أو صور URL',
  cooldowns: 2,
  dependencies: {
       'form-data': '',
       'image-downloader': ''
    }
};

const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs-extra');
const path = require('path');
const {image} = require('image-downloader');
module.exports.run = async function({
    api, event, args
}){
    try {
        if (event.type !== "message_reply") return api.sendMessage("🖼️=== [ إزٍآلَــةّ آلَـــخِــلَـفُـيَـةّ ] ===🖼️\n━━━━━━━━━━━━━━━                    [⚜️]➜ هـاهـي صـورتـك اتـمـنـى ان تـعـجـبـك😹", event.threadID, event.messageID);
        if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("يـرجـى الـرد عـلـى الـصـورة ", event.threadID, event.messageID);
        if (event.messageReply.attachments[0].type != "photo") return api.sendMessage("هـذه لـيـسـت صـورة ", event.threadID, event.messageID);

        const content = (event.type == "message_reply") ? event.messageReply.attachments[0].url : args.join(" ");
        const Naughtyapis = ["2scVxQKazEt1k1FU4sWx5WoK","1VfYkFvnpNpyEXvYF76cf9QR","KFFWt6hse42b2F52RdGZqTat","MuWZWautpMeLD43EDLPsQjtM","tseAYJzm2LhdhME6rFvvaKV7","zxZx1ApP56FSZ7cQdgT9P59e","rE1S7P2kKa4aBLKxcdmuv5Fb","cj6Q3zxeP8caZ52VrXZE34KR","pc3GGQaeeJwUWA2vhtiCf2zE"]
        const inputPath = path.resolve(__dirname, 'cache', `photo.png`);
         await image({
        url: content, dest: inputPath
    });
        const formData = new FormData();
        formData.append('size', 'auto');
        formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));
        axios({
            method: 'post',
            url: 'https://api.remove.bg/v1.0/removebg',
            data: formData,
            responseType: 'arraybuffer',
            headers: {
                ...formData.getHeaders(),
                'X-Api-Key': Naughtyapis[Math.floor(Math.random() * Naughtyapis.length)],
            },
            encoding: null
        })
            .then((response) => {
                if (response.status != 200) return console.error('Error:', response.status, response.statusText);
                fs.writeFileSync(inputPath, response.data);
                return api.sendMessage({ attachment: fs.createReadStream(inputPath) }, event.threadID, () => fs.unlinkSync(inputPath));
            })
            .catch((error) => {
                return console.error('فشل الخادم في البقاء معنا وسيتم إصلاحه قريبًا ', error);
            });
     } catch (e) {
        console.log(e)
        return api.sendMessage(`تغيير كل شيء ليس جيدًا `, event.threadID, event.messageID);
  }
};