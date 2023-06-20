package de.neuefische.capstone.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import jakarta.validation.Valid;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("Courses")
public class GolfCourse {

    @SerializedName("apiRequestsLeft")
    @Expose
    public String apiRequestsLeft;
    @SerializedName("clubID")
    @Expose
    public String clubID;
    @SerializedName("clubName")
    @Expose
    public String clubName;
    @SerializedName("address")
    @Expose
    public String address;
    @SerializedName("postalCode")
    @Expose
    public String postalCode;
    @SerializedName("city")
    @Expose
    public String city;
    @SerializedName("state")
    @Expose
    public String state;
    @SerializedName("country")
    @Expose
    public String country;
    @SerializedName("latitude")
    @Expose
    public String latitude;
    @SerializedName("longitude")
    @Expose
    public String longitude;
    @SerializedName("website")
    @Expose
    public String website;
    @SerializedName("telephone")
    @Expose
    public String telephone;
    @SerializedName("courseID")
    @Expose
    public String courseID;
    @SerializedName("courseName")
    @Expose
    public String courseName;
    @SerializedName("numHoles")
    @Expose
    public String numHoles;
    @SerializedName("timestampUpdated")
    @Expose
    public String timestampUpdated;
    @SerializedName("hasGPS")
    @Expose
    public String hasGPS;
    @SerializedName("measure")
    @Expose
    public String measure;
    @SerializedName("parsMen")
    @Expose
    @Valid
    public List<Integer> parsMen;
    @SerializedName("indexesMen")
    @Expose
    @Valid
    public List<Integer> indexesMen;
    @SerializedName("parsWomen")
    @Expose
    @Valid
    public List<Integer> parsWomen;
    @SerializedName("indexesWomen")
    @Expose
    @Valid
    public List<Integer> indexesWomen;
    @SerializedName("numTees")
    @Expose
    public Integer numTees;
    @SerializedName("tees")
    @Expose
    @Valid
    public List<Tee> tees;
    @SerializedName("numCoordinates")
    @Expose
    public Integer numCoordinates;

}

