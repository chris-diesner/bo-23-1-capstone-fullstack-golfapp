package de.neuefische.capstone.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GolfRoundSession {
    private String sessionId;
    private String userId;
    private List<String> players;
    private String golfCourseId;
    private Date date;
    private Scorecard scorecard;
}
