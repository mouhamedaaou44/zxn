const axios = require("axios");
const fs = require("fs");

const history = {};
let isFontEnabled = true;

module.exports.config = {
  name: "ذكاء",
  version: "3.1",
  hasPermssion: 0,
  credits: "ǺᎩᎧᏬᏰ",
  description: "(صديقك نينو لتخيل صور وتحويل صوت الى نص و اجابة على اسئلتك)",
  commandCategory: "𝚗𝚘 𝚙𝚛𝚎𝚏𝚒𝚡",
  usages: "( )",
  cooldowns: 3,
};

async function handleNyxImageCommand(api, event) {
  const args = event.body.split(/\s+/);
  args.shift();
  const tzt = args.join(' ').split('-').map(item => item.trim());
  const txt = tzt[0];
  const txt2 = tzt.slice(1).join(' ');

  if (!txt || !txt2) {
    return api.sendMessage("🥷🏻🐦‍⬛ مرحبا للاستخدام ⓝⓘⓝⓞ 𝙰𝙸 مع مـوجـة .\n\nيستخدم: ذكاء [ الـكـلـمـة ] - [ نـمـوذج ] بين  1-20.", event.threadID, event.messageID);
  }

  api.sendMessage("🗨️ | ⓝⓘⓝⓞ 𝙰𝙸 مـطـالـبـة تـولـيـد الـرجـاء الانـتـظـار🔁ُ", event.threadID, event.messageID);

  try {
    const enctxt = encodeURI(txt);
    
    const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${enctxt}`);
  const translation = translationResponse.data[0][0][0];

    const url = `https://hazeyy-api-img-prompt.kyrinwu.repl.co/api/img/prompt?prompt=${translation}&model=${txt2}`;
    const responses = await Promise.all(
      Array.from({ length: 4 }, async (_, index) => {
        const response = await axios.get(url, { responseType: "arraybuffer" });
        return response.data;
      })
    );

    const paths = [];

    responses.forEach((data, index) => {
      const path = __dirname + `/cache/image${index + 1}.png`;
      fs.writeFileSync(path, Buffer.from(data, "binary"));
      paths.push(path);
    });

    const senderName = "🥷🏻 ⓝⓘⓝⓞ ( 𝙰𝙸 )";
    const message = `${senderName}\n\nهـا هـي صـورتـك 🖼 `;

    const combinedMessage = {
      body: message,
      attachment: paths.map((path) => fs.createReadStream(path)),
    };

    api.sendMessage(combinedMessage, event.threadID, () => paths.forEach(fs.unlinkSync));
  } catch (e) {
    api.sendMessage("🚫 خطأ في توليد الصورة ", event.threadID, event.messageID);
  }
}

async function convertVoiceToText(audioUrl, api, event) {
  try {
    api.sendMessage("💽 | ⓝⓘⓝⓞ 𝙰𝙸 تـحـويـل الـصـوت يـرجـي الانـتـظـار🔁ُ🗣", event.threadID);

    const response = await axios.get(`https://hazeyy-apis-combine.kyrinwu.repl.co/api/try/voice2text?url=${encodeURIComponent(audioUrl)}`);
    const text = response.data.transcription;

    if (text && isFontEnabled) {
      const formattedText = formatFont(text);
      api.sendMessage(`🥷🏻 ⓝⓘⓝⓞ ( 𝙰𝙸 ) سـيـاق 🎶\n\n ${formattedText}`, event.threadID, event.messageID);
    } else if (text) {
      api.sendMessage(`🥷🏻 ⓝⓘⓝⓞ ( 𝙰𝙸 ) سـيـاق 🎶\n\n ${text}`, event.threadID, event.messageID);
    } else {
      api.sendMessage("🚫 غير قادر على تحويل الصوت .", event.threadID, event.messageID);
    }
  } catch (error) {
    console.error("🚫 حدث خطأ أثناء تحويل الصوت :", error);
    api.sendMessage("🚫 حدث خطأ أثناء تحويل الصوت ", event.threadID, event.messageID);
  }
}

