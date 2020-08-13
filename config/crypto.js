const crypto = require("crypto");

const config = {
  ENCRYPTION_KEY: "5v8y/B?E(H+MbQeShVmYq3t6w9z$C&F)",
  IV_LENGTH: 16,
};

const encrypt = (text) => {
  let iv = crypto.randomBytes(config.IV_LENGTH);
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(config.ENCRYPTION_KEY),
    iv
  );
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
};

const decrypt = (text) => {
  try {
    let textParts = text.split(":");
    let iv = Buffer.from(textParts.shift(), "hex");
    let encryptedText = Buffer.from(textParts.join(":"), "hex");
    let decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(config.ENCRYPTION_KEY),
      iv
    );
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
  } catch (error) {
    return text;
  }
};

/**
 *
 * @param {Object} obj
 * @param {Array} keys
 *
 */
const encryptObject = (obj, keys = []) =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    if (keys.length && keys.includes(key)) {
      acc[key] = encrypt(value.toString());
    } else {
      acc[key] = value;
    }

    return acc;
  }, {});

module.exports = {
  encrypt,
  decrypt,
  encryptObject,
};
