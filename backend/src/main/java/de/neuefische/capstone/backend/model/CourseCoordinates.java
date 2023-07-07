package de.neuefische.capstone.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("Coordinates")
public class CourseCoordinates {
    private String apiRequestsLeft;
    private String courseID;
    private int numCoordinates;
    private List<Coordinates> coordinates;

    @Data
    public static class Coordinates {
        private String poi;
        private String location;
        private String sideFW;
        private String hole;
        private double latitude;
        private double longitude;
    }
}
