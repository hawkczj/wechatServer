import * as rp from 'request-promise';

export class Request{
    public static  get (url:string){
        let options={
            method: 'GET',
            uri: url,
            json: true 
        };
        return rp(options);
    }

    public static post (url:string,body:any){
        let options={
            method: 'POST',
            uri: url,
            body: body,
            json: true 
        };

        return rp(options);
    }
}