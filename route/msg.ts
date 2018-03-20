import { Articles } from './../model/NewsMessage';
import { Wechat } from './../wechat/wechat';
import { apiUrl, alertModule } from './../wechat/config';
import * as express from 'express';
import { Request } from '../lib/request';


export const router =express.Router();



router.get('/',async (req,res)=>{

    //文本信息
    let name ='FE717';
    let result = await Wechat.sendTextMessage('FE717',`Dear ${name},
    签核中心有两笔单据待您签核，请点击<a href=\"http://oaweb.mic.com.tw/gsc/mobile/">这里</a>进入签核系统，谢谢(测试)`);

    // 图文信息
    // let news:Articles[]=[{
    //     title : "致顺达女神的一封信",
    //     description : "给最可爱的妳",
    //     url : "http://mp.weixin.qq.com/s/NnNBZrW_06FpE7_CG0zJLg",
    //     picurl : "http://res.mail.qq.com/node/ww/wwopenmng/images/independent/doc/test_pic_msg1.png",
    // }];
    // let result =await Wechat.sendNewsMessage('ErXiong',news);
    res.send(result);
});

router.get('/send',(req,res)=>{
    res.send('get send');
});
