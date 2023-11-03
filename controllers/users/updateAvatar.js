const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");

const { wrapper, errorHandler } = require("../../helpers");
const User = require("../../models/user");

const updateAvatar = async (req, res, next) => {
  if (!req.file) {
    errorHandler(400, "Please, add your photo");
  }

  const { path: tempPath, originalname } = req.file;

  console.log(originalname);
  const publicPath = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "avatars",
    originalname
  );

  await fs.rename(tempPath, publicPath);

  Jimp.read(publicPath, (err, image) => {
    if (err) throw err;
    console.log("ok");
    image
      .resize(250, 250) // resize
      .write(publicPath); // save
  });

  const { id } = req.user;

  const updateUser = await User.findByIdAndUpdate(id, {
    avatarURL: `/avatars/${originalname}`,
  });

  if (!updateUser) errorHandler(401, "Not authorized");

  res.status(200).json({ status: 200, avatarURL: `/avatars/${originalname}` });
};

module.exports = {
  updateAvatar: wrapper(updateAvatar),
};
