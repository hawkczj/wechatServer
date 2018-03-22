
export const baseUrl = 'https://qyapi.weixin.qq.com/cgi-bin/';
export const corpid = 'wx22777dbd331a8ed1';
export const apiUrl = {
    // 获取token
    getToken: baseUrl + 'gettoken',
    // 发送消息
    sendMessage: baseUrl + '/message/send',
    // 获取部门列表
    getDepartmentList: baseUrl + 'department/list',
    // 创建部门
    addDepartment: baseUrl + 'department/create',
    // 更新部门
    updateDepartment: baseUrl + 'department/update',
    // 删除部门
    deleteDepartment: baseUrl + 'department/delete',
    // 创建成员
    addPerson:baseUrl +'user/create',
    // 删除成员
    deletePerson:baseUrl + 'user/delete',
    // 获取成员信息
    getPerson:baseUrl +'user/get',
};

export const alertModule = {
    corpsecret: '3dDxXtr1yRGfo_nBK-q4uuOFH_ulkuKSOmilf7JAazo',
    agentId: '1000005'
}

export const contactModule = {
    corpsecret: 'toUqYS6ZtN2cRiczJXLRKZ3xYnOCz_JFJD2t2iD6fZ0',
}

export const productionDB = {
    user: 'mioa',
    password: 'msloa',
    connectString: `10.86.0.139:1521/mioa`
};

export const devDB = {
    user: 'mioa',
    password: 'msloa',
    connectString: `10.86.3.41:1531/mioa`
};