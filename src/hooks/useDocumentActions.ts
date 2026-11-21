import {useCallback, useState} from 'react';
import Toast from 'react-native-toast-message';
import {downloadPdf, openPdf} from '@/utils/download';
import {getErrorMessage} from '@/utils/errors';

/** Download / open-externally behaviour shared by pay stub and W-2 screens. */
export const useDocumentActions = () => {
  const [downloading, setDownloading] = useState(false);

  const download = useCallback(async (url: string, fileName: string) => {
    setDownloading(true);
    try {
      await downloadPdf(url, fileName);
      Toast.show({type: 'success', text1: 'Download complete', text2: fileName});
    } catch (e) {
      Toast.show({type: 'error', text1: 'Download failed', text2: getErrorMessage(e)});
    } finally {
      setDownloading(false);
    }
  }, []);

  const openExternally = useCallback(async (url: string, fileName: string) => {
    setDownloading(true);
    try {
      const path = await downloadPdf(url, fileName);
      await openPdf(path);
    } catch (e) {
      Toast.show({type: 'error', text1: 'Could not open file', text2: getErrorMessage(e)});
    } finally {
      setDownloading(false);
    }
  }, []);

  return {downloading, download, openExternally};
};
