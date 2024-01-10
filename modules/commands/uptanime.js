module.exports.config = {
	name: "system",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "JRT",
	description: "عرض معلومات الأجهزة التي يستخدمها الروبوت",
	commandCategory: "Thông tin",
	cooldowns: 5,
	dependencies: {
		"systeminformation": ""
	}
};

function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)}${units[l]}`;
}

module.exports.run = async function ({ api, event }) {
	const { cpu, cpuTemperature, currentLoad, memLayout, diskLayout, mem, osInfo } = global.nodemodule["systeminformation"];
	const timeStart = Date.now();

	try {
		var { manufacturer, brand, speed, physicalCores, cores } = await cpu();
		var { main: mainTemp } = await cpuTemperature();
		var { currentLoad: load } = await currentLoad();
		var diskInfo = await diskLayout();
		var memInfo = await memLayout();
		var { total: totalMem, available: availableMem } = await mem();
		var { platform: OSPlatform, build: OSBuild } = await osInfo();

		var time = process.uptime();
		var hours = Math.floor(time / (60 * 60));
		var minutes = Math.floor((time % (60 * 60)) / 60);
		var seconds = Math.floor(time % 60);
		if (hours < 10) hours = "0" + hours;
		if (minutes < 10) minutes = "0" + minutes;
		if (seconds < 10) seconds = "0" + seconds;

		return api.sendMessage(
			"===[⚜️] System Info [⚜️]===" +
			"\n[⚜️] CPU [⚜️]" +
			
"\nنموذج وحدة المعالجة المركزية💾ُ: " + manufacturer + brand +
			
      "\nالـسرعــة🪽 : " + speed + `GHz` +
			
      "\nالنــوى💻 : " + physicalCores +
			
      "\nالخيوط🔐 : " + cores +
			
      "\nدرجـة حـرارة🔥 : " + mainTemp + `°C` +
			
      "\nحمــولـة📑: " + load.toFixed(1) + `%` +
			
      "\n[⚜️] MEMORY [⚜️]" +
			
      "\nمقــاس🐲: " + byte2mb(memInfo[0].size) +
			
      "\nيكتب.. : " + memInfo[0].type +
			
      "\nالمـجمــوع📂 : " + byte2mb(totalMem) +
			
      "\nAvailable : " + byte2mb(availableMem) +
			"\n[⚜️] DISK [⚜️]" +
			
      "\nاســـم🪪 : " + diskInfo[0].name +
			
      "\nمقــاس🐲 : " + byte2mb(diskInfo[0].size) +
			
      "\n🔥درجة حرارة : " + diskInfo[0].temperature + `°C` +
			"\n[⚜️] OS [⚜️]" +
			
      "\nمـنـصة💬 : " + OSPlatform +
			
      "\nيبني : " + OSBuild +
			
      "\nوقـت الـتشـغيل⏯️ : " + hours + ":" + minutes + ":" + seconds +
			"\nبـيـنغ📈 : " + (Date.now() - timeStart) + `ms`,
			event.threadID, event.messageID)
	}
	catch (e) {
		console.log(e)
	}
}