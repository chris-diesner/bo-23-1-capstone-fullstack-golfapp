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

    const onLoad = useCallback((map: CourseMap) => {
        mapRef.current = map;

        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend({ lat: 52.7859645, lng: 13.5724521 });
        bounds.extend({ lat: 52.78876430772261, lng: 13.570415971724204 });
        map.fitBounds(bounds);

        const zoomChangeBoundsListener = google.maps.event.addListenerOnce(
            map,
            "bounds_changed",
            (function(this: google.maps.Map) {
                if (this.getZoom()) {
                    this.setZoom(16);
                }
            }).bind(map)
        );

        setTimeout(function() {
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
                >
                    <>
                        <Marker
                            key={"blubb1"}
                            position={{ lat: 52.7859645, lng: 13.5724521 }}
                            icon={Tee}
                        />
                        <Marker
                            key={"blubb2"}
                            position={{
                                lat: 52.78876430772261,
                                lng: 13.570415971724204
                            }}
                            icon={Tee}
                        />
                    </>
                </GoogleMap>
            </div>
        </div>
    );
}
