package de.neuefische.capstone.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ScorecardDTO {

        private String userId;
        private String golfCourseId;
        private List<String> players;
        private Date date;
        private List<Score> scores;
        private int totalScore;

}
