
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'; //android
import StoragePhoto from 'react-native-save-photo'; //IOS

module.exports = {
    request_storage_permission: async function () {
        console.log("downloadWallpapers.js/request_storage_permission()");
        if (Platform.OS === "android") {

            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
                'title': 'Storage Permission',
                'message': 'App needs access to your storage to download photos'
            });

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            }
            else {
                Alert.alert("Storage Permission Not Granted");
                return false;
            }
        }
        else {
            console.log("not an android");
            return true;
        }
    },
    savePhotoAndroid: function (fileName, photoURL) {
        console.log("downloadWallpapers.js/savePhotoAndroid()");

        let dirs = RNFetchBlob.fs.dirs;

        let config = {
            fileCache: true, // add this option that makes response data to be stored as a file,
            session: "REDACTED",
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: dirs.DownloadDir + fileName + ".png",
                description: 'downloading file'
            }
        };

        RNFetchBlob.config(config).fetch('GET', photoURL).then((res) => {
            if (res.data) console.log('download success', fileName, photoURL);
            else console.log('download failed', fileName, photoURL);
        });
    },
    //this works to save photos in IOS
    savePhotoIOS(photoURL) {
        console.log("downloadWallpapers.js/savePhotoIOS()");

        if (Platform.OS === "ios") {
            StoragePhoto.savePhoto(photoURL, (message) => {
                console.log("savePhotoIOS()", message);
            });
        }
        else {
            console.log("not ios");
        }
    }
};