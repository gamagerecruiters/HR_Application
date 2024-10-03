import {useState} from "react";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage"
import { storage } from "../firebase/config";

import {v4 as uuid4} from "uuid"

const useStorage = (setProgress, setError, setImgUrl, setFileType) => {

    const startUpload = (file) => {
        if (!file) {
            return;
        }
        const fileId = uuid4();
        console.log(file)
        const fileFormat = file.type.split("/")[1];

        setFileType(fileFormat)

        console.log(fileFormat)

        const storageRef = ref(storage, `images/${fileId}.${fileFormat}`);

        console.log('storageRef',storageRef)

        const uploadTask = uploadBytesResumable(storageRef, file);

        console.log('uploadTask',uploadTask)

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress)
            },
            (error) => {
                setError(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("downloadURL",downloadURL)
                    setImgUrl(downloadURL)
                    
                });
            }
        );
    }

    return {startUpload}
}
export default useStorage;