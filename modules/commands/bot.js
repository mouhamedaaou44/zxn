const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name:"NINO",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "Abdo",
  description: "goibot",
  commandCategory: "A D M I N",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Manila").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = ["عمكم😺؟" , "راني هنا اودي >_<..." , "أحب ايوب🥷🏻" , "نينو زعلان 😞🧊" , "siuuuu🖤🙁", "سمعتك تنادي علي؟👀", "كنت هموت ملل بدونك 🙃💞", "حبك الاول والاخير🙂🎧"];
 var rand = tl[Math.floor(Math.random() * tl.length)]

  if ((event.body.toLowerCase() == "توحشتك") || (event.body.toLowerCase() == "اشتقتلك")) {
     return api.sendMessage("️حياتي بدونك ولا شئ 🙃💞", threadID, messageID);
   };
  if ((event.body.toLowerCase() == "احبك") || (event.body.toLowerCase() == "نحبك")) {
     return api.sendMessage("️يالك من حلاب(ة)", threadID, messageID);
   };
   
  if ((event.body.toLowerCase() == "لفيد") || (event.body.toLowerCase() == "قلقة")) {
     return api.sendMessage("نعم حتى انا لا املك حبيبة تنسيني😞💔", threadID, messageID);
   };
  
if ((event.body.toLowerCase() == " كيوت") || (event.body.toLowerCase() == "كيوتت")) {
     return api.sendMessage("️يعمريييي🤧💞", threadID, messageID);
   };
   
   if ((event.body.toLowerCase() == "تحب ايوب") || (event.body.toLowerCase() == "شكون لي تحبو")) {
     return api.sendMessage("️ايوب حبيبي وصانعي ربي يخليه 💓🙄", threadID, messageID);
   };
   
   if ((event.body.toLowerCase() == "وش اسمك") || (event.body.toLowerCase() == "ماهو اسمك")) {
     return api.sendMessage("نينو الاسطورة 💞😺", threadID, messageID);
   };
   
   if ((event.body.toLowerCase() == "كيفكم") || (event.body.toLowerCase() == "كيفك")) {
     return api.sendMessage("️بخير وانت👀", threadID, messageID);
   };
   
   if ((event.body.toLowerCase() == "السلام عليكم") || (event.body.toLowerCase() == "سلام عليكم")) {
     return api.sendMessage("️ وعليكم السلام ورحمه الله وبركاته", threadID, messageID);
   };
   
   if ((event.body.toLowerCase() == "جيت") || (event.body.toLowerCase() == "سلام")) {
     return api.sendMessage("️منور", threadID, messageID);
   };
   if ((event.body.toLowerCase() == "منور") || (event.body.toLowerCase() == "منور نينو")) {
     return api.sendMessage("️نورك الأصل الأصيل بلا منازع او مثيل 👀💞", threadID, messageID);
   };
   
   if ((event.body.toLowerCase() == "ليكيب") || (event.body.toLowerCase() == "كراكم")) {
     return api.sendMessage("️نحن من قبيلة قريش🔥👥", threadID, messageID);
   };
   
   if ((event.body.toLowerCase() == "جيرو") || (event.body.toLowerCase() == "مزوني")) {
     return api.sendMessage("️ اسكت ي بل ما تفضحنا 🗿", threadID, messageID);
   };
   
if ((event.body.toLowerCase() == "كيفها حياتك ") || (event.body.toLowerCase() == "كيف حياتك")) {
     return api.sendMessage("️ماشيا الحمد لله وانت ❤️", threadID, messageID);
   };
   
   if ((event.body.toLowerCase() == "ماشيا") || (event.body.toLowerCase() == "بخير الحمد لله")) {
     return api.sendMessage("️دومك بخير وصحه  سعاده ", threadID, messageID);
   };
   
   if ((event.body.toLowerCase() == "راح نتبدل") || (event.body.toLowerCase() == "بدلة العقلية")) {
     return api.sendMessage("️الشجر يغير اوراقه لا جدوره🐉👆🏻", threadID, messageID);
   };
   
   if ((event.body.toLowerCase() == "لوفي") || (event.body.toLowerCase() == "زعيم القراصنة")) {
     return api.sendMessage("لوفي ولحية بيضاء ابناء اودا😐", threadID, messageID);
   };
   
   if ((event.body.toLowerCase() == "بوت") || (event.body.toLowerCase() == "يا لبوت")) {
     return api.sendMessage("️يودي اسمي نينو نتا تفهم من... 🙂😅", threadID, messageID);
   };
   
   if ((event.body.toLowerCase() == "بلال") || (event.body.toLowerCase() == "بلال لكيوت")) {
     return api.sendMessage("هو زاحف كبير يطبق المعني الحرفي لحريم السلطان", threadID, messageID);
   };
   
    if ((event.body.toLowerCase() == "سخانة") || (event.body.toLowerCase() == "سخانة تفشل")) {
     return api.sendMessage("نعم لكنني روبوت ولا اشعر بشيء", threadID, messageID);
   };
   
    if ((event.body.toLowerCase() == "الكراش") || (event.body.toLowerCase() == "كراشية")) {
     return api.sendMessage("️وسير اعشيري قلب على خدمة قعد تتلهوط هنا", threadID, messageID);
   };
   
    if ((event.body.toLowerCase() == "كوزينتك") || (event.body.toLowerCase() == "woman")) {
     return api.sendMessage("نعم يجب عليها البقاء في المطبخ لانه مكانها الطبيعي", threadID, messageID);
   };

  if ((event.body.toLowerCase() == "البرد") || (event.body.toLowerCase() == "الجو بارد")) {
     return api.sendMessage("️🙂اعملي كاس شاي يمنحرفة", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "ونبيس") || (event.body.toLowerCase() == "عمك")) {
     return api.sendMessage("نامي هانكوك ياماتو سقف الونبيس☺️🍑", threadID, messageID);
   };
  
  if ((event.body.toLowerCase() == "جيت") || (event.body.toLowerCase() == "مرحبا")) {
     return api.sendMessage("️نورت البيت🫣❤", threadID, messageID);
   };
   
   if ((event.body.toLowerCase() == "المطور") || (event.body.toLowerCase() == "من المطور")) {
     return api.sendMessage("ايوب حبيبي وروحي وتاج راسكم 💞🙃", threadID);
   };
   mess = "{name}"
  
  if (event.body.indexOf("نينو") == 0 || (event.body.indexOf("يا نينو") == 0)) {
    var msg = {
      body: ` ${rand}`
    }
    return api.sendMessage(msg, threadID, messageID);
  };

}

module.exports.run = function({ api, event, client, __GLOBAL }) { }