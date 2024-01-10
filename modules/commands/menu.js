module.exports.config = {
	name: "help",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "S H A D Y",
	description: "اوامر البوت",
	usages: "الاوامر",
	commandCategory: "G R O U P",
	cooldowns: 5
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
	let num = parseInt(event.body.split(" ")[0].trim());
	(handleReply.bonus) ? num -= handleReply.bonus : num;
	let msg = "";
	let data = handleReply.content;
	let check = false;
	if (isNaN(num)) msg = "رد علي الرساله برقم العنوان لاظهار الاوامر";
	else if (num > data.length || num <= 0) msg = "ياودي الرقم يلي اخترته مش بالقايمه اصلا 😂😂";
	else {
		const { commands } = global.client;
		let dataAfter = data[num-=1];
		if (handleReply.type == "cmd_info") {
			let command_config = commands.get(dataAfter).config;
			msg += ` 『  ${command_config.commandCategory.toUpperCase()}   』   \n`;
			msg += `\nCommand name: ${dataAfter}`;
			msg += `\nDescribe: ${command_config.description}`;
			msg += `\nUsing: ${(command_config.usages) ? command_config.usages : ""}`;
			msg += `\nWaiting time: ${command_config.cooldowns || 5}s`;
			msg += `\nPower: ${(command_config.hasPermssion == 0) ? "User" : (command_config.hasPermssion == 1) ? "Group administrator" : "Bot admin"}`;
      msg += `\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏`
			msg += `\n\n» Module code by ${command_config.credits} «`;
		} else {
			check = true;
			let count = 0;
			msg += `» ${dataAfter.group.toUpperCase()} «\n`;

			dataAfter.cmds.forEach(item => {
				msg += `\n ${count+=1}. » ${item}: ${commands.get(item).config.description}`;
			})
			msg += "\n\n╭──────╮\n        100 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨 \n╰──────╯ message by number to view command details and how to use command";
		}
	}
	const axios = require('axios');
	const fs = require('fs-extra');
	const img = ["https://scontent.xx.fbcdn.net/v/t1.15752-9/356967274_595600202710585_7641722728787251569_n.jpg?_nc_cat=105&cb=99be929b-3346023f&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeGVMwUmHl5MyGw919IgaCHAFt17up6iem0W3Xu6nqJ6bamB-XQyAk7thLJx6F3Fgle5BSEEGRkXfYlucEF3Kk2F&_nc_ohc=NrdHonjxxPcAX_mVtcJ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRmU8Jw2yDjoaEdKz0Mi5rx-lNi5SpaknWEvHArlqPdAQ&oe=64E60B59", "https://scontent.xx.fbcdn.net/v/t1.15752-9/360080200_1058882618412934_4453044990851354602_n.jpg?stp=dst-jpg_p480x480&_nc_cat=111&cb=99be929b-3346023f&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHraKi7XUjGb6IAAh-6W5IdaQ0uG8ysvoppDS4bzKy-ihv2S-7wYv5OuoJE2xvro56SDHniaTzvwAqhNobgW5DP&_nc_ohc=0-OikODzxEgAX-pcd4j&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRVCharDseWSP02ITpaE0p4RfDI2Fulkql3bwZ-3_RM2A&oe=64E6016C", "https://scontent.xx.fbcdn.net/v/t1.15752-9/356981423_679632244009626_4979373165127333266_n.jpg?stp=dst-jpg_p480x480&_nc_cat=106&cb=99be929b-3346023f&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeFFMqF_dFpUdnKLglR0zDS_mui9QK4tptua6L1Ari2m2w7RrdSWgpZPzG6gp_pBMll-_9Zytl9r6_iet_4kUsxH&_nc_ohc=k6JNndOhEHIAX_myDzf&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSRrGDjofsyLSAeteeZcgwVwHw9NVnM3djISiVqYxsthg&oe=64E5E21D", "https://scontent.xx.fbcdn.net/v/t1.15752-9/356958642_831735634741921_8161901046367352661_n.jpg?stp=dst-jpg_p480x480&_nc_cat=109&cb=99be929b-3346023f&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeFyvwuswtJsPw8w4C38D9nQ04E-_5DgyTzTgT7_kODJPOCFknMKh_uyPtjAhd9DhbcEHeWGnZ8XhUnJhwVwgRmI&_nc_ohc=Fd31yghrFx8AX9MOGKZ&_nc_oc=AQkWY8aYTBW1K5MOVKbv1ooMjO8GSp_k3GdLGADWWyjIc20q5sJMvXtyIlDdUrvwx_I&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRbB07zoAejFfkBl5yu1ezLGQmKlCfNQOix9g8KHK6y1Q&oe=64E60931", "https://scontent.xx.fbcdn.net/v/t1.15752-9/356966539_117632611400841_8962029972680642951_n.jpg?stp=dst-jpg_p480x480&_nc_cat=102&cb=99be929b-3346023f&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeFgNHflJX-rO-DPlixZhhNeFLI2AcVnCg0UsjYBxWcKDRNtuZA0EkfGN3G4PYhFErJtI-i1FvnXqwALoiUzDd78&_nc_ohc=85CGLQF_OfkAX8pHJs5&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQDa_G9hqzHUd3mcDtuX-TVyoNJJOVy5mp34wkvCUty_w&oe=64E5ED98", "https://i.ibb.co/XC3Hx3R/xva213.jpg", "https://i.ibb.co/ZmpSJpF/xva213.jpg", "https://i.ibb.co/k89c57c/xva213.jpg", "https://i.ibb.co/SsQCcW8/xva213.jpg"]
	var path = __dirname + "/cache/menu.jpg"
	var rdimg = img[Math.floor(Math.random() * img.length)]; 
	const imgP = []
	let dowloadIMG = (await axios.get(rdimg, { responseType: "arraybuffer" } )).data; 
	fs.writeFileSync(path, Buffer.from(dowloadIMG, "utf-8") );
	imgP.push(fs.createReadStream(path))
	var msgg = {body: msg, attachment: imgP}
	api.unsendMessage(handleReply.messageID);
	return api.sendMessage(msgg, event.threadID, (error, info) => {
		if (error) console.log(error);
		if (check) {
			global.client.handleReply.push({
				type: "cmd_info",
				name: this.config.name,
				messageID: info.messageID,
				content: data[num].cmds
			})
		}
	}, event.messageID);
}

