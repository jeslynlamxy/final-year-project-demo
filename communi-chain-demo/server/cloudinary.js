const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dznporaco",
  api_key: "772398539171842",
  api_secret: "9SPdAVPop0kaPFVADK7mAEUqurM",
});

module.exports = cloudinary;
