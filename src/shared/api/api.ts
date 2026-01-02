const BASE_URL = "http://localhost:3000"
export type PaginationResult<T> = {
    data: T[]
    first: number
    items: number
    last: number
    next: number | null
    prev: number | null
    pages: number
}

export type TodoDto = {
    id: number
    text: string
    done: boolean
}

export const getTodoApi = {
    getTodoList: ({page}: {page: number},{signal}:{signal: AbortSignal})=> {
        return fetch(`${BASE_URL}/tasks?_page=${page}&_per_page=5`,{signal})
        .then(res => res.json() as Promise<PaginationResult<TodoDto>>)
    }
}