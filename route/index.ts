
import {router as msg_router} from './msg';

export const route=(app)=>{
    app.use('/msg',msg_router);
};