import React, {useState, useMemo, useCallback, useRef, useEffect} from "react";
import {GoogleMap, Marker, MarkerClusterer} from "@react-google-maps/api";
import Places from "./Places";
import Tee from "../../media/tee.png";
import {GolfClub} from "../../models/GolfClub";
import {GolfCourse} from "../../models/GolfCourse";
import {setCourses} from "../../Actions/GolfAppActions";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;
type ClubMap = google.maps.Map;
type Props = {
    golfClubs: GolfClub[];
};

export default function ClubMap({golfClubs}: Props) {
    const [clubs, setClubs] = useState<LatLngLiteral>();
    const [visibleClubs, setVisibleClubs] = useState<GolfClub[]>([]);
    const mapRef = useRef<ClubMap>();
    const center = useMemo<LatLngLiteral>(
        () => ({lat: 52.48658892646834, lng: 13.541720214410722}),
        []
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const options = useMemo<MapOptions>(
        () => ({
            mapId: "ebcaab6b93988501",
            disableDefaultUI: true,
            clickableIcons: false,
        }),
        []
    );
    const onLoad = useCallback((map: ClubMap) => {
        mapRef.current = map;
    }, []);

    useEffect(() => {
        const boundsChangedListener = mapRef.current?.addListener(
            "bounds_changed",
            () => {
                const bounds = mapRef.current?.getBounds();
                if (bounds) {
                    const visibleClubs = golfClubs.filter((golfClub) =>
                        bounds.contains({
                            lat: parseFloat(golfClub.latitude),
                            lng: parseFloat(golfClub.longitude),
                        })
                    );
                    setVisibleClubs(visibleClubs);
                }
            }
        );

        return () => {
            if (boundsChangedListener) {
                google.maps.event.removeListener(boundsChangedListener);
            }
        };
    }, [golfClubs]);

    const onClickSelectCoursesBySelectedClub = (courses: GolfCourse[]) => {
        dispatch(setCourses(courses));
        console.log(courses);
        navigate("/golfapp/clubs/courses");
    };

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
                        {visibleClubs.map((golfClub) => (
                            <Marker
                                key={golfClub.clubID}
                                position={{
                                    lat: parseFloat(golfClub.latitude),
                                    lng: parseFloat(golfClub.longitude),
                                }}
                                icon={Tee} />
                        ))}
                        {clubs && <Marker position={clubs} icon={Tee}/>}
                    </>
                </GoogleMap>
            </div>
            <br/>
            <div className="GolfClubList">
                {visibleClubs.map((golfClub) => (
                    <div key={golfClub.clubID} className="GolfClubBody"
                         onClick={() => onClickSelectCoursesBySelectedClub(golfClub.courses)}>
                        <div className="GolfClubHeader">
                            <div>{golfClub.clubName}</div>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                                     fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                                    <path
                                        d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z"/>
                                </svg>
                            </div>
                        </div>
                        <div className="GolfClubSubHeader">
                            <div className="GolfClubSubHeaderLeft">
                                City: {golfClub.city}
                            </div>
                            <div className="GolfClubSubHeaderRigt">
                                Courses: {golfClub.courses.length}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="GolfClubSpacer">
                </div>
            </div>
        </div>
    );
}