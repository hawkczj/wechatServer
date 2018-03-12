export interface NewsMessage {
    touser?: string;
    toparty?: string;
    totag?: string;
    msgtype: string;
    agentid: number;
    news: {
        articles: Articles[]
    }
}

export interface Articles {
    title: string;
    description: string;
    url: string;
    picurl: string;
    btntxt?: string;
}

// {
//     "touser" : "UserID1|UserID2|UserID3",
//     "toparty" : "PartyID1 | PartyID2",
//     "totag" : "TagID1 | TagID2",
//     "msgtype" : "news",
//     "agentid" : 1,
//     "news" : {
//         "articles" : [
//             {
//                 "title" : "中秋节礼品领取",
//                 "description" : "今年中秋节公司有豪礼相送",
//                 "url" : "URL",
//                 "picurl" : "http://res.mail.qq.com/node/ww/wwopenmng/images/independent/doc/test_pic_msg1.png",
//                 "btntxt":"更多"
//             }
//          ]
//     }
//  }