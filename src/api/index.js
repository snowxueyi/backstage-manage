
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
/***************************************************组织管理相关接口****************************************************************************/
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
//选择省市展示对应服务站
export const selectArea = (param, call) => {
    http.fetchPost(basePath+'/mng/selectArea.json',param).then(data=>{
        call(data)
    }).catch(e=>{
         alert(JSON.stringify(e))
        call({code:-999,msg:'系统异常'})
    });
}
//选择省市添加服务站
export const selectAddStation = (param, call) => {
    http.fetchPost(basePath+'/mng/selectAddStation.json',param).then(data=>{
        call(data)
    }).catch(e=>{
         alert(JSON.stringify(e))
        call({code:-999,msg:'系统异常'})
    });
}
/***************************************************截单规则相关接口****************************************************************************/
//获取截单规则列表
export const getBreakList = (param, call) => {
    let snedData = param;
    http.fetchGet(basePath + '/item/breakList.json', snedData).then(data => {
        console.log(data);
        call(data)
    }).catch((e) => {
        call({ code: -999, msg: '系统异常' })
    });
}
//获取组织结构
export const getOrganizationList = (param, call) => {
    let snedData = param;
    http.fetchGet(basePath + '/item/organizationList.json', snedData).then(data => {
        console.log(data);
        call(data)
    }).catch((e) => {
        call({ code: -999, msg: '系统异常' })
    });
}
//新增组织接口
export const addRule = (param, call) => {
    http.fetchPost(basePath+'/mng/addRule.json',param).then(data=>{
        call(data)
    }).catch(e=>{
         alert(JSON.stringify(e))
        call({code:-999,msg:'系统异常'})
    });
}
//编辑组织组织接口
export const editRule = (param, call) => {
    http.fetchPost(basePath+'/mng/editRule.json',param).then(data=>{
        call(data)
    }).catch(e=>{
         alert(JSON.stringify(e))
        call({code:-999,msg:'系统异常'})
    });
}
//删除组织规则
export const deleteRule = (param, call) => {
    http.fetchPost(basePath+'/mng/deleteRule.json',param).then(data=>{
        call(data)
    }).catch(e=>{
         alert(JSON.stringify(e))
        call({code:-999,msg:'系统异常'})
    });
}