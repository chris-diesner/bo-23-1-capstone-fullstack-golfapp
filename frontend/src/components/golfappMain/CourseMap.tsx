import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";
import Tee from "../../media/tee.png";
import { useSelector } from "react-redux";
import { Coordinates } from "../../models/CourseCoordinates";

type CourseMap = google.maps.Map;
type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type Props = {
    holeNumber: number;
};

export default function CourseMap(props: Props) {
    const mapRef = useRef<CourseMap>();
    const polylineRef = useRef<google.maps.Polyline>();
    const [polylinePath, setPolylinePath] = useState<LatLngLiteral[]>([]);
    const [currentPosition, setCurrentPosition] = useState<LatLngLiteral | null>(null);
    const courseCoordinates = useSelector((state: any) => state.golfApp.courseCoordinates);

    const options = useMemo<MapOptions>(
        () => ({
            mapId: "ebcaab6b93988501",
            disableDefaultUI: true,
            clickableIcons: false,
            mapTypeId: "satellite"
        }),
        []
    );

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

        return R * c;
    };

    const getCoordinatesForHole = (holeNumber: number): Coordinates | null => {
        const filteredCoordinates = courseCoordinates?.coordinates.filter(
            (coordinate: Coordinates) => coordinate.poi === "1" && coordinate.location === "2"
        );

        if (filteredCoordinates && filteredCoordinates.length > 0) {
            const coordinatesForHole = filteredCoordinates.find(
                (coordinate: Coordinates) => parseInt(coordinate.hole) === holeNumber
            );
            return coordinatesForHole || null;
        }

        return null;
    };

    useEffect(() => {
        const coordinatesForHole = getCoordinatesForHole(props.holeNumber);

        if (mapRef.current && coordinatesForHole) {
            const marker1 = new google.maps.Marker({
                position: { lat: coordinatesForHole.latitude, lng: coordinatesForHole.longitude },
                map: mapRef.current,
                icon: Tee
            });

            const path: LatLngLiteral[] = [
                marker1.getPosition()!.toJSON(),
                currentPosition || { lat: 0, lng: 0 }
            ];

            setPolylinePath(path);

            polylineRef.current = new google.maps.Polyline({
                path,
                geodesic: true,
                strokeColor: "#669DF6",
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            if (mapRef.current) {
                polylineRef.current.setMap(mapRef.current);
            }
        }
    }, [props.holeNumber]);

    const onLoad = useCallback((map: CourseMap) => {
        mapRef.current = map;

        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend({ lat: 52.7859645, lng: 13.5724521 });
        bounds.extend({ lat: 52.78876430772261, lng: 13.570415971724204 });
        map.fitBounds(bounds);

        const zoomChangeBoundsListener = google.maps.event.addListenerOnce(
            map,
            "bounds_changed",
            () => {
                if (mapRef.current) {
                    navigator.geolocation.getCurrentPosition(
                        position => {
                            const { latitude, longitude } = position.coords;
                            const currentPosition = { lat: latitude, lng: longitude };

                            const marker2 = new google.maps.Marker({
                                position: currentPosition,
                                map: mapRef.current,
                                icon: Tee
                            });

                            const path: LatLngLiteral[] = [
                                currentPosition,
                                currentPosition
                            ];

                            setPolylinePath(path);

                            polylineRef.current = new google.maps.Polyline({
                                path,
                                geodesic: true,
                                strokeColor: "#669DF6",
                                strokeOpacity: 1.0,
                                strokeWeight: 2
                            });

                            if (mapRef.current) {
                                polylineRef.current.setMap(mapRef.current);
                            }

                            setCurrentPosition(currentPosition);
                        },
                        error => {
                            console.error("Error getting current position:", error);
                        }
                    );
                }
            }
        );

        setTimeout(() => {
            google.maps.event.removeListener(zoomChangeBoundsListener);
        }, 2000);
    }, []);

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
                    {currentPosition
                        ? Math.round(
                            getDistanceBetweenTwoPoints(
                                { lat: 52.7859645, lng: 13.5724521 },
                                currentPosition
                            )
                        )
                        : ""}{" "}
                    m
                </p>
            </div>
        </div>
    );
}
