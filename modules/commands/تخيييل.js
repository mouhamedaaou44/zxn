module['exports']['config'] = {
    name: "ارسم",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ǺᎩᎧᏬᏰ",
    description: "Generate an image.",
usePrefix: false,
    commandCategory: "𝗚 𝗥 𝗢 𝗜 𝗣",
    usages: "[اِسْتَدْعَى | نموذج]",
    cooldowns: 0
};

const fs = require("fs");
const { get } = require("axios");

module['exports']['run'] = async function({ api, event, args }) {
    let path = __dirname + "/cache/image.png";
    const tzt = args.join(" ").split("|").map(item => item.trim());
    let txt = tzt[0];
    let txt2 = tzt[1];

    let tid = event.threadID;
    let mid = event.messageID;

    if (!args[0] || !txt || !txt2) return api.sendMessage("يرجى تقديم موجه ونموذج.", tid, mid);

    try {
        api.sendMessage("⏳توليد ...", tid, mid);

        let enctxt = encodeURI(txt);
        let url = `https://arjhil-prodia-api.arjhilbard.repl.co/generate?prompt=${enctxt}&model=${txt2}`;

        let result = (await get(url, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(path, Buffer.from(result, "utf-8"));
        api.sendMessage({ attachment: fs.createReadStream(path) }, tid, () => fs.unlinkSync(path), mid);
    } catch (e) {
        return api.sendMessage(e.message, tid, mid);
    }
};
