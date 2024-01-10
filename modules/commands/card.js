module.exports.config = {
  name: "card",
  version: "69",
  hasPermssion: 0,
  credits: `Grey big otin`,
  description: "إنشاء شعار كودم",
  commandCategory: "edit-img",
  usages: "<text>",
  cooldowns: 2,
};
module.exports.run = async function ({ api, event, args, Users }) {
  let { senderID, threadID, messageID } = event;
  const request = require('request');
  const fs = require("fs-extra");
  const axios = require("axios");
  let pathImg = __dirname + `/cache/${event.threadID}_${event.senderID}.jpg`;
  let text = args.join(" ");
  if (!text) return api.sendMessage(`صيغة خاطئة\nيستخدم: ${this.config.name} text`, event.threadID, event.messageID);
  let getWanted = (
    await axios.get(`https://canvastest.heckerman06.repl.co/burat?name=${text}`, {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathImg, Buffer.from(getWanted, "utf-8"));
  return api.sendMessage(
    { attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};