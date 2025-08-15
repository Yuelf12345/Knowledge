/**
 * 给定一个任务列表，要求顺序执行，并且支持暂停和恢复
 */

const tasks = []
for (let i = 0; i < 10; i++) {
    const task = function () {
        return new Promise((reslove) => {
            setTimeout(() => {
                console.log(`我是第${i}个任务`)
                reslove(i)
            }, 2000)
        })
    }
    tasks.push(task)
}
function processTasks(tasks) {
    let index = 0
    let result = []
    let state = true // 状态
    const start = function () {
        return new Promise(async (res) => {
            state = true
            console.log('start', state);
            if (!state) {
                return
            }
            while (index < tasks.length) {
                console.log(`任务${index}执行开始`);
                const res = await tasks[index]()
                console.log(`任务${index}执行结束`);
                result.push(res)
                index++
                if (!state) {
                    return
                }
            }
            state = false
            return res(result)
        })
    }
    const pause = function () {
        console.log('pause');
        state = false
    }
    return {
        start,
        pause
    }
}
const process = processTasks(tasks)
process.start()
setTimeout(() => {
    process.pause()
}, 5000)
setTimeout(async () => {
    const res = await process.start()
    console.log(res);
}, 7000)
