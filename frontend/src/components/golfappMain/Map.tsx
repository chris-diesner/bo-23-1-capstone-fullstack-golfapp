import React, { useState, useMemo, useCallback, useRef } from "react";
import { GoogleMap, Marker, useLoadScript, InfoWindow } from "@react-google-maps/api";
import Places from "./Places";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type Map = google.maps.Map;

export default function Map() {
    const [clubs, setClubs] = useState<LatLngLiteral>();
    const mapRef = useRef<Map>();
    const center = useMemo<LatLngLiteral>(() => ({ lat: 52.7859645, lng: 13.5724521 }), []);
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
                <GoogleMap zoom={13} center={center} mapContainerClassName="map-container" options={options} onLoad={onLoad} />
            </div>
        </div>
    );
}
