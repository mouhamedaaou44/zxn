 var request = require("request");const { readdirSync, readFileSync, writeFileSync, existsSync, copySync, createWriteStream, createReadStream } = require("fs-extra");
    module.exports.config = {
        name: "قرعة1",
        version: "1.0.0",
        hasPermssion: 0,
        credits: "ǺᎩᎧᏬᏰ",
        description: "لعبة القرعة اربح نقود",
        commandCategory: "",
        usages: "من فضلك اضغط : .باوكا [القرع/سلطعون/سمكة/ناي/دجاجة/جمبري] [مبلغ من المال]",
        cooldowns: 0
    };

    module.exports.onLoad = async function () {
        if (!existsSync(__dirname + '/cache/دجاجة.jpg')) {
            request('https://i.imgur.com/jPdZ1Q8.jpg').pipe(createWriteStream(__dirname + '/cache/دجاجة.jpg'));
        }
        if (!existsSync(__dirname + '/cache/جمبري.jpg')) {
            request('https://i.imgur.com/4214Xx9.jpg').pipe(createWriteStream(__dirname + '/cache/جمبري.jpg'));
        }
        if (!existsSync(__dirname + '/cache/قرع.jpg')) {
            request('https://i.imgur.com/4KLd4EE.jpg').pipe(createWriteStream(__dirname + '/cache/قرع.jpg'));
        }
        if (!existsSync(__dirname + '/cache/سلطعون.jpg')) {
            request('https://i.imgur.com/s8YAaxx.jpg').pipe(createWriteStream(__dirname + '/cache/سلطعون.jpg'));
        }
        if (!existsSync(__dirname + '/cache/ca.jpg')) {
            request('https://i.imgur.com/YbFzAOU.jpg').pipe(createWriteStream(__dirname + '/cache/ca.jpg'));
        }
        if (!existsSync(__dirname + '/cache/nai.jpg')) {
            request('https://i.imgur.com/UYhUZf8.jpg').pipe(createWriteStream(__dirname + '/cache/nai.jpg'));
        }
        if (!existsSync(__dirname + '/cache/قرعسلطعون.gif')) {
            request('https://i.imgur.com/dlrQjRL.gif').pipe(createWriteStream(__dirname + '/cache/قرعسلطعون.gif'));
        }
    };

    async function get(one,two,three) {
        var x1;
            switch (one) {
                case "دجاجة": x1 = "🐓";
                    break;
                case "جمبري": x1 = '🦞';
                    break;
                case "قرع": x1 = '🍐';
                    break;
                case "سلطعون": x1 = '🦀';
                    break;
                case "سمكة": x1 = '🐟';
                    break;
                case "ناي":x1 = '🦌';
            }
        var x2;
            switch (two) {
                case "دجاجة": x2 = "🐓";
                    break;
                case "جمبري": x2 = '🦞';
                    break;
                case "قرع": x2 = '🍐';
                    break;
                case "سلطعون": x2 = '🦀';
                    break;
                case "سمكة": x2 = '🐟';
                    break;
                case "ناي": x2 = '🦌';
            }
        var x3;
            switch (three) {
                case "دجاجة": x3 = "🐓";
                    break;
                case "جمبري": x3 = '🦞';
                    break;
                case "قرع": x3 = '🍐';
                    break;
                case "سلطعون": x3 = '🦀';
                    break;
                case "سمكة": x3 = '🐟';
                    break;
                case "ناي":x3 = '🦌';
            }
        var all = [x1, x2, x3];
    return full = all;
    }
