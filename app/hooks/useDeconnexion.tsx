import { useRouter } from "next/navigation"

export default function useDeconnexion(){
     const router=useRouter()
    const Deconnexion=()=>{
        localStorage.removeItem("id")
        localStorage.removeItem("email")
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        router.push("/")

    }
    return{Deconnexion}
}