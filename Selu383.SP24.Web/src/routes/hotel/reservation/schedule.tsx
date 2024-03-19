import { useState, useEffect } from "react";
import { packageGetDto } from "../../../features/package/packagesGetDto";
import { useSearchParams } from "react-router-dom";

export default function schedule(){
    const [packages, setpackages] = useState<packageGetDto[]>([]);
    const [params] = useSearchParams();
    const checkInDate = params.get("checkInDate");
    const checkOutDate = params.get("checkOutDate");

    useEffect(() => {
        fetch("/api/packages/", {
            method: "get",
        })
            .then<packageGetDto[]>((r) => r.json())
            .then((j) => {
                setpackages(j);
            });
    }, []);

    return(
    <>

     {packages?.map((roomPackage) => (
                <div>
                    {roomPackage.Description}
                </div>
            ))}
    
    </>
    )
}