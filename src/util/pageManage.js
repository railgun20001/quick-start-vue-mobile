// 判断类型
function isArray(target) {
    return Object.prototype.toString.call(target) == '[object Array]'
}
function isFucntion(target) {
    return Object.prototype.toString.call(target) == '[object Function]'
}

// 空函数
function noop() {}

/**
 * 页面管理工具
 * @param {Object} options 设置 
 * * @param {Function} getDataFunc(params, callback) 获取列表的函数 必须
 * * * @param {Object} params ajax的参数 包含 page,limit,以及在filter中定义的参数
 * * * @param {Function} callback(list) 得到list后调用callback
 * * * * @param {Array} list 数据列表
 * * @param {Number} initPage 初始页 默认1
 * * @param {Number} limit 每页数据长度限制 设置时length < limit即到达最终页,不存在时length=0到达最终页
 * * @param {Array} initList 初始list数据 默认[]
 * * @param {Object} initFilter 初始筛选 默认{}
 * * @param {Boolean} isConcat next下一页时是否使用array.concat, 一般移动端无限滚动使用; 默认为true
 * * @param {Function} handleList 默认处理list
 * * @param {Function} onLast 事件-到达页尾
 * 
 * 内部成员
 * @type {Object} options 设置,对应param的options 应当为静态
 * @type {Number} page 当前页数
 * @type {Object} filter getDataFunc除page,limit以外的条件
 * @type {Array} list 当前数据数组
 * @type {Boolean} isLast 是否为最后一页
 * @type {Boolean} isLoading getDataFunc是否在加载(callback是否调用完毕)
 */
function PageManage(options) {
    var defaultOptions = {
        getDataFunc: null,
        initPage: 1,
        limit: 10,
        initList: [],
        initFilter: {},
        isConcat: true,
        handleList: null,
        onLast: noop,
    }

    this.options = Object.assign(defaultOptions, options) 
    
    // 判断options
    // getDataFunc必须存在且为函数
    if (!this.options.getDataFunc && !isFucntion(this.options.getDataFunc)) {
        throw new Error('PageManage: getDataFunc应为函数')
    }
    // handleList如果存在则必须为函数
    if (this.options.handleList && !isFucntion(this.options.handleList)) {
        throw new Error('PageManage: handleList应为函数')
    }
    // onLast必须为函数
    if (!isFucntion(this.options.onLast)) {
        throw new Error('PageManage: onLast应为函数')
    }

    this._init()
}

/**
 * pageManage初始化
 */
PageManage.prototype._init = function() {
    this.page = this.options.initPage
    this.filter = this.options.initFilter
    this.list = this.options.initList

    this.isLast = false
    this.isLoading = false
}

/**
 * getDataFunc的通用配置
 */
PageManage.prototype.getDataFunc = function(params, handleList) {
    var callback = (list) => {
        if (!isArray(list)) {
            throw new Error('PageManage: 传入数据不是array')
        }

        // 判断是否为最后一页
        if (list.length < this.options.limit) {
            this.isLast = true
            this.options.onLast()
        }

        var oldList = this.list
        this.list = this.list.concat(list)
        var res = {
            list: this.list,
            oldList: oldList,
        }
        if (handleList) {
            handleList(res)
        } else if (this.options.handleList) {
            this.options.handleList(res)
        } else {
            console.warn('PageManage: 未设置handleList')
        }

        this.isLoading = false
    }

    this.isLoading = true
    this.options.getDataFunc(params, callback)
}

/**
 * page初始化
 * @param {Function} handleList
 * 使用例示: pageManage.init(({list, oldList}) => {})
 */
PageManage.prototype.init = function(handleList) {
    this._init()
    var params = {
        page: this.page,
        limit: this.options.limit,
        ...this.filter,
    }

    this.getDataFunc(params, handleList)
}

/**
 * 翻页
 * @param {Function} handleList
 * 使用例示: pageManage.next(({list, oldList}) => {})
 */
PageManage.prototype.next = function(handleList) {
    // 已到页底
    if (this.isLast) {
        return
    } 

    if (!this.options.isConcat) {
        this.list = []
    }
    var params = {
        page: ++this.page,
        limit: this.options.limit,
        ...this.filter,
    }

    this.getDataFunc(params, handleList)
}

export default PageManage