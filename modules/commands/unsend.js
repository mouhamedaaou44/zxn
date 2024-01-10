module.exports.config = {
	name: "مسح",
	version: "1.0.1",
	hasPermssion: 1,
	credits: "S H A D Y",
	description: "",
	commandCategory: "G R O U P",
	usages: "unsend",
	cooldowns: 0
};

module.exports.languages = {
	"vi": {
		"returnCant": "Không thể gỡ tin nhắn của người khác.",
		"missingReply": "Hãy reply tin nhắn cần gỡ."
	},
	"en": {
		"returnCant": "هذي مو رسالتي يا راس المربع 😂",
		"missingReply": "رد عالرساله الاول يحمار😂"
	}
}

module.exports.run = function({ api, event, getText }) {
	if (event.messageReply.senderID != api.getCurrentUserID()) return api.sendMessage(getText("returnCant"), event.threadID, event.messageID);
	if (event.type != "message_reply") return api.sendMessage(getText("missingReply"), event.threadID, event.messageID);
	return api.unsendMessage(event.messageReply.messageID);
}