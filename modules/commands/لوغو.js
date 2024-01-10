const axios = require('axios');
const fs = require('fs');

module.exports.config = {
  name: "لوغو",
  version: "1.0",
  hasPermssion: 0,
  credits: "ǺᎩᎧᏬᏰ",
  description: "لوغو هه",
  usePrefix: false,
  commandCategory: "لوغو",
  usages: "['لوغو', 'اسم]'",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Users }) {
  let { messageID, senderID, threadID } = event;

  if (args.length >= 2 && args[0].toLowerCase() === "list") {
    let page = parseInt(args[1]);
    switch (page) {
      case 1:
        return api.sendMessage(
          `╔════ஜ۩۞۩ஜ═══╗\n\n𝑯𝑒𝒓𝒆'𝒔 𝒕𝒉𝒆 𝒍𝒐𝒈𝒐 𝒍𝒊𝒔𝒕 - 𝑷𝒂𝒈𝒆 1:\n\n
          ❍ 2خلل ❍ عمل ❍ دم ❍ وردي أسود ❍ مكسور ❍ عيد الميلاد ❍ كابتن أمريكا ❍ كربون ❍ دائرة ❍ كورور ❍ عيد الميلاد ❍ اكتشاف ❍ شيطان ❍ قطرة ماء ❍ خيال ❍ نار ❍ زجاج ❍ رعب أخضر ❍ خلل ❍ متعدد الطبقات ❍ ضوء ❍ الصهارة ❍ معدني ❍ نيون ❍ هيكل عظمي ❍ رسم ❍ حجر ❍ حب ❍ محول ❍ حائط\n\n
          𝑷𝑨𝑮𝑬 1 - 3\n\n╚════ஜ۩۞۩ஜ═══╝`,
          threadID,
          messageID
        );
      case 2:
        return api.sendMessage(
          `╔════ஜ۩۞۩ஜ═══╗\n\n𝑯𝑒𝒓𝒆'𝒔 𝒕𝒉𝒆 𝒍𝒐𝒈𝒐 𝒍𝒊𝒔𝒕 - 𝑷𝒂𝒈𝒆 2:\n\n
          ❍ ناروتو ❍ تنين النار ❍ بوبجي ❍ نجوم الليل ❍ ضوء الشمس ❍ سحابة ❍ خنزير ❍ كبر ❍ كتابة الحالة ❍ رعب ❍ شعار الفريق ❍ ملكة ❍ شاطئ ❍ fbc3 ❍ تاتو ❍ قميص3 ❍ بحر المحيط ❍ قميص4 ❍ قميص5 ❍ قميص6 ❍ رسالة حب ❍ chstm ❍ عيد الميلاد2 ❍ نص ثلجي ❍ فراشة ❍ القهوة ❍ الحب\n\n
          𝑷𝑨𝑮𝑬 2 - 3\n\n╚════ஜ۩۞۩ஜ═══╝`,
          threadID,
          messageID
        );
      case 3:
        return api.sendMessage(
          `╔════ஜ۩۞۩ஜ═══╗\n\n𝑯𝑒𝓇℮'𝓈 тн℮ ℓσgσ ℓιѕт - 𝑷𝒂𝒈𝒆 3:
          ❍ دخان\n\n𝑷𝑨𝑮𝑬 3 - 3\n\n╚════ஜ۩۞۩ஜ═══╝`,
          threadID,
          messageID
        );
      default:
        return api.sendMessage(
          `╔════ஜ۩۞۩ஜ═══╗\n\nرقم الصفحة غير صالح! الرجاء استخدام "القائمة 1" أو "القائمة 2" أو "القائمة 3" لعرض الشعار المتاح lists.\n\n╚════ஜ۩۞۩ஜ═══╝`,
          threadID,
          messageID
        );
    }
  }

  if (args.length < 2) {
    return api.sendMessage(
      `╔════ஜ۩۞۩ஜ═══╗\n\nتنسيق الأمر غير صالح! الاستخدام: قائمة الشعارات (رقم الصفحة) أو الشعار (اسم الشعار) (النص)\n\n╚════ஜ۩۞۩ஜ═══╝`,
      threadID,
      messageID
    );
  }

  let type = args[0].toLowerCase();
  let text = args.slice(1).join(" ");
  let pathImg = __dirname + `/cache/${type}_${text}.png`;
  let apiUrl, message;

      switch (type) {
        case "زجاج":
          apiUrl = `https://rest-api-001.faheem001.repl.co/api/textpro?number=4&text=${text}`;
          message = "إليك شعار [GLASS] الذي تم إنشاؤه:";
          break;
      case "عمل":
        apiUrl = `https://rest-api-001.faheem001.repl.co/api/textpro?number=5&text=${text}`;
        message = "هذا هو الشعار الذي تم إنشاؤه [𝑩𝑼𝑺𝑰𝑵𝑬𝑺𝑺]:";
        break;
      case "حائط":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/embossed?text=${text}`;
        message = "هذا هو الشعار الذي تم إنشاؤه [حائط]:";
       break;
      case "عطل فني":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/aglitch?text=${text}&text2=${text}`;
        message = "هذا هو الشعار الذي تم إنشاؤه [عطل فني]:"; 
          break;
      case "بيري":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/berry?text=${text}`;
        message = "هذا هو شعار [بيري] الذي تم إنشاؤه:";
          break;
      case "أسود وردي":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/blackpink?text=${text}`;
        message = "هذا هو شعار [أسود وردي] الذي تم إنشاؤه:";
          break;
      case "دم":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/blood?text=${text}`;
        message = "هذا هو شعار [دم] الذي تم إنشاؤه:";
          break;
      case "مكسور":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/broken?text=${text}`;
        message = "هذا هو شعار [مكسور] الذي تم إنشاؤه:";
            break;
      case "دخان":
        apiUrl = `https://api.lolhuman.xyz/api/photooxy1/smoke?apikey=0a637f457396bf3dcc21243b&text=${text}`;
        message = "هذا هو شعار [دخان] الذي تم إنشاؤه:";


        break;
      case "كابتن أمريكا":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/captainamerica?text=${test}&text2=${text}`;
        message = "هذا هو شعار [كابتن أمريكا] الذي تم إنشاؤه:";
          break;
      case "كربون":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/carbon?text=${text}`;
        message = "هذا هو شعار [كربون] الذي تم إنشاؤه:";
          break;
      case "يبكي":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/choror?text=${text}&text2=${text}`;
        message = "هذا هو شعار [يبكي] الذي تم إنشاؤه:";
          break;
      case "عيد الميلاد":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/christmas?text=${text}`;
        message = "هذا هو شعار [عيد الميلاد] الذي تم إنشاؤه:";
          break;
      case "دائرة كهربائية":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/circuit?text=${text}`;
        message = "هذا هو شعار [دائرة كهربائية] الذي تم إنشاؤه:";
          break;
      case "شيطان":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/devil?text=${text}`;
        message = "هذا هو شعار [شيطان] الذي تم إنشاؤه:";
          break;
      case "اكتشاف":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/discovery?text=${text}`;
        message = "هذا هو شعار [اكتشاف] الذي تم إنشاؤه:";
          break;
      case "قطرة الماء":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/dropwater?text=${text}`;
        message = "هذا هو شعار [قطرة الماء] الذي تم إنشاؤه:";
          break;
      case "خيالي":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/fiction?text=${text}`;
        message = "هذا هو شعار [خيالي] الذي تم إنشاؤه:";
          break;
      case "ألعاب نارية":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/firework?text=${text}`;
        message = "هذا هو شعار [ألعاب نارية] الذي تم إنشاؤه:";
          break;
      case "كورور":
        apiUrl = `https://rest-api-001.faheem001.repl.co/api/textpro?number=173&text=${text}`;
        message = "هذا هو شعار [كورور] الذي تم إنشاؤه:";
          break;
      case "لامع":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/glossy?text=${text}`;
        message = "هذا هو شعار [لامع] الذي تم إنشاؤه:";
          break;
      case "صمغ":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/glue?text=${text}`;
        message = "هذا هو شعار [صمغ] الذي تم إنشاؤه:";
          break;
      case "الانحدار":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/gradient?text=${text}`;
        message = "هذا هو شعار [الانحدار] الذي تم إنشاؤه:";
          break;
      case "رعب أخضر":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/greenhorror?text=${text}`;
        message = "هذا هو شعار [رعب أخضر] الذي تم إنشاؤه:";
          break;
      case "مرعب":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/spooky?text=${text}&text2=${text}`;
        message = "هذا هو شعار [مرعب] الذي تم إنشاؤه:";
          break;
      case "خلل2":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/imglitch?text=${text}`;
        message = "هذا هو شعار [خلل2] الذي تم إنشاؤه:";
          break;
      case "الطبقات":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/layered?text=${text}&text2=${text}`;
        message = "هذا هو شعار [الطبقات] الذي تم إنشاؤه:";
          break;
      case "ضوء":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/light?text=${text}`;
        message = "هذا هو شعار [ضوء] الذي تم إنشاؤه:";
          break;
      case "الصهارة":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/magma?text=${text}`;
        message = "هذا هو شعار [الصهارة] الذي تم إنشاؤه:";
      break;
      case "معدني":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/metallic?text=${text}`;
        message = "هذا هو شعار [معدني] الذي تم إنشاؤه:";
      break;
      case "نيون":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/neon?text=${text}`;
        message = "هذا هو شعار [نيون] الذي تم إنشاؤه:";
          break;
      case "هيكل عظمي":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/skeleton?text=${text}`;
        message = "هذا هو شعار [هيكل عظمي] الذي تم إنشاؤه:";
          break;
      case "رسم":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/sketch?text=${text}`;
        message = "هذا هو شعار [رسم] الذي تم إنشاؤه:"; 
          break;
      case "حجر":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/stone?text=${text}`;
        message = "هذا هو شعار [رسم] الذي تم إنشاؤه:";break;
      case "محول":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/textpro/transformer?text=${text}`;
        message = "هذا هو شعار [محول] الذي تم إنشاؤه:";
          break;
      case "نار":
        apiUrl = `https://chards-bot-api.richardretadao1.repl.co/api/photooxy/flaming?text=${text}`;
        message = "هذا هو شعار [نار] الذي تم إنشاؤه:";
          break;
      case "ناروتو":
        apiUrl = `https://rest-api-2.faheem007.repl.co/api/photooxy/naruto?text=${text}`;
        message = "هذا هو شعار [ناروتو] الذي تم إنشاؤه:";
          break;
      case "نيران التنين":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/dragonfire?text=${text}`;
        message = "هذا هو شعار [نيران التنين] الذي تم إنشاؤه:";
          break;
      case "الصورة الرمزية":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/lolnew?text=${text}`;
        message = "هذا هو شعار [الصورة الرمزية] الذي تم إنشاؤه:";
          break;
      case "بوبجي":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/pubgavatar?text=${text}`;
        message = "هذا هو شعار [بوبجي] الذي تم إنشاؤه:";
          break;
      case "نجوم الليل":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/nightstars?text=${text}`;
        message = "هذا هو شعار [نجوم الليل] الذي تم إنشاؤه:";
          break;
      case "ضوء الشمس":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/sunlight?text=${text}`;
        message = "هذا هو شعار [ضوء الشمس] الذي تم إنشاؤه:";
          break;
      case "سحاب":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/cloud?text=${text}`;
        message = "هذا هو شعار [سحاب] الذي تم إنشاؤه:";
          break;
      case "خنزير":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/pig?text=${text}`;
        message = "هذا هو شعار [خنزير] الذي تم إنشاؤه:";
          break;
      case "الكبر":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/caper?text=${text}`;
        message = "هذا هو شعار [الكبر] الذي تم إنشاؤه:";
           break;
      case "رعب":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/horror?text=${text}`;
        message = "هذا هو شعار [رعب] الذي تم إنشاؤه:";
           break;
      case "حالة الكتابة":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/writestatus?text=${text}&text2=Your%20Quotes%20In%20Herm`;
        message = "هذا هو شعار [حالة الكتابة] الذي تم إنشاؤه:";
           break;
      case "شعار الفريق":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/teamlogo?text=${text}`;
        message = "هذا هو شعار [شعار الفريق] الذي تم إنشاؤه:";
           break;
      case "شاطئ":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/beach?text=${text}`;
        message = "هذا هو شعار [شاطئ] الذي تم إنشاؤه:";
           break;
      case "ملكة":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/queen?text=${text}`;
        message = "هذا هو شعار [ملكة] الذي تم إنشاؤه:";
           break;
      case "fbc3":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/facebookcover3?text=${text}`;
        message = "here's the [FBC3] Logo created:";
           break;
      case "يلمس":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/tatto?text=${text}`;
        message = "هذا هو شعار [يلمس] الذي تم إنشاؤه:";
           break;
      case "قميص3":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/shirt3?text=${text}&text2=20`;
        message = "هذا هو شعار [قميص3] الذي تم إنشاؤه:";
           break;
      case "محيط البحر":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/photooxy/oceansea?text=${text}`;
        message = "هذا هو شعار [محيط البحر] الذي تم إنشاؤه:";
           break;
      case "قميص4":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/shirt4?text=${text}&text2=20`;
        message = "هذا هو شعار [قميص4] الذي تم إنشاؤه:";
           break;
      case "قميص5":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/shirt5?text=${text}&text2=20`;
        message = "هذا هو شعار [قميص5] الذي تم إنشاؤه:";
           break;
      case "shirt6":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/shirt6?text=${text}&text2=20`;
        message = "here's the [SHIRT6] Logo created:";
           break;
      case "رسالة حب":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/photooxy/lovemessage?text=${text}`;
        message = "هذا هو شعار [رسالة حب] الذي تم إنشاؤه:";
           break;
      case "chstm":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/Chirstmasvideo?text=${text}&type=video/mp4`;
        message = "here's the [CHIRTMAS] Logo created:";
           break;
      case "عيد الميلاد2":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/Christmas2?text=${text}`;
        message = "هذا هو شعار [عيد الميلاد2] الذي تم إنشاؤه:";
           break;
      case "نص الجليد":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/icetext?url=https://i.imgur.com/BTPUTRQ.jpg&text=${text}`;
        message = "هذا هو شعار [نص الجليد] الذي تم إنشاؤه:";
          break;
      case "فراشة":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/photooxy/butterfly?text=${text}`;
        message = "هذا هو شعار [الفراشة] الذي تم إنشاؤه:";
          break;
      case "قهوة":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/photooxy/coffecup?text=${text}`;
        message = "هذا هو شعار [القهوة] الذي تم إنشاؤه:";
           break;
      case "حب":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/lovetext?text=${text}`;
        message = "هذا هو شعار [حب] الذي تم إنشاؤه:";
           break;
      case "مقدمة2":
        apiUrl = `https://faheem-vip-010.faheem001.repl.co/api/ephoto/intro2?text=${text}&type=video/mp4`;
        message = "هذا هو شعار [مقدمة2] الذي تم إنشاؤه:";


          break;
        default:
          return api.sendMessage(
            `•°•°•°•°•°•°۩۞۩°•°•°•°•°•°•\n\nنوع الشعار غير صالح! يستخدم "list 1" لرؤية قائمة شعارات textpro.\n\n•°•°•°•°•°•°۩۞۩°•°•°•°•°•°•`,
            threadID,
            messageID
          );
      }

      try {
        let response = await axios.get(apiUrl, { responseType: "arraybuffer" });
        fs.writeFileSync(pathImg, Buffer.from(response.data, "binary"));

        return api.sendMessage(
          {
            attachment: fs.createReadStream(pathImg),
            body: message
          },
          threadID,
          () => fs.unlinkSync(pathImg)
        );
      } catch (err) {
        console.error(err);
        return api.sendMessage(
          `╔════ஜ۩۞۩ஜ═══╗\n\nحدث خطأ أثناء إنشاء الشعار. الرجاء معاودة المحاولة في وقت لاحق.\n\n╚════ஜ۩۞۩ஜ═══╝`,
          threadID,
          messageID
    );
  }
};