const { Client, GatewayIntentBits } = require('discord.js');


const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Bot is alive!'));

app.listen(port, () => console.log(`Listening on port ${port}`));

const TelegramBot = require('node-telegram-bot-api');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-service-account.json');
const path = require('path');
const fs = require('fs');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'treng-c6027.appspot.com' // غيره للbucket الصحيح
});

const db = admin.firestore();
const bucket = admin.storage().bucket();




const bot = new TelegramBot('7980701490:AAGkDG5unlm0LvILYT2Bz-mDjt2TOpwaMkI', { polling: true });

// معرفات المشرفين (حط IDs التليجرام للمشرفين هنا)
const admins = [5307228059, 987654321];
const manageScripts = require('./manageScripts');

manageScripts(bot, admins);




const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// استيراد الملفات اللي فيها الوظائف
const { handleListCommand, handleButtonInteraction } = require('./scriptsMenu');

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});




client.on('messageCreate', async (message) => {
  if (message.content === '!list') {
    client.on('messageCreate', async (message) => {
      if (message.content === '!list') {
        await sendScriptsMenu(message);
      }
    });

    client.on('interactionCreate', async (interaction) => {
      const handled = await handleInteraction(interaction);
      // لو التفاعل متعلق بالقائمة (handled === true) ما تحتاج تعمل شيء آخر
    });

client.login('MTA0NDE0OTc3NDQzMTAzMTQxNw.G2hL-t.bT4LuCmtIK5n_cj3Abkd2YxC3eO6cj0sst94SY');
// رابط القناة الثابت




const YT_CHANNEL_URL = 'https://youtube.com/@hema_tech1?si=Vz2E7UjRpTmac6iw';

// سجل أوامر البوت (تظهر في قائمة الأوامر)
bot.setMyCommands([
  { command: 'list', description: 'عرض قائمة السكربتات' },
  { command: 'add', description: 'إضافة سكربت جديد (للمشرفين فقط)' },
]).catch(console.error);

// أمر /list لعرض السكربتات
bot.onText(/\/list/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const snapshot = await db.collection('scripts').get();

    if (snapshot.empty) {
      return bot.sendMessage(chatId, 'لا يوجد سكربتات متاحة حالياً.');
    }

    const buttons = [];
    snapshot.forEach(doc => {
      const script = doc.data();
      buttons.push([{
        text: script.title || 'بدون اسم',
        callback_data: `show_${doc.id}`
      }]);
    });

    const photoUrl = 'https://i.ibb.co/YFTPCHzT/20250531-204247.jpg'; // حط رابط صورة عامة تعجبك

    await bot.sendPhoto(chatId, photoUrl, {
      caption: `*قائمة السكربتات:*`,
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: buttons
      }
    });

  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, 'حدث خطأ أثناء جلب قائمة السكربتات.');
  }
});

// استقبال ضغطات الأزرار
bot.on('callback_query', async (callbackQuery) => {
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;
  const data = callbackQuery.data;

  try {
    if (data.startsWith('show_')) {
      const scriptId = data.split('_')[1];
      const doc = await db.collection('scripts').doc(scriptId).get();

      if (!doc.exists) {
        return bot.sendMessage(chatId, 'عذرًا، السكربت غير موجود.');
      }

      const script = doc.data();

      const message =
        `*${script.title}*\n\n` +
        `${script.description}\n\n` +
        `🔑 المفتاح: \`${script.scriptKey || 'غير متوفر'}\`\n\n` +
        `📄 الكود:\n\`\`\`\n${script.scriptName}\n\`\`\`\n\n` +
        `*كيفية الاستخدام:*\n` +
        `1. افتح اللعبة.\n` +
        `2. انسخ الكود والصقه في أداة التنفيذ.\n` +
        `3. نفّذ واستمتع!\n\n` +
        `[قناة اليوتيوب](${YT_CHANNEL_URL})`;

      // أزرار: نسخ السكربت (بلا زر نسخ، لأن Telegram ما يدعم نسخ مباشر) + قناة اليوتيوب + رجوع
      const keyboard = [
        [{ text: '🔗 رابط القناة', url: YT_CHANNEL_URL }],
        [{ text: '🔙 رجوع', callback_data: 'back_to_list' }]
      ];

      if (script.imageUrl) {
        // نعدل نفس الرسالة بالصورة والنص مع الأزرار
        await bot.editMessageMedia({
          type: 'photo',
          media: script.imageUrl,
          caption: message,
          parse_mode: 'Markdown'
        }, {
          chat_id: chatId,
          message_id: msg.message_id,
          reply_markup: {
            inline_keyboard: keyboard
          }
        });
      } else {
        // نعدل نص الرسالة فقط
        await bot.editMessageCaption(message, {
          chat_id: chatId,
          message_id: msg.message_id,
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: keyboard
          }
        });
      }
      bot.answerCallbackQuery(callbackQuery.id);

    } else if (data === 'back_to_list') {
      // لو رجع لقائمة السكربتات
      const snapshot = await db.collection('scripts').get();

      if (snapshot.empty) {
        return bot.editMessageText('لا يوجد سكربتات متاحة حالياً.', {
          chat_id: chatId,
          message_id: msg.message_id
        });
      }

      const buttons = [];
      snapshot.forEach(doc => {
        const script = doc.data();
        buttons.push([{
          text: script.title || 'بدون اسم',
          callback_data: `show_${doc.id}`
        }]);
      });

      const photoUrl = 'https://i.imgur.com/yourDefaultImage.jpg'; // رابط الصورة العامة

      await bot.editMessageMedia({
        type: 'photo',
        media: photoUrl,
        caption: `*قائمة السكربتات:*`,
        parse_mode: 'Markdown'
      }, {
        chat_id: chatId,
        message_id: msg.message_id,
        reply_markup: {
          inline_keyboard: buttons
        }
      });

      bot.answerCallbackQuery(callbackQuery.id);
    }

  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, 'حدث خطأ أثناء معالجة الطلب.');
  }
});

// إضافة سكربت (للمشرفين فقط) مع رفع صورة من الهاتف
// الخطوات: بعد /add يبدأ البوت يطلب الاسم ثم الوصف ثم المفتاح ثم الكود ثم الصورة
const addScriptSessions = {};

bot.onText(/\/add/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (!admins.includes(userId)) {
    return bot.sendMessage(chatId, 'عذراً، أنت لست من المشرفين.');
  }

  addScriptSessions[chatId] = {
    step: 1,
    data: {}
  };

  bot.sendMessage(chatId, 'يرجى إرسال اسم السكربت:');
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const session = addScriptSessions[chatId];

  // إذا في جلسة إضافة سكربت
  if (session && admins.includes(userId)) {
    try {
      switch (session.step) {
        case 1:
          if (!msg.text) {
            return bot.sendMessage(chatId, 'الرجاء إرسال اسم نصي للسكربت.');
          }
          session.data.title = msg.text;
          session.step++;
          bot.sendMessage(chatId, 'أرسل وصف السكربت:');
          break;

        case 2:
          if (!msg.text) {
            return bot.sendMessage(chatId, 'الرجاء إرسال وصف نصي.');
          }
          session.data.description = msg.text;
          session.step++;
          bot.sendMessage(chatId, 'أرسل المفتاح (أو اكتب "لا" إذا لا يوجد):');
          break;

        case 3:
          if (!msg.text) {
            return bot.sendMessage(chatId, 'الرجاء إرسال المفتاح.');
          }
          session.data.scriptKey = msg.text.toLowerCase() === 'لا' ? '' : msg.text;
          session.step++;
          bot.sendMessage(chatId, 'أرسل الكود (النص) الخاص بالسكربت:');
          break;

        case 4:
          if (!msg.text) {
            return bot.sendMessage(chatId, 'الرجاء إرسال الكود نصياً.');
          }
          session.data.scriptName = msg.text;
          session.step++;
          bot.sendMessage(chatId, 'الآن أرسل صورة السكربت (ارفع صورة من الهاتف):');
          break;

        case 5:
          if (!msg.photo) {
            return bot.sendMessage(chatId, 'الرجاء إرسال صورة صحيحة.');
          }

          // نأخذ أعلى جودة للصورة
          const photoArray = msg.photo;
          const photo = photoArray[photoArray.length - 1];

          // نطلب رابط تحميل الصورة من telegram
          const fileId = photo.file_id;
          const fileLink = await bot.getFileLink(fileId);

          // نحمل الصورة من الرابط ثم نرفعها إلى Firebase Storage
          const axios = require('axios');
          const { v4: uuidv4 } = require('uuid');
          const tmpFilePath = path.join(__dirname, `${uuidv4()}.jpg`);

          const writer = fs.createWriteStream(tmpFilePath);
          const response = await axios.get(fileLink, { responseType: 'stream' });
          response.data.pipe(writer);

          await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
          });

          // رفع الصورة إلى Firebase Storage
          const uploadResponse = await bucket.upload(tmpFilePath, {
            destination: `scripts_images/${uuidv4()}.jpg`,
            metadata: {
              metadata: {
                firebaseStorageDownloadTokens: uuidv4(),
              }
            }
          });

          // نحصل على رابط التنزيل العام
          const uploadedFile = uploadResponse[0];
          const token = uploadedFile.metadata.metadata.firebaseStorageDownloadTokens;
          const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(uploadedFile.name)}?alt=media&token=${token}`;

          // نحذف الملف المؤقت
          fs.unlinkSync(tmpFilePath);

          session.data.imageUrl = imageUrl;

          // نحفظ السكربت في Firebase
          await db.collection('scripts').add(session.data);

          bot.sendMessage(chatId, 'تم إضافة السكربت بنجاح!');

          delete addScriptSessions[chatId];
          break;

        default:
          bot.sendMessage(chatId, 'خطأ غير متوقع في العملية.');
          delete addScriptSessions[chatId];
          break;
      }
    } catch (error) {
      console.error(error);
      bot.sendMessage(chatId, 'حدث خطأ أثناء الإضافة.');
      delete addScriptSessions[chatId];
    }
  }
   
});
