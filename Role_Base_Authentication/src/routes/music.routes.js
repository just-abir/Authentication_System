const express = require("express");
const musicController = require("../controllers/music.controller");
const musicModel = require("../models/music.model");
const userArtistMiddlware = require("../middlewares/user.middlewares");
const router = express.Router();

const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post(
  "/create",
  userArtistMiddlware.userArtist,
  upload.single("music"),
  musicController.createMusic,
);
router.post(
  "/album",
  userArtistMiddlware.userArtist,
  musicController.createAlbum,
);

router.get(
  "/all",
  userArtistMiddlware.userListener,
  musicController.getAllMusics,
);

router.get(
  "/all/album",
  userArtistMiddlware.userListener,
  musicController.getAllAlbum,
);

router.get(
  "/all/album/:id",
  userArtistMiddlware.userListener,
  musicController.getAlbumById,
);

module.exports = router;
