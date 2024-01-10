module.exports.config = {
  name: "حول",
  version: "1.0.",
  hasPermssion: 0,
  credits: "ǺᎩᎧᏬᏰ",
  description: "تحويل الصورة الى انمي",
  commandCategory: "categ",
  usages: "< reply image >",
  cooldowns: 2,
};

module.exports.run = async ({ api, event, args }) => {
  const axios = require('axios');
  const fs = require('fs-extra');
  let pathie = __dirname + `/cache/animefy.jpg`;
  const { threadID, messageID } = event;
  
  var james = event.messageReply.attachments[0].url || args.join(" ");
  
 try {
    const lim = await axios.get(`https://animeify.shinoyama.repl.co/convert-to-anime?imageUrl=${encodeURIComponent(james)}`);
     const image = lim.data.urls[1];
     
     const img = (await axios.get(`https://www.drawever.com${image}`, { responseType: "arraybuffer"})).data;
     
     fs.writeFileSync(pathie, Buffer.from(img, 'utf-8'));
     
     api.sendMessage({
       body: "ها هي صورتك ",
       attachment: fs.createReadStream(pathie)
     }, threadID, () => fs.unlinkSync(pathie), messageID);
     
     
       
  } catch (e) {
  api.sendMessage(`حدث خطأ:\n\n${e}`, threadID, messageID);
  };
  
};