var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';

function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) {
        s = '0' + s;
    }
    return s;
};

export default {
    getQueryStringByName: function (name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        var context = '';
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == '' || context == 'undefined' ? '' : context;
    },
    isArray: function (o) {
        return Object.prototype.toString.call(o) == '[object Array]';
    },
    /**
     * 数组删除指定元素
     * @param arr
     * @param val
     */
    arrayRemove: function (arr, val) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                arr.splice(i, 1);
                break;
            }
        }
    },
    //格式化Boolean值---1是 0否
    formatBoolean(row, column) {
        if (row.isActive == '1') {
            return '√';
        }
        return '×';
    },
    //格式化Boolean值---1是 0否
    formatBooleanValue(value) {
        if (value == '1') {
            return '√';
        }
        return '×';
    },
    /**
     * 时间戳转换
     */
    formatTimestamp(row, column) {
        if (row.changeDate) {
            var timeDate = new Date(row.changeDate),
                y = timeDate.getFullYear(),
                m = timeDate.getMonth() + 1,
                d = timeDate.getDate();
            return row.changeDate = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + timeDate.toTimeString().substr(0, 8);
        }
    },
    /**
     * 时间戳转换---用于不是changeDate的转换
     */
    formatTimestampValue(value) {
        if (value) {
            var timeDate = new Date(value),
                y = timeDate.getFullYear(),
                m = timeDate.getMonth() + 1,
                d = timeDate.getDate();
            return value = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + timeDate.toTimeString().substr(0, 8);
        }
    },
    /**
     * 时间戳转换---用于TextField组件
     */
    formatTimestampText(timestamp) {
        if (timestamp) {
            var timeDate = new Date(timestamp),
                y = timeDate.getFullYear(),
                m = timeDate.getMonth() + 1,
                d = timeDate.getDate();
            return timestamp = y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + ' ' + timeDate.toTimeString().substr(0, 8);
        }
    },
    formatKey: function (map, key) {
        var list = map.filter(function (item) {
            return item.value == key
        });
        //console.log(list);
        if (list.length > 0) {
            return list[0]['label'];
        }
        return row.key;
    },
    formatDate: {
        format: function (date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y':
                        return padding(date.getFullYear(), $0.length);
                    case 'M':
                        return padding(date.getMonth() + 1, $0.length);
                    case 'd':
                        return padding(date.getDate(), $0.length);
                    case 'w':
                        return date.getDay() + 1;
                    case 'h':
                        return padding(date.getHours(), $0.length);
                    case 'm':
                        return padding(date.getMinutes(), $0.length);
                    case 's':
                        return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y':
                            _date.setFullYear(_int);
                            break;
                        case 'M':
                            _date.setMonth(_int - 1);
                            break;
                        case 'd':
                            _date.setDate(_int);
                            break;
                        case 'h':
                            _date.setHours(_int);
                            break;
                        case 'm':
                            _date.setMinutes(_int);
                            break;
                        case 's':
                            _date.setSeconds(_int);
                            break;
                    }
                }
                return _date;
            }
            return null;
        }

    },
    /**
     * 转换级联数组
     * @param data
     * @param parentId
     * @returns {Array}
     */
    getChildrenByHasChildren(data, parentId) {
        let optionArray = [];
        for (var i in data) {
            let option = {};
            if (data[i].parentId == parentId) {
                option.value = data[i].id;
                option.label = data[i].description;
                if (data[i].hasChildren == '1') {
                    option.children = this.getChildren(data, data[i].id);
                }
                optionArray.push(option);
            }
        }
        return optionArray;
    },
    getChildren(data, parentId) {
        let optionArray = [];
        let flag = false;
        for (var i in data) {
            let option = {};
            if (data[i].parentId == parentId) {
                flag = true;
                option.value = data[i].id;
                option.label = data[i].description;
                let children = this.getChildren(data, data[i].id);
                if (children != null) {
                    option.children = children;
                }
                optionArray.push(option);
            }
        }
        if (flag) {
            return optionArray;
        } else {
            return null;
        }
    },
    /**
     * 级联--回溯
     * @param categoryId
     * @param data
     */
    getParent(data, selfId) {
        let flag = false;
        let optionArray = [];
        for (var i in data) {
            if (data[i].id == selfId) {
                if (data[i].parentId) {
                    optionArray.push(data[i].parentId);
                    flag = true;
                    break;
                } else {
                    return;
                }
            }
        }
        if (flag) {
            this.getParent(data, data[i].parentId);
        }
        return optionArray;
    },
    /**
     * 正则校验
     * @param { String } value 数据源
     * @param { String } pattern 校验方式
     */
    regExp(value, pattern) {
        if (!!value && !!pattern) {
            let reg = new RegExp();
            switch (pattern) {
                case 'p':
                    reg = new RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/); //手机号
                    break;
                case 'm':
                    reg = new RegExp(/^\S{6,20}$/); //密码
                    break;
                case 'sm':
                    reg = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/); //强密码
                    break;
                case 'n':
                    reg = new RegExp(/^\d+$/); //只能输入数字
                    break;
                case 'xs':
                    reg = new RegExp('^[0-9]+(.[0-9]{1,2})?$');
                case 'xs4':
                    reg = new RegExp('^[0-9]+(.[0-9]{1,4})?$');
                    break;
                case 'w':
                    reg = new RegExp(/^\w+$/); //只能字母数字下划线
                    break;
                case 'sw':
                    reg = new RegExp(/[-.]*\w+/); //只能字母数字下划线,减 运算符 和 .
                    break;
                case 'wn':
                    reg = new RegExp(/^[a-z0-9]+$/i); //只能字母和数字
                    break;
                case 'em':
                    reg = new RegExp(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/); //匹配Email地址
                    break;
                case 'idCa':
                    reg = new RegExp(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/); //匹配18位身份证
                    break;
                case 'token':
                    reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'); //这个正则是获得页面url的某个url参数的方法
                    break;
                case 'url':
                    reg = new RegExp(/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i); //匹配url地址
                    break;
                case 'es':
                    reg = new RegExp(/^[A-Za-z ]*$/); //只有英文加空格校验
                    break
                case 'cn':
                    reg = new RegExp(/[\u4e00-\u9fa5]|[\s]+/g); //校验中文和空格
                    break
                case 'zh':
                    //只能输入中文，英文数字空格下划线都行，首尾不能为空格
                    reg = new RegExp(/^[\w\u4e00-\u9fa5\-_][\s\w\u4e00-\u9fa5\-_]*[\w\u4e00-\u9fa5\-_]$/);
                    break;
                case 'zn':
                    reg = new RegExp(/^[1-9]\d*$/);
                    break;
                case 'float':
                    reg = new RegExp('^(-?)[0-9]+([.]{1}[0-9]+){0,1}$');
                    break;
                case 'hrs':
                    reg = new RegExp('^[0-9]+([.]{1}[0-9]{0,2})?$');
                    break;
                default: // default clause should be the last one
                    error();
                    break;
            }
            if (!reg.test(value)) { //没匹配上
                return false
            } else {
                return true; //匹配上了
            }
        }
    },
    getFormDataFromJson(json) {
        let params = new URLSearchParams()
        for (var key in json) {
            params.append(key, encodeURIComponent(json[key]));
        }
        return params;
    }
};
