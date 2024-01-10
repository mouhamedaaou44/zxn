module.exports.config = {
    name: "سلوت",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Mirai Team",
    description: "القمار على شكل فاكهة!",
    commandCategory: "Game",
    usages: "slot [số coin cần đặt]",
    cooldowns: 5,
};

module.exports.languages = {
    "vi": {
        "missingInput": "[⚜️]➜ Số tiền đặt cược không được để trống hoặc là số âm!",
        "moneyBetNotEnough": "[⚜️]➜ Số tiền bạn đặt lớn hơn hoặc bằng số dư của bạn!",
        "limitBet": "[⚜️]➜ Số tiền đặt không được dưới 500$!",
        "returnWin": "[⚜️]=== 『 PLAY SLOT 』 ===[⚜️]\n◆━━━━━━━━━━━━━━━━◆\n\n[⚜️]➜ Kết quả slot: %1 | %2 | %3\n[⚜️]➜ Bạn đã thắng với: %4$",
        "returnLose": "[⚜️]=== 『 PLAY SLOT 』 ===[⚜️]\n◆━━━━━━━━━━━━━━━━◆\n\n[⚜️]➜ Kết quả slot: %1 | %2 | %3\n[⚜️]➜ Bạn đã thua và mất: %4$"
    },
    "en": {
        "missingInput": "[⚜️]➜ يجب ألا يكون مبلغ الرهان فارغًا أو رقمًا سالبًا",
        "moneyBetNotEnough": "[⚜️]➜ الأموال التي راهنت بها أكبر من رصيدك!",
        "limitBet": "[⚜️]➜ رهانك منخفض جدًا، الحد الأدنى هو 50 دولارًا",
        "returnWin": "🎰 %1 | %2 | %3 🎰\nلقد ربحت مع %4$",
        "returnLose": "🎰 %1 | %2 | %3 🎰\nلقد خسرت وخسرت %4$"
    }
}
async function getIMG(item1, item2, item3){
  try{
  console.log({item1, item2, item3})
    if(item1 == "🍇") item1 = "https://imgur.com/jWmzlgG.png";
    if(item1 == "🍉") item1 = "https://imgur.com/FmWC4eK.png";
    if(item1 == "🍊") item1 = "https://imgur.com/gaUbeiY.png";
    if(item1 == "🍏") item1 = "https://imgur.com/gyztTV3.png";
    if(item1 == "7⃣") item1 = "https://imgur.com/IqU7tlM.png";
    if(item1 == "🍓") item1 = "https://imgur.com/gQtvMRq.png";
    if(item1 == "🍒") item1 = "https://imgur.com/Q0PZJGq.png";
    if(item1 == "🍌") item1 = "https://imgur.com/kH7VSr3.png";
    if(item1 == "🥝") item1 = "https://imgur.com/1qo4T8o.png";
    if(item1 == "🥑") item1 = "https://imgur.com/HcExpOY.png";
    if(item1 == "🌽") item1 = "https://imgur.com/mjlUTQJ.png";
    if(item2 == "🍇") item2 = "https://imgur.com/jWmzlgG.png";
    if(item2 == "🍉") item2 = "https://imgur.com/FmWC4eK.png";
    if(item2 == "🍊") item2 = "https://imgur.com/gaUbeiY.png";
    if(item2 == "🍏") item2 = "https://imgur.com/gyztTV3.png";
    if(item2 == "7⃣") item2 = "https://imgur.com/IqU7tlM.png";
    if(item2 == "🍓") item2 = "https://imgur.com/gQtvMRq.png";
    if(item2 == "🍒") item2 = "https://imgur.com/Q0PZJGq.png";
    if(item2 == "🍌") item2 = "https://imgur.com/kH7VSr3.png";
    if(item2 == "🥝") item2 = "https://imgur.com/1qo4T8o.png";
    if(item2 == "🥑") item2 = "https://imgur.com/HcExpOY.png";
    if(item2 == "🌽") item2 = "https://imgur.com/mjlUTQJ.png";
    if(item3 == "🍇") item3 = "https://imgur.com/jWmzlgG.png";
    if(item3 == "🍉") item3 = "https://imgur.com/FmWC4eK.png";
    if(item3 == "🍊") item3 = "https://imgur.com/gaUbeiY.png";
    if(item3 == "🍏") item3 = "https://imgur.com/gyztTV3.png";
    if(item3 == "7⃣") item3 = "https://imgur.com/IqU7tlM.png";
    if(item3 == "🍓") item3 = "https://imgur.com/gQtvMRq.png";
    if(item3 == "🍒") item3 = "https://imgur.com/Q0PZJGq.png";
    if(item3 == "🍌") item3 = "https://imgur.com/kH7VSr3.png";
    if(item3 == "🥝") item3 = "https://imgur.com/1qo4T8o.png";
    if(item3 == "🥑") item3 = "https://imgur.com/HcExpOY.png";
    if(item3 == "🌽") item3 = "https://imgur.com/mjlUTQJ.png";
    return [item1, item2, item3];
  }
  catch(e){
    return e
  }
}
module.exports.run = async function({ api, event, args, Currencies, getText }) {
    const { threadID, messageID, senderID } = event;
    const { getData, increaseMoney, decreaseMoney } = Currencies;
    const slotItems = ["🍇", "🍉", "🍊", "🍏", "7⃣", "🍓", "🍒", "🍌", "🥝", "🥑", "🌽"];
    const moneyUser = (await getData(senderID)).money;
    var img = []
    var moneyBet = parseInt(args[0]);
    if (isNaN(moneyBet) || moneyBet <= 0) return api.sendMessage(getText("missingInput"), threadID, messageID);
	if (moneyBet > moneyUser) return api.sendMessage(getText("moneyBetNotEnough"), threadID, messageID);
	if (moneyBet < 500) return api.sendMessage(getText("limitBet"), threadID, messageID);
    var number = [], win = false;
    for (i = 0; i < 3; i++) number[i] = Math.floor(Math.random() * slotItems.length);
    var img1 = await getIMG(slotItems[number[0]] , slotItems[number[1]] , slotItems[number[2]]);
    for (i = 0; i < 3; i++) {
      const t = (await require('axios').get(`${img1[i]}`, {
                    responseType: "stream"
                }))
                .data;
            img.push(t)
    }
   if(number[0] == "7⃣" && number[1] == "7⃣" && number[2] == "7⃣"){
    moneyBet *= 12;
    win = true;
  }
  else  if (number[0] == number[1] && number[1] == number[2]) {
        moneyBet *= 9;
        win = true;
    }
    else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
        moneyBet *= 2;
        win = true;
    }

    switch (win) {
        case true: {
          api.sendMessage({
            body: `[⚜️]=== 『 PLAY SLOT 』 ===[⚜️]\n◆━━━━━━━━━━━━━━━━◆\n\n[⚜️]➜ نتائج اللفة: ${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n[⚜️]➜ لقد فزت: +${moneyBet}$`, 
            attachment: img
          }, threadID, messageID)
            await increaseMoney(senderID, moneyBet);
            break;
        }
        case false: {
           api.sendMessage({
            body: `[⚜️]=== 『 PLAY SLOT 』 ===[⚜️]\n◆━━━━━━━━━━━━━━━━◆\n\n[⚜️]➜ نتائج اللفة: ${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n[⚜️]➜ لقد خسرة: -${moneyBet}$`, 
            attachment: img
          }, threadID, messageID)
            await decreaseMoney(senderID, moneyBet);
            break;
        }
    }
}
