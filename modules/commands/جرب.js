const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "bard1",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Hazeyy",
  description: "( 𝘽𝙖𝙧𝙙 𝙭 𝙍𝙚𝙢𝙞𝙣𝙞 𝘅 𝙁𝙗𝙙𝙡 )",
  commandCategory: "research",
  usages: "( Research on Google Bard x Remini x Fbdl )",
  cooldowns: 3,
};

async function processBard(api, event, args) {
  if (args[0] === "Bard") {
    const pathie = __dirname + `/cache/bard.jpg`;
    const photoUrl = event.messageReply.attachments[0]
      ? event.messageReply.attachments[0].url
      : args.slice(1).join(" ");

    api.sendMessage("🕟 | 𝙱𝚊𝚛𝚍 𝙰𝙸, 𝚂𝚞𝚛𝚎! 𝚎𝚗𝚑𝚊𝚗𝚌𝚒𝚗𝚐 𝚙𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID);

    try {
      const response = await axios.get(
        `https://hazeyy-apis-combine.kyrinwu.repl.co/api/try/remini?url=${encodeURIComponent(photoUrl)}`
      );
      const processedImageURL = response.data.image_data;
      const img = (await axios.get(processedImageURL, { responseType: "arraybuffer" })).data;

      fs.writeFileSync(pathie, Buffer.from(img, "binary"));

      api.sendMessage(
        {
          body: "✨ 𝗕𝗮𝗿𝗱 ( 𝗔𝗜 )\n\n𝙷𝚎𝚛𝚎'𝚜 𝚢𝚘𝚞𝚛 𝚎𝚗𝚑𝚊𝚗𝚌𝚎𝚖𝚎𝚗𝚝 𝚒𝚖𝚊𝚐𝚎",
          attachment: fs.createReadStream(pathie),
        },
        event.threadID,
        () => fs.unlinkSync(pathie)
      );
    } catch (error) {
      api.sendMessage(`🔴 𝙴𝚛𝚛𝚘𝚛 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚒𝚖𝚊𝚐𝚎`, event.threadID);
    }
  } else if (args[0] === "nino") {
    const link = args.slice(1).join(" ");

    if (!link) {
      api.sendMessage(
        "✨ 𝙿𝚕𝚎𝚊𝚜𝚎 𝚙𝚞𝚝 𝚊 𝚟𝚊𝚕𝚒𝚍 𝚄𝚁𝙻 𝚕𝚒𝚗𝚔 𝚝𝚘 𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍.",
        event.threadID,
        event.messageID
      );
      return;
    }

    api.sendMessage(
      "🗨️ | nino 𝙰𝙸, 𝚂𝚞𝚛𝚎! 𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚒𝚗𝚐 𝚙𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...",
      event.threadID,
      event.messageID
    );

    try {
      let path = __dirname + `/cache/`;
      await fs.ensureDir(path);
      path += 'fbVID.mp4';

      const fbdlResponse = await axios.get(
        `https://hazeyy-apis-combine.kyrinwu.repl.co/api/try/fbdl?url=${encodeURI(link)}`
      );

      if (fbdlResponse.data.result && fbdlResponse.data.result.sd_q) {
        const videoUrl = fbdlResponse.data.result.sd_q;

        const vid = (await axios.get(videoUrl, { responseType: "arraybuffer" })).data;

        fs.writeFileSync(path, Buffer.from(vid, 'binary'));

        api.sendMessage(
          {
            body: `✨ 𝗕𝗮𝗿𝗱 ( 𝗔𝗜 )\n\n𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚒𝚗𝚐 𝙲𝚘𝚖𝚙𝚕𝚎𝚝𝚎! 𝙷𝚎𝚛𝚎'𝚜 𝚢𝚘𝚞𝚛 𝚟𝚒𝚍𝚎𝚘 𝚎𝚗𝚓𝚘𝚢!`,
            attachment: fs.createReadStream(path),
          },
          event.threadID,
          () => fs.unlinkSync(path),
          event.messageID
        );
      } else {
        api.sendMessage(`🔴 𝙴𝚛𝚛𝚘𝚛 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚒𝚗𝚐 𝚟𝚒𝚍𝚎𝚘.`, event.threadID, event.messageID);
      }
    } catch (e) {
      api.sendMessage(`🔴 𝙴𝚛𝚛𝚘𝚛 𝚍𝚘𝚠𝚗𝚕𝚘𝚊𝚍𝚒𝚗𝚐 𝚟𝚒𝚍𝚎𝚘.`, event.threadID, event.messageID);
    }
  } else {
    const query = args.join(" ");
    api.sendMessage("🗨️ | nino 𝙰𝙸, 𝚒𝚜 𝚝𝚑𝚒𝚗𝚔𝚒𝚗𝚐 𝚙𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...", event.threadID);

    try {
      const response = await axios.get(
        `https://hazeyy-apis-combine.kyrinwu.repl.co/api/bard/chat?ask=${encodeURIComponent(query)}`
      );

      if (response.status === 200 && response.data && response.data.message) {
        let message = response.data.message;
        const name = "✨ 𝗕𝗮𝗿𝗱 ( 𝗔𝗜 )";

        api.sendMessage(
          {
            body: `${name}\n\n🖋️ 𝚃𝚒𝚝𝚕𝚎: '${query}'\n\n${formatFont(message)}`,
          },
          event.threadID
        );

        if (response.data.imageUrls) {
          const imageUrls = response.data.imageUrls;
          for (const imageUrl of imageUrls) {
            const img = (await axios.get(imageUrl, { responseType: "arraybuffer" })).data;
            const pathie = __dirname + `/cache/bard_image.jpg`;

            fs.writeFileSync(pathie, Buffer.from(img, "utf-8"));

            api.sendMessage(
              {
                attachment: fs.createReadStream(pathie),
              },
              event.threadID,
              () => fs.unlinkSync(pathie)
            );
          }
        }
      } else {
        api.sendMessage("😿 𝚂𝚘𝚛𝚛𝚢, 𝙸 𝚌𝚘𝚞𝚕𝚍𝚗'𝚝 𝚏𝚒𝚗𝚍 𝚊𝚗 𝚊𝚗𝚜𝚠𝚎𝚛 𝚏𝚘𝚛 𝚢𝚘𝚞𝚛 𝚚𝚞𝚎𝚛𝚢.", event.threadID);
      }
    } catch (error) {
      console.error(error);
      api.sendMessage("🔴 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚙𝚛𝚘𝚌𝚎𝚜𝚜𝚒𝚗𝚐 𝚛𝚎𝚚𝚞𝚎𝚜𝚝 𝚘𝚗 𝙶𝚘𝚘𝚐𝚕𝚎 𝙱𝚊𝚛𝚍.", event.threadID);
    }
  }
}

module.exports.handleEvent = async function ({ api, event }) {
  const args = event.body.split(/\s+/);
  args.shift();

  if (event.body.startsWith("bard")) {
    if (args.length === 0) {
      api.sendMessage("✨ 𝙷𝚎𝚕𝚕𝚘, 𝚙𝚕𝚎𝚊𝚜𝚎 𝚙𝚛𝚘𝚟𝚒𝚍𝚎 𝚊 𝚚𝚞𝚎𝚜𝚝𝚒𝚘𝚗 𝚘𝚛 ( 𝚀𝚞𝚎𝚛𝚢 ) 𝚝𝚘 𝚜𝚎𝚊𝚛𝚌𝚑 𝚘𝚗 𝙶𝚘𝚘𝚐𝚕𝚎 𝙱𝚊𝚛𝚍.", event.threadID);
      return;
    }
    processBard(api, event, args);
  } else if (event.type === "message_reply" && event.body.toLowerCase().includes("bard")) {
    if (event.messageReply.attachments.length > 0) {
      const photoUrl = event.messageReply.attachments[0].url;
      args.unshift("Bard");
      args.push(photoUrl);
      processBard(api, event, args);
    } else {
      api.sendMessage("✨ 𝙷𝚎𝚕𝚕𝚘, 𝚙𝚕𝚎𝚊𝚜𝚎 𝚛𝚎𝚙𝚕𝚢 𝚝𝚘 𝚊 𝚙𝚑𝚘𝚝𝚘 𝚝𝚘 𝚙𝚛𝚘𝚌𝚎𝚜𝚜 𝚎𝚗𝚑𝚊𝚗𝚌𝚒𝚗𝚐 𝚒𝚖𝚊𝚐𝚎.", event.threadID);
    }
  }
};

function formatFont(text) {
  const fontMapping = {
    a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖",
    n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
    A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝚺", L: "𝙻", M: "𝙼",
    N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉"
  };

  let formattedText = "";
  for (const char of text) {
    if (char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }

  return formattedText;
}

module.exports.run = async function ({ api, event }) {};