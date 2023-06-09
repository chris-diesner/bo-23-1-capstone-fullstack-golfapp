package de.neuefische.capstone.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScorecardDTO {

        private String userId;
        private String golfCourseId;
        private String golfCourseName;
        private String golfClubName;
        private List<String> players;
        private String date;
        private List<Score> scores;
        private int totalScore;
        private boolean playBackNine;
        private double courseRating;
        private int slopeRating;
        private double courseHandicap;
        private int coursePar;
        private String selectedTee;
}
