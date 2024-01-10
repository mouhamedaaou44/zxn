const axios = require('axios');
const fs = require('fs-extra');

const models = [
  "الواقع المطلق V16",
  "الواقع المطلق V181",
  "الانتشار التناظري 1.0",
  "أي شيء V3.0 (مقلم)",
  "أي شيء V4.5 (مقلم)",
  "أي شيء V5 (PrtRE)",
  "AOM3A3 مزيج البرتقال",
  "قصص الأطفال V13D",
  "قصص الأطفال ج1 شبه حقيقية",
  "قصص الأطفال الجزء الأول تون أنمي",
  "واقعية سيبرانية V33",
  "متعمد V2",
  "انمي يشبه الحلم 1.0",
  "انتشار الحلم 1.0",
  "صورة حقيقية تشبه الحلم 2.0",
  "دريم شيبر 6 (خبز VAE)",
  "دريم شيبر 7",
  "دريم شيبر 8",
  "حافة الواقعية EOR V20",
  "Eimis أنيمي نشر V1",
  "مزيج إلدريث الحيوي",
  "الواقعية الملحمية الخطيئة الطبيعية RC1VAE",
  "لا أستطيع أن أصدق أنه ليس التصوير الفوتوغرافي سيكو",
  "الطاغوت بعد",
  "ليريل V16",
  "ميشاميكس V10",
  "ميناميكس مينا V9",
  "ميناميكس مينا V11",
  "رحلة مفتوحة V4",
  "صورة زائد V1.0",
  "رؤية واقعية V1.4 (مشذب, FP16)",
  "رؤية واقعية V2.0",
  "رؤية واقعية V4.0",
  "رؤية واقعية V5.0",
  "انتشار الانزياح الأحمر V10",
  "القس الرسوم المتحركة V122",
  "قم بتشغيل DiffusionFX 25D V10",
  "قم بتشغيل Diffusion FX V10",
  "SD V1.4",
  "V1.5 (مقطع، إما فقط)",
  "شونين الجميلة V10",
  "مزيج الحليف II (مخضج)",
  "الخالدة 1.0",
  "تون يو بيتا 6"
];

module.exports.config = {
  name: 'تخيل',
  version: '1.1',
  hasPermission: 0,
  credits: 'ǺᎩᎧᏬᏰ',
  description: 'تحويل نص الى صورة',
  usePrefix: true,
  commandCategory: 'image',
  usages: 'تخيل [الذي تريد]:[رقم المودال]',
  cooldowns: 10,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const { threadID = "defaultThreadID", messageID = "defaultMessageID" } = event || {};
    let prompt = args.join(' ');
    let model = "37";

    if (prompt.includes(':')) {
      const parts = prompt.split(':');
      prompt = parts[0].trim();
      model = parts[1].trim();
    } else if (!prompt) {
      const modelsList = models.map((model, index) => `${index}: ${model}`).join('\n');
      return api.sendMessage(
        'يرجى تقديم موجة. يمكنك تحديد رقم الطراز من القائمة أدناه. (مثال: تخيل فتاة جميلة:43)\n\n' +
        '༺∆قائمة النماذج المتاحة∆༻:\n' +
        modelsList,
        threadID
      );
    }

    const translatedPrompt = await translateToEnglish(prompt);

    const info = await api.sendMessage('✅ توليد الصورة. انتظر من فضلك🔍..', threadID);
    const id = info.messageID;

    const API = `https://aliestercrowley.com/api/crowgen.php?model=${model}&prompt=${encodeURIComponent(translatedPrompt)}`;
    const imageStream = await axios.get(API, { responseType: 'arraybuffer' });

    const path = __dirname + `/cache/imagine.png`;
    fs.writeFileSync(path, Buffer.from(imageStream.data, 'utf-8'));

    api.sendMessage(
      {
        attachment: fs.createReadStream(path),
      },
      threadID,
      () => fs.unlinkSync(path),
      id
    );
  } catch (error) {
    console.error(error);
    api.sendMessage('فشل في إنشاء الصورة❌.', threadID, id);
  }
};

async function translateToEnglish(text) {
  try {
    const response = await axios.get('https://translate.googleapis.com/translate_a/single', {
      params: {
        client: 'gtx',
        sl: 'ar',
        tl: 'en',
        dt: 't',
        q: text,
      },
    });

    if (response.data && response.data[0] && response.data[0][0]) {
      return response.data[0][0][0];
    } else {
      console.error('فشلت ترجمة النص: ', text);
      return text;
    }
  } catch (error) {
    console.error('خطأ في الترجمة:', error);
    return text;
  }
}
