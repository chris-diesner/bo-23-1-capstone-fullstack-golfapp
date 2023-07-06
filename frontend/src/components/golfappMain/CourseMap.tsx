import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Tee from "../../media/tee.png";

type CourseMap = google.maps.Map;
type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

export default function CourseMap() {
    const mapRef = useRef<CourseMap>();
    const [center, setCenter] = useState<LatLngLiteral | null>(null);
    const options = useMemo<MapOptions>(
        () => ({
            mapId: "ebcaab6b93988501",
            disableDefaultUI: true,
            clickableIcons: false,
            mapTypeId: "satellite"
        }),
        []
    );

    useEffect(() => {
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
    }, []);

    const getDistanceBetweenTwoPoints = (
        mk1: LatLngLiteral,
        mk2: LatLngLiteral
    ) => {
        const lat1 = mk1.lat;
        const lng1 = mk1.lng;
        const lat2 = mk2.lat;
        const lng2 = mk2.lng;

        const R = 6371e3;

        const dLat = (Math.PI / 180) * (lat2 - lat1);
        const dLng = (Math.PI / 180) * (lng2 - lng1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((Math.PI / 180) * lat1) *
            Math.cos((Math.PI / 180) * lat2) *
            Math.sin(dLng / 2) *
            Math.sin(dLng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return distance;
    };

    const onLoad = useCallback((map: CourseMap) => {
        mapRef.current = map;

        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend({ lat: 52.7859645, lng: 13.5724521 });
        if (center) {
            bounds.extend(center);
        }
        map.fitBounds(bounds);

        const zoomChangeBoundsListener = google.maps.event.addListenerOnce(
            map,
            "bounds_changed",
            () => {
                if (mapRef.current) {
                    const marker1 = new google.maps.Marker({
                        position: { lat: 52.7859645, lng: 13.5724521 },
                        map: mapRef.current,
                        icon: Tee
                    });

                    if (center) {
                        const marker2 = new google.maps.Marker({
                            position: {
                                lat: center.lat,
                                lng: center.lng
                            },
                            map: mapRef.current,
                            icon: Tee
                        });
                    }
                }
            }
        );

        setTimeout(() => {
            google.maps.event.removeListener(zoomChangeBoundsListener);
        }, 2000);
    }, [center]);

    return (
        <div className="CourseMapContainer">
            <div className="CourseMap">
                <GoogleMap
                    options={options}
                    onLoad={onLoad}
                    mapContainerStyle={{ height: "450px", width: "220px" }}
                />
            </div>
            <div className="test-distance">
                <br />
                <p>
                    Distance:{" "}
                    {Math.round(
                        getDistanceBetweenTwoPoints(
                            { lat: 52.7859645, lng: 13.5724521 },
                            center || { lat: 0, lng: 0 }
                        )
                    )}{" "}
                    m
                </p>
            </div>
        </div>
    );
}
