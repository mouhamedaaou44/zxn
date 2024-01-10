module.exports.config = {
	name: "ادمن",
	version: "1.0.5",
	hasPermssion: 2,
	credits: "S H A D Y",
	description: "",
	commandCategory: "A D M I N",
	usages: "",
    cooldowns: 0,
    dependencies: {
        "fs-extra": ""
    }
};

module.exports.languages = {
    "vi": {
        "listAdmin": `[⚜️]•[⚜️] ADMIN [⚜️]•[🔱]\n\n%1`,
        "listNDH": `[⚜️]•[⚜️] Người Hỗ Trợ Bot [⚜️]•[⚜️] \n\n%1`,
        "notHavePermssion": '[⚜️] Bạn không đủ quyền hạn để có thể sử dụng chức năng "%1"',
        "addedNewAdmin": '[⚜️] Đã thêm %1 người dùng trở thành admin-bot:\n\n%2',
        "removedAdmin": '[⚜️] Đã gỡ bỏ %1 người điều hành bot:\n\n%2',
        "adminsupport": '[⚜️] Đã thêm %1 người dùng trở thành người hỗ trợ  người điều hành bot:\n\n%2'
    },
    "en": {
        "listAdmin": '[Admin] Admin list: \n\n%1',
        "notHavePermssion": '[Admin]مuk];معندك صلاحيه الاستخدام"%1"',
        "addedNewAdmin": '[Admin] اضاف %1 ك ادمن :\n\n%2',
        "removedAdmin": '[Admin] ازيل %1 ك ادمن:\n\n%2'
    }
}
module.exports.onLoad = function() {
    const { writeFileSync, existsSync } = require('fs-extra');
    const { resolve } = require("path");
    const path = resolve(__dirname, 'cache', 'data.json');
    if (!existsSync(path)) {
        const obj = {
            adminbox: {}
        };
        writeFileSync(path, JSON.stringify(obj, null, 4));
    } else {
        const data = require(path);
        if (!data.hasOwnProperty('adminbox')) data.adminbox = {};
        writeFileSync(path, JSON.stringify(data, null, 4));
    }
}
module.exports.run = async function ({ api, event, args, Users, permssion, getText }) {
    const content = args.slice(1, args.length);
    if (args.length == 0) return api.sendMessage(`يمكنك استخدام \n »ادمن اضافه => إضافة مستخدم كمسؤول \n»ادمن القاءمه => الاطلاع على قائمة المسؤولين \n » ادمن ازاله => إزالة المسؤول \n» ادمن المجموعه => وضع تبديل المشرفين فقط \n »ادمن فقط => تبديل هينا يمكن للمسؤول فقط استخدام الوضع \n »دليل المستخدم: أمر المشرف ${global.config.PREFIX} الذي تحتاج إلى استخدامه
`, event.threadID, event.messageID);
    const { threadID, messageID, mentions } = event;
    const { configPath } = global.client;
    const { ADMINBOT } = global.config;
    const { NDH } = global.config;
    const { userName } = global.data;
    const { writeFileSync } = global.nodemodule["fs-extra"];
    const mention = Object.keys(mentions);

    delete require.cache[require.resolve(configPath)];
    var config = require(configPath);
    switch (args[0]) {
        case "القاءمه": {
          listAdmin = ADMINBOT || config.ADMINBOT ||  [];
            var msg = [];
            for (const idAdmin of listAdmin) {
                if (parseInt(idAdmin)) {
                  const name = (await Users.getData(idAdmin)).name
                    msg.push(`[⚜️] ${name}\n[⚜️] Link: fb.me/${idAdmin}`);
                }
            }
          listNDH = NDH || config.NDH ||  [];
            var msg1 = [];
            for (const idNDH of listNDH) {
                if (parseInt(idNDH)) {
                  const name1 = (await Users.getData(idNDH)).name
                    msg1.push(`[⚜️] ${name1}\n[🔱] Link: fb.me/${idNDH}`);
                }
            }
return api.sendMessage(`[⚜️] ادمن البوت [⚜️]\n»============«\n\n${msg.join("\n")}\n\n————————🔱————————\n\n[⚜️] مساهم بالبوت [⚜️]\n»============«\n\n${msg1.join("\n\n")}`, event.threadID, event.messageID)
        }
        case "اضافه": { 
            if (event.senderID != 100033556746363) return api.sendMessage(`[⚜️] آسف! لا يمكن استخدام هذا الأمر إلا من قبل المطور`, event.threadID, event.messageID)
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    ADMINBOT.push(id);
                    config.ADMINBOT.push(id);
                    listAdd.push(`[⚜️] ${id} [⚜️] → ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                ADMINBOT.push(content[0]);
                config.ADMINBOT.push(content[0]);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("addedNewAdmin", 1, `[⚜️] ADMIN [⚜️]→ ${name}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
case "مساهم": {
            if (event.senderID != 100033556746363) return api.sendMessage(`[⚜️] آسف! لا يمكن استخدام هذا الأمر إلا من قبل عمك شادي`, event.threadID, event.messageID)
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mention.length != 0 && isNaN(content[0])) {
                var listAdd = [];

                for (const id of mention) {
                    NDH.push(id);
                    config.NDH.push(id);
                    listAdd.push(`[⚜️] ${id} [⚜️] → ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("adminsupport", 1, `[⚜️] ADMIN SP [⚜️]→ ${name}`), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                NDH.push(content[0]);
                config.NDH.push(content[0]);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("adminsupport", 1, `[⚜️] ADMIN SP [⚜️] → ${name}`), threadID, messageID);
            }
            else return global.utils.throwError(this.config.name, threadID, messageID);
        }
        case "remove":
        case "ازاله":
        case "delete": {
            if (event.senderID != 100033556746363) return api.sendMessage(`[⚜️] آسف! لا يمكن استخدام هذا الأمر إلا من قبل المطور`, event.threadID, event.messageID)
            if(event.type == "message_reply") { content[0] = event.messageReply.senderID }
            if (mentions.length != 0 && isNaN(content[0])) {
                const mention = Object.keys(mentions);
                var listAdd = [];

                for (const id of mention) {
                    const index = config.ADMINBOT.findIndex(item => item == id);
                    ADMINBOT.splice(index, 1);
                    config.ADMINBOT.splice(index, 1);
                    listAdd.push(`[⚜️] ${id} [⚜️] » ${event.mentions[id]}`);
                };

                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", mention.length, listAdd.join("\n").replace(/\@/g, "")), threadID, messageID);
            }
            else if (content.length != 0 && !isNaN(content[0])) {
                const index = config.ADMINBOT.findIndex(item => item.toString() == content[0]);
                ADMINBOT.splice(index, 1);
                config.ADMINBOT.splice(index, 1);
                const name = (await Users.getData(content[0])).name
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                return api.sendMessage(getText("removedAdmin", 1, `[⚜️] ${content[0]} [⚜️] → ${name}`), threadID, messageID);
            }
            else global.utils.throwError(this.config.name, threadID, messageID);
        }
        case 'المجموعه': {
          if (permssion != 1) return api.sendMessage("[⚜️] آسف! لا يمكن استخدام هذا الأمر إلا من قبل ادمنية الكروب", threadID, messageID);
        const { resolve } = require("path");
        const pathData = resolve(__dirname, 'cache', 'data.json');
        const database = require(pathData);
        const { adminbox } = database;   
        if (adminbox[threadID] == true) {
            adminbox[threadID] = false;
            api.sendMessage("[⚜️] تم إيقاف تشغيل وضع المسؤول بنجاح ، حيث يمكن للجميع استخدام برامج نينو", threadID, messageID);
        } else {
            adminbox[threadID] = true;
            api.sendMessage("[⚜️]تم تفعيل الوضع الذي يمكن لمشرفي المجموعة فقط استخدام برامج نينو ", threadID, messageID);
        }
        writeFileSync(pathData, JSON.stringify(database, null, 4));
        break;
    }
    case 'فقط':
        case '-o': {
            //---> CODE ADMIN ONLY<---//
            if (permssion != 3) return api.sendMessage("[⚜️] آسف! لا يمكن استخدام هذا الأمر إلا عن طريق دعم المطور أو المشرف", threadID, messageID);
            if (config.adminOnly == false) {
                config.adminOnly = true;
                api.sendMessage(`[⚜️] تم تمكينه بنجاح فقط يمكن للمسؤول استخدام نينو`, threadID, messageID);
            } else {
                config.adminOnly = false;
                api.sendMessage(`[⚜️] تم ايقاف الوضع ويمكن للجميع استخدام نينو`, threadID, messageID);
            }
                writeFileSync(configPath, JSON.stringify(config, null, 4), 'utf8');
                break;
              }
        default: {
            return global.utils.throwError(this.config.name, threadID, messageID);
        }
    };
}
