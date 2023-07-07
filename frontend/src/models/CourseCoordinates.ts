export type CourseCoordinates = {
    apiRequestsLeft: string;
    courseID: string;
    numCoordinates: number;
    coordinates: Coordinates[];
};

export type Coordinates = {
    poi: string;
    location: string;
    sideFW: string;
    hole: string;
    latitude: number;
    longitude: number;
};
