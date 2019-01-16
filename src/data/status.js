const statusList =  {
    // 订单状态
    order: [
        {
            id: 1,
            name: '待支付',
            icon: 'icon-pay',
        },
        {
            id: 2,
            name: '待发货',
            icon: 'icon-unsend',
        },
        {
            id: 3,
            name: '待收货',
            icon: 'icon-send',
        },
        {
            id: 4,
            name: '待评价',
            icon: 'icon-comment',
        },
        {
            id: 5,
            name: '已完成',
            icon: 'icon-completed',
        },
        {
            id: 6,
            name: '已关闭',
        },
    ],

    // 退款状态
    refund: [
        {
            id: 0,
            name: '未申请',
        },
        {
            id: 1,
            name: '申请退款',
        },
        {
            id: 2,
            name: '已退款',
        },
        {
            id: 3,
            name: '拒绝退款',
        },
        {
            id: 4,
            name: '微信处理中',
        },
        {
            id: 5,
            name: '微信退款失败',
        },
    ],
}

export default statusList