'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ReactWX = require('../../ReactWX');

var _ReactWX2 = _interopRequireDefault(_ReactWX);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LotteryDraw(props) {
    this.state = {
        animationData: {},
        awardsList: [],
        awardData: props.awardData || [],
        btnDisabled: ''
    };
}

LotteryDraw = _ReactWX2.default.miniCreateClass(LotteryDraw, _ReactWX2.default.Component, {
    getLottery: function () {
        var that = this;

        // 抽奖逻辑
        var awardIndex = this.props.awardIndex !== undefined ? this.props.awardIndex : Math.floor(Math.random() * this.state.awardData.length);

        // 获取奖品配置
        var awardsConfig = this.state.awardData;

        // 旋转抽奖
        let runDegs = 360 * 8 - awardIndex * (360 / awardsConfig.length);

        // 初始化
        var animationInit = wx.createAnimation({
            duration: 1
        });

        animationInit.rotate(0).step();
        this.setState({ animationData: animationInit.export(), btnDisabled: 'disabled' });
        // 开始抽奖

        setTimeout(function () {
            var animationRun = wx.createAnimation({
                duration: 3000,
                timingFunction: 'ease'
            });
            animationRun.rotate(runDegs).step();
            that.setState({ animationData: animationRun.export() });
        }, 300);

        // 中奖提示
        setTimeout(function () {
            wx.showModal({
                title: '恭喜',
                content: '获得' + awardsConfig[awardIndex].name,
                showCancel: false,
                success: function () {
                    that.props.onOk();
                }
            });
            that.setState({
                btnDisabled: ''
            });
        }, 3300);
    },
    componentDidMount: function () {
        // 初始化奖品数据
        let defaultConfig = [{ index: 0, name: '1元红包' }, { index: 1, name: '5元话费' }, { index: 2, name: '6元红包' }, { index: 3, name: '8元红包' }, { index: 4, name: '10元话费' }, { index: 5, name: '10元红包' }];
        let config;
        if (!this.state.awardData.length) {
            config = defaultConfig;
            this.setState({ awardData: defaultConfig });
        } else {
            config = this.state.awardData;
        }

        // 绘制转盘
        var len = config.length,
            rotateDeg = 360 / len / 2 + 90,
            html = [],
            turnNum = 1 / len; // 文字旋转 turn 值

        var ctx = wx.createContext();
        for (var i = 0; i < len; i++) {
            // 保存当前状态
            ctx.save();
            // 开始一条新路径
            ctx.beginPath();
            // 位移到圆心，下面需要围绕圆心旋转
            ctx.translate(150, 150);
            // 从(0, 0)坐标开始定义一条新的子路径
            ctx.moveTo(0, 0);
            // 旋转弧度,需将角度转换为弧度,使用 degrees * Math.PI/180 公式进行计算。
            ctx.rotate((360 / len * i - rotateDeg) * Math.PI / 180);
            // 绘制圆弧
            ctx.arc(0, 0, 150, 0, 2 * Math.PI / len, false);

            // 颜色间隔
            if (i % 2 == 0) {
                ctx.setFillStyle('rgba(255,184,32,.1)');
            } else {
                ctx.setFillStyle('rgba(255,203,63,.1)');
            }

            // 填充扇形
            ctx.fill();
            // 绘制边框
            ctx.setLineWidth(0.5);
            ctx.setStrokeStyle('rgba(228,55,14,.1)');
            ctx.stroke();

            // 恢复前一个状态
            ctx.restore();

            // 奖项列表
            html.push({
                turn: i * turnNum + 'turn',
                lineTurn: i * turnNum + turnNum / 2 + 'turn',
                award: config[i].name
            });
        }
        this.setState({
            awardsList: html
        });
    },
    render: function () {
        var h = _ReactWX2.default.createElement;

        return h('view', { 'class': 'canvas-container' }, h('view', { animation: this.state.animationData, 'class': 'canvas-content' }, h('canvas', { style: 'width: 300px; height: 300px;', 'class': 'canvas-element', 'canvas-id': 'lotteryCanvas' }), h('view', { 'class': 'canvas-line' }, this.state.awardsList.map(function (item, index) {
            return h('view', { 'class': 'canvas-litem', key: index, style: _ReactWX2.default.collectStyle({ '-webkit-transform': 'rotate(' + item.lineTurn + ')', transform: 'rotate(' + item.lineTurn + ')' }, this.props, "style8846" + index) });
        }, this)), h('view', { 'class': 'canvas-list' }, this.state.awardsList.map(function (item, index) {
            return h('view', { 'class': 'canvas-item', key: index }, h('view', { 'class': 'canvas-item-text', style: _ReactWX2.default.collectStyle({ '-webkit-transform': 'rotate(' + item.turn + ')', transform: 'rotate(' + item.turn + ')' }, this.props, "style10290" + index) }, item.award));
        }, this))), h('view', { onTap: this.getLottery.bind(this), 'class': 'canvas-btn ' + this.state.btnDisabled, 'data-tap-uid': 'e55635597', 'data-class-uid': 'c285719', 'data-instance-uid': this.props.instanceUid }, '\u62BD\u5956'));;
    },
    classUid: 'c285719'
}, {});

exports.default = LotteryDraw;