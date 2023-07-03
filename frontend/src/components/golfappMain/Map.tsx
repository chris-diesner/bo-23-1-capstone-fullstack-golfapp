import React, {useState, useMemo, useCallback, useRef} from "react";
import {GoogleMap, Marker, useLoadScript, InfoWindow, Circle} from "@react-google-maps/api";
import Places from "./Places";
import Tee from "../../media/tee.png";
import {GolfClub} from "../../models/GolfClub";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type Map = google.maps.Map;
type Props = {
    golfClubs: GolfClub[]
}

export default function Map({golfClubs}: Props) {
    const [clubs, setClubs] = useState<LatLngLiteral>();
    const mapRef = useRef<Map>();
    const center = useMemo<LatLngLiteral>(() => ({lat: 52.48658892646834, lng: 13.541720214410722}), []);
    const options = useMemo<MapOptions>(
        () => ({
            mapId: "ebcaab6b93988501",
            disableDefaultUI: true,
            clickableIcons: false
        }),
        []
    );
    const onLoad = useCallback((map: Map) => {
        mapRef.current = map;
    }, []);

    return (
        console.log(golfClubs),
        <div className="MapContainer">
            <div className="Controls">
                <h6>Controls</h6>
                <Places setClubs={(position) => {
                    setClubs(position)
                    mapRef.current?.panTo(position)
                }}
                />
            </div>
            <div className="Map">
                <GoogleMap zoom={13} center={center} mapContainerClassName="map-container" options={options}
                           onLoad={onLoad}>
                    <>
                        {golfClubs.map((golfClub) => (
                            <Marker key={golfClub.clubID} position={{ lat: parseFloat(golfClub.latitude), lng: parseFloat(golfClub.longitude) }} icon={Tee} />
                        ))}
                        {clubs && <Marker position={clubs} icon={Tee}/>}
                    </>
                    <Circle center={center} radius={15000} options={closeOptions}/>
                    <Circle center={center} radius={30000} options={middleOptions}/>
                    <Circle center={center} radius={45000} options={farOptions}/>
                </GoogleMap>
            </div>
        </div>
    );
}

const defaultOptions = {
    strokeOpacity: 0.5,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
}
const closeOptions = {
    ...defaultOptions,
    zIndex: 3,
    fillOpacity: 0.05,
    strokeColor: "rgb(29,203,51)",
    fillColor: "rgb(29,203,51)",
}
const middleOptions = {
    ...defaultOptions,
    zIndex: 2,
    fillOpacity: 0.05,
    strokeColor: "rgb(255,250,7)",
    fillColor: "rgb(255,250,7)",
}
const farOptions = {
    ...defaultOptions,
    zIndex: 1,
    fillOpacity: 0.05,
    strokeColor: "rgb(255,0,0)",
    fillColor: "rgb(255,0,0)",
}
