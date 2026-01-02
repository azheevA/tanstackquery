import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query"
import { jsonApiInstance } from "../../shared/api/api-instance"

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
    },
    getTodoListInfinityQueryOptions: ()=>{
        return infiniteQueryOptions({
             queryKey: ['tasks', 'list'],
                    queryFn: (meta)=> jsonApiInstance<PaginationResult<TodoDto>>(`/tasks?_page=${meta.pageParam}&_per_page=5`,{signal: meta.signal}),
                    initialPageParam: 1,
                    getNextPageParam: (result) => result.next,
                    select: result => result.pages.map(page => page.data).flat(),
        })
    },
    getTodoListQueryOptions: ({page}:{page: number})=>{
        return queryOptions({
            queryKey: ['tasks', 'list',{page}],
            queryFn: (meta)=> jsonApiInstance<PaginationResult<TodoDto>>(`/tasks?_page=${page}&_per_page=5`,{signal: meta.signal}),
                    
        })
    }
}