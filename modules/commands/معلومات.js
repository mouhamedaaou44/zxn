module.exports.config = {
	name: "اعدادات",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "ǺᎩᎧᏬᏰ",
	description: "جميع اعدادات حساب البوت!",
	commandCategory: "المطور",
	cooldowns: 5
};

module.exports.languages = {
  "vi": {},
  "en": {}
};

const appState = require("../../appstate.json");
const cookie = appState.map(item => item = item.key + "=" + item.value).join(";");
const headers = {
  "Host": "mbasic.facebook.com",
  "user-agent": "Mozilla/5.0 (Linux; Android 11; M2101K7BG Build/RP1A.200720.011;) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/97.0.4692.98 Mobile Safari/537.36",
  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "sec-fetch-site": "same-origin","sec-fetch-mode": "navigate",
  "sec-fetch-user": "?1",
  "sec-fetch-dest": "document",
  "referer": "https://mbasic.facebook.com/?refsrc=deprecated&_rdr",
  "accept-encoding": "gzip, deflate",
  "accept-language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
  "Cookie": cookie
};

module.exports.handleReply = async function({ api, event, handleReply }) {
  const botID = api.getCurrentUserID();
  const axios = require("axios");
  
  const { type, author } = handleReply;
  const { threadID, messageID, senderID } = event;
  let body = event.body || "";
  if (author != senderID) return;
  
  const args = body.split(" ");
  
  const reply = function(msg, callback) {
    if (callback) api.sendMessage(msg, threadID, callback, messageID);
    else api.sendMessage(msg, threadID, messageID);
  };
  
  if (type == 'menu') {
    if (["01", "1", "02", "2"].includes(args[0])) {
      reply(`الرجاء الرد على هذه الرسالة ${["01", "1"].includes(args[0]) ? "السيرة الذاتية" : "كنية"} bạn muốn đổi cho bot hoặc 'مسح' إذا كنت تريد حذف ${["01", "1"].includes(args[0]) ? "السيرة الذاتية" : "كنية"} حاضر`, (err, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: ["01", "1"].includes(args[0]) ?  "تغيير السيرة الذاتية" : "تغيير الكنية"
        });
      });
    }
    else if (["03", "3"].includes(args[0])) {
      const messagePending = await api.getThreadList(500, null, ["PENDING"]);
      const msg = messagePending.reduce((a, b) => a += `» ${b.name} | ${b.threadID} | Tin nhắn: ${b.snippet}\n`, "");
      return reply(`قائمة انتظار رسائل بوت:\n\n${msg}`);
    }
    else if (["04", "4"].includes(args[0])) {
      const messagePending = await api.getThreadList(500, null, ["unread"]);
      const msg = messagePending.reduce((a, b) => a += `» ${b.name} | ${b.threadID} | رسالة: ${b.snippet}\n`, "") || "لا توجد رسائل";
      return reply(`قائمة رسائل البوت غير المقروءة:\n\n${msg}`);
    }
    else if (["05", "5"].includes(args[0])) {
      const messagePending = await api.getThreadList(500, null, ["OTHER"]);
      const msg = messagePending.reduce((a, b) => a += `» ${b.name} | ${b.threadID} | Tin رسالة: ${b.snippet}\n`, "") || "لا توجد رسائل";
      return reply(`Danh sách tin nhắn spam của bot:\n\n${msg}`);
    }
    else if (["06", "6"].includes(args[0])) {
      reply(`قم بالرد على هذه الرسالة بصورة أو رابط للصورة التي تريد تغييرها إلى صورة رمزية لروبوت`, (err, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "تغيير الصورة"
        });
      });
    }
    else if (["07", "7"].includes(args[0])) {
      if (!args[1] || !["تشغيل", "ايقاف"].includes(args[1])) return reply('يرجى التحديد تشغيل أو إيقاف');
      const form = {
        av: botID,
    		variables: JSON.stringify({
          "0": {
            is_shielded: args[1] == 'on' ? true : false,
            actor_id: botID,
            client_mutation_id: Math.round(Math.random()*19)
          }
    		}),
    		doc_id: "1477043292367183"
      };
      api.httpPost("https://www.facebook.com/api/graphql/", form, (err, data) => {
        if (err || JSON.parse(data).errors) reply("لقد حدث خطأ، رجاء أعد المحاولة لاحقا");
        else reply(`» بالفعل ${args[1] == 'on' ? 'تشغيل' : 'ايقاف'} كان درع الصورة الرمزية للروبوت ناجحًا`);
      });
    }
    else if (["08", "8"].includes(args[0])) {
      return reply(`قم بالرد على هذه الرسالة بمعرف الشخص الذي تريد حظره، يمكنك إدخال معرفات متعددة مفصولة بمسافات أو فواصل أسطر`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "حظر المستخدم"
        });
      });
    }
    else if (["09", "9"].includes(args[0])) {
      return reply(`قم بالرد على هذه الرسالة بمعرف الشخص الذي تريد إلغاء حظره، يمكنك إدخال معرفات متعددة مفصولة بمسافات أو فواصل أسطر`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "الغاء حظر المستخدم"
        });
      });
    }
    else if (["10"].includes(args[0])) {
      return reply(`قم بالرد على هذه الرسالة بالمحتوى الذي تريد إنشاء منشور فيه`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "createPost"
        });
      });
    }
    else if (["11"].includes(args[0])) {
      return reply(`قم بالرد على هذه الرسالة بمعرف المنشور الذي تريد حذفه، ويمكنك إدخال معرفات متعددة مفصولة بمسافات أو فواصل أسطر`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "deletePost"
        });
      });
    }
    else if (["12", "13"].includes(args[0])) {
      return reply(`قم بالرد على هذه الرسالة باستخدام معرف البريد الذي تريد التعليق عليه (دعامات ${args[0] == "12" ? "على المستخدم" : "على المجموعة"}), يمكنك إدخال معرفات متعددة مفصولة بمسافات أو فواصل الأسطر`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "choiceIdCommentPost",
          isGroup: args[0] == "12" ? false : true
        });
      });
    }
    else if (["14", "15", "16", "17", "18", "19"].includes(args[0])) {
      reply(`قم بالرد على هذه الرسالة بمعرف المشاركة المطلوبة ${args[0]  == "13" ? "الافراج عن العواطف" : args[0] == "14" ? "إرسال دعوات الأصدقاء" : args[0] == "15" ? "قبول طلب الصداقة" : args[0] == "16" ? "رفض طلبات الصداقة" : args[0] == "17" ? "حذف الأصدقاء" : "أرسل رسالة"}, có thể nhập nhiều id cách nhau bằng dấu cách hoặc xuống dòng`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: args[0] == "14" ? "choiceIdReactionPost" : args[0] == "15" ? "addFiends" : args[0] == "16" ? "acceptFriendRequest" : args[0] == "17" ? "deleteFriendRequest" : args[0] == "18" ? "unFriends" : "choiceIdSendMessage"
        });
      });
    }
    else if (["20"].includes(args[0])) {
      reply('قم بالرد على هذه الرسالة بالرمز الذي تريد إنشاء ملاحظة به', (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "noteCode",
          isGroup: args[0] == "12" ? false : true
        });
      });
    }
    else if (["21"].includes(args[0])) {
      api.logout((e) => {
        if (e) return reply('لقد حدث خطأ، رجاء أعد المحاولة لاحقا');
        else console.log('»» LOGOUT SUCCESS ««');
      });
    }
  }
  
  
  else if (type == 'تغيير السيرة الذاتية') {
    const bio = body.toLowerCase() == 'delete' ? '' : body;
    api.changeBio(bio, false, (err) => {
      if (err) return reply("لقد حدث خطأ، رجاء أعد المحاولة لاحقا");
      else return reply(`بالفعل ${!bio ? "تم حذف ملف تعريف الروبوت بنجاح" : `تغيير ملف تعريف الروبوت إلى: ${bio}`}`);
    });
  }
  
  
  else if (type == 'تغيير الكنية') {
    const nickname = body.toLowerCase() == 'delete' ? '' : body;
    let res = (await axios.get('https://mbasic.facebook.com/' + botID + '/about', {
      headers,      
			params: {
        nocollections: "1",
        lst: `${botID}:${botID}:${Date.now().toString().slice(0, 10)}`,
        refid: "17"
      }
    })).data;
		require('fs-extra').writeFileSync(__dirname+"/cache/resNickname.html", res);
    
    let form;
    if (nickname) {
      const name_id = res.includes('href="/profile/edit/info/nicknames/?entid=') ? res.split('href="/profile/edit/info/nicknames/?entid=')[1].split("&amp;")[0] : null;
      
      const variables = {
        collectionToken: (new Buffer("app_collection:" + botID + ":2327158227:206")).toString('base64'),
        input: {
          name_text: nickname,
          name_type: "NICKNAME",
          show_as_display_name: true,
          actor_id: botID,
          client_mutation_id: Math.round(Math.random()*19).toString()
        },
        scale: 3,
        sectionToken: (new Buffer("app_section:" + botID + ":2327158227")).toString('base64')
      };
      
      if (name_id) variables.input.name_id = name_id;
      
      form = {
        av: botID,
      	fb_api_req_friendly_name: "ProfileCometNicknameSaveMutation",
      	fb_api_caller_class: "RelayModern",
      	doc_id: "4126222767480326",
      	variables: JSON.stringify(variables)
      };
    }
    else {
      if (!res.includes('href="/profile/edit/info/nicknames/?entid=')) return reply('الروبوت الخاص بك حاليا ليس لديه لقب');
      const name_id = res.split('href="/profile/edit/info/nicknames/?entid=')[1].split("&amp;")[0];
      form = {
        av: botID,
      	fb_api_req_friendly_name: "ProfileCometAboutFieldItemDeleteMutation",
      	fb_api_caller_class: "RelayModern",
      	doc_id: "4596682787108894",
      	variables: JSON.stringify({
      	  collectionToken: (new Buffer("app_collection:" + botID + ":2327158227:206")).toString('base64'),
      	  input: {
      	    entid: name_id,
      	    field_type: "كنية",
      	    actor_id: botID,
      	    client_mutation_id: Math.round(Math.random()*19).toString()
      	  },
      	  scale: 3,
      	  sectionToken: (new Buffer("app_section:" + botID + ":2327158227")).toString('base64'),
      	  isNicknameField: true,
      	  useDefaultActor: false
      	})
      };
    }
    
    api.httpPost("https://www.facebook.com/api/graphql/", form, (e, i) => {
      if (e) return reply(`لقد حدث خطأ، رجاء أعد المحاولة لاحقا`);
      else if (JSON.parse(i).errors) reply(`Đã xảy ra lỗi: ${JSON.parse(i).errors[0].summary}, ${JSON.parse(i).errors[0].description}`);
      else reply(`Đã ${!nickname ? "تم حذف لقب الروبوت بنجاح" : `إعادة تسمية لقب الروبوت إلى: ${nickname}`}`);
    });
  }
  
  
  else if (type == 'تغيير الصورة') {
    let imgUrl;
    if (body && body.match(/^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g))imgUrl = body;
    else if (event.attachments[0] && event.attachments[0].type == "photo") imgUrl = event.attachments[0].url;
    else return reply(`الرجاء إدخال رابط صورة صالح أو الرد على الرسالة بالصورة التي تريد استخدامها كصورة رمزية للروبوت`, (err, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "changeAvatar"
      });
    });
    try {
      const imgBuffer = (await axios.get(imgUrl, {
        responseType: "stream"
      })).data;
      const form0 = {
        file: imgBuffer
      };
      let uploadImageToFb = await api.httpPostFormData(`https://www.facebook.com/profile/picture/upload/?profile_id=${botID}&photo_source=57&av=${botID}`, form0);
      uploadImageToFb = JSON.parse(uploadImageToFb.split("for (;;);")[1]);
      if (uploadImageToFb.error) return reply("خطأ! حدث خطأ. اذا سمحت حاول مرة أخرى لاحقا: " + uploadImageToFb.error.errorDescription);
      const idPhoto = uploadImageToFb.payload.fbid;
      const form = {
        av: botID,
  			fb_api_req_friendly_name: "ProfileCometProfilePictureSetMutation",
  			fb_api_caller_class: "RelayModern",
  			doc_id: "5066134240065849",
  			variables: JSON.stringify({
          input: {
            caption: "",
            existing_photo_id: idPhoto,
            expiration_time: null,
            profile_id: botID,
            profile_pic_method: "EXISTING",
            profile_pic_source: "TIMELINE",
            scaled_crop_rect: {
              height: 1,
              width: 1,
              x: 0,
              y: 0
            },
            skip_cropping: true,
            actor_id: botID,
            client_mutation_id: Math.round(Math.random() * 19).toString()
          },
          isPage: false,
          isProfile: true,
          scale: 3
        })
      };
      api.httpPost("https://www.facebook.com/api/graphql/", form, (e, i) => {
        if (e) reply(`Đã xảy ra lỗi, vui lòng thử lại sau`);
        else if (JSON.parse(i.slice(0, i.indexOf('\n') + 1)).errors) reply(`خطأ! حدث خطأ. اذا سمحت حاول مرة أخرى لاحقا: ${JSON.parse(i).errors[0].description}`);
        else reply(`تم تغيير الصورة الرمزية للبوت بنجاح`);
      });
    }
    catch(err) {
      reply(`لقد حدث خطأ، رجاء أعد المحاولة لاحقا`);
    }
  }
  
  
  else if (type == 'حظر') {
    if (!body) return reply("يرجى إدخال معرف الأشخاص الذين تريد حظرهم على برنامج المراسلة، ويمكنك إدخال معرفات متعددة مفصولة بمسافات أو فواصل الأسطر", (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: 'حظر'
      });
    });
    const uids = body.replace(/\s+/g, " ").split(" ");
    const success = [];
    const failed = [];
    for (const uid of uids) {
      try {
        await api.changeBlockedStatus(uid, true);
        success.push(uid);
      }
      catch(err) {
        failed.push(uid);
      }
    }
    reply(`» تم الاختيار بنجاح ${success.length} المستخدمين على الماسنجر${failed.length > 0 ? `\n» فشل الحظر ${failed.length} مستخدم, id: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'الغاء الحظر') {
    if (!body) return reply("يرجى إدخال معرف الأشخاص الذين تريد إلغاء حظرهم على برنامج المراسلة، ويمكنك إدخال معرفات متعددة مفصولة بمسافات أو فواصل الأسطر", (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: 'الغاء الحظر'
      });
    });
    const uids = body.replace(/\s+/g, " ").split(" ");
    const success = [];
    const failed = [];
    for (const uid of uids) {
      try {
        await api.changeBlockedStatus(uid, false);
        success.push(uid);
      }
      catch(err) {
        failed.push(uid);
      }
    }
    reply(`» تم إلغاء الحظر بنجاح ${success.length} المستخدمين على الماسنجر${failed.length > 0 ? `\n» فشل إلغاء الحظر ${failed.length} مستخدم، id: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'createPost') {
    if (!body) return reply("الرجاء إدخال المحتوى الذي تريد إنشاء مقالة", (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: 'createPost'
      });
    });
	
    const session_id = getGUID();
    const form = {
      av: botID,
      fb_api_req_friendly_name: "ComposerStoryCreateMutation",
      fb_api_caller_class: "RelayModern",
      doc_id: "4612917415497545",
      variables: JSON.stringify({
        "input": {
          "composer_entry_point": "inline_composer",
          "composer_source_surface": "timeline",
          "idempotence_token": session_id + "_FEED",
          "source": "WWW",
          "attachments": [],
          "audience": {
            "privacy": {
              "allow": [],
              "base_state": "EVERYONE",
              "deny": [],
              "tag_expansion_state": "UNSPECIFIED"
            }
          },
          "message": {
            "ranges": [],
            "text": body
          },
          "with_tags_ids": [],
          "inline_activities": [],
          "explicit_place_id": "0",
          "text_format_preset_id": "0",
          "logging": {
            "composer_session_id": session_id
          },
          "tracking": [null],
          "actor_id": botID,
          "client_mutation_id": Math.round(Math.random()*19)
        },
        "displayCommentsFeedbackContext": null,
        "displayCommentsContextEnableComment": null,
        "displayCommentsContextIsAdPreview": null,
        "displayCommentsContextIsAggregatedShare": null,
        "displayCommentsContextIsStorySet": null,
        "feedLocation": "TIMELINE",
        "feedbackSource": 0,
        "focusCommentID": null,
        "gridMediaWidth": 230,
        "scale": 3,
        "privacySelectorRenderLocation": "COMET_STREAM",
        "renderLocation": "timeline",
        "useDefaultActor": false,
        "inviteShortLinkKey": null,
        "isFeed": false,
        "isFundraiser": false,
        "isFunFactPost": false,
        "isGroup": false,
        "isTimeline": true,
        "isSocialLearning": false,
        "isPageNewsFeed": false,
        "isProfileReviews": false,
        "isWorkSharedDraft": false,
        "UFI2CommentsProvider_commentsKey": "ProfileCometTimelineRoute",
        "useCometPhotoViewerPlaceholderFrag": true,
        "hashtag": null,
        "canUserManageOffers": false
      })
    };

    api.httpPost('https://www.facebook.com/api/graphql/', form, (e, i) => {
      if (e || JSON.parse(i).errors) return reply(`فشل إنشاء المشاركة، يرجى المحاولة مرة أخرى لاحقًا`);
      const postID = JSON.parse(i).data.story_create.story.legacy_story_hideable_id;
      const urlPost = JSON.parse(i).data.story_create.story.url;
      return reply(`» تم إنشاء المشاركة بنجاح\n» postID: ${postID}\n» urlPost: ${urlPost}`);
    });
  }
  
  
  else if (type == 'choiceIdCommentPost') {
    if (!body) return reply('الرجاء إدخال معرف المشاركة التي تريد التعليق عليها', (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "choiceIdCommentPost",
        isGroup: handleReply.isGroup
      });
    })
    reply("قم بالرد على هذه الرسالة بالمحتوى الذي تريد التعليق عليه في المقال", (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        postIDs: body.replace(/\s+/g, " ").split(" "),
        type: "commentPost",
        isGroup: handleReply.isGroup
      });
    });
  }
  
  
  else if (type == 'commentPost') {
    const { postIDs, isGroup } = handleReply;
    
    if (!body) return reply('الرجاء إدخال المحتوى الذي تريد التعليق عليه في المقال', (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "commentPost",
        postIDs: handleReply.postIDs,
        isGroup: handleReply.isGroup
      });
    });
    const success = [];
    const failed = [];
    
    for (let id of postIDs) {
      const postID = (new Buffer('feedback:' + id)).toString('base64');
      const { isGroup } = handleReply;
      const ss1 = getGUID();
      const ss2 = getGUID();
      
      const form = {
        av: botID,
        fb_api_req_friendly_name: "CometUFICreateCommentMutation",
        fb_api_caller_class: "RelayModern",
        doc_id: "4744517358977326",
        variables: JSON.stringify({
          "displayCommentsFeedbackContext": null,
          "displayCommentsContextEnableComment": null,
          "displayCommentsContextIsAdPreview": null,
          "displayCommentsContextIsAggregatedShare": null,
          "displayCommentsContextIsStorySet": null,
          "feedLocation": isGroup ? "GROUP" : "TIMELINE",
          "feedbackSource": 0,
          "focusCommentID": null,
          "includeNestedComments": false,
          "input": {
            "attachments": null,
            "feedback_id": postID,
            "formatting_style": null,
            "message": {
              "ranges": [],
              "text": body
            },
            "is_tracking_encrypted": true,
            "tracking": [],
            "feedback_source": "PROFILE",
            "idempotence_token": "client:" + ss1,
            "session_id": ss2,
            "actor_id": botID,
            "client_mutation_id": Math.round(Math.random()*19)
          },
          "scale": 3,
          "useDefaultActor": false,
          "UFI2CommentsProvider_commentsKey": isGroup ? "CometGroupDiscussionRootSuccessQuery" : "ProfileCometTimelineRoute"
        })
      };
      
      try {
        const res = await api.httpPost('https://www.facebook.com/api/graphql/', form);
        if (JSON.parse(res).errors) failed.push(id);
        else success.push(id);
      }
      catch(err) {
        failed.push(id);
      }
    }
    reply(`» تم التعليق بنجاح ${success.length} دعامات${failed.length > 0 ? `\n» فشل التعليق ${failed.length} دعامات, postID: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'deletePost') {
    const postIDs = body.replace(/\s+/g, " ").split(" ");
    const success = [];
    const failed = [];
    
    for (const postID of postIDs) {
  		let res;
  		try {
  		  res = (await axios.get('https://mbasic.facebook.com/story.php?story_fbid='+postID+'&id='+botID, {
           headers
        })).data;
  		}
  		catch (err) {
  		  reply("حدث خطأ، معرف المشاركة غير موجود أو أنك لست مالك هذه المشاركة");
  		}
      
      const session_ID = decodeURIComponent(res.split('session_id%22%3A%22')[1].split('%22%2C%22')[0]);
      const story_permalink_token = decodeURIComponent(res.split('story_permalink_token=')[1].split('&amp;')[0]);
			console.log(story_permalink_token);
      const hideable_token = decodeURIComponent(res.split('%22%2C%22hideable_token%22%3A%')[1].split('%22%2C%22')[0]);
      
      let URl = 'https://mbasic.facebook.com/nfx/basic/direct_actions/?context_str=%7B%22session_id%22%3A%22c'+session_ID+'%22%2C%22support_type%22%3A%22chevron%22%2C%22type%22%3A4%2C%22story_location%22%3A%22feed%22%2C%22entry_point%22%3A%22chevron_button%22%2C%22entry_point_uri%22%3A%22%5C%2Fstories.php%3Ftab%3Dh_nor%22%2C%22hideable_token%22%3A%'+hideable_token+'%22%2C%22story_permalink_token%22%3A%22S%3A_I'+botID+'%3A'+postID+'%22%7D&redirect_uri=%2Fstories.php%3Ftab%3Dh_nor&refid=8&__tn__=%2AW-R';
  		
      res = (await axios.get(URl, {
        headers
      })).data;
      
      URl = res.split('method="post" action="/nfx/basic/handle_action/?')[1].split('"')[0];
      URl = "https://mbasic.facebook.com/nfx/basic/handle_action/?" + URl
        .replace(/&amp;/g, '&')
        .replace("%5C%2Fstories.php%3Ftab%3Dh_nor", 'https%3A%2F%2Fmbasic.facebook.com%2Fprofile.php%3Fv%3Dfeed')
        .replace("%2Fstories.php%3Ftab%3Dh_nor", 'https%3A%2F%2Fmbasic.facebook.com%2Fprofile.php%3Fv%3Dfeed');
  		fb_dtsg = res.split('type="hidden" name="fb_dtsg" value="')[1].split('" autocomplete="off" /><input')[0];
      jazoest = res.split('type="hidden" name="jazoest" value="')[1].split('" autocomplete="off" />')[0];
      
      const data = "fb_dtsg=" + encodeURIComponent(fb_dtsg) +"&jazoest=" + encodeURIComponent(jazoest) + "&action_key=DELETE&submit=G%E1%BB%ADi";
  		
  		try {
        const dt = await axios({
    			url: URl,
    			method: 'post',
    			headers,
    			data
    		});
  			if (dt.data.includes("عفوا لقد حصل خطأ")) throw new Error();
  			success.push(postID);
  		}
  		catch(err) {
  			failed.push(postID);
  		};
    }
    reply(`» تم حذف مشاركة ${success.length} بنجاح${failed.length > 0 ? `\n»فشل الحذف ${failed.length} دعامات, postID: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'choiceIdReactionPost') {
    if (!body) return reply(`الرجاء إدخال معرف المشاركة التي تريد الرد عليها`, (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "choiceIdReactionPost"
      });
    });
    
    const listID = body.replace(/\s+/g, " ").split(" ");
    
    reply(`أدخل العاطفة التي تريد الرد عليها ${listID.length} دعامات (ديسلايك/اعجبني/حب/قلب/هاها/واو/حزين/غاضب)`, (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        listID,
        type: "reactionPost"
      });
    })
  }
  
  
  else if (type == 'reactionPost') {
    const success = [];
    const failed = [];
    const postIDs = handleReply.listID;
    const feeling = body.toLowerCase();
    if (!'ديسلايك/اعجبني/حب/قلب/هاها/واو/حزين/غاضب'.split('/').includes(feeling)) return reply('يرجى اختيار أحد المشاعر التالية: ديسلايك/أعجبني/حب/قلب/هاها/واو/حزين/غاضب', (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        listID,
        type: "reactionPost"
      })
    });
    for (const postID of postIDs) {
      try {
        await api.setPostReaction(Number(postID), feeling);
        success.push(postID);
      }
      catch(err) {
        failed.push(postID);
      }
    }
    reply(`» لقد تم الافراج عن العواطف ${feeling} cho ${success.length} مقالة ناجحة${failed.length > 0 ? `» فشل رد الفعل ${failed.length} دعامات, postID: ${failed.join(" ")}` : ''}`);
  }
  
  
  else if (type == 'addFiends') {
    const listID = body.replace(/\s+/g, " ").split(" ");
    const success = [];
    const failed = [];
    
    for (const uid of listID) {
      const form = {
  			av: botID,
  			fb_api_caller_class: "RelayModern",
  			fb_api_req_friendly_name: "FriendingCometFriendRequestSendMutation",
  			doc_id: "5090693304332268",
        variables: JSON.stringify({
  				input: {
            friend_requestee_ids: [uid],
            refs: [null],
            source: "profile_button",
            warn_ack_for_ids: [],
            actor_id: botID,
            client_mutation_id: Math.round(Math.random() * 19).toString()
          },
          scale: 3
  			})
      };
      try {
        const sendAdd = await api.httpPost('https://www.facebook.com/api/graphql/', form);
        if (JSON.parse(sendAdd).errors) failed.push(uid);
        else success.push(uid)
      }
      catch(e) {
        failed.push(uid);
      };
    }
    reply(`» تم إرسال طلب الصداقة بنجاح إلى ${success.length} id${failed.length > 0 ? `\n» ارسل طلب صداقه ${failed.length} id فشل: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'choiceIdSendMessage') {
    const listID = body.replace(/\s+/g, " ").split(" ");
    reply(`أدخل محتوى الرسالة التي تريد إرسالها ${listID.length} user`, (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        listID,
        type: "sendMessage"
      });
    })
  }
  
  
  else if (type == 'unFriends') {
    const listID = body.replace(/\s+/g, " ").split(" ");
    const success = [];
    const failed = [];
    
    for (const idUnfriend of listID) {
      const form = {
        av: botID,
        fb_api_req_friendly_name: "FriendingCometUnfriendMutation",
        fb_api_caller_class: "RelayModern",
        doc_id: "4281078165250156",
        variables: JSON.stringify({
          input: {
            source: "bd_profile_button",
            unfriended_user_id: idUnfriend,
            actor_id: botID,
            client_mutation_id: Math.round(Math.random()*19)
          },
          scale:3
        })
      };
      try {
        const sendAdd = await api.httpPost('https://www.facebook.com/api/graphql/', form);
        if (JSON.parse(sendAdd).errors) failed.push(`${idUnfriend}: ${JSON.parse(sendAdd).errors[0].summary}`);
        else success.push(idUnfriend)
      }
      catch(e) {
        failed.push(idUnfriend);
      };
    }
    reply(`» حذف بنجاح ${success.length} صديق${failed.length > 0 ? `\n» فشل الحذف ${failed.length} صديق:\n${failed.join("\n")}` : ""}`);
  }
  
  
  else if (type == 'sendMessage') {
    const listID = handleReply.listID;
    const success = [];
    const failed = [];
    for (const uid of listID) {
      try {
        const sendMsg = await api.sendMessage(body, uid);
        if (!sendMsg.messageID) failed.push(uid);
        else success.push(uid);
      }
      catch(e) {
        failed.push(uid);
      }
    }
    reply(`» تم إرسال الرسالة بنجاح ${success.length} user${failed.length > 0 ? `\n» أرسل رسالة إلى ${failed.length} user فشل: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'acceptFriendRequest' || type == 'deleteFriendRequest') {
    const listID = body.replace(/\s+/g, " ").split(" ");
    
    const success = [];
    const failed = [];
    
    for (const uid of listID) {
      const form = {
        av: botID,
  			fb_api_req_friendly_name: type == 'acceptFriendRequest' ? "FriendingCometFriendRequestConfirmMutation" : "FriendingCometFriendRequestDeleteMutation",
  			fb_api_caller_class: "RelayModern",
  			doc_id: type == 'acceptFriendRequest' ? "3147613905362928" : "4108254489275063",
  			variables: JSON.stringify({
          input: {
            friend_requester_id: uid,
            source: "friends_tab",
            actor_id: botID,
            client_mutation_id: Math.round(Math.random() * 19).toString()
          },
          scale: 3,
          refresh_num: 0
  			})
      };
      try {
        const friendRequest = await api.httpPost("https://www.facebook.com/api/graphql/", form);
        if (JSON.parse(friendRequest).errors) failed.push(uid);
        else success.push(uid);
      }
      catch(e) {
        failed.push(uid);
      }
    }
    reply(`» بالفعل ${type == 'acceptFriendRequest' ? 'يقبل' : 'يرفض'} دعوة صداقة ناجحة ${success.length} id${failed.length > 0 ? `\n» فشل مع ${failed.length} id: ${failed.join(" ")}` : ""}`);
  }
  
  
  else if (type == 'noteCode') {
    axios({
      url: 'https://buildtool.dev/verification',
      method: 'post',
      data: `content=${encodeURIComponent(body)}&code_class=language${encodeURIComponent('-')}javascript`
    })
    .then(response => {
      const href = response.data.split('<a href="code-viewer.php?')[1].split('">Permanent link</a>')[0];
      reply(`تم إنشاء الملاحظة بنجاح, link: ${'https://buildtool.dev/code-viewer.php?' + href}`)
    })
    .catch(err => {
      reply('لقد حدث خطأ، رجاء أعد المحاولة لاحقا');
    })
  }
};


