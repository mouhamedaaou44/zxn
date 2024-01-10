module.exports.config = {
    name: "نينو",
    version: "4.3.7",
    hasPermssion: 0,
    credits: "...",
    description: "تكلم مع نينو",
    commandCategory: "Ai - chatbot",
    usages: "[args]",
    cooldowns: 5,
    dependencies: {
        axios: ""
    }
}

async function simsimi(a, b, c) {
    const d = global.nodemodule.axios,
        g = (a) => encodeURIComponent(a);
    try {
        var { data } = await d({ url: `https://simsimi.fun/api/v2/?mode=talk&lang=en&message=${a}&filter=false`, method: "GET" });
        if (data.success) {
            return { error: false, data: data.success };
        } else {
            return { error: true, data: {} };
        }
    } catch (p) {
        return { error: true, data: {} };
    }
}

module.exports.onLoad = async function () {
    if (typeof global === "undefined") {
        global = {};
    }
    if (typeof global.simsimi === "undefined") {
        global.simsimi = new Map();
    }
};

module.exports.handleEvent = async function ({ api, event }) {
    const { threadID, messageID, senderID, body } = event;
    const sendMessage = (message) => api.sendMessage(message, threadID, messageID);
    const otherBots = global.config.OTHERBOT || [];

    if (global.simsimi.has(threadID) && !otherBots.includes(senderID)) {
        if (senderID === api.getCurrentUserID() || body === "" || messageID === global.simsimi.get(threadID)) {
            return;
        }

        const { data, error } = await simsimi(body, api, event);
        if (error) {
            return;
        }
        sendMessage(data);
        return true;
    }
};

module.exports.run = async function ({ api, event, args }) {
    const { threadID, messageID } = event;
    const sendMessage = (message) => api.sendMessage(message, threadID, messageID);

    if (args.length === 0) {
        return sendMessage("⚠️لم تقم بإدخال الرسالة");
    }

    switch (args[0]) {
        case "on":
            if (global.simsimi.has(threadID)) {
                return sendMessage("⚠️لقد قمت بالفعل بتشغيل سيم.");
            } else {
                global.simsimi.set(threadID, messageID);
                return sendMessage("✅تم تمكين سيم بنجاح.");
            }
        case "off":
            if (global.simsimi.has(threadID)) {
                global.simsimi.delete(threadID);
                return sendMessage("✅تم إيقاف تشغيل سيم");
            } else {
                return sendMessage("⚠️لم تقم بتشغيل سيم.");
            }
        default:
            const { data, error } = await simsimi(args.join(" "), api, event);
            if (error) {
                return;
            }
            sendMessage(data);
            break;
    }
};
