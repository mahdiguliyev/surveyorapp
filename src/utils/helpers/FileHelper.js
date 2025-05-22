// FileHelper.js
import RNFS from 'react-native-fs';

const APP_FOLDER = `${RNFS.DocumentDirectoryPath}/MyAppPhotos`;

const ensureAppFolderExists = async () => {
  try {
    const exists = await RNFS.exists(APP_FOLDER);
    if (!exists) {
      await RNFS.mkdir(APP_FOLDER);
    }
  } catch (error) {
    console.error('Failed to ensure app folder exists:', error);
    throw error;
  }
};

/**
 * Move a file from temp path (e.g., camera output) to app folder with unique name.
 * @param {string} tempPath - Temporary file path from camera or picker.
 * @returns {Promise<string>} - The new absolute file path in the app folder.
 */
const moveFileToAppFolder = async tempPath => {
  try {
    await ensureAppFolderExists();

    // Remove file:// prefix if present (common on iOS)
    const cleanTempPath = tempPath.startsWith('file://')
      ? tempPath.slice(7)
      : tempPath;

    // Create unique file name with timestamp
    const fileName = `photo_${Date.now()}.jpg`;
    const destPath = `${APP_FOLDER}/${fileName}`;

    await RNFS.moveFile(cleanTempPath, destPath);

    return destPath;
  } catch (error) {
    console.error('Error moving file to app folder:', error);
    throw error;
  }
};

/**
 * Delete a specific file by absolute path.
 * @param {string} filePath - Full path of the file to delete.
 */
const deleteFile = async filePath => {
  try {
    const cleanPath = filePath.startsWith('file://')
      ? filePath.slice(7)
      : filePath;
    const exists = await RNFS.exists(cleanPath);
    if (exists) {
      await RNFS.unlink(cleanPath);
      console.log('Deleted file:', cleanPath);
    }
  } catch (error) {
    console.error('Failed to delete file:', error);
  }
};

/**
 * Delete all files in the app folder.
 */
const deleteAllFilesInAppFolder = async () => {
  try {
    const exists = await RNFS.exists(APP_FOLDER);
    if (!exists) {
      console.log('App folder does not exist, nothing to delete.');
      return;
    }
    const files = await RNFS.readDir(APP_FOLDER);
    await Promise.all(files.map(file => RNFS.unlink(file.path)));
    console.log('Deleted all files in app folder.');
  } catch (error) {
    console.error('Failed to delete files in app folder:', error);
  }
};

/**
 * List all files in the app folder.
 * @returns {Promise<Array<{name: string, path: string}>>}
 */
const listFilesInAppFolder = async () => {
  try {
    const exists = await RNFS.exists(APP_FOLDER);
    if (!exists) {
      return [];
    }
    const files = await RNFS.readDir(APP_FOLDER);
    return files.map(file => ({name: file.name, path: file.path}));
  } catch (error) {
    console.error('Failed to list files in app folder:', error);
    return [];
  }
};

export default {
  APP_FOLDER,
  ensureAppFolderExists,
  moveFileToAppFolder,
  deleteFile,
  deleteAllFilesInAppFolder,
  listFilesInAppFolder,
};
