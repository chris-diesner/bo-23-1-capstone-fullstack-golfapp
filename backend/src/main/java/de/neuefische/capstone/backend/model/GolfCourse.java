package de.neuefische.capstone.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("Courses")
public class GolfCourse {
    private String apiRequestsLeft;
    private String clubID;
    private String clubName;
    private String address;
    private String postalCode;
    private String city;
    private String state;
    private String country;
    private String latitude;
    private String longitude;
    private String website;
    private String telephone;
    private String courseID;
    private String courseName;
    private String numHoles;
    private String timestampUpdated;
    private String hasGPS;
    private String measure;
    private List<Integer> parsMen;
    private List<Integer> indexesMen;
    private List<Integer> parsWomen;
    private List<Integer> indexesWomen;
    private int numTees;
    private List<GolfTee> tees;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
class GolfTee {
    private String teeID;
    private String teeName;
    private String teeColor;
    private int length1;
    private int length2;
    private int length3;
    private int length4;
    private int length5;
    private int length6;
    private int length7;
    private int length8;
    private int length9;
    private int length10;
    private int length11;
    private int length12;
    private int length13;
    private int length14;
    private int length15;
    private int length16;
    private int length17;
    private int length18;
    private double courseRatingMen;
    private int slopeMen;
    private double courseRatingWomen;
    private int slopeWomen;
    private double courseRatingMenFront9;
    private double courseRatingMenBack9;
    private int slopeMenFront9;
    private int slopeMenBack9;
    private double courseRatingWomenFront9;
    private double courseRatingWomenBack9;
    private int slopeWomenFront9;
    private int slopeWomenBack9;
}
