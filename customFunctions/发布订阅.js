class PubSub {
    constructor() {
        this.id = +Date.now()
        this.callbacks = {}
    }

    publish(channel, data) {
        if (this.callbacks[channel]) {
            Object.values(this.callbacks[channel]).forEach(callback => {
                callback(data)
            })
        }
    }

    subscribe(channel, callback) {
        let token = +Date.now()
        if (this.callbacks[channel]) {
            this.callbacks[channel][token] = callback;
        }
        else {
            this.callbacks[channel] = {
                [token]: callback
            }
        }
        return token;
    }

    cancelSubscribe(channel, token) {
        if (!channel) {
            this.callbacks = {}
            return
        }
        if (this.callbacks[channel]) {
            if (!token) {
                delete this.callbacks[channel]
            }
            else if (this.callbacks[channel][token]) {
                delete this.callbacks[channel][token]
            }
        }
    }
}