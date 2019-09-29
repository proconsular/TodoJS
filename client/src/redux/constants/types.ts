
export type Task = {
    id: number,
    name: string,
    complete: boolean,
    owner: number
}

export type Session = {
    id: number,
    username: string,
    token: string,
    online: boolean
}