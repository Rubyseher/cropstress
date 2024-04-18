// useDB.js
import { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import config from './config';
import 'firebase/analytics';

const useDB = () => {
    const [storage, setStorage] = useState(null);

    useEffect(() => {
        initializeApp(config);
        setStorage(getStorage());
    }, []);

    const getStorageItem = (path, callback) => {
        if (!storage) return;

        getDownloadURL(ref(storage, path))
            .then((url) => {
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:
               
                callback(url)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return { getStorageItem };
};

export default useDB;