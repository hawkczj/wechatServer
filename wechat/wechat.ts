import { NewsMessage, Articles } from './../model/NewsMessage';
import { TextMessage } from './../model/TextMessage';
import { Util } from './utils';
import { ApiUrl } from './config';
import { Request } from './../lib/request';


export class Wechat {


    constructor() {

    }

    public static async sendTextMessage(toUser: string, content: string, agentId: number = 1000005, safe: number = 0) {
        let token = await Util.getToken();
        let body: TextMessage = {
            touser: toUser,
            msgtype: 'text',
            agentid: agentId,
            text: {
                content: content
            },
            safe: safe
        };
        return Request.post(ApiUrl.send + `?access_token=${token}`, body);
    }

    public static async sendNewsMessage(toUser: string, news:Articles[], agentId: number = 1000005, safe: number = 0) {
        let token = await Util.getToken();
        let body: NewsMessage = {
            touser: toUser,
            msgtype: 'news',
            agentid: agentId,
            news:{
                articles:news
            }
        };
        return Request.post(ApiUrl.send + `?access_token=${token}`, body);
    }
}