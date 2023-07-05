export type Scorecard = {
    scorecardId: string;
    userId: string;
    golfCourseId: string;
    golfCourseName: string;
    golfClubName: string;
    players: string[];
    date: string;
    scores: Score[];
    totalScore: number;
    playBackNine: boolean;
    courseRating: number;
    slopeRating: number;
    courseHandicap: number;
    coursePar: number;
    selectedTee: string;
}

export type Score = {
    holeNumber: number;
    totalStrokes: number;
    totalPutts: number;
    fairwayHit: boolean;
    stablefordGross: number;
    stablefordNet: number;
    personalPar: number;
}

export type ScorecardDTO = {
    userId: string;
    golfCourseId: string;
    golfCourseName: string;
    golfClubName: string;
    players: string[];
    date: string;
    scores: Score[];
    totalScore: number;
    playBackNine: boolean;
    courseRating: number;
    slopeRating: number;
    courseHandicap: number;
    coursePar: number;
    selectedTee: string;
}