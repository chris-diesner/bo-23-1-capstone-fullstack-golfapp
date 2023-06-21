package de.neuefische.capstone.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Scorecard {
    private List<Score> scores;
    private int totalScore;
}
