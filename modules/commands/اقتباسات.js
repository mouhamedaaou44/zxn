module.exports.config = {

  name: "صور1",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "John Roy",
  description: "قم بالبحث عن صور",
  commandCategory: "وسائط",
  usages: "صور [نص]",
  cooldowns: 5,
  dependencies: {

     "axios":"",
     "fs-extra":"",
    "googlethis":"",
        "cloudscraper":""
  }
};




module.exports.run = async ({matches, event, api, extra, args}) => {

    const axios = global.nodemodule['axios'];
    const google = global.nodemodule["googlethis"];
const cloudscraper = global.nodemodule["cloudscraper"];
const fs = global.nodemodule["fs"];

var query = (event.type == "message_reply") ? event.messageReply.body : args.join(" ");
  //let query = args.join(" ");
  api.sendMessage(`🔎 | جاري البحث عن ${query}...`, event.threadID, event.messageID);

  let result = await google.image(query, {safe: false});
  if(result.length === 0) {
    api.sendMessage(`⚠️  صور البحث الخاصة بك لم يرجع بأي نتيجة.`, event.threadID, event.messageID)
    return;
  }

  let streams = [];
  let counter = 0;

  console.log(result)

  for(let image of result) {
    // Only show 6 images
    if(counter >= 6)
      break;

    console.log(`${counter}: ${image.url}`);

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

    console.log(`دفعت إلى تيارات: ${path}`) ;
    streams.push(fs.createReadStream(path).on("end", async () => {
      if(fs.existsSync(path)) {
        fs.unlink(path, (err) => {
          if(err) return console.log(err);

          console.log(`الملف المحذوف: ${path}`);
        });
      }
    }));

    counter += 1;
  }

  api.sendMessage("⏳ | جاري إرسال الصور...", event.threadID, event.messageID)

  let msg = {
    body: `--------------------\nنتائج البحث\n"${query}"\n\nما تم إيجاده: ${result.length} صورة${result.length > 1 ? 's' : ''}\nيمكن أن تظهر فقط: 6 صور\n\n--------------------`,
    attachment: streams
  };

  api.sendMessage(msg, event.threadID, event.messageID);
};



