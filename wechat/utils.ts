import { Wechat, AddPersonApi } from './wechat';
import { apiUrl, alertModule, corpid, contactModule } from './config';
import { Request } from '../lib/request';
import * as fs from 'fs';
import { OracleDB } from '../lib/oracleDB';


export class Util {
    constructor() { }

    public static async getToken(type: string = 'msg') {
        let token: string;
        // token不在有效期内，先刷新
        if (!this.validateToken(type)) {
            await this.saveToken(type);
        }
        token = this.getTokenFromLocal(type);
        return token;
    }

    public static async saveToken(type: string = 'msg') {
        let token: Token;
        let tokenInfo = this.getTokenInfo(type);
        try {
            let data: Token = await Request.get(tokenInfo.url);
            data.expires_time = new Date().getTime() + data.expires_in * 1000;
            token = data;
            fs.writeFileSync(__dirname + `/${tokenInfo.tokenName}.txt`, JSON.stringify(token));
        } catch (e) {
            console.log('get token error');
            throw new Error('get token error');
        }

    }

    public static validateToken(type: string = 'msg'): boolean {
        let result: boolean = false;
        let tokenInfo = this.getTokenInfo(type);
        try {
            let tokenString: string = fs.readFileSync(__dirname + `/${tokenInfo.tokenName}.txt`).toString();
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

    public static getTokenFromLocal(type: string = 'msg') {
        let token: string;
        let tokenInfo = this.getTokenInfo(type);
        try {
            let tokenString: string = fs.readFileSync(__dirname + `/${tokenInfo.tokenName}.txt`).toString();
            if (tokenString) {
                let tokenObj: Token = JSON.parse(tokenString);
                token = tokenObj.access_token;
            }
            return token;
        }
        catch (e) {
            return token;
        }
    }

    public static getTokenInfo(type: string = 'msg') {

        let tokenInfo: {
            tokenName: string;
            url: string;
        } = {
                tokenName: '',
                url: ''
            };
        if (type === 'msg') {
            tokenInfo.tokenName = 'msgToken';
            tokenInfo.url = apiUrl.getToken + `?corpid=${corpid}&corpsecret=${alertModule.corpsecret}`;
        } else if (type === 'contact') {
            tokenInfo.tokenName = 'contactToken';
            tokenInfo.url = apiUrl.getToken + `?corpid=${corpid}&corpsecret=${contactModule.corpsecret}`;
        }

        return tokenInfo;

    }

    // 初始化部门
    public static async syncDepartment() {
        let site: string = 'MSL';
        let db = new OracleDB();
        let res: [{ NAME: string; PARENTID: number; ID: number }];
        let temp = await db.execute(`  SELECT A.DEPT_ID PARENTID, C.SHORT_NAME NAME, D.DEPT_ID ID
        FROM MOA_WECHAT_DEPARTMENT_MAPPING A,
             GUID_PS_ORGANIZATION B,
             GUID_PS_DEPARTMENT C,
             MOA_WECHAT_DEPARTMENT_MAPPING D
       WHERE     A.COMPANY_ID = B.SITE
             AND B.SITE = C.SITE
             AND A.DEPT_NO = B.PARENT
             AND B.CHILD = C.DEPTNO
             AND B.CHILD = D.DEPT_NO
             AND B.SITE = D.COMPANY_ID
             AND NVL(B.CLOSE_DATE,SYSDATE +1) >SYSDATE
             AND A.COMPANY_ID = 'MSL' ORDER BY A.DEPT_ID`);

        res = temp.rows;

        for (let i = 0; i < res.length; i++) {
            let dept: { errcode: number, errmsg: string, id: number } = await Wechat.addDepartment(res[i].NAME, res[i].PARENTID, 0, res[i].ID);
            if (dept.errcode === 0) {
            } else {
                console.log(res[i]);
                console.log(dept);
                // break;
            }
        }
    }

    // 同步员工信息
    public static async syncPerson() {
        let site: string = 'MSL';
        let db = new OracleDB();
        // let res: AddPersonApi[]=[];
        let res: any;
        let temp = await db.execute(`SELECT A.EMPNO USERID,
        A.NICK_NAME NAME,
        A.USER_NAME ENGLISH_NAME,
        DECODE (A.MOBILE, '不詳', '','不祥','', A.MOBILE) MOBILE,
        C.DEPT_ID DEPARTMENT,
        B.CC_MAIL_NAME EMAIL,
        DECODE (
           (SELECT COUNT (*)
              FROM GUID_PS_DEPARTMENT
             WHERE     NVL (CLOSE_DATE, SYSDATE + 1) > SYSDATE
                   AND STATUS = 'O'
                   AND SITE = 'MSL'
                   AND BOSS = A.EMPNO),
           0, 0,
           1)
           ISLEADER,
        DECODE(B.SEX,'M',1,0) GENDER,
        D.LOOKUP_DESC POSITION,
        A.TELEPHONE TELEPHONE
   FROM MOA_GL_USERS A,
        GUID_EMPLOYEE B,
        MOA_WECHAT_DEPARTMENT_MAPPING C,
        GUID_PS_LOOKUPS D
  WHERE     A.EMPNO = B.EMPNO
        AND A.COMPANY_ID = B.COMPANY_ID
        AND B.DEPTNO = C.DEPT_NO
        AND A.COMPANY_ID = C.COMPANY_ID
        AND A.COMPANY_ID = D.SITE
        AND B.TITLE_CODE = D.LOOKUP_CODE
        AND D.LOOKUP_TYPE = 'TITLE_CODE'
        AND B.TYPE = 'I'
        AND B.STATUS <> 'X'
        AND B.ONBOARD = 'Y'
        AND A.COMPANY_ID = '${site}' 
        AND B.DEPTNO IN ('26AA0000',
        '26AB0000',
        '26AC0000',
        '26AH0000',
        '26AJ0000',
        '26AK0000',
        '26AZ0000')
        `);
        res = temp.rows;
        for (let i = 0; i < res.length; i++) {
            let person: AddPersonApi = {
                userid: '',
                name: '',
                english_name: '',
                department: [],
                position: '',
                gender: 0,
                email: '',
                telephone: '',
                isleader: 0
            };
            person.userid = res[i].USERID;
            person.name = res[i].NAME;
            person.english_name = res[i].ENGLISH_NAME;
            person.mobile = res[i].MOBILE;
            person.department = [res[i].DEPARTMENT];
            person.position = res[i].POSITION;
            person.gender = res[i].GENDER;
            person.email = res[i].EMAIL;
            person.telephone = res[i].TELEPHONE;
            person.isleader = res[i].ISLEADER;
            person.to_invite = false;
            let dept: { errcode: number, errmsg: string } = await Wechat.addPerson(person);
            if (dept.errcode === 0) {
                console.log(dept)
            } else {
                console.log(res[i]);
                console.log(dept);
                // break;
            }
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