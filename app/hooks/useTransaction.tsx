import { useState } from "react"

export default function useTransaction(){
   const[error,setError]=useState("")
    const[transaction,setTransaction]=useState(
        {
            "id":"",
            "date":"",
            "type":"",
            "points":""
        }
    )
    const getTransaction=async(merchantId:string)=>{
     try{
      const res=await fetch(`http://localhost:9090/api/v1/transaction/merchant/${merchantId}`,{
     method:"GET",
       headers: { "Content-Type": "application/json" }
      })
      if (!res.ok) throw new Error("Erreur fetch")
      const data=await res.json();
     setTransaction(data)
     }catch(err){
        console.log(err)
     }
    }
    return{transaction,getTransaction}
}
