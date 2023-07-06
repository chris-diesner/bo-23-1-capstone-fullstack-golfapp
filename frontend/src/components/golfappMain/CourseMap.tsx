import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {GoogleMap, Marker} from "@react-google-maps/api";
import Tee from "../../media/tee.png";

type CourseMap = google.maps.Map;
type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
export default function CourseMap() {
    const mapRef = useRef<CourseMap>();
    const [center, setCenter] = useState<LatLngLiteral | null>(null);
    const defaultCenter = undefined;
    const options = useMemo<MapOptions>(
        () => ({
            mapId: "ebcaab6b93988501",
            disableDefaultUI: true,
            clickableIcons: false,
            mapTypeId: "satellite"
        }),
        [])
    const onLoad = useCallback((map: CourseMap) => {
        mapRef.current = map;
    }, [])

    /*useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCenter({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error getting geolocation:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);*/

    return (<div className="CourseMapContainer">
        <div className="CourseMap" >
            <GoogleMap zoom={17} center={{lat: 52.78876430772261, lng: 13.570415971724204}} options={options} onLoad={onLoad} mapContainerStyle={{height: "450px", width: "220px"}}>
                <>
                    <Marker key={"blubb"} position={{lat: 52.7859645, lng: 13.5724521}} icon={Tee}/>
                    <Marker key={"blubb"} position={{lat: 52.78876430772261, lng: 13.570415971724204}} icon={Tee}/>
                </>
            </GoogleMap>
        </div>
    </div>);
}