// 并行
const concurRequest = (urls, limit) => {
    return new Promise((resolve) => {
        if (!urls.length) return resolve([])
        let index = 0
        const len = urls.length
        const result = []
        const run = (url) => {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    result.push(data)
                }).catch(error => {
                    console.error('Request failed:', error);
                })
                .finally(() => {
                    index--
                    if (result.length === len) {
                        resolve(result)
                    }
                    if (urls.length) {
                        const nextUrl = urls.shift();
                        run(nextUrl);
                    }
                })
        }
        while (index < limit && urls.length) {
            index++
            const url = urls.shift()
            run(url)
        }
    })

}
// 测试数据
const urls = [];
for (let i = 1; i <= 20; i++) {
    urls.push(`https://jsonplaceholder.typicode.com/todos/${i}`)
}

concurRequest(urls, 5).then(res => console.log(res))

// 重试
const retryRequest = (url, limit) => {
    return fetch(url).catch(err => {
        limit > 0 ? retryRequest(url, limit - 1) : Promise.reject(err)
    })
}