import axios from "axios";
import {useState} from "react";
import {GolfClub} from "../../models/GolfClub";
import {GolfCourse} from "../../models/GolfCourse";

export default function GolfAppHook() {
    const [golfClub, setGolfClub] = useState<GolfClub | null>(null)
    const [golfCourse, setGolfCourse] = useState<GolfCourse | null>(null)

    function getGolfClubs(): Promise<void> {
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

    function getGolfCourse(courses: GolfCourse): Promise<void> {
        return axios
            .get("/api/golfapp/course" + courses.courseID)
            .then((response) => {
                const golfCourse: GolfCourse = {
                    courseID: response.data.courseID,
                    courseName: response.data.courseName,
                    numHoles: response.data.numHoles,
                    timestampUpdated: response.data.timestampUpdated,
                    hasGPS: response.data.hasGPS,
                    tees: response.data.tees,
                };
                setGolfCourse(golfCourse);
            })
            .catch((error) => console.log(error));
    }

    return {
        golfClub,
        getGolfClubs,
        golfCourse,
        getGolfCourse
    };
}