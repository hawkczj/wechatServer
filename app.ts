import { route } from './route/index';
import * as express from 'express';
import * as request from 'request-promise';


const app =express();

app.use(express.static('public'));

route(app);
// app.get('/',(request,response)=>{

//     response.send('首页');
// });

// app.get('/stock',(request,response)=>{
//     response.send('stock');
// });



const server = app.listen(3000,'localhost',()=>{
    console.log('start on 3000');
});

