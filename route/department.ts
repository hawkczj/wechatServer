
import { Wechat } from './../wechat/wechat';
import * as express from 'express';
import { Util } from '../wechat/utils';


export const router =express.Router();



router.get('/list',async (req,res)=>{
    let list =await Wechat.getDepartmentList();
    res.send(list);
});

router.get('/sync',async (req,res)=>{
    await Util.syncDepartment();
    res.send('同步成功');
});

router.get('/create',async (req,res)=>{
    let list =await Wechat.addDepartment('test',3);
    res.send(list);
});

router.get('/update',async (req,res)=>{
    let list =await Wechat.UpdateDepartment(4,'test2');
    res.send(list);
});

router.get('/delete',async (req,res)=>{
    let list =await Wechat.getDepartmentList();
     list =list.department;
    for(let i=0;i<list.length;i++){
                 if(list[i].id !=1){
            await Wechat.deleteDepartment(list[i].id);
         }
    }
    // let result = await Wechat.deleteDepartment();
    res.send('delete ');
});

// router.post('/update',async (req,res)=>{
//     let list =await Wechat.UpdateDepartment();
//     res.send(list);
// });
