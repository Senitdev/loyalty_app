import { useState } from "react";
import API_BASE_URL from "../url_api/api";
export interface Rewards{
    id : number;
    title : string;
    description : string;
    points : number;
    isactive : boolean;
    points_required : number;
    created_at : string;
}
export default function useGetRewardByMerchant(){
    const[rewards,setRewards]=useState<Rewards[]>([]);
    const[loading,setLoading]=useState<boolean>(false);
    const[error,setError]=useState<string |null>(null);
    const handleGetRewardByMerchant=async(merchantId:number)=>{
        setLoading(true);
        setError(null);
        try{
            const response=await fetch(`${API_BASE_URL}/reward/merchant/${merchantId}`, {
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des récompenses");
            }
            const jsonData = await response.json();
            setRewards(Array.isArray(jsonData) ? jsonData : [jsonData]);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { rewards, loading, error, handleGetRewardByMerchant };
}