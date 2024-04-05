import { useSearchParams } from "react-router-dom";

export default function create(){
    const [params] = useSearchParams();
    
    const checkInDateArray = params.get("checkInDate")?.split("-") ?? [];
    const checkInDate: Date = new Date(parseInt(checkInDateArray[0]), parseInt(checkInDateArray[1]) - 1, parseInt(checkInDateArray[2]));

    const checkOutDateArry = params.get("checkOutDate")?.split("-") ?? [];
    const checkOutDate: Date = new Date(parseInt(checkOutDateArry[0]), parseInt(checkOutDateArry[1]) - 1, parseInt(checkOutDateArry[2]));
    
    const hotelId = params.get("hotel")

    const packageId = params.get("packageId")

    
    
    return(
        <>
        
        
        
        </>
    )
}