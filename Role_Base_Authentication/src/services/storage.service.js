const ImageKit = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const uploadFile = async (file) => {
  const result = await client.files.upload({
    file,
    fileName: "music_" + Date.now(),
    folder: "Music_Album",
  });

  return result;
};

module.exports = { uploadFile };
