import {useLoadScript} from "@react-google-maps/api";
import Map from "../golfappMain/Map";
import {GolfClub} from "../../models/GolfClub";

type Props = {
    golfClubs: GolfClub[]
}
export default function MapContainer({golfClubs}: Props) {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyCX06ThQINIbdH-nHkmJR0PHsXgxBjDhVg",
        libraries: ['places']
    })
    if (!isLoaded) return <div>Loading...</div>
    return (<Map golfClubs={golfClubs}/>)

}