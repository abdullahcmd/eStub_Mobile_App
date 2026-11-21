import {Platform} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';

/**
 * Downloads a PDF into the platform's documents location.
 * Returns the local file path.
 * TODO: add Android runtime storage permission handling if targeting API < 29.
 */
export const downloadPdf = async (
  url: string,
  fileName: string,
): Promise<string> => {
  const {dirs} = ReactNativeBlobUtil.fs;
  const path = `${
    Platform.OS === 'ios' ? dirs.DocumentDir : dirs.DownloadDir
  }/${fileName}`;

  const res = await ReactNativeBlobUtil.config({
    path,
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      mime: 'application/pdf',
      title: fileName,
      path,
    },
  }).fetch('GET', url);

  return res.path();
};

/** Opens the downloaded file in the system viewer / share sheet. */
export const openPdf = async (path: string): Promise<void> => {
  if (Platform.OS === 'ios') {
    await ReactNativeBlobUtil.ios.previewDocument(path);
  } else {
    await ReactNativeBlobUtil.android.actionViewIntent(path, 'application/pdf');
  }
};
