module.exports.config = {
  name: "ميتا",
  version: "1.0",
  hasPermssion: 0,
  credits: "JARiF | omar",
  description: "قرائه محتويات الصورة",
  commandCategory: "صورة",
  usages: "[ا]",
  cooldowns: 5,
};
 
module.exports.run = async function({ api, event, args, models, Users, Threads, Currencies, permssion }) {
  try {
    const axios = require('axios');
    const as = "من هاذا";
    const khankirChele = encodeURIComponent(as);
    let imageUrl;
 
    if (event.type === "message_reply") {
      if (["photo", "sticker"].includes(event.messageReply.attachments?.[0]?.type)) {
        imageUrl = event.messageReply.attachments[0].url;
      } else {
        return api.sendMessage({ body: "تحتاج ترد عا صوره" }, event.threadID);
      }
    } else if (args[0]?.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/g)) {
      imageUrl = args[0];
    } else if (!khankirChele) {
      return api.sendMessage({ body: "يـرجـى الـرد عـلـى الـصـورة🖼" }, event.threadID);
    }
 
    if (imageUrl) {
      const response = await axios.get(`https://www.api.vyturex.com/llama?prompt=${khankirChele}&imageUrl=${encodeURIComponent(imageUrl)}`);
      const description = response.data;
 
      const translationResponsePlat = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ar&dt=t&q=${description}`);
      const translatedTextPlat = translationResponsePlat.data[0][0][0];
 
      await api.sendMessage(`📄مـحـتـوى الـصـورة🐦‍⬛🥷🏻 \n\n${translatedTextPlat}`, event.threadID);
    } else if (khankirChele) {
      const response = await axios.get(`https://www.api.vyturex.com/llama?prompt=${encodeURIComponent(khankirChele)}`);
      const prompt = response.data;
 
      await api.sendMessage(`يـرجـى الـرد عـلـى الـصـورة🖼`, event.threadID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage(`خطأ | تعطل`, event.threadID);
  }
};
 