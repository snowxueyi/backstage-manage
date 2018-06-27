import citys from "./citys";

//系统基础url位置
export const base = ""
//系统接口地址前缀
export const basePath = "/mng"
//城市地址
export const getCitys = () => {
    let temp = [];
    for (let k in citys) {
        let provice = {
            value: k,
            label: k,
            children: []
        }
        for (let h in citys[k]) {
            let city = {
                value: h,
                label: h,
                children: []
            }
            for (let i = 0; i < citys[k][h].length; i++) {
                let area = {
                    value: citys[k][h][i],
                    label: citys[k][h][i],
                }
                city.children.push(area);
            }
            provice.children.push(city);
        }
        temp.push(provice);
    }
    return temp;
};

//商品状态  0新建，1待审核，2上架，3下架，4锁定，5删除，6停用
export const State = [
    { value: "", label: "全部" },
    { value: 0, label: "新建" },
    { value: 1, label: "待审核" },
    { value: 2, label: "上架" },
    { value: 3, label: "下架" },
    { value: 4, label: "锁定" },
    { value: 6, label: "停用" },
    { value: 7, label: "售罄" },
    //{ value: 5, label: "已删除" },
]