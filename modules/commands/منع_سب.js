const path = require("path");
const fs = require("fs");
 
let bannedWords = {};
let warnings = {};
let badWordsActive = {};
 
module.exports.config = {
  name: "منع_سب",
  version: "1.0.0",
  hasPermission: 1,
  credits: "ǺᎩᎧᏬᏰ",
  description: "حماية مجموعتك من الشتم",
  commandCategory: "admin",
  usages: "اضافة [كلمة] | ازالة [كلمة] | قائمة | تشغيل | ايقاف",
  cooldowns: 5,
};
 
module.exports.handleEvent = async function({ api, event }) {
  const { threadID, messageID, senderID } = event;
 
  const loadWords = () => {
    const wordFile = path.join(__dirname, `../commands/cachee/7571543742862227.json`);
    if (fs.existsSync(wordFile)) {
      const words = fs.readFileSync(wordFile, "utf8");
      bannedWords[threadID] = JSON.parse(words);
    } else {
      bannedWords[threadID] = [];
    }
  };
 
  loadWords();
 
  if (!badWordsActive[threadID]) return; 
 
  const isAdmin = (await api.getThreadInfo(threadID)).adminIDs.some(adminInfo => adminInfo.id === api.getCurrentUserID());
 
  if (!isAdmin) {
    api.sendMessage("يحتاج الروبوت إلى منصب المسؤول", threadID);
    return;
  }
 
  const messageContent = event.body.toLowerCase();
  const hasBannedWord = bannedWords[threadID].some(bannedWord => messageContent.includes(bannedWord.toLowerCase()));
 
  if (hasBannedWord) {
    if (!warnings[senderID]) warnings[senderID] = 0;
 
    warnings[senderID]++;
    if (warnings[senderID] === 2) {
      api.sendMessage("إذا قمت بالفعل بمحاولتين لانتهاك الكلمات السيئة، فسوف يتم طردك من هذه المجموعة🥷🏻✅", threadID, messageID);
      api.removeUserFromGroup(senderID, threadID); 
      warnings[senderID] = 1;
    } else {
      api.sendMessage(`التحذير الأخير! لقد تم الكشف عن رسالتك كلمات سيئة "${messageContent}" إذا قمت بمحاولتين فسوف تقوم بطردك تلقائيًا`, threadID, messageID);
    }
  }
};
 
module.exports.run = async function({ api, event, args }) {
  const { threadID, messageID } = event;
 
  if (!args[0]) {
    return api.sendMessage("يرجى تحديد الإجراء (إضافة، إزالة، قائمة، تشغيل، إيقاف) والبيانات المناسبة.", threadID);
  }
 
  const wordFile = path.join(__dirname, `../commands/cache/${threadID}.json`);
  if (fs.existsSync(wordFile)) {
    const words = fs.readFileSync(wordFile, "utf8");
    bannedWords[threadID] = JSON.parse(words);
  } else {
    bannedWords[threadID] = [];
  }
 
  const isAdmin = (await api.getThreadInfo(threadID)).adminIDs.some(adminInfo => adminInfo.id === api.getCurrentUserID());
 
  if (!isAdmin) {
    api.sendMessage("🛡️ | احتاج الى منصب المسؤول لتشغيل امر منع السب!", threadID);
    return;
  }
 
  const action = args[0];
  const word = args.slice(1).join(' ');
 
  switch (action) {
    case 'اضافة':
      bannedWords[threadID].push(word);
      api.sendMessage(`✅ | تمت اضافة ${word} إلى قائمة الكلمات المحظورة.`, threadID);
      break;
    case 'ازالة':
      const index = bannedWords[threadID].indexOf(word);
      if (index !== -1) {
        bannedWords[threadID].splice(index, 1);
        api.sendMessage(`✅ | تمت ازالة ${word} من قائمة الكلمات المحظورة.`, threadID);
      } else {
        api.sendMessage(`كلمة ${word} لم يتم العثور عليه في قائمة الكلمات المحظورة.`, threadID);
      }
      break;
    case 'قائمة':
      api.sendMessage(`📝 | قائمة الكلمات المحظورة:\n${bannedWords[threadID].join(', ')}`, threadID);
      break;
    case 'تشغيل':
      badWordsActive[threadID] = true;
      api.sendMessage(`تم تفعيل طرد عند استخدام كلمات سيئة✅🔰`, threadID);
      break;
    case 'ايقاف':
      badWordsActive[threadID] = false;
      api.sendMessage(`تم الغاء التنشيط ❌`, threadID);
      break;
    default: 
      api.sendMessage("عمل غير صالح. الرجاء استخدام 'اضافة', 'ازالة', 'قائمة', 'تشغيل' or 'ايقاف.", threadID);
  }
 
  fs.writeFileSync(wordFile, JSON.stringify(bannedWords[threadID]), "utf8");
  }