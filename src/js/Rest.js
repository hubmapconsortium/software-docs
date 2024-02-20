class Rest {
    static async fetchWithTimeout(resource, options = {}) {
        const { timeout = 5000 } = options

        const abortController = new AbortController()
        const id = setTimeout(() => abortController.abort(), timeout)
        const response = await fetch(resource, {
            ...options,
            signal: abortController.signal
        })
        clearTimeout(id)
        return response
    }

    static async send(url, method, data = {}, type = 'application/json') {
        try {
            let options = {
                timeout: 8000,
                method: method,
                headers: {
                    'Content-Type': type
                }
            }
            if (method !== 'GET') {
                options.extend({ body: JSON.stringify(data) })
            }
            return await Rest.fetchWithTimeout(url, options)
        } catch (error) {
            console.log(error)
        }
        return null
    }

    static async get(url, type) {
        return Rest.send(url, 'GET', {}, type)
    }

    static put(url, data, type) {
        return Rest.send(url, 'PUT', data, type)
    }

    static post(url, data, type) {
        return Rest.send(url, 'POST', data, type)
    }

    static delete(url, type) {
        return Rest.send(url, 'DELETE', {}, type)
    }
}