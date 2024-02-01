class Pubsub {
    constructor() {
        this.subs = {};
    }
    _sub(topic, cb) {
        if (!this.subs[topic]) {
            this.subs[topic] = [];
        }
        this.subs[topic].push(cb);
    }
    _pub(topic) {
        if(this.subs[topic]){
            this.subs[topic].forEach((cb) => {
                cb();
            });
        }
    }
    _del(topic, cb){
        if(!cb){
            delete this.subs[topic];
        }else{
            this.subs[topic] = this.subs[topic].filter((c) => {
                return c !== cb;
            });
        }
    }
}


function f1() {
    console.log('f1');
}
function f2() {
    console.log('f2');
}

const pubsub = new Pubsub();
pubsub._sub('topic1', f1);
pubsub._sub('topic1', f2);
pubsub._del('topic1', f2);
pubsub._pub('topic1');