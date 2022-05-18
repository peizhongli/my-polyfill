class EventBus {
    constructor() {
        this.callbacks = {}
    }

    on(type, callback) {
        if (this.callbacks[type]) {
            this.callbacks[type].push(callback)
        }
        else {
            this.callbacks[type] = [callback]
        }
    }

    emit(type, data) {
        if (this.callbacks[type]) {
            this.callbacks[type].forEach(callback => {
                callback(data)
            });
        }
    }

    off(type) {
        if (this.callbacks[type]) {
            delete this.callbacks[type]
        }
    }
}