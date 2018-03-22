import { Util } from './../wechat/utils';
import { Wechat } from './../wechat/wechat';
import * as express from 'express';


export const router =express.Router();


router.get('/sync',async (req,res)=>{
    // let list =await Wechat.addPerson();
    let result =await Util.syncPerson();
    res.send('人事资料导入完毕。');
});

router.get('/',async (req,res)=>{
    // let list =await Wechat.addPerson();
    let result =await Wechat.getPerson('FE716');
    res.send(result);
});