const axios = require("axios");
const monitoredURLs = new Set();

module.exports.config = {
  name: "monitor",
  version: "3.1",
  hasPermission: 1,
  credits: "Hazeyy",
  description: "( 𝙈𝙤𝙣𝙞𝙩𝙤𝙧 𝙍𝙚𝙥𝙡'𝙨 )",
  commandCategory: "no prefix",
  usages: "( Use monitor [ url ] )",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event }) {
  if (!event.body.startsWith("monitor", "Monitor")) return;

  const args = event.body.split(/\s+/);
  args.shift();

  if (args.length < 1) {
    api.sendMessage("🗨️ 𝚄𝚜𝚊𝚐𝚎: 𝚖𝚘𝚗𝚒𝚝𝚘𝚛 [ 𝚞𝚛𝚕 ] 𝚝𝚘 𝚜𝚝𝚊𝚛𝚝 𝚖𝚘𝚗𝚒𝚝𝚘𝚛𝚒𝚗𝚐.", event.threadID);
    return;
  }

  const url = args[0];

  if (monitoredURLs.has(url)) {
    api.sendMessage(`⚠️ ${url} 𝗂𝗌 𝖺𝗅𝗋𝖾𝖺𝖽𝗒 𝖻𝖾𝗂𝗇𝗀 𝗆𝗈𝗇𝗂𝗍𝗈𝗋𝖾𝖽`, event.threadID);
    return;
  }

  try {
    monitoredURLs.add(url);
    api.sendMessage(`🕟 𝙰𝚍𝚍𝚒𝚗𝚐 𝚄𝚁𝙻 𝚝𝚘 𝚖𝚘𝚗𝚒𝚝𝚘𝚛 𝚕𝚒𝚜𝚝, 𝙿𝚕𝚎𝚊𝚜𝚎 𝚠𝚊𝚒𝚝...`, event.threadID);

    setTimeout(async () => {
      const response = await axios.post("https://hazeyy-up-api.kyrinwu.repl.co/api/uptime", { uptime: url });

      if (response.data && response.data.success === false) {
       api.sendMessage(response.data.msg, event.threadID, event.messageId);
 return;
}

      api.sendMessage(`🟢 𝚄𝚛𝚕: ${url} 𝚜𝚝𝚊𝚛𝚝𝚎𝚍 𝚜𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢`, event.threadID);
    }, 8000);
  } catch (error) {
    api.sendMessage("🔴 𝙰𝚗 𝚎𝚛𝚛𝚘𝚛 𝚘𝚌𝚌𝚞𝚛𝚎𝚍 𝚠𝚑𝚒𝚕𝚎 𝚜𝚝𝚊𝚛𝚝𝚒𝚗𝚐 𝚝𝚑𝚎 𝚄𝚛𝚕 𝚖𝚘𝚗𝚒𝚝𝚘𝚛𝚒𝚗𝚐.", event.threadID);
    console.error(error);
  } finally {
    monitoredURLs.delete(url);
  }
};

module.exports.run = async function ({ api, event }) {
};