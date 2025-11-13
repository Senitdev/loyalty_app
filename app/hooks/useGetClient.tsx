import { useState } from "react";
import API_BASE_URL from "../url_api/api"
export default function useGetClient(){
 const [loading, setLoading] = useState(false);
const [error, setError] = useState<string>("");
const[clients,setClient]=useState({
 "id":'',
"name":'',
"email":'',
 "mobile": '',
 "soldepoints":'',
})
const HandleGetClientByMerchant=async(idMerchant:string)=>{
try{
    const res=await fetch(`${API_BASE_URL}/loyaltycard/user/${idMerchant}`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    });
      const data=await res.json();
      setClient(data);
      console.log("data from",data)

} catch (err: any) {
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
    
}
return {clients,HandleGetClientByMerchant};
}
