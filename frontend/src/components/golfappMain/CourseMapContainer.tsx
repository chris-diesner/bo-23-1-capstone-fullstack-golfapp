import {useLoadScript} from "@react-google-maps/api";
import CourseMap from "./CourseMap";

type Props = {

}

export default function CourseMapContainer({}: Props) {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ?? ''
    })
    if (!isLoaded) return <div>Loading...</div>
    return (<CourseMap/>)
}