import {useLoadScript} from "@react-google-maps/api";
import Map from "../golfappMain/Map";

export default function MapContainer() {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyCX06ThQINIbdH-nHkmJR0PHsXgxBjDhVg",
        libraries: ['places']
    })
    if (!isLoaded) return <div>Loading...</div>
    return (<Map />)

}