var full = [];
    module.exports.run = async function({ api, event, args, Currencies }) { var out = (msg) => api.sendMessage(msg,event.threadID, event.messageID);
        const slotItems = ["دجاجة", "جمبري", "قرع", "سلطعون", "سمكة", "ناي"];
            const moneyUser = (await Currencies.getData(event.senderID)).money;
                var moneyBet = parseInt(args[1]);
                    if (!args[0] || !isNaN(args[0])) return api.sendMessage("[𝑷𝑮🥷🏻] => من فضلك اضغط : .باوكا [القرع/سلطعون/سمكة/ناي/دجاجة/جمبري] [مبلغ من المال]",event.threadID, event.messageID);
                    if (isNaN(moneyBet) || moneyBet <= 0) return api.sendMessage("[𝑷𝑮🥷🏻] => لا يمكن أن يكون مبلغ الرهان فارغًا أو سلبيًا", event.threadID, event.messageID);
                if (moneyBet > moneyUser) return api.sendMessage("[𝑷𝑮🥷🏻] => المبلغ الذي تراهن عليه أكبر من رصيدك!", event.threadID, event.messageID);
            if (moneyBet < 100) return api.sendMessage("[𝑷𝑮🥷🏻] => لا يمكن أن يكون مبلغ الإيداع أقل من 1000 دولار أمريكي!", event.threadID, event.messageID);
        var number = [], win = false;
    for (let i = 0; i < 3; i++) number[i] = slotItems[Math.floor(Math.random() * slotItems.length)];
        var itemm;
            var icon;
                switch (args[0]) {
                    case "قرعة":
                        case "القرع": itemm = "قرع";
                                icon = '🍐';
                            break;
                    case "السلطعون": 
                        case "سلطعون": itemm = "سلطعونة";
                                icon = '🦀';
                            break;
                    case "سمك":
                        case "سمكة": itemm = "سمكه";
                                icon = '🐟';
                            break;
                    case "ني":
                        case "ناي": itemm = "ناى";
                                icon = '🦌';
                            break;
                    case "دجاجه": 
                        case "دجاج": itemm = "دجاجة";
                                icon = '🐓';
                            break;
                    case "جمبرى":
                        case "جمبري": itemm = "جمبر";
                                icon = '🦞';
                            break;
                                default: return api.sendMessage("[𝑷𝑮🥷🏻] => من فضلك اضغط : .باوكا [القرع/سلطعون/سمكة/ناي/دجاجة/جمبري] [مبلغ من المال]",event.threadID, event.messageID);
                }      
                await get(number[0],number[1],number[2]);
            api.sendMessage({body:"[𝑷𝑮🥷🏻] => الضرب، لا اهتزاز!",attachment: createReadStream(__dirname + "/cache/قرعسلطعون.gif")},event.threadID,async (error,info) => {
                await new Promise(resolve => setTimeout(resolve, 6000));
                    api.unsendMessage(info.messageID);
                          await new Promise(resolve => setTimeout(resolve, 100));
    var array = [number[0],number[1],number[2]];
        var listimg = [];
           for (let string of array) {
               listimg.push(createReadStream(__dirname + `/cache/${string}.jpg`));
           }
        if (array.includes(itemm)) {
            var i = 0;
                if (array[0] == itemm) i+=1;
                    if (array[1] == itemm) i+=1;
                if (array[2] == itemm) i+=1;
            if (i == 1) {
                var mon = parseInt(args[1]) + 100;  
                    await Currencies.increaseMoney(event.senderID, mon); console.log("s1")
                        return api.sendMessage({body:`[𝑷𝑮🥷🏻] => نتيجة : ${full.join("|")}\n[✤] => تمام ${mon} افعل، لأن نعم 1 ${icon}!`,attachment: listimg},event.threadID, event.messageID);
            }
            else if (i == 2) {
                var mon = parseInt(args[1]) * 2; 
                    await Currencies.increaseMoney(event.senderID, mon); console.log("s2")
                        return api.sendMessage({body:`[𝑷𝑮🥷🏻] => نتيجة : ${full.join("|")}\n[✤] => تمام ${mon} افعل، لأن نعم 2 ${icon}!`,attachment: listimg},event.threadID, event.messageID);
            }
            else if (i == 3) {
                var mon = parseInt(args[1]) * 3; 
                    await Currencies.increaseMoney(event.senderID, mon); console.log('s3')
                        return api.sendMessage({body:`[𝑷𝑮🥷🏻] => Kết Quả : ${full.join("|")}\n[✤] => تمام ${mon} افعل، لأن نعم 3 ${icon}!`,attachment: listimg},event.threadID, event.messageID);
            }
            else return api.sendMessage("[𝑷𝑮🥷🏻] => خطأ ! شفرة : XX1N",event.threadID,event.messageID);
        } else  {
            await Currencies.decreaseMoney(event.senderID, parseInt(args[1])); console.log('s4')
            return api.sendMessage({body:`[𝑷𝑮🥷🏻] => نتيجة : ${full.join("|")}\n[✤] => بعيدا ${args[1]} افعل، لأن نعم 0 ${icon}!`,attachment: listimg},event.threadID, event.messageID);
        }
            } ,event.messageID);
    };