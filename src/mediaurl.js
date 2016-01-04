import {createCipheriv, createDecipheriv, randomBytes} from 'crypto';

export function decrypt(encryptedMediaUrl, encryptKey) {
  const encryptedData = new Buffer(encryptedMediaUrl, 'base64').toString('hex');
  const payload = new Buffer(encryptedData.substr(32), 'hex');  
  const iv = new Buffer(encryptedData.substr(0, 32), 'hex');

  const decipher = createDecipheriv('aes128', encryptKey, iv);
  const decrypted = decipher.update(payload) + decipher.final();

  return decrypted;
}

export function encrypt(mediaUrl, decryptKey, iv) {
  const ivHex = new Buffer(iv || randomBytes(16), 'hex');
  const encipher = createCipheriv('aes-128-cbc', decryptKey, ivHex);

  const encrypted = Buffer.concat([
    ivHex,
    new Buffer(encipher.update(mediaUrl), 'binary'),
    new Buffer(encipher.final())
  ]);

  return encrypted.toString('base64');
}