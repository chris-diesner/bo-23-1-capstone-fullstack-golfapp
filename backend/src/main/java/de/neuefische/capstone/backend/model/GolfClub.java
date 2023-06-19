package de.neuefische.capstone.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document("Clubs")
public class GolfClub {
    @Id
    private String clubID;
    private String clubName;
    private String city;
    private String state;
    private String country;
    private String address;
    private String postalCode;
    private String latitude;
    private String longitude;
    private String website;
    private String telephone;
    private String timestampUpdated;
    private List<GolfCourse> courses;
}
