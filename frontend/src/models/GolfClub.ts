import {GolfCourse} from "./GolfCourse";

export type GolfClub = {
    clubId: string
    clubName: string
    city: string
    state: string
    country: string
    address: string
    postalCode: string
    latitude: string
    longitude: string
    website: string
    telefone: string
    timestampUpdated: string
    courses: GolfCourse[]
}