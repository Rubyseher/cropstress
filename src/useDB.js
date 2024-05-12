// useDB.js
import { useState, useEffect ,useCallback} from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref,listAll, getDownloadURL } from "firebase/storage";
import config from './config';
import 'firebase/analytics';

const useDB = () => {
    const [storage, setStorage] = useState(null);

    useEffect(() => {
        initializeApp(config);
        setStorage(getStorage());
    }, []);

    
    const getStorageItem = useCallback(async (path) => {
        if (!storage) return;

        try {
            const folderRef = ref(storage, path);
            const items = await listAll(folderRef);

            const itemDetailsPromises = items.items.map(itemRef => {
                return getDownloadURL(itemRef).then(downloadURL => ({
                    downloadURL,
                    fullPath: itemRef.fullPath
                }));
            });

            // Wait for all promises to resolve
            const itemDetails = await Promise.all(itemDetailsPromises);

            return {
                items: itemDetails
            };
        } catch (error) {
            console.error('Error getting storage item:', error);
            throw error;
        }
      }, [storage]);


    return { getStorageItem };
};

export default useDB;