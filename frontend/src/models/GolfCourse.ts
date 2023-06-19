export type GolfCourse = {
    courseID: string;
    courseName: string;
    numHoles: number;
    timestampUpdated: string;
    hasGPS: number;
    tees: GolfTee[];
};

export type GolfTee = {
    teeID: string;
    teeName: string;
    teeColor: string;
    length1: number;
    length2: number;
    length3: number;
    length4: number;
    length5: number;
    length6: number;
    length7: number;
    length8: number;
    length9: number;
    length10: number;
    length11: number;
    length12: number;
    length13: number;
    length14: number;
    length15: number;
    length16: number;
    length17: number;
    length18: number;
    courseRatingMen: number;
    slopeMen: number;
    courseRatingWomen: number;
    slopeWomen: number;
    courseRatingMenFront9: number;
    courseRatingMenBack9: number;
    slopeMenFront9: number;
    slopeMenBack9: number;
    courseRatingWomenFront9: number;
    courseRatingWomenBack9: number;
    slopeWomenFront9: number;
    slopeWomenBack9: number;
};
