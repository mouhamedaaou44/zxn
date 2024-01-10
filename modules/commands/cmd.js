module.exports.config = {
	name: "الاوامر",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Ǻ Ꭹ Ꭷ Ꮼ Ᏸ",
	description: "دليل المبتدئين",
	commandCategory: "Danh sách lệnh",
	usages: "[استخدم دليل]",
	cooldowns: 5,
	envConfig: {
		autoUnsend: true,
		delayUnsend: 60
	}
};

module.exports.languages = {
	"vi": {
		"moduleInfo": "╭───╮\n    %1\n╰───╯ \n📜Mô tả: %2\n\n» 🧞Credit: %7\n» 📄Hướng dẫn cách dùng: %3\n» 🌟Thuộc nhóm: %4\n» ⏱Thời gian chờ: %5 giây(s)\n» 👥Quyền hạn: %6\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏\n💥💢💥 Điều Hành Bởi Kz Khánh 💥💢💥",
		"helpList": '≻─────── •👇🏻• ───────≺\n🏰🏰🏰 𝐻𝑖𝑒̣̂𝑛 𝑡𝑎̣𝑖 đ𝑎𝑛𝑔 𝑐𝑜́ %1 𝑙𝑒̣̂𝑛ℎ 𝑐𝑜́ 𝑡ℎ𝑒̂̉ 𝑠𝑢̛̉ 𝑑𝑢̣𝑛𝑔 𝑡𝑟𝑒̂𝑛 𝑏𝑜𝑡 𝑛𝑎̀𝑦\n🌟𝑆𝑢̛̉ 𝑑𝑢̣𝑛𝑔: "%2giupdo + tên lệnh" đ𝑒̂̉ 𝑏𝑖𝑒̂́𝑡 𝑐𝑎́𝑐ℎ 𝑠𝑢̛̉ 𝑑𝑢̣𝑛𝑔 𝑙𝑒̣̂𝑛ℎ\n🤖𝐵𝑜𝑡 đ𝑢̛𝑜̛̣𝑐 đ𝑖𝑒̂̀𝑢 ℎ𝑎̀𝑛ℎ 𝑏𝑜̛̉𝑖 Kz Khánh.\n[💟] Đ𝑎̂𝑦 𝐿𝑎̀ 𝑇𝑜𝑎̀𝑛 𝐵𝑜̣̂ 𝐿𝑒̣̂𝑛ℎ 𝐶𝑜́ 𝑇𝑟𝑜𝑛𝑔 𝐹𝑖𝑙𝑒 𝐵𝑜𝑡 UwU. [❗]\n🔰𝑉𝑢𝑖 𝐿𝑜̀𝑛𝑔 𝐾ℎ𝑜̂𝑛𝑔 𝑆𝑝𝑎𝑚 𝐻𝑜𝑎̣̆𝑐 𝐶ℎ𝑢̛̉𝑖 𝐵𝑜𝑡 𝐵𝑎̂́𝑡 𝐾𝑖̀ 𝐷𝑢̛𝑜̛́𝑖 𝐻𝑖̀𝑛ℎ 𝑇ℎ𝑢̛́𝑐 𝑁𝑎̀𝑜 𝑁ℎ𝑒́ [❗]\n📣ℍ𝕖𝕝𝕡 𝕤𝕖̃ 𝕥𝕦̛̣ đ𝕠̣̂𝕟𝕘 𝕘𝕠̛̃ 𝕤𝕒𝕦 𝟞𝟘𝕤 🏯🏯🏯',
		"user": "Người dùng",
        "adminGroup": "Quản trị viên nhóm",
        "adminBot": "Quản trị viên bot"
	},
	"en": {
		"moduleInfo": "「 %1 」\n%2\n\n❯ Usage: %3\n❯ Category: %4\n❯ Waiting time: %5 seconds(s)\n❯ Permission: %6\n\n» Module code by %7 «",
		"helpList": '[ There are %1 commands on this bot, Use: "%2help nameCommand" to know how to use! ]',
		"user": "User",
        "adminGroup": "Admin group",
        "adminBot": "Admin bot"
	}
};

module.exports.handleEvent = function ({ api, event, getText }) {
	const { commands } = global.client;
   
	const { threadID, messageID, body } = event;

	if (!body || typeof body == "undefined" || body.indexOf("help") != 0) return;
	const splitBody = body.slice(body.indexOf("help")).trim().split(/\s+/);
	if (splitBody.length == 1 || !commands.has(splitBody[1].toLowerCase())) return;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const command = commands.get(splitBody[1].toLowerCase());
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
}

module.exports. run = function({ api, event, args, getText }) {
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const command = commands.get((args[0] || "").toLowerCase());
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;

	if (!command) {
		const arrayInfo = [];
		const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 100;
    let i = 0;
    let msg = `\n
⬛                          🟥
                                           
⬛          🟧           🟥           🟦🟦
⬛⬛⬛🟧🟧🟧🟥🟥🟥🟦🟦
                                                🟦
                 🟧🟧                    🟦🟦   \n`;
    
    for (var [name,value] of (commands)){name += `\n=❯${value.config.description}`;
      arrayInfo.push(name);
    }

    arrayInfo.sort((a, b) => a.data - b.data);
    
    const startSlice = numberOfOnePage*page - numberOfOnePage;
    i = startSlice;
     const fs = require("fs");
    const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);
    
    for (let item of returnArray) msg += `\n╮󰟺────────󰟰────────󰟺                 ${++i} ⬅️ُ     🥷🏻🐦‍⬛${item}✅\n\n`;
     const text = `◤_________🐉_____________◥\n⊶🐲 page (${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)})\n⊶ يكتب: "${prefix}help <اسم الأمر> "لمزيد من التفاصيل حول هذا الأمر\n⊶ حاليا هناك ${arrayInfo.length} الأوامر المتاحة\n⊶ يستخدم  ${prefix}مساعدة <رقم الصفحة>`;
     return api.sendMessage({body :msg + text,attachment: fs.createReadStream(__dirname + `/cachee/sen.gif`) }, event.threadID, async (error, info) => {
if (autoUnsend) {
await new Promise(resolve => setTimeout(resolve, delayUnsend * 60000));
return api.unsendMessage(info.messageID);
} else return;
});
}

return api.sendMessage(getText("moduleInfo", command.config.name, command.config.description, `${prefix}${command.config.name} ${(command.config.usages) ? command.config. usages : ""}`, command.config.commandCategory, command.config.cooldowns, ((command.config.hasPermssion == 0) ? getText("user") : (command.config.hasPermssion == 1) ? getText ("adminGroup") : getText("adminBot")), command.config.credits), threadID, messageID);
};