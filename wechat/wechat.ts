import { NewsMessage, Articles } from './../model/NewsMessage';
import { TextMessage } from './../model/TextMessage';
import { Util } from './utils';
import { apiUrl } from './config';
import { Request } from './../lib/request';


export class Wechat {


    constructor() {

    }

    // 发送文本消息
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
        return Request.post(apiUrl.sendMessage + `?access_token=${token}`, body);
    }

    // 发送图文消息
    public static async sendNewsMessage(toUser: string, news: Articles[], agentId: number = 1000005, safe: number = 0) {
        let token = await Util.getToken();
        let body: NewsMessage = {
            touser: toUser,
            msgtype: 'news',
            agentid: agentId,
            news: {
                articles: news
            }
        };
        return Request.post(apiUrl.sendMessage + `?access_token=${token}`, body);
    }

    // 获取部门列表
    public static async getDepartmentList(id?: number) {
        let token = await Util.getToken();
        let url: string;
        if (id) {
            url = apiUrl.getDepartmentList + `?access_token=${token}&id=${id}`;
        } else {
            url = apiUrl.getDepartmentList + `?access_token=${token}`;
        }
        return Request.get(url);
    }

    // 新增部门
    public static async addDepartment(name: string, parentid: number, order?: number, id?: number) {
        let token = await Util.getToken();
        let body: AddDepartmentApi = {
            name: name,
            parentid: parentid,
            order: order,
            id: id
        };
        return Request.post(apiUrl.addDepartment + `?access_token=${token}`, body);
    }

    // 修改部门
    public static async UpdateDepartment(id: number, name?: string, parentid?: number, order?: number) {
        let token = await Util.getToken();
        let body: UpdateDepartmentApi = {
            name: name,
            parentid: parentid,
            order: order,
            id: id
        };
        return Request.post(apiUrl.updateDepartment + `?access_token=${token}`, body);
    }

    // 删除部门（注：不能删除根部门；不能删除含有子部门、成员的部门）
    public static async deleteDepartment(id?: number) {
        let token = await Util.getToken();
        let url: string;
        if (id) {
            url = apiUrl.deleteDepartment + `?access_token=${token}&id=${id}`;
        } else {
            url = apiUrl.deleteDepartment + `?access_token=${token}`;
        }
        return Request.get(url);
    }
}

interface AddDepartmentApi {
    name: string;
    parentid: number;
    order?: number;
    id?: number;
}

interface UpdateDepartmentApi {
    id: number;
    name?: string;
    parentid?: number;
    order?: number;
}