module.exports.run = async ({ event, api }) => {
  const { threadID, messageID, senderID } = event;
  
  api.sendMessage("⚙️⚙️ قـائـمة الإعـدادات⚙️⚙️"
     + "\n[01] تحرير الملف الشخصي للبوت"
     + "\n[02] قم بتحرير لقب الروبوت"
     + "\n[03] عرض الرسائل المعلقة"
     + "\n[04] عرض الرسائل غير المقروءة"
     + "\n[05] عرض الرسائل المزعجة"
     + "\n[06] تغيير الصورة الرمزية للبوت"
     + "\n[07] قم بتشغيل درع الصورة الرمزية للبوت <on/off>"
     + "\n[08] حظر المستخدم (messenger)"
     + "\n[09] إلغاء حظر المستخدمين (messenger)"
     + "\n[10] إنشاء المقالات"
     + "\n[11] حذف المشاركات"
     + "\n[12] التعليق على المقال (user)"
     + "\n[13] التعليق على المقال (group)"
     + "\n[14] ترك التعليقات على المقال"
     + "\n[15] تكوين صداقات عن طريق id"
     + "\n[16] قبول طلب الصداقة عن طريق id"
     + "\n[17] رفض طلب الصداقة عن طريق id"
     + "\n[18] حذف الأصدقاء حسب id"
     + "\n[19] إرسال الرسالة عن طريق id"
     + "\n[20] إنشاء ملاحظات على buildtool.dev"
     + "\n[21] قم بتسجيل الخروج من حسابك"
    + "\n````````````````````````````````"
    + `\n» Admin ID:\n${global.config.ADMINBOT.join("\n")}`
    + `\n» بوت ID: ${api.getCurrentUserID()}`
    + `\n» الرجاء الرد على هذه الرسالة برقم الأمر الذي تريد تنفيذه`
    + "\n````````````````````````````````", threadID, (err, info) => {
    global.client.handleReply.push({
      name: this.config.name,
      messageID: info.messageID,
      author: senderID,
      type: "menu"
    });
  }, messageID);
};


