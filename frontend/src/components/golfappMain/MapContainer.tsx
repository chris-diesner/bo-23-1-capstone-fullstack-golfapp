import { useLoadScript } from "@react-google-maps/api";
import { GolfClub } from "../../models/GolfClub";
import GolfClubMap from "./GolfClubMap";
import GolfCourseMap from "./GolfCourseMap";

type Props = {
    golfClubs: GolfClub[];
    showClubMap: boolean;
    holeNumber: number;
};

export default function MapContainer({ golfClubs, showClubMap, holeNumber }: Props) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ?? "",
        libraries: ["places"],
    });

    if (!isLoaded) return <div>Loading...</div>;

    return showClubMap ? <GolfClubMap golfClubs={golfClubs} /> : <GolfCourseMap holeNumber={holeNumber}/>;
}
