import React from 'react';
import { openDatabase } from 'react-native-sqlite-storage';


export default class  DBUserHandler {

     static myInstance = null;

     _db = "";

     constructor(){
         this._db = openDatabase({ name: 'HammerHeadAppDatabase.db' });

     }

     /**
      * @returns {DBUserHandler}
      */
     static getInstance() {
         if (DBUserHandler.myInstance == null) {
             DBUserHandler.myInstance = new DBUserHandler();
         }

         return this.myInstance;
     }
     initiateDB(){

         var query = "CREATE TABLE IF NOT EXISTS USERMETA( " +
             "userMeta_id INTEGER PRIMARY KEY AUTOINCREMENT, " +
             "userMeta_key TEXT,"+
             "userMeta_value TEXT" +
             ");";
         return new Promise((resolve, reject) => this._db.transaction((tx) => {
             tx.executeSql(query, [], (tx, results) => {
                 console.log("success creation DB ");
                 resolve(results);
             }, function (tx, error) {
                 console.log("Failed creation DB ");
               console.log(tx);
                 reject(error);
             });
         }))
     }
      setUserInfo(userMeta_key,userMeta_value){
       var query = "INSERT INTO USERMETA (userMeta_key,userMeta_value) VALUES (?,?)";
        return new Promise((resolve, reject) => this._db.transaction((tx) => {
            tx.executeSql(query, [userMeta_key,userMeta_value], (tx, results) => {
                resolve(results);
            }, function (tx, error) {
                reject(error);
            });
        }))
    };
      getUserInfo(userMeta_key){
        var query = "SELECT * FROM USERMETA WHERE userMeta_key = ? ";
        return new Promise((resolve, reject) => this._db.transaction((tx) => {
            tx.executeSql(query, [userMeta_key], (tx, results) => {
                var userObject ={};
                if(results.rows.length > 0){
                    userObject.userMetaKey= results.rows.item(0).userMeta_key;
                    userObject.userMetaValue= JSON.parse(results.rows.item(0).userMeta_value);
                }


                resolve(userObject);
            }, function (tx, error) {
                reject(error);
            });
        }))
    };
}

// Export a single instance of DatabaseImpl
// export const DBUserHandler: DBUserHandler = new DBUserHandler();