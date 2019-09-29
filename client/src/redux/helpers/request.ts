
export enum Methods {
    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete',
}

export class Request {
    method: Methods
    url: string
    token: string = ''

    constructor(method: Methods, url: string) {
        this.method = method
        this.url = url
    }

    public setToken(token: string) {
        this.token = `Bearer ${token}`
    }

    public async send(body?: any): Promise<Response> {
        let data: any = {
            method: this.method.toString().toUpperCase(),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        if (body !== undefined) {
            data = {...data, body: JSON.stringify(body)}
        }
        if (this.token !== '') {
            data.headers.authorization = this.token
        }
        return fetch(this.url, data)
    }
}