import {useLoadScript} from "@react-google-maps/api";
import Map from "../golfappMain/Map";
import {GolfClub} from "../../models/GolfClub";

type Props = {
    golfClubs: GolfClub[]
}
export default function MapContainer({golfClubs}: Props) {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ?? '',
        libraries: ['places']
    })
    if (!isLoaded) return <div>Loading...</div>
    return (<Map golfClubs={golfClubs}/>)
}