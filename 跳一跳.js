var accumulateExponent = 1
var roleWeight = 2
var accumulateSpeed = 4
var e = 0;
var player = {
    position: {
        x: 0,
        z: 0,
        y: 0
    }
}

var targetBlock = {
    position: {
        x: 0,
        z: 0,
        y: 0
    }
}
console.log(GetJumpLocation(720, 1.36837, -1.04504, 3.00698, -1.22322));

//获取跳跃位置|需要跳跃时间,玩家坐标x,玩家坐标z，目标方块坐标x,目标方块坐标z 返回：跳跃位置坐标
function GetJumpLocation(_e, playerx, playerz, targetBlockx, targetBlockz) {
    player.position.x = playerx;
    player.position.z = playerz;
    targetBlock.position.x = targetBlockx;
    targetBlock.position.z = targetBlockz;
    e = _e;
    var m = e * accumulateSpeed / 5e3;
    var v = fixNumber5(4 + 30 * m);
    var _ = fixNumber5(90 - 50 * m);
    var C = computeObligueThrowValue(v, fixNumber5(_ * (Math.PI / 180)), 9.8);
    var O = computePositionByRange(C, player.position, targetBlock.position);
    return JSON.stringify(O);

}

function computeObligueThrowValue(e, t, o) {
    var n = fixNumber5(Math.sin(2 * t)),
        r = fixNumber5(Math.sin(t)),
        i = fixNumber5(Math.pow(e, Number(accumulateExponent)) * n / o),
        a = fixNumber5(Math.pow(e * r, 2) / (Number(roleWeight) * o));
    return i;
};

var B = function (e, t) {
    this.rangeR = e,
        this.rangeH = t
};

function computePositionByRange(e, t, o) {
    var n = fixNumber5(o.x - t.x),
        r = fixNumber5(o.z - t.z),
        i = fixNumber5(Math.sqrt(Math.pow(r, 2) + Math.pow(n, 2))),
        a = fixNumber5(n * e / i),
        c = fixNumber5(r * e / i);

    return new Vec3(fixNumber5(t.x + a), fixNumber5(t.y), fixNumber5(t.z + c))
};

function fixNumber5(value) {
    var n = 5;
    if (n === 'null' || n === 'undefined' || n === 0) return parseInt(value);
    var tran = Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
    var tranV = tran.toString();
    var newVal = tranV.indexOf('.');
    if (newVal < 0) {
        tranV += '.'
    };
    for (var i = tranV.length - tranV.indexOf('.'); i <= n; i++) {
        tranV += '0';
    };
    return Number(tranV)
}

function Vec3(x, y, z, b) {
    this.x = x;
    this.y = y;
    this.z = z;
}