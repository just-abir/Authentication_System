const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");
const { findById } = require("../models/user.model");

const createMusic = async (req, res) => {
  const { title } = req.body;

  const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"));
  console.log("Result of uplaod: ", result);

  const music = await musicModel.create({
    url: result.url,
    title,
    artist: req.user.userId,
  });

  res.status(201).json({
    success: true,
    message: "musisc created",
    music,
  });
};

const createAlbum = async (req, res) => {
  const { title, musics } = req.body;

  const album = await albumModel.create({
    title,
    artist: req.user.userId,
    musics: musics,
  });

  res.status(201).json({
    message: "album success",
    album,
  });
};

const getAllMusics = async (req, res) => {
  try {
    const musics = await musicModel.find();

    res.status(200).json({
      message: "all music fetched",
      musics,
    });
  } catch (erorr) {
    res.status(500).json({
      message: erorr.message,
    });
  }
};

const getAllAlbum = async (req, res) => {
  const album = await albumModel
    .find()
    .populate("artist", "name email")
    .populate("musics");
  res.status(200).json({
    message: "album success",
    album: album,
  });
};

const getAlbumById = async (req, res) => {
  const albumId = req.params.id;
  const album = await albumModel.findById(albumId).populate("artist");
  console.log("album", album);
  return res.status(200).json({
    message: "album fetched success",
    album,
  });
};

module.exports = {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbum,
  getAlbumById,
};
