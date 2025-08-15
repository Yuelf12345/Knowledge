const isFullCombination = (datas) => {

    const keys = Object.keys(datas[0]);
    const entries = keys.map(key => [key, new Set()])
    const map = new Map(entries);
    const vSet = new Set();
    for (const data of datas) {
        const valueStr = JSON.stringify(data);
        if(vSet.has(valueStr)) return false;
        vSet.add(valueStr);
        for (const key in data) {
            const value = data[key];
            map.get(key).add(value);
        }
    }
    const n1 = [...map.values()].reduce((acc, cur) => acc * cur.size, 1)
    return n1 === datas.length
};

const data = [
    { '字段一': '甲', '字段二': 'a', '字段三': 1 },
    { '字段一': '甲', '字段二': 'a', '字段三': 2 },
    { '字段一': '甲', '字段二': 'a', '字段三': 3 },
    { '字段一': '甲', '字段二': 'b', '字段三': 1 },
    { '字段一': '甲', '字段二': 'b', '字段三': 2 },
    { '字段一': '甲', '字段二': 'b', '字段三': 3 },
    { '字段一': '乙', '字段二': 'a', '字段三': 1 },
    { '字段一': '乙', '字段二': 'a', '字段三': 2 },
    { '字段一': '乙', '字段二': 'a', '字段三': 3 },
    { '字段一': '乙', '字段二': 'b', '字段三': 1 },
    { '字段一': '乙', '字段二': 'b', '字段三': 2 },
    { '字段一': '乙', '字段二': 'b', '字段三': 3 }
]

/**
 * 获取数组的组合
 * 字段一 ：{甲，乙},
 * 字段二 ：{a,b},
 * 字段三 ：{1,2,3}
 */

console.log(isFullCombination(data));

