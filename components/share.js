
import RNWhatsAppStickers from "react-native-whatsapp-stickers";
import { Alert } from 'react-native';

module.exports = {
    packages: { /*  !!! THIS PACKAGE IS ONLY HERE FOR IOS - Android uses contents.json at /android/app/src/main/assets */
        "REDACTED": {
            config: {
                identifier: 'REDACTED',
                name: 'REDACTED',
                publisher: 'REDACTED',
                trayImageFileName: 'REDACTED.png',
                publisherEmail: '',
                publisherWebsite: '',
                privacyPolicyWebsite: '',
                licenseAgreementWebsite: '',
            },
            stickerFileNames: [
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png"
            ]
        },
        "REDACTED": {
            config: {
                identifier: 'REDACTED',
                name: 'REDACTED',
                publisher: 'REDACTED',
                trayImageFileName: 'REDACTED.png',
                publisherEmail: '',
                publisherWebsite: '',
                privacyPolicyWebsite: '',
                licenseAgreementWebsite: '',
            },
            stickerFileNames: [
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
            ]
        },
        "REDACTED": {
            config: {
                identifier: 'REDACTED',
                name: 'REDACTED',
                publisher: 'REDACTED',
                trayImageFileName: 'REDACTED',
                publisherEmail: '',
                publisherWebsite: '',
                privacyPolicyWebsite: '',
                licenseAgreementWebsite: '',
            },
            stickerFileNames: [
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
                "REDACTED.png",
            ]
        }
    },
    /**
     * Checks if Whatsapp is available on the device then executes callback function.
     * @param callback Callback function after RNWhatsAppStickers checks if Whatsapp exists. Takes resulting boolean as parameter.
     */
    isWhatsAppAvailable: function(callback){
        RNWhatsAppStickers.isWhatsAppAvailable().then( isWhatsAppAvailable => {
            callback(isWhatsAppAvailable);
        });
    },
    /**
     * This function creates a sticker pack in Whatsapp. (for IOS only)
     * @param packageName String of package name being shared to Whatsapp. 
     */
    shareIOS: function(packageName){

        let config, stickerFileNames;

        if (this.packages[packageName] != null){
            config = this.packages[packageName].config;
            stickerFileNames = this.packages[packageName].stickerFileNames;

            RNWhatsAppStickers.createStickerPack(config).then(() => {
                console.log('success creating sticker pack');
    
                let stickersAdded = 0;
    
                for (let sticker of stickerFileNames) {
    
                    RNWhatsAppStickers.addSticker(sticker, []).then(() => {
    
                        console.log('success adding sticker', sticker);
                        stickersAdded++;
    
                        if (stickersAdded == stickerFileNames.length) {
    
                            RNWhatsAppStickers.send().then(() => {
                                console.log('success sending to whatsapp');
                            }).catch(e => console.error("error sending to whatsapp", e));
                        }
    
                    }).catch(e => console.error("addsticker error", sticker));
                }

            }).catch(e => console.error("createstickerpack error", e));
        }
        else {
            Alert.alert("Error", "Package name invalid");
        }
    },
    /**
     * This function creates a sticker pack in Whatsapp. (for Android only)
     * @param identifier String of emoji pack identifier
     * @param name String of emoji pack name 
     * @param callback Function executed after creating/adding new sticker pack in whatsapp
     */
    shareAndroid: function(identifier, name, callback){
        RNWhatsAppStickers.send(identifier, name).then((r) => {
            console.log("success sending to whatsapp", r);
            callback();
        }, error => {
            console.log("error sending to whatsapp", error);
        });
    }
};