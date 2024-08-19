const fs = require("node:fs/promises");

const util = {};

// Delete a file if exits, if not the function will not throw an error
util.deleteFile = async (path) => {
  try {
    await fs.unlink(path);
  } catch (e) {
    // do nothing
  }
};

// Delete a folder if exits, if not the function will not throw an error
util.deleteFolder = async (path) => {
  try {
    await fs.rm(path, { recursive: true });
  } catch (e) {
    // do nothing
  }
};

module.exports = util;
