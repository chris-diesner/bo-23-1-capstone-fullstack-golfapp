package de.neuefische.capstone.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("GolfRoundSessions")
public class GolfRoundSession {
    @Id
    private String sessionId;
    private String userId;
    private List<String> players;
    private String golfCourseId;
    private Date date;
    private Scorecard scorecard;
}
