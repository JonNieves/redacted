
import { AsyncStorage } from 'react-native';
let Parse = require("parse/react-native");

module.exports = {
    user: undefined,
    artistas: [], //array of artists (artistas.js)
    artista: [], //should just be an array of one artist
    paquetes: [], //array of packages
    imagenes: [],
    /**
     * Parse sets storage to AsyncStorage and initializes with Parse keys
     * @param callback Function after initializing Parse
     */
    init: function(callback = null) {
        //console.log("parse.js/init()");

        Parse.setAsyncStorage(AsyncStorage);
        Parse.serverURL = 'https://parseapi.back4app.com/';
        Parse.initialize("REDACTED", "REDACTED");

        if (callback) callback();
    },
    /**
     * Query server for artists and save it to local variable
     * @param query Can have 2 optional properties; "artistaID" and "limit". "artistaID" refers to string of object id of artista in back4app, and limit limits how many results come back. 
     * @param callback Function after getting artists from server
     */
    getArtistas: function(query = null, callback = null) {
        //console.log("parse.js/getArtistas()", query);

        let finalQuery = null;

        if (query == null){
            finalQuery = {
                artistaID: null,
                limit: null
            };
        }
        else {
            finalQuery = {
                artistaID: (query.artistaID) ? query.artistaID : null,
                limit: (query.limit) ? query.limit : null
            };
        }

        Parse.Cloud.run("getArtistas", finalQuery).then( artistas => {
            this.artistas = artistas;
            //console.log("REDACTED_PARSE.artistas", this.artistas);
            if (callback) callback();
        }, error => {
            console.log("getArtistas", error);
        });
    },
    /**
     * Query server for specific artist and execute function with result
     * @param artistID String of artist objectid in Back4app
     * @param callback Function to execute with query, which gives result as array
     */
    getArtista: function(artistaID, callback){
        //console.log("parse.js/getArtista()", artistaID);

        Parse.Cloud.run("getArtistas", {
            artistaID: artistaID
        }).then( artista => {
            if (artista.length == 1) this.artista = artista;
            if (callback) callback();
        }, error => {
            console.log("getArtistas", error);
        });
    },
    /**
     * * Query server for a specific or multiple packages
     * @param query Can have 4 properties; "artistaID", "paqueteID", "limit", "limitOnePerArtist".
     * @param callback Function after getting packages from server
     */
    getPaquetes: function(query = null, callback = null){
        //console.log("parse.js/getPaquetes()", query);

        let finalQuery = null;

        if (query == null){
            finalQuery = {
                artistaID: null,
                paqueteID: null,
                limit: null,
                limitOnePerArtist: null
            };
        }
        else {
            finalQuery = {
                artistaID: (query.artistaID) ? query.artistaID : null,
                paqueteID: (query.paqueteID) ? query.paqueteID : null,
                limit: (query.limit) ? query.limit : null,
                limitOnePerArtist: (query.limitOnePerArtist) ? true : null
            };
        }

        Parse.Cloud.run("getPaquetes", finalQuery).then( paquetes => {
            this.paquetes = paquetes;
            //console.log("REDACTED_PARSE.paquetes", this.paquetes);
            if (callback) callback();
        }, error => {
            console.log("getPaquetes", error);
        });
    },
    /**
     * Query server for images, wallpapers
     * @param query Can have up to 4 properties; "type", "artistaID", "paqueteID", and "limit". "artistaID" and "paqueteID" are for finding images of a specific artist and/or package. The query can be further refined by Type of image, "emoji" and "wallpaper". The query can also be capped by limit.
     * @param callback Function after getting images from server
     */
    getImagenes: function(query = null, callback = null){
        //console.log("parse.js/getImagenes()", query);

        let finalQuery = null;

        if (query == null){
            finalQuery = {
                type: null,
                artista: null,
                paqueteID: null,
                limit: null,
                limitOnePerArtist: null
            };
        }
        else {
            finalQuery = {
                type: (query.type) ? query.type : null,
                artistaID: (query.artistaID) ? query.artistaID : null,
                paqueteID: (query.paqueteID) ? query.paqueteID : null,
                limit: (query.limit) ? query.limit : null,
                limitOnePerArtist: (query.limitOnePerArtist) ? query.limitOnePerArtist : null
            };
        }

        Parse.Cloud.run("getImagenes", finalQuery).then( imagenes => {
            this.imagenes = imagenes;
            console.log("REDACTED_PARSE.imagenes", this.imagenes);
            if (callback) callback();
        }, error => {
            console.log("getImagenes", error);
        });
    }
}