const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';


class MyPromise {
    /**
     * 
     * @param {Function} executor 任务执行器,立即执行
     */
    constructor(executor) {
        this._state = PENDING;
        this._value = undefined;
        try {
            executor(this._resolve.bind(this), this._reject.bind(this));
        } catch (error) {
            this._changeState(REJECTED, error);
        }
    }
    /**
     * 
     * @param {String} newState 修改状态
     * @param {any} value 修改值
     * @returns 
     */
    _changeState(newState, value) {
        if (this._state !== PENDING) {
            return;
        }
        this._state = newState;
        this._value = value;
    }

    _resolve(data) {
        this._changeState(FULFILLED, data);
    }

    _reject(reason) {
        this._changeState(REJECTED, reason);

    }

    then(onFulfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
        });
    }
}


/**
 * 
 * @param {Function} callback // 将回调函数放入微任务队列中
 */
const runMicroTask = (callback) => {
    if (process && process.nextTick) {
        process.nextTick(callback);
    } else if (MutationObserver) {
        const p = document.createElement('p')
        const observer = new MutationObserver(callback);
        observer.observe(p, {
            attributes: true
        });
        p.innerHTML = '1';
    } else {
        setTimeout(callback, 0);
    }
}

// const p = new MyPromise((resolve, reject) => {
//     resolve(1)
//     reject(1222)
//     throw new Error('123');
// });

// console.log(p);