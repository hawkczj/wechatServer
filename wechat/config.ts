
export const baseUrl = 'https://qyapi.weixin.qq.com/cgi-bin/';
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
    updateDepartment:baseUrl + 'department/update',
    // 删除部门
    deleteDepartment:baseUrl + 'department/delete',
};

export const alertModule = {
    corpid: 'wx22777dbd331a8ed1',
    corpsecret: '3dDxXtr1yRGfo_nBK-q4uuOFH_ulkuKSOmilf7JAazo',
    agentId: '1000005'
}