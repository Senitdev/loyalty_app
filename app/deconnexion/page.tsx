"use client";
import { useEffect } from "react";
import useDeconnexion from "../hooks/useDeconnexion";
export default function PageDeconnexion(){
    const{Deconnexion}=useDeconnexion()
    useEffect(()=>{
    Deconnexion()
    })
}