module.exports.handleEvent = async function ({ api, event, Users }) {
  if (!(event.body.toLowerCase().startsWith(". ذكاء") || event.body.toLowerCase().startsWith("ذكاء"))) return;

  if (event.body.toLowerCase().startsWith("ذكاء تخيل")) {
    handleNyxImageCommand(api, event);
    return; 
  }

  const args = event.body.split(/\s+/);
  args.shift();

  if (args[0] === "font" && (args[1] === "on" || args[1] === "off")) {
    isFontEnabled = args[1] === "on";

    api.sendMessage(`🥷🏻 تـنـسـيـق الـخـط \n\n╰➤ [ ${isFontEnabled ? "يُمكَِن  🟢" : "عـاجـز  🔴"} ]`, event.threadID);
    return;
  }

  if (event.type === "message_reply") {
    if (event.messageReply.attachments[0]) {
      const attachment = event.messageReply.attachments[0];

      if (attachment.type === "audio") {
        const audioUrl = attachment.url;
        convertVoiceToText(audioUrl, api, event);
        return;
      }
    }
  }

  let text = args.join(" ");

  if (!text) {
    return api.sendMessage("🥷🏻 مـرحـبـا أنـا ⓝⓘⓝⓞ صـديـقـك الإفـتـراضـي \n\nيـرجـى تـقـديـم سـؤالـك لـلـبـحـث أو الـتـحـدث مـع الـذكـاء الإصـطـنـاعـي 🤖", event.threadID, event.messageID);
  }

  if (!history.hasOwnProperty(event.senderID)) history[event.senderID] = [];
  history[event.senderID].push({ role: "user", content: text });

  try {
    api.sendMessage("🗨️ | ⓝⓘⓝⓞ يـفـكـر 🔁ُ", event.threadID, event.messageID);

    let senderName = (await Users.getData(event.senderID)).name;
    let { data } = await axios.post("https://hazeyy-apis-combine.kyrinwu.repl.co/api/girlfriend", { messages: history[event.senderID], sender_name: senderName });

    if (data && data.content) {
      history[event.senderID].push(data);

      const formattedResponse = isFontEnabled ? `🥷🏻 ⓝⓘⓝⓞ ( 𝙰𝙸 )\n\n❓ يـقـول🗣: '${text}'\n\n${formatFont(data.content)}` : `🥷🏻 ⓝⓘⓝⓞ ( 𝙰𝙸 )\n\n❓ يـقـول🗣: '${text}'\n\n${data.content}`;
      api.sendMessage(formattedResponse, event.threadID, event.messageID);
    } else {
      api.sendMessage("🚫 استجابة API فارغة أو غير محددة .", event.threadID);
    }
  } catch (error) {
    console.error("🚫 خطأ أثناء طلب API :", error);
    return api.sendMessage("🚫 حدث خطأ أثناء معالجة الطلب يرجى المحاولة مرة أخرى لاحقا .", event.threadID, event.messageID);
  }
};

function formatFont(text) {
  const fontMapping = {
    a: "a", b: "b", c: "c", d: "d", e: "e", f: "f", g: "g", h: "h", i: "i", j: "j", k: "k", l: "l", m: "m",
        n: "n", o: "o", p: "p", q: "q", r: "r", s: "s", t: "t", u: "u", v: "v", w: "w", x: "x", y: "y", z: "z",
    A: "A", B: "B", C: "C", D: "D", E: "E", F: "F", G: "G", H: "H", I: "I", J: "J", K: "K", L: "L", M: "M",
    N: "N", O: "O", P: "P", Q: "Q", R: "R", S: "S", T: "T", U: "U", V: "V", W: "W", X: "X", Y: "Y", Z: "Z"
  };

  let formattedText = "";
  for (const char of text) {
    formattedText += char in fontMapping ? fontMapping[char] : char;
  }

  return formattedText;
}

module.exports.run = async function ({ api, event }) {};
