const fs = require('fs');

let messageCounts = {};
const spamThreshold = 10;
const spamInterval = 60000;
let spamDetectionActive = true;
const warnedUsers = new Set();

fs.writeFileSync('messageCounts.json', JSON.stringify(messageCounts));

module.exports.config = {
  name: "منع_سبام",
  version: "1.0.0",
  hasPermission: 1,
  credits: "ǺᎩᎧᏬᏰ",
  description: "منع سبام من مجموعتك | يتم طرد اي شخص يقوم بسبام تلقائيا",
  usePrefix: "true",
  commandCategory: "admin",
  usages: "",
  cooldowns: 5,
};

module.exports.run = async function({ api, event, args }) {
  const { threadID } = event;
  const action = args[0];
  const target = args[1];

  if (!(await api.getThreadInfo(threadID)).adminIDs.some(e => e.id == api.getCurrentUserID())) {
    return api.sendMessage("", threadID);
  }

  if (action === 'تشغيل') {
    spamDetectionActive = true;
    api.sendMessage("🛡️ | تم تشغيل وضع طرد عند سبام ✅🔰", threadID);
  } else if (action === 'ايقاف') {
    spamDetectionActive = false;
    api.sendMessage("📪 | تم ايقاف الوضع ❌", threadID);
  } else if (action === 'غير محذر') {
    if (target) { 
      if (messageCounts[threadID] && messageCounts[threadID][target]) {
        delete messageCounts[threadID][target];
        warnedUsers.delete(`${threadID}_${target}`);
        api.sendMessage(`مستخدم ${target} لم يتم تحذيره.`, threadID);
      } else {
        api.sendMessage(`مستخدم ${target} لم يتم تحذيره بعد.`, threadID);
      }
    } else {
      api.sendMessage(`يجب عليك تحديد مستخدم لإلغاء تحذيره.`, threadID);
    }
  } else {
    api.sendMessage(`أمر خاطئ. يستخدم   'تشغيل' او 'ايقاف' او 'غير محذر'.`, threadID);
  } 
  fs.writeFileSync('messageCounts.json', JSON.stringify(messageCounts));
};

module.exports.handleEvent = async function({ api, event }) {
  if (!spamDetectionActive) return;

  const { threadID, messageID, senderID } = event;

  if (!(await api.getThreadInfo(threadID)).adminIDs.some(e => e.id == api.getCurrentUserID())) {
    return api.sendMessage("", threadID);
  }

  if (!messageCounts[threadID]) {
    messageCounts[threadID] = {};
  }

  if (!messageCounts[threadID][senderID]) {
    messageCounts[threadID][senderID] = {
      count: 1,
      timer: setTimeout(() => {
        delete messageCounts[threadID][senderID];
      }, spamInterval)
    };
  } else {
    messageCounts[threadID][senderID].count++;
    if (messageCounts[threadID][senderID].count > spamThreshold && !warnedUsers.has(`${threadID}_${senderID}`)) {
      warnedUsers.add(`${threadID}_${senderID}`);
      api.removeUserFromGroup(senderID, threadID);
      api.sendMessage({
        body: "🛡️ | تم اكتشاف السبام تمت إزالة المستخدم من المجموعة.",
        mentions: [{
          tag: senderID,
          id: senderID
        }]
      }, threadID, messageID);
    }
  }
  
  fs.writeFileSync('messageCounts.json', JSON.stringify(messageCounts));
};