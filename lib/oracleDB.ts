import { productionDB, devDB } from './../wechat/config';
import * as oracledb from 'oracledb';


export class OracleDB {
    dbConfig: ConnectConfig;
    constructor() {
        console.log(process.env.NODE_ENV);
        if (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production') {
            console.log('server running on production')
            this.dbConfig = productionDB;
        } else {
            console.log('server running on dev')
            this.dbConfig = devDB;
        }
    }

    async  getConnection() {
        return await oracledb.getConnection({
            user: this.dbConfig.user,
            password: this.dbConfig.password,
            connectString: this.dbConfig.connectString
        });
    }

    async  release(conn) {
        try {
            await conn.release();
        } catch (e) {
            console.error(e);
        }
    }

    async  execute(sql) {
        let conn;
        try {
            conn = await oracledb.getConnection({
                user: this.dbConfig.user,
                password: this.dbConfig.password,
                connectString: this.dbConfig.connectString
            });
            return await conn.execute(sql, [], { autoCommit: true,outFormat:oracledb.OBJECT });
        }
        catch (err) {
            console.log(err);
            if (conn) {
                await this.release(conn);
            }
        } finally {
            if (conn) {
                await this.release(conn);
            }
        }
    }

}

interface ConnectConfig {
    user: string;
    password: string;
    connectString: string;
}