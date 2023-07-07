import { useLoadScript } from "@react-google-maps/api";
import { GolfClub } from "../../models/GolfClub";
import ClubMap from "./ClubMap";
import CourseMap from "./CourseMap";

type Props = {
    golfClubs: GolfClub[];
    showClubMap: boolean;
};

export default function MapContainer({ golfClubs, showClubMap }: Props) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ?? "",
        libraries: ["places"],
    });

    if (!isLoaded) return <div>Loading...</div>;

    return showClubMap ? <ClubMap golfClubs={golfClubs} /> : <CourseMap />;
}
