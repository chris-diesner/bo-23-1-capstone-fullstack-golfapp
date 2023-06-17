import {useEffect, useState} from "react";
import {GolfClub} from "../../models/GolfClub";
import axios from "axios";

export default function GolfAppHooks() {
    const [golfClub, setGolfClub] = useState<GolfClub | null>();

    useEffect(()=> {
        function getAllGolfClubs() {
            return axios.get("/api/golfclub")
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    console.log(error);
                    return null;
                })
        }

        getAllGolfClubs().then((golfClub) => {
            setGolfClub(golfClub);
        })
    }, [golfClub]);



}