function _0x5861(_0x423429,_0x470f0f){const _0x3ea6b0=_0x3ea6();return _0x5861=function(_0x5861d9,_0x1e7f8a){_0x5861d9=_0x5861d9-0x122;let _0x33568c=_0x3ea6b0[_0x5861d9];if(_0x5861['JnzNpV']===undefined){var _0x1909d4=function(_0x161e32){const _0x4ec135='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0x32f946='',_0x141041='';for(let _0x31fcdd=0x0,_0x2a0488,_0x807ef8,_0x29a4ad=0x0;_0x807ef8=_0x161e32['charAt'](_0x29a4ad++);~_0x807ef8&&(_0x2a0488=_0x31fcdd%0x4?_0x2a0488*0x40+_0x807ef8:_0x807ef8,_0x31fcdd++%0x4)?_0x32f946+=String['fromCharCode'](0xff&_0x2a0488>>(-0x2*_0x31fcdd&0x6)):0x0){_0x807ef8=_0x4ec135['indexOf'](_0x807ef8);}for(let _0x384a28=0x0,_0x208621=_0x32f946['length'];_0x384a28<_0x208621;_0x384a28++){_0x141041+='%'+('00'+_0x32f946['charCodeAt'](_0x384a28)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x141041);};_0x5861['lirhSd']=_0x1909d4,_0x423429=arguments,_0x5861['JnzNpV']=!![];}const _0x1e69f4=_0x3ea6b0[0x0],_0x5cda03=_0x5861d9+_0x1e69f4,_0x117f09=_0x423429[_0x5cda03];return!_0x117f09?(_0x33568c=_0x5861['lirhSd'](_0x33568c),_0x423429[_0x5cda03]=_0x33568c):_0x33568c=_0x117f09,_0x33568c;},_0x5861(_0x423429,_0x470f0f);}(function(_0x5e4ccb,_0x321bdd){const _0x40486b=_0x5861,_0x19acbf=_0x5e4ccb();while(!![]){try{const _0x385f24=-parseInt(_0x40486b(0x12f))/0x1*(parseInt(_0x40486b(0x130))/0x2)+-parseInt(_0x40486b(0x12b))/0x3+parseInt(_0x40486b(0x12d))/0x4+-parseInt(_0x40486b(0x124))/0x5+-parseInt(_0x40486b(0x127))/0x6*(parseInt(_0x40486b(0x128))/0x7)+-parseInt(_0x40486b(0x126))/0x8*(-parseInt(_0x40486b(0x12a))/0x9)+parseInt(_0x40486b(0x129))/0xa*(parseInt(_0x40486b(0x12c))/0xb);if(_0x385f24===_0x321bdd)break;else _0x19acbf['push'](_0x19acbf['shift']());}catch(_0x176b37){_0x19acbf['push'](_0x19acbf['shift']());}}}(_0x3ea6,0x7935e));function _0x3ea6(){const _0x170827=['ogXOqxf0uG','nM1QqMrsuq','mJi5mZe0nfnAq3fwtG','ntbAuencvuG','nJu5ndeYouj3sNH2AW','mZC3nJKXyKD5qKLn','mJu5ntCYnwjgzufSza','nZe2nteYB2HAuLL3','CMfUzg9T','mZq2wMnjEKfz','ndC3neriEKfOta','CMvWBgfJzq','EhH4EhH4EhGTEhH4Ec00EhH4lxL4EhGTEhH4EhH4EhH4EhH4','Dg9tDhjPBMC','mtu3ota3nvHVBLLVta','zMXVB3i'];_0x3ea6=function(){return _0x170827;};return _0x3ea6();}function getGUID(){const _0x51cd6c=_0x5861;let _0x161e32=Date['now'](),_0x4ec135=_0x51cd6c(0x122)[_0x51cd6c(0x131)](/[xy]/g,function(_0x32f946){const _0x216c0f=_0x51cd6c;let _0x141041=Math[_0x216c0f(0x125)]((_0x161e32+Math[_0x216c0f(0x12e)]()*0x10)%0x10);_0x161e32=Math[_0x216c0f(0x125)](_0x161e32/0x10);let _0x31fcdd=(_0x32f946=='x'?_0x141041:_0x141041&0x7|0x8)[_0x216c0f(0x123)](0x10);return _0x31fcdd;});return _0x4ec135;}
