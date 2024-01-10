module.exports.config = {
    name: "imgur",
    version: "2.1.0",
    hasPermssion: 0,
    credits: "ǺᎩᎧᏬᏰ",
    description: "احصل على رابط الصورة",
    commandCategory: "imgur",
    usages: "[reply to image]",
    cooldowns: 5,
    dependencies: {
        "axios": ""
    }
};

module.exports.run = async ({ api, event }) => {
    const axios = global.nodemodule['axios'];  
    var kenliegwapokaayo = event.messageReply.attachments[0].url; 
    if (!kenliegwapokaayo) return api.sendMessage('الرجاء الرد على الصورة.', event.threadID, event.messageID);

    const res = await axios.get(`https://api.kenliejugarap.com/imgur/?imageLink=${encodeURIComponent(kenliegwapokaayo)}`);

    if (res.data.error) {
        return api.sendMessage(res.data.error, event.threadID, event.messageID);
    }

    var imgur = res.data.link;
    return api.sendMessage(`هنا هو رابط imgur الخاص بك:\n${imgur}`, event.threadID, event.messageID);
};