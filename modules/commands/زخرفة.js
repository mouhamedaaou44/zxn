const axios = require("axios");

async function translate(text, sourceLang, targetLang) {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await axios.get(url);
    const translation = res.data[0].map((item) => item[0]).join("");
    return translation;
  }

module.exports.config = {
  name: "تعرف",
  version: "3.8",
  permission: 0,
  credits: "ǺᎩᎧᏬᏰ",
  description: "",
  commandCategory: "no ",
  usage: "",
  cooldown: 3,
};

async function convertVoiceToText(audioUrl, api, event) {
  try {
    api.sendMessage("🔊 | جاري تجهيز الصوت...", event.threadID);

    const response = await axios.get(`https://hazeyy-apis-combine.kyrinwu.repl.co/api/try/voice2text?url=${encodeURIComponent(audioUrl)}`);
    const text = response.data.transcription;

    if (text) {
      const formattedText = await translate(text, "en", "ar");
      api.sendMessage(`الصوت...\n\n ${formattedText}`, event.threadID, event.messageID);
    } else {
      api.sendMessage("خطاء قي تحويل الصوت...", event.threadID, event.messageID);
    }
  } catch (error) {

    api.sendMessage("🔴 خطاء في تحويل الصوت...:", event.threadID, event.messageID);
  }
}

async function convertImageToCaption(imageURL, api, event) {
  try {
    api.sendMessage("📷 | جاري تجهيز الصور...", event.threadID);

    const response = await axios.get(`https://hazeyy-apis-combine.kyrinwu.repl.co/api/image2text/new?image=${encodeURIComponent(imageURL)}`);
    const caption = response.data.caption.generated_text;

    if (caption) {
      const formattedCaption = await translate(caption, "en", "ar");
      api.sendMessage(`الصور المطلوبة...\n\n ${formattedCaption}`, event.threadID, event.messageID);
    } else {
      api.sendMessage("خطأ في تحويل الصور.", event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage("خطاء في جلب الصور", event.threadID, event.messageID);
  }
}

module.exports.handleEvent = async function ({ api, event }) {
if (!(event.body.indexOf(".تعرف") === 0 || event.body.indexOf("تعرف") === 0)) return;
     const args = event.body.split(/\s+/);;
    args.shift();

if (event.type === "message_reply") {
    if (event.messageReply.attachments[0]) {
      const attachment = event.messageReply.attachments[0];

      if (attachment.type === "audio") {
        const audioUrl = attachment.url;
        convertVoiceToText(audioUrl, api, event);
        return;
      } else if (attachment.type === "photo") {
        const imageURL = attachment.url;
        convertImageToCaption(imageURL, api, event);
        return;
      }
    }
  }
  const txtp = event.body;
  const inputText =  await translate(txtp, "ar", "en");
  api.sendMessage("🗨️ | انتظر قليلا...", event.threadID,event.messageID);

  try {
    const response = await axios.get(`https://hazeyy-apis-combine.kyrinwu.repl.co/api/llamav3/chat?prompt=${inputText}`);
    if (response.status === 200) {
      const generatedText = response.data.response;
       const resptxt = await translate(generatedText, "en", "ar");
      api.sendMessage(`${resptxt}`, event.threadID,event.messageID);
    } else {
      console.error("🔴 حدث خطاء ما𝖨.");
    }
  } catch (error) {
    console.error("🔴 الخطاء:", error);
  }
}



module.exports.run = async function ({ api, event }) {};