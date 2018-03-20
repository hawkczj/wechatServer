import { apiUrl, alertModule } from './config';
import { Request } from '../lib/request';
import * as fs from 'fs';


export class Util {
    constructor() { }

    public static async getToken() {
        let token :string;
        // token不在有效期内，先刷新
        if(!this.validateToken()){
            await this.saveToken();
        }
        token =this.getTokenFromLocal();
        return token;
    }

    public static async saveToken() {
        let token: Token;
        try {
            let data: Token = await Request.get(apiUrl.getToken + `?corpid=${alertModule.corpid}&corpsecret=${alertModule.corpsecret}`);
            data.expires_time = new Date().getTime() + data.expires_in * 1000;
            token = data;
            fs.writeFileSync(__dirname + '/token.txt', JSON.stringify(token));
        } catch (e) {
            console.log('get token error');
            throw new Error('get token error');
        }

    }

    public static validateToken(): boolean {
        let result: boolean = false;
        try {
            let tokenString: string = fs.readFileSync(__dirname + '/token.txt').toString();
            if (tokenString) {
                let tokenObj: Token = JSON.parse(tokenString);
                let now = new Date().getTime();
                if (now > tokenObj.expires_time) {
                    result = false;
                } else {
                    result = true;
                }
            }
        } catch (e) {
            result = false;
        }

        return result;
    }

    public static getTokenFromLocal(){
        let token:string;
        try{
            let tokenString: string = fs.readFileSync(__dirname + '/token.txt').toString();
            if (tokenString) {
                let tokenObj: Token = JSON.parse(tokenString);
                token =tokenObj.access_token;
            }
            return token;
        }
        catch(e){
            return token;
        }
    }
}

interface Token {
    errcode: string;
    errmsg: string;
    access_token: string;
    expires_in: number;
    expires_time?: number;
}