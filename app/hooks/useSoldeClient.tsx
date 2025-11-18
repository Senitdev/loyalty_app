import { useState } from "react";
import API_BASE_URL from "../url_api/api";
export default  function useSoldeClient(){
const[soldePointsClient,setSoldePointsClient]=useState<number>(0);
const client_id=3
const HandleGetSoldeClient=async()=>{
    try {
        const response = await fetch(`${API_BASE_URL}/loyaltycard/user/solde/${client_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSoldePointsClient(data.solde);
    } catch (error) { 
        console.error('There has been a problem with your fetch operation:', error);
    }

}
return {soldePointsClient,HandleGetSoldeClient};
}