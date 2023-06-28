export type Scorecard = {
    scorecardId: string;
    userId: string;
    golfCourseId: string;
    players: string[];
    date: string;
    scores: Score[];
    totalScore: number;
    playBackNine: boolean;
}

export type Score = {
    holeNumber: number;
    totalStrokes: number;
    totalPutts: number;
    fairwayHit: boolean;
}

export type ScorecardDTO = {
    userId: string;
    golfCourseId: string;
    players: string[];
    date: string;
    scores: Score[];
    totalScore: number;
    playBackNine: boolean;
}