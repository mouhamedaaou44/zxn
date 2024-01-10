const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');


  module.exports.config = {
    name: "خلفيات",
    version: "1.0.1",
    hasPermission: 0,
    credits: "عمر",
    description: "بحث خلفيات مثال .خلفيات انيا ",
    commandCategory: "صور",
    usages: " ا",
    cooldowns: 10,
  };

module.exports.run = async function ({ api, event, args }) {
  if (args.length < 1) {
    api.sendMessage('ااكتب شي عزيزي', event.threadID, event.messageID);
    return;
  }

  const keyword = args[0];
  let amount = args[1] || 9;

  amount = parseInt(amount);
  if (isNaN(amount) || amount <= 0) {
    api.sendMessage('كلمه وحده لو سمحت.', event.threadID, event.messageID);
    return;
  }

  try {
    await fs.ensureDir('cache');

    const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(keyword)}`);
    const enc = translationResponse.data[0][0][0];
    
    const response = await axios.get(`https://antr4x.onrender.com/get/searchwallpaper?keyword=${enc}`);

    if (response.data.status && response.data.img.length > 0) {
      amount = Math.min(amount, response.data.img.length);

      const imgData = [];
      for (let i = 0; i < amount; i++) {
        const image = response.data.img[i];
        const imageName = `wallpaper_${i + 1}.jpg`;
        const imagePath = path.join('cache', imageName);

        try {
          const imageResponse = await axios.get(image, { responseType: 'arraybuffer' });
          await fs.writeFile(imagePath, Buffer.from(imageResponse.data, 'binary'));
          imgData.push(imagePath);
        } catch (error) {
          console.error("Error downloading image:", error);
          api.sendMessage('مالقيت شي', event.threadID, event.messageID);
          return;
        }
      }

      api.sendMessage({
        attachment: imgData.map(imgPath => fs.createReadStream(imgPath)),
        body: `9 خلفيات لـ '${keyword}' 🌟`,
      }, event.threadID, (err) => {
        if (err) console.error("Error sending images:", err);

        imgData.forEach(imgPath => {
          fs.unlinkSync(imgPath);
        });
      });
    } else {
      api.sendMessage('مالقيت شي.', event.threadID, event.messageID);
    }
  } catch (error) {
    console.error('Error fetching wallpaper images:', error);
    api.sendMessage('اكتب كلمه وحده.', event.threadID, event.messageID);
  }
};
