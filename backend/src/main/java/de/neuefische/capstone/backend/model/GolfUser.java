package de.neuefische.capstone.backend.model;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@With
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document("Users")
public class GolfUser {
        @Id
        private String id;
        private String username;
        private String password;
        private String firstName;
        private String lastName;
        private double handicap;
        private String profilePicture;
}
