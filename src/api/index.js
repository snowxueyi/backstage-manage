
import http from "./public"

let basePath="/"
//login登录
export const login = (param, call) => {
    http.fetchPost(basePath+'/mng/doLogin.json',param).then(data=>{
        call(data)
    }).catch(e=>{
         alert(JSON.stringify(e))
        call({code:-999,msg:'系统异常'})
    });
}

//获取商品列表
export const getList = (param, call) => {
    let snedData = param;
    http.fetchGet(basePath + '/item/itemList.json', snedData).then(data => {
        console.log(data);
        call(data)
    }).catch((e) => {
        call({ code: -999, msg: '系统异常' })
    });
}
//获取商品列表
export const getDetail = (param, call) => {
    let snedData = param;
    http.fetchGet(basePath + '/item/itemList.json', snedData).then(data => {
        console.log(data);
        call(data)
    }).catch((e) => {
        call({ code: -999, msg: '系统异常' })
    });
}
//新增组织
export const addOrganization = (param, call) => {
    http.fetchPost(basePath+'/mng/addOrganization.json',param).then(data=>{
        call(data)
    }).catch(e=>{
         alert(JSON.stringify(e))
        call({code:-999,msg:'系统异常'})
    });
}
//编辑组织
export const editOrganization = (param, call) => {
    http.fetchPost(basePath+'/mng/editOrganization.json',param).then(data=>{
        call(data)
    }).catch(e=>{
         alert(JSON.stringify(e))
        call({code:-999,msg:'系统异常'})
    });
}
//获取对应组织服务站信息
export const showStation = (param, call) => {
    http.fetchPost(basePath+'/mng/showStation.json',param).then(data=>{
        call(data)
    }).catch(e=>{
         alert(JSON.stringify(e))
        call({code:-999,msg:'系统异常'})
    });
}
//删除相应服务站
export const deleteStation = (param, call) => {
    http.fetchPost(basePath+'/mng/deleteStation.json',param).then(data=>{
        call(data)
    }).catch(e=>{
         alert(JSON.stringify(e))
        call({code:-999,msg:'系统异常'})
    });
}
//删除组织
export const deleteOrganization = (param, call) => {
    http.fetchPost(basePath+'/mng/deleteOrganization.json',param).then(data=>{
        call(data)
    }).catch(e=>{
         alert(JSON.stringify(e))
        call({code:-999,msg:'系统异常'})
    });
}