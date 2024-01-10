module.exports.config = {
  name: "nino",
  version: "1.0.0",
  hasPermission: 0,
  description: "Harold bot that can download facebook videos, sing, search image, search lyrics and more..",
  Prefix: false,
  credits: "Deku and Modified by Jonell Magallanes(botpack)",
  usages: "[help]",
  commandCategory: "Harold Hutchins",
  cooldowns: 10,
};
const axios = require("axios"),
  fs = require("fs"),
  fbvid = __dirname+"/cache/fbvid.mp4",
  fbimg = __dirname+"/cache/fbimg.png",
  fbmp3 = __dirname+'/cache/fbmp3.mp3',
  audio = __dirname+"/cache/audio.mp3",
  tikvid = __dirname+"/cache/tikvid.mp4";
const getFBInfo = require("@xaviabot/fb-downloader");
const usetube = require('usetube');
const ytdl = require('ytdl-core');
const google = require("googlethis");
const cloudscraper = require("cloudscraper");
const cheerio = require("cheerio");
const request = require("request");
module.exports.run = async function ({ api, args, event }){
let txt = args[0] === "ai" ? args.slice(1).join(" ") : args.join(" ");
const { threadID, messageID, body } = event;
  const rand = ["مرحبًا أيها المستخدم، إذا كنت لا تعرف كيفية استخدامي، فقط اكتب <nino help>","مرحبًا، أنا المستخدم nino Bot، كيف يمكنني مساعدتك اليوم؟ 😊", "مرحبًا أيها المستخدم، هل يمكنني الغناء لك؟ 🥰", "مرحبًا، هل تعلم أيها المستخدم أنه يمكنني الغناء وتنزيل مقاطع فيديو الفيسبوك والبحث عن الصور والمزيد...", "انـا ذكـاء اصـطـنـاعـي تـم تـطـويـري بـواسـطـة https://www.facebook.com/Theshadowisblack "];
  const rand1 = rand[Math.floor(Math.random() * rand.length)];
  if (txt.toLowerCase() == "help"){
    const message = `•——[NINO PRO BOT]——•
هذه هي الأشياء التي يمكنني القيام بها كروبوت.

•NINO يستطيع نينو أن يغني الأغاني.

فقط اكتب <nino هل تستطيع الغناء (عنوان الأغنية)> او <nino غني (عنوان الأغنية)> وطالما أن هناك كلمة غناء وعنوان الأغنية، فيمكنه اكتشافها تلقائيا


•NINO يمكن تنزيل مقاطع فيديو الفيسبوك.

فقط اكتب <nino هل يمكنك تنزيل فيديو الفيسبوك هذا (رابط فيديو الفيسبوك)> او <nino قم بتنزيل فيديو الفيسبوك هذا (رابط فيديو الفيسبوك)> طالما أن هناك كلمة 'facebook video' أو 'download' وعنوان url لفيديو fb، فيمكن اكتشافه تلقائيا.


•NINO يمكن البحث عن الصور.

فقط اكتب <nino هل يمكنك البحث عن صورة (بحثك)> او <nino صورة (بحثك)> طالما أن هناك كلمة 'صورة' أو 'صورة' وبحثك يمكنه اكتشافها تلقائيا.


•NINO يمكن البحث عن الفيديو من يوتيوب.

فقط اكتب <nino هل يمكنك إرسال فيديو ل (بحثك)> او <nino فيديو (بحثك)> وأكثر من ذلك... طالما أن هناك كلمة 'فيديو لـ' وقمت بالبحث، فسيتم إرسال مقطع فيديو تلقائيا

•NINO تستطيع التحدث.

فقط اكتب <nino قل (رسالة)>.

•NINO يمكن إرسال كلمات.

فقط اكتب <nino هل يمكن أن تعطيني كلمات (song name)> or <nino كلمات الاغنية (إسم الأغنية)> طالما أن هناك كلمة 'كلمات' واسم الأغنية سيتم اكتشافها تلقائيا.

•NINO يمــكن تنـزيـل مــقـاطـع فيـديـو تيك تــوك باسـتخـدام الـرابـط

فقط اكتب <nino هل يمكنك تنزيل رابط تيك توك هذا (و تيك توك الرابط الخاص بك)> و <nino قم بتنزيل رابط تيك توك (رابط التيك توك الخاص بك)>

•NINO يمــكـن ارسـال فيديو تيك توك

فقط اكتب <nino هل يمكنك ارسال فيديو التيك توكـ (بحثك)> او <nino تحميل تيك توك (بحثك)> or <nino تحميل تيك توك (بحثك)>

هل لديك اسئلة؟ فقط اتصل بمسؤول نوع الروبوت <(بادئة)المطور> لعرض قائمة المشرف.`;
    return api.sendMessage(message, event.threadID, event.messageID)
  }
if (!txt) return api.sendMessage(rand1, threadID, messageID);
 if (txt.toLowerCase().startsWith("شكرا لك") || txt.toLowerCase().startsWith("شكر")) return api.sendMessage("فنحن نرحب بك أيها المستخدم 🤗", threadID, messageID);
  if (txt.toLowerCase() == "هي" || txt.toLowerCase() == "اهلا" || txt.toLowerCase() == "هلو" || txt.toLowerCase() == "hi" || txt.toLowerCase() == "هاي") return api.sendMessage(rand1, threadID, messageID);
  if (txt.toLowerCase().includes("من طورك") || txt.toLowerCase().includes("من هو سيدك") || txt.toLowerCase().includes("من صنعك") || txt.toLowerCase().includes("من هو مطور الخاص بك")) return api.sendMessage("أنا nino تم تعديله بواسطة ayoub .", event.threadID, event.messageID);
  if (txt.toLowerCase().includes("من هو ايوب") || txt.toLowerCase().includes("من ايوب")) return api.sendMessage("مشرف البوت", threadID, messageID);
if (txt.startsWith("هل يمكنك تحميل هذا الفيديو الفيسبوك") || txt.includes("fb") || txt.includes("https://facebook.com") || txt.includes("https://www.facebook.com/") || txt.toLowerCase().includes("فيديو الفيسبوك")){
  api.sendMessage("بالتأكيد أعطني المستخدم ثانية لتنزيل الفيديو 😊.", threadID, messageID);
  const regex = /https:\/\/www\.facebook\.com\/\S+/;
const match = txt.match(regex);
const url = match ? match[0] : null;
  if (!match) return api.sendMessage("يرجى تقديم عنوان URL صالح", threadID, messageID)
  try {
  const result = await getFBInfo(url)
    //api.sendMessage(encodeURI(result.sd), threadID, messageID);
  let vid = (await axios.get(encodeURI(result.sd),{ responseType:'arraybuffer'} )).data;
  fs.writeFileSync(fbvid, Buffer.from(vid, "utf-8"));
  return api.sendMessage({body: "وهنا مستخدم الفيديو الخاص بك.", attachment: fs.createReadStream(fbvid)}, event.threadID, () => fs.unlinkSync(fbvid), event.messageID)
  } catch (e){
    return api.sendMessage("أوه، أنا آسف، للأسف لا أستطيع تنزيل هذا الفيديو 😔", threadID, messageID)
    }
  }
if (txt.toLowerCase().startsWith("هل تستطيع الغناء") || txt.toLowerCase().includes("Song") || txt.toLowerCase().startsWith("غني")){
  const path = `${__dirname}/cache/song.mp3`;
const regex = /sing\s(.+)/;
var msg = ""
const match = txt.match(regex);
const wordsAfterSing = match ? match[1].split(" ") : [];
for (let i of wordsAfterSing){
  msg += i+" "
}
  if (match){
  try {
      const random = Math.floor(Math.random() * 3) + 1;
  const rest = await usetube.searchVideo(msg);
var ok = rest.videos[random]
  const stream = ytdl("https://www.youtube.com/watch?v="+ok.id, { filter: 'audioonly' });
    api.sendMessage("نعم نعم بالتأكيد فقط يرجى الانتظار...", event.threadID, event.messageID);
    const res = await axios.get('https://lyrist.vercel.app/api/'+msg);
const { lyrics, artist, title } = res.data;
stream.pipe(fs.createWriteStream(path)).on('finish', () => {
        api.sendMessage({body: `هذا هو طلبك المستخدم، اغنية!😊\n\ كلمات ${title} بواسطة ${artist}\n\n${lyrics}`, attachment: fs.createReadStream(path)}, event.threadID, () => fs.unlinkSync(path), event.messageID);
      });
} catch (e){
    return api.sendMessage("أوه أنا آسف، أعتقد أنني نسيت كلمات الأغنية 😅", event.threadID, event.messageID)
   } 
  }
}
if (txt.toLowerCase().startsWith("هل يمكنك إرسال فيديو ل") || txt.toLowerCase().includes("dlvideo") || txt.toLowerCase().startsWith("فيديو") || txt.toLowerCase().startsWith("هل يمكنك أن ترسل لي فيديو")){
const regex = /of\s(.+)/i;
var msg = " "
const match = txt.match(regex);
const wordsAfterSing = match ? match[1].split(" ") : [];
  if (match){
for (let i of wordsAfterSing){
  msg += i+" "
}
  try {
      const random = Math.floor(Math.random() * 3) + 1;
  const res = await usetube.searchVideo(msg);
var ok = res.videos[random]
  const stream = ytdl("https://www.youtube.com/watch?v="+ok.id, { filter: 'audioandvideo',
  quality: 'highestvideo',
  format: 'mp4', });
    api.sendMessage("حسنا لاحظ المستخدم فقط من فضلك انتظر 😘...", event.threadID, event.messageID);
      const path = `${__dirname}/cache/song.mp4`; stream.pipe(fs.createWriteStream(path)).on('finish', () => {
        api.sendMessage({body: "إليك طلبك! المستخدم عنوان هذا الفيديو هو ["+ok.title+"]\nاستمتع بالمشاهدة 🥰", attachment: fs.createReadStream(path)}, event.threadID, () => fs.unlinkSync(path), event.messageID);
      });
} catch (e){
    return api.sendMessage("آسف سيدي آسف ولكن أعتقد أنني نسيت الكلمات 😅", event.threadID, event.messageID)
    }
  }
} else if (txt.toLowerCase().startsWith("ارسال صورة") || txt.toLowerCase().includes("image") || txt.toLowerCase().startsWith("صور ل")){
const regex = /of\s(.+)/;
var msg = ""
const match = txt.match(regex);
const wordsAfterSing = match ? match[1].split(" ") : [];
for (let i of wordsAfterSing){
  msg += i+" "
}
  if (match){
    api.sendMessage("بالتأكيد لا توجد مشكلة فقط انتظر....", event.threadID, event.messageID)
  let result = await google.image(txt, {safe: false});
  if(result.length === 0) {
    api.sendMessage(`أوه، أنا آسف ولكن لا يمكنني العثور على الصورة التي تريد البحث عنها.`, event.threadID, event.messageID)
    return;
  }
  let streams = [];
  let counter = 0;
  console.log(result)
    for(let image of result) {
    // Only show 6 images
    if(counter >= 6)
      break;

    console.log(`${counter} : ${image.url}`);

    // Ignore urls that does not ends with .jpg or .png
    let url = image.url;
    if(!url.endsWith(".jpg") && !url.endsWith(".png"))
      continue;

   let path = __dirname + `/cache/search-image-${counter}.jpg`;
    let hasError = false;
    await cloudscraper.get({uri: url, encoding: null})
      .then((buffer) => fs.writeFileSync(path, buffer))
      .catch((error) => {
        console.log(error)
        hasError = true;
      });

    if(hasError)
      continue;

    console.log(`Pushed to streams : ${path}`) ;
    streams.push(fs.createReadStream(path).on("end", async () => {
      if(fs.existsSync(path)) {
        fs.unlink(path, (err) => {
          if(err) return console.log(err);

          console.log(`Deleted file : ${path}`);
        });
      }
    }));

    counter += 1;
  }

  api.sendMessage("العثور على الصورة...", event.threadID, event.messageID)

  let msg = {
    body: `مرحبا المستخدم هنا 🫡.`,
    attachment: streams
  };

  api.sendMessage(msg, event.threadID, event.messageID);
   }
} if (txt.toLowerCase().startsWith("قل")){
  const phrase = txt.replace(/\bsay\b/, "");
  if (phrase){
    const vm = (await axios.get(`https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(phrase)}&tl=tl&client=tw-ob`, {
  responseType: "arraybuffer"
})
).data
fs.writeFileSync(audio, Buffer.from(vm, "utf-8"));
  return api.sendMessage({attachment: fs.createReadStream(audio)}, event.threadID, event.messageID)
 }
} 
if (txt.toLowerCase().startsWith("هل يمكن أن تعطيني كلمات") || txt.toLowerCase().includes("words") || txt.toLowerCase().startsWith("كلمات الاغنية") || txt.toLowerCase().includes("كلام")){
const regex = /of\s(.+)/;
const match = txt.match(regex);
  if (match){
    try {
const wordsAfterOf = match ? match[1] : " ";
    api.sendMessage("نعم لاحظة فقط يرجى الانتظار ثانية :) ...", threadID, messageID);
    const res = await axios.get('https://lyrist.vercel.app/api/'+wordAfterOf);
const { image, lyrics, artist, title } = res.data;
    let ly = __dirname+"/cache/lyrics.png";
    let ly1 = (await axios.get(image, {
    responseType: "arraybuffer"
  })).data;
  fs.writeFileSync(ly, Buffer.from(ly, "utf-8"));
    return api.sendMessage({body: `إليك طلبك يا مستخدم 😊\n\nكلمات ${title} بواسطة ${artist}\n\n${lyrics}`, attachment: fs.createReadStream(ly)}, threadID, () => fs.unlinkSync(ly), messageID)
  } catch (e){
      console.log(e)
          return api.sendMessage("Can't find lyrics", threadID, messageID)
  }
  }
} 
  if(txt.toLowerCase().startsWith("هل يمكنك تنزيل رابط تيك توك هذا") || txt.toLowerCase().startsWith("قم بتنزيل رابط تيك توك هذا")){
const matchResult = txt.match(/link(.*)/);
    if (!matchResult) return api.sendMessage("Invalid syntax", threadID, messageID);

if (matchResult && matchResult.length > 1) {
const url = matchResult[1].trim();
   api.sendMessage("حسنا تمت الإشارة إليه فقط من فضلك انتظر...", threadID, messageID);
// console.log(textAfterTikTok);
  try {
    const rest = await axios.get("https://free-api.ainz-sama101.repl.co/tiktok/tiktokdl?link="+url);
    var vid = rest.data.wmplay
    var title = rest.data.title
      const re = (await axios.get(encodeURI(vid), {responseType: "arraybuffer"}));
      fs.writeFileSync(tikvid, Buffer.from(re, "utf-8"));
return api.sendMessage({body: "وهنا المستخدم طلبك 😊\nعنوان: "+title, attachment: fs.createReadStream(tikvid)}, threadID, messageID)
  } catch (tikerr){
 api.sendMessage("آسف لا أستطيع :(", threadID, messageID);
    return api.sendMessage(tikerr.message, threadID)
  }
}
  }
  if (txt.toLowerCase().startsWith("هل يمكنك ارسال فيديو التيك توك") || txt.toLowerCase().startsWith("تحميل تيك توك") || txt.toLowerCase().includes("tiktok")){
    const matchResult = txt.match(/of(.*)/);
    if (!matchResult) return api.sendMessage("Invalid syntax", threadID, messageID);

if (matchResult && matchResult.length > 1) {
const search = matchResult[1].trim();
   api.sendMessage("نعم لاحظة فقط يرجى الانتظار...", threadID, messageID);
// console.log(textAfterTikTok);
  try {
    const rest = await axios.get(" https://free-api.ainz-sama101.repl.co/tiktok/tiksearch?q="+search)
    var vid = rest.data.play
    var title = rest.data.title
      const re = (await axios.get(encodeURI(vid), {responseType: "arraybuffer"})).data;
      fs.writeFileSync(tikvid, Buffer.from(re, "utf-8"));
return api.sendMessage({body: "وهنا المستخدم طلبك 😊\nعنوان: "+title, attachment: fs.createReadStream(tikvid)}, threadID, messageID)
  } catch (tikerr){
 api.sendMessage("آسف لا أستطيع :(", threadID, messageID);
    return api.sendMessage(tikerr.message, threadID)
  }
}
  }
  if (txt.toLowerCase().startsWith("معنى") || txt.toLowerCase().startsWith("meaning") || txt.toLowerCase().includes('meaning of')){
    var c = 0
    const match = txt.match(/of(.*)/)
    if (!match) return api.sendMessage("بناء جملة غير صالح", threadID, messageID);
    try {
      const wordsAfterOf = match ? match[1] : "";
    const response = await google.search('معنى'+wordsAfterOf);
var ok = ""
for (let i of response.dictionary.definitions){
  c += 1
ok += c+". "+i+"\n"
}

/*console.log(response.dictionary)
console.log(`Word: ${response.dictionary.word}\nDefinition: ${ok}`);*/
   return api.sendMessage(`📃𝚆𝙾𝚁𝙳: “${response.dictionary.word}”\n\n📄𝙳𝙴𝙵𝙸𝙽𝙸𝚃𝙸𝙾𝙽:\n\n${ok}`, threadID, messageID);
     api.sendMessage({attachment: fs.createReadStream(audio)}, threadID, () => fs.unlinkSync(audio), messageID)
  } catch (e){
      console.log(e.message)
      api.sendMessage("أوه أنا آسف لا أستطيع العثور على المعنى.", threadID)// of\s(.+)/;
  }
  }
  }