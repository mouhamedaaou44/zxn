module.exports.config = {
  name: "سمعني",
  version: "2.0.4",
  hasPermssion: 0,
  credits: "ayoub",
  description: "احصل على مسار صوتي لأي أغنية مع كلماتها",
  usePrefix: false,
  commandCategory: "music",
  usages: ".music {song name}",
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
    "request": "",
    "axios": "",
    "ytdl-core": "",
    "yt-search": ""
  }
};

module.exports.run = async ({ api, event }) => {
  const axios = require("axios");
  const fs = require("fs-extra");
  const ytdl = require("ytdl-core");
  const request = require("request");
  const yts = require("yt-search");

  const input = event.body;
  const text = input.substring(12);
  const data = input.split(" ");

  if (data.length < 2) {
    return api.sendMessage("❗ يرجى تحديد اسم الأغنية.\n\nالاستخدام: .سمعني {اسم الاغنية}\nمثال: .سمعني لقد دخنت دماغي", event.threadID, event.messageID);
  }

  data.shift();
  const song = data.join(" ");

  try {
    api.sendMessage(`✅ البحث عن "${song}". انتظر من فضلك...`, event.threadID, event.messageID);

    const res = await axios.get(`https://lyrist.vercel.app/api/${encodeURIComponent(song)}`);
    const lyrics = res.data.lyrics || "غير معثور عليه !";
    const title = res.data.title || "غير معثور عليه !";
    const artist = res.data.artist || "غير معثور عليه !";

    const searchResults = await yts(song);
    if (!searchResults.videos.length) {
      return api.sendMessage("❌ خطأ: طلب غير صالح.", event.threadID, event.messageID);
    }

    const video = searchResults.videos[0];
    const videoUrl = video.url;

    const stream = ytdl(videoUrl, { filter: "audioonly" });

    const fileName = `${event.senderID}.mp3`;
    const filePath = __dirname + `/cache/${fileName}`;

    stream.pipe(fs.createWriteStream(filePath));

    stream.on('response', () => {
      console.info('[DOWNLOADER]', 'Starting download now!');
    });

    stream.on('info', (info) => {
      console.info('[DOWNLOADER]', `Downloading ${info.videoDetails.title} by ${info.videoDetails.author.name}`);
    });

    stream.on('end', () => {
      console.info('[DOWNLOADER] Downloaded');

      if (fs.statSync(filePath).size > 26214400) {
        fs.unlinkSync(filePath);
        return api.sendMessage('❌ [ERR] تعذر إرسال الملف لأن حجمه أكبر من 25 ميغابايت.', event.threadID);
      }

      const message = {
        body: `Title: ${title}\nArtist: ${artist}\n\nLyrics: ${lyrics}\n`,
        attachment: fs.createReadStream(filePath)
      };

      api.sendMessage(message, event.threadID, event.messageID);
      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error('[ERROR]', error);
    api.sendMessage('تعذرت معالجة طلبك، يرجى المحاولة مرة أخرى لاحقًا.', event.threadID);
  }
};
    