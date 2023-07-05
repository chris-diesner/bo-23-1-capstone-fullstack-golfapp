package de.neuefische.capstone.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@With
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document("Scorecards")
public class Scorecard {
    @Id
    private String scorecardId;
    private String userId;
    private String golfCourseId;
    private String golfCourseName;
    private String golfClubName;
    private List<String> players;
    private String date;
    private List<Score> scores;
    private int totalScore;
    private boolean playBackNine;
    private double CourseRating;
    private int SlopeRating;
    private double CourseHandicap;
}
