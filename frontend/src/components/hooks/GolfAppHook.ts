import axios from "axios";
import {useState} from "react";
import {GolfClub} from "../../models/GolfClub";

export default function GolfClubHook() {
    const [golfClub, setGolfClub] = useState<GolfClub | null>(null);

    function getGolfClub(): Promise<void> {
        return axios
            .get("/api/golfapp/clubs")
            .then((response) => {
                const golfClub: GolfClub = {
                    clubID: response.data.clubID,
                    clubName: response.data.clubName,
                    city: response.data.city,
                    state: response.data.state,
                    country: response.data.country,
                    address: response.data.address,
                    postalCode: response.data.postalCode,
                    latitude: response.data.latitude,
                    longitude: response.data.longitude,
                    website: response.data.website,
                    telefone: response.data.telefone,
                    timestampUpdated: response.data.timestampUpdated,
                    courses: response.data.courses,
                };
                setGolfClub(golfClub);
            })
            .catch((error) => console.log(error));
    }

    return {
        golfClub,
        getGolfClub
    };
}