module.exports.run = async function({ api, event, args }) {
	const { commands } = global.client;
	const { threadID, messageID } = event;
	const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
	const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
	const axios = require('axios');
	const fs = require('fs-extra');
	const imgP = []
	const img = ["https://scontent.xx.fbcdn.net/v/t1.15752-9/356967274_595600202710585_7641722728787251569_n.jpg?_nc_cat=105&cb=99be929b-3346023f&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeGVMwUmHl5MyGw919IgaCHAFt17up6iem0W3Xu6nqJ6bamB-XQyAk7thLJx6F3Fgle5BSEEGRkXfYlucEF3Kk2F&_nc_ohc=NrdHonjxxPcAX_mVtcJ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRmU8Jw2yDjoaEdKz0Mi5rx-lNi5SpaknWEvHArlqPdAQ&oe=64E60B59"
, "https://scontent.xx.fbcdn.net/v/t1.15752-9/360080200_1058882618412934_4453044990851354602_n.jpg?stp=dst-jpg_p480x480&_nc_cat=111&cb=99be929b-3346023f&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHraKi7XUjGb6IAAh-6W5IdaQ0uG8ysvoppDS4bzKy-ihv2S-7wYv5OuoJE2xvro56SDHniaTzvwAqhNobgW5DP&_nc_ohc=0-OikODzxEgAX-pcd4j&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRVCharDseWSP02ITpaE0p4RfDI2Fulkql3bwZ-3_RM2A&oe=64E6016C"
, "https://scontent.xx.fbcdn.net/v/t1.15752-9/356981423_679632244009626_4979373165127333266_n.jpg?stp=dst-jpg_p480x480&_nc_cat=106&cb=99be929b-3346023f&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeFFMqF_dFpUdnKLglR0zDS_mui9QK4tptua6L1Ari2m2w7RrdSWgpZPzG6gp_pBMll-_9Zytl9r6_iet_4kUsxH&_nc_ohc=k6JNndOhEHIAX_myDzf&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSRrGDjofsyLSAeteeZcgwVwHw9NVnM3djISiVqYxsthg&oe=64E5E21D"
, "https://scontent.xx.fbcdn.net/v/t1.15752-9/356958642_831735634741921_8161901046367352661_n.jpg?stp=dst-jpg_p480x480&_nc_cat=109&cb=99be929b-3346023f&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeFyvwuswtJsPw8w4C38D9nQ04E-_5DgyTzTgT7_kODJPOCFknMKh_uyPtjAhd9DhbcEHeWGnZ8XhUnJhwVwgRmI&_nc_ohc=Fd31yghrFx8AX9MOGKZ&_nc_oc=AQkWY8aYTBW1K5MOVKbv1ooMjO8GSp_k3GdLGADWWyjIc20q5sJMvXtyIlDdUrvwx_I&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdRbB07zoAejFfkBl5yu1ezLGQmKlCfNQOix9g8KHK6y1Q&oe=64E60931"
, "https://scontent.xx.fbcdn.net/v/t1.15752-9/356966539_117632611400841_8962029972680642951_n.jpg?stp=dst-jpg_p480x480&_nc_cat=102&cb=99be929b-3346023f&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeFgNHflJX-rO-DPlixZhhNeFLI2AcVnCg0UsjYBxWcKDRNtuZA0EkfGN3G4PYhFErJtI-i1FvnXqwALoiUzDd78&_nc_ohc=85CGLQF_OfkAX8pHJs5&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQDa_G9hqzHUd3mcDtuX-TVyoNJJOVy5mp34wkvCUty_w&oe=64E5ED98"
, "https://i.ibb.co/XC3Hx3R/xva213.jpg"
, "https://i.ibb.co/ZmpSJpF/xva213.jpg"
, "https://i.ibb.co/k89c57c/xva213.jpg"
, "https://i.ibb.co/SsQCcW8/xva213.jpg"]
	var path = __dirname + "/cache/menu.jpg"
	var rdimg = img[Math.floor(Math.random() * img.length)]; 

   	let dowloadIMG = (await axios.get(rdimg, { responseType: "arraybuffer" } )).data; 
        fs.writeFileSync(path, Buffer.from(dowloadIMG, "utf-8") );
        imgP.push(fs.createReadStream(path))
	const command = commands.values();
	var group = [], msg = "» List of commands available «\n";
	let check = true, page_num_input = "";
	let bonus = 0;

	for (const commandConfig of command) {
		if (!group.some(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase())) group.push({ group: commandConfig.config.commandCategory.toLowerCase(), cmds: [commandConfig.config.name] });
		else group.find(item => item.group.toLowerCase() == commandConfig.config.commandCategory.toLowerCase()).cmds.push(commandConfig.config.name);
	}

	if (args[0] && ["all", "-a"].includes(args[0].trim())) {
		let all_commands = [];
		group.forEach(commandGroup => {
			commandGroup.cmds.forEach(item => all_commands.push(item));
		});
		let page_num_total = Math.ceil(all_commands.length / 2222222222);
		if (args[1]) {
			check = false;
			page_num_input = parseInt(args[1]);
			if (isNaN(page_num_input)) msg = "رد علي الرساله برقم العنوان لاظهار الاوامر";
			else if (page_num_input > page_num_total || page_num_input <= 0) msg = "يا حمار يا كلب الرقم يلي اخترته مش بالقايمه اصلا 😂😂";
			else check = true;
		}
		if (check) {
		index_start = (page_num_input) ? (page_num_input * 2222222222) - 2222222222 : 0;
			bonus = index_start;
			index_end = (index_start + 2222222222 > all_commands.length) ? all_commands.length : index_start + 2222222222;
			all_commands = all_commands.slice(index_start, index_end);
			all_commands.forEach(e => {
				msg += `\n${index_start+=1}. » ${e}: ${commands.get(e).config.description}`;
			})
			msg += `\n\nPage ${page_num_input || 1}/${page_num_total}`;
			msg +=``
			msg += "\n╭──────╮\n       100 𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨 \n╰──────╯message by number to view command details and how to use command";
		}
		var msgg = {body: msg, attachment: imgP}
		return api.sendMessage(msgg, threadID, (error, info) => {
			if (check) {
				global.client.handleReply.push({
					type: "cmd_info",
					bonus: bonus,
					name: this.config.name,
					messageID: info.messageID,
					content: all_commands
				})
			}
		}, messageID)
	}

	let page_num_total = Math.ceil(group.length / 2222222222);
	if (args[0]) {
		check = false;
		page_num_input = parseInt(args[0]);
		if (isNaN(page_num_input)) msg = "رد علي الرساله برقم العنوان لاظهار الاوامر";
		else if (page_num_input > page_num_total || page_num_input <= 0) msg = "يا حمار الرقم يلي اخترته مش بالقايمه اصلا 😂😂";
		else check = true;
	}
	if (check) {
		index_start = (page_num_input) ? (page_num_input * 2222222222) - 2222222222 : 0;
		bonus = index_start;
		index_end = (index_start + 2222222222 > group.length) ? group.length : index_start + 2222222222;
		group = group.slice(index_start, index_end);
		group.forEach(commandGroup => msg += `\n${index_start+=1}. » ${commandGroup.group.toUpperCase()} `);
		msg += `\n\nPage【${page_num_input || 1}/${page_num_total}】`;
		msg +=``
		msg += `\n╭──────╮\n       100𝘾𝙤𝙢𝙢𝙖𝙣𝙙𝙨\n╰──────╯ message by number to view commands by category`;
	}
	var msgg = {body: msg, attachment: imgP}
	return api.sendMessage(msgg, threadID, async (error, info) => {
		global.client.handleReply.push({
			name: this.config.name,
			bonus: bonus,
			messageID: info.messageID,
			content: group
		})
	});
}