import { useEffect, useState } from "react"
import { IProduct } from "../interfaces"

const useLocalstorage = (key:string,initial:IProduct[]) => {

    const [value,setValue] = useState(()=>{
        const save = window.localStorage.getItem(key)

            return save ? JSON.parse(save) : initial
    })

    useEffect(()=>{
        localStorage.setItem(key,JSON.stringify(value))
    },[key,value])


  return [value,setValue]
}

export default useLocalstorage