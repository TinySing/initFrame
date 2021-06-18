import request from "@/utils/request";


// 查询部门下拉树结构
export  function treeSelect(data){
    return request({
        url:'system/dept/treeselect',
        method: 'get'
    })
    return get('system/dept/treeselect',data)
} 
// 查询部门下拉树结构
export  function queryOrgTree(data){
    return request({
        url:'okr/mainPage/queryOrgTree',
        method: 'post'
    })
} 
