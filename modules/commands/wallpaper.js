module.exports.config = {
  name: "ai",
  version: "2.0.8",
  hasPermssion: 0,
  credits: "ǺᎩᎧᏬᏰ",
  description: "AI",
  commandCategory: "Ai",
  usages: "ai [سؤال]",
  cooldowns: 5,
  dependencies: {
    "openai": ""
  }
};

const { Configuration, OpenAIApi } = require("openai");

module.exports.run = async function({ api, event, args }) {
  const text = args.join(" ");

  try {
    if (!text) {
      return api.sendMessage(
        "يرجى تقديم استفسار",
        event.threadID,
        event.messageID
      );
    }

    let headers = {
      message: text,
    };

    if (event.type === "message_reply") {
      const attachment = event.messageReply.attachments[0];
      const filename = attachment.filename;

      const imageResponse = await axios.get(attachment.url, {
        responseType: "arraybuffer",
      });

      // Write the image data to a file
      fs.writeFileSync(`cache/${filename}.jpg`, Buffer.from(imageResponse.data, "binary"));
      if (attachment && attachment.type === "photo") {
        headers = {
          message: text,
         image:attachment.url
      }
    }
    }
    api.sendMessage(
      "ⓝⓘⓝⓞ: يفكر 🔁ُ",
      event.threadID,
      event.messageID
    );

    const response = await axios.get(
      `https://api.easy0.repl.co/api/Llama/completion`,
      { headers }
    );

    const respond = response.data.response;
    api.sendMessage(respond, event.threadID);
    console.log(respond)
    
  } catch (error) {
    console.error("حدث خطأ:", error);
    api.sendMessage("أُووبس! هناك خطأ ما.", event.threadID, event.messageID);
  }


}

  
};