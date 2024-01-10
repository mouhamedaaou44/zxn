const axios = require("axios");

module.exports.config = {
	name: "ايميل",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Hazeyy",
	description: "(𝙏𝙚𝙢𝙥𝙢𝙖𝙞𝙡𝙫2)",
	commandCategory: "gen",
  usages: "( Gen Random Email address ) ",
	cooldowns: 3
};

module.exports.run = async ({ api, event, args }) => {

	if (args[0] === "حصول") {
		try {
			const response = await axios.get("https://hazeyy-api-tempmailv2.kyrinwu.repl.co/get");
			const responseData = JSON.stringify(response.data, null, 2);
			api.sendMessage(`[] 𝙏𝙚𝙢𝙥𝙢𝙖𝙞𝙡 ✉️ []\n\n ${responseData} `, event.threadID);
		} catch (error) {
			console.error("🔴 خطأ", error);
			api.sendMessage("🔴 حدث خطأ غير متوقع أثناء جلب عنوان البريد الإلكتروني...", event.threadID);
		}
	} else if (args[0].toLowerCase() === "عرض" && args.length === 2) {
		const email = args[1];
		try {
			const response = await axios.get(`https://hazeyy-api-tempmailv2.kyrinwu.repl.co/get/${email}`);
			const inboxMessages = response.data;
			api.sendMessage(`[] 𝙏𝙚𝙢𝙥𝙢𝙖𝙞𝙡 𝙄𝙣𝙗𝙤𝙭 📩 []\n\n${JSON.stringify(inboxMessages, null, 2)}`, event.threadID);
		} catch (error) {
			console.error("🔴 خطأ", error);
			api.sendMessage("🔴 خطأ غير متوقع، يرجى المحاولة مرة أخرى في وقت لاحق...", event.threadID);
		}
	} else {
		api.sendMessage("🔴 أمر غير صالح، يرجى استخدام 'ايميل حصول' لإنشاء عنوان بريد إلكتروني مؤقت عشوائي أو 'ايميل عرض' لعرض رسائل البريد الوارد...", event.threadID);
	}
};
      