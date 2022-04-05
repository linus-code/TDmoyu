Date.prototype.format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

//由星期的数字转换为星期的名称,date格式：2016-01-07，用"-"分割
let toWeekName = function (date) {
    let newDate = new Date(date.replace(/-/g, '/'));
    let weekday = new Array(7);
    weekday[0] = "星期日";
    weekday[1] = "星期一";
    weekday[2] = "星期二";
    weekday[3] = "星期三";
    weekday[4] = "星期四";
    weekday[5] = "星期五";
    weekday[6] = "星期六";
    return weekday[newDate.getDay()];
};

let isWeekdays = function (holidays) {
    let now = new Date();
    return [1, 2, 3, 4, 5].indexOf(now.getUTCDay()) > -1 && holidays[now.format("yyyy")][now.format("MM") + now.format("dd")] !== 0
};

let toChinesNum = (num) => {
    let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    let unit = ["", "十", "百", "千", "万"];
    num = parseInt(num);
    let getWan = (temp) => {
        let strArr = temp.toString().split("").reverse();
        let newNum = "";
        for (let i = 0; i < strArr.length; i++) {
            newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
        }
        return newNum;
    }
    let overWan = Math.floor(num / 10000);
    let noWan = num % 10000;
    if (noWan.toString().length < 4) {
        noWan = "0" + noWan;
    }
    return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
};
