import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { getTodoApi } from "../../shared/api/api"
import { useState } from "react"

export function TodoList(){
    
    const [enabled, setEnabled] = useState(false);
    const {data: todoItems, error, isLoading, isPlaceholderData, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
        queryKey: ['tasks', 'list'],
        queryFn: (meta)=> getTodoApi.getTodoList({page: meta.pageParam},meta),
        initialPageParam: 1,
        getNextPageParam: (result) => result.next
        })
    if(isLoading){ //status === "pending" && fetchStatus === "fetching"
        return <div className="w-screen flex justify-center text-4xl">Loading</div>
    }    
    if(error){
        return <div>error: {JSON.stringify(error)}</div>
    }
    return (
        <div className="w-screen flex flex-col items-center justify-center mx-auto">
            <button onClick={()=>setEnabled(e => !e)}>Toggle Enabled</button>
            <h1 className="text-3xl underline font-bold m-10">TodoList</h1>
                <div className={"flex flex-col gap-5 " + (isPlaceholderData?'opacity-50':'')}>
                    {todoItems?.data.map(todo => 
                    <div key={todo.id} className="text-2xl text-[#9872c9] px-20 py-3  border-slate-500 border-2 rounded flex justify-center items-center ">
                        {todo.text}
                        </div>)}
                </div>
          
        
        </div>
    )
}










// export function TodoList(){
//     const [page, setPage] = useState(1);
//     const [enabled, setEnabled] = useState(false);
//     const {data: todoItems, error, isPending, isLoading, status, fetchStatus, isPlaceholderData} = useQuery({
//         queryKey: ['tasks', 'list', {page}],
//         queryFn: (meta)=> getTodoApi.getTodoList({page},meta),
//         placeholderData: keepPreviousData,
//         enabled: enabled
//         })
//     if(isLoading){ //status === "pending" && fetchStatus === "fetching"
//         return <div className="w-screen flex justify-center text-4xl">Loading</div>
//     }    
//     if(error){
//         return <div>error: {JSON.stringify(error)}</div>
//     }
//     return (
//         <div className="w-screen flex flex-col items-center justify-center mx-auto">
//             <button onClick={()=>setEnabled(e => !e)}>Toggle Enabled</button>
//             <h1 className="text-3xl underline font-bold m-10">TodoList</h1>
//                 <div className={"flex flex-col gap-5 " + (isPlaceholderData?'opacity-50':'')}>
//                     {todoItems?.data.map(todo => 
//                     <div key={todo.id} className="text-2xl text-[#9872c9] px-20 py-3  border-slate-500 border-2 rounded flex justify-center items-center ">
//                         {todo.text}
//                         </div>)}
//                 </div>
//             <div className="flex flex-row gap-10 mt-10">
//                 <button onClick={() => setPage(p => Math.max( p - 1 , 1 ))} className="p-4 text-xl border-[#be3274] rounded-2xl">prev</button>
//                 <button onClick={() => setPage(p => Math.min( p + 1, todoItems?.pages ?? 1))} className="p-4 text-xl border-[#be3274] rounded-2xl">next</button>
//             </div>    
        
//         </div>
//     )
// }