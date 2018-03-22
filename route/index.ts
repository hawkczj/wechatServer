
import {router as msg_router} from './msg';
import {router as department_router} from './department';
import {router as person_router} from './person';

export const route=(app)=>{
    app.use('/msg',msg_router);
    app.use('/department',department_router);
    app.use('/person',person_router);
};