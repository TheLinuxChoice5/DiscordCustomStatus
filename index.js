const request = require("request");
const config = require("./config.json");
const STATUS_URL = "https://discord.com/api/v9/users/@me/settings";
const headers = { Authorization: config.token };

async function loop() {
  if (config.animation.length === 0) {
    return;
  }

  let i = 0;
  const interval = setInterval(async () => {
    const anim = config.animation[i % config.animation.length];
    try {
      const res = await doRequest(anim.text, anim.emojiID, anim.emojiName);
      if (res === false) {
        clearInterval(interval);
      }
    } catch (err) {
      console.error(err);
    } finally {
      i++;
    }
  }, 5000);
  
  console.log("Running...");
}

async function doRequest(text, emojiID = null, emojiName = null) {
  return new Promise((resolve, reject) => {
    request({
      method: "PATCH",
      uri: STATUS_URL,
      headers: headers,
      json: {
        custom_status: {
          text: text,
          emoji_id: emojiID,
          emoji_name: emojiName
        }
      }
    }, (err, res, body) => {
      if (err) {
        reject(err);
        return;
      }

      if (res.statusCode === 200) {
        resolve(true);
        return;
      }

      const remaining = res.headers["x-rate-limit-remaining"] || 0;
      const resetAfter = res.headers["x-rate-limit-reset-after"] || 0;
      if (remaining <= 0 && resetAfter > 0 && config.handleRatelimit) {
        const ratelimit = resetAfter * 1000;
        console.log("Hit ratelimit: " + ratelimit + "ms");
        setTimeout(() => {
          doRequest(text, emojiID, emojiName).then(resolve).catch(reject);
        }, ratelimit);
        return;
      }

      reject(new Error("Invalid Status Code: " + res.statusCode));
    });
  });
}

loop();
