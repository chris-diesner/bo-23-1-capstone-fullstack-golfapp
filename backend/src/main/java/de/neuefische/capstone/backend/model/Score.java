package de.neuefische.capstone.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Score {
    private int holeNumber;
    private int totalStrokes;
    private int totalPutts;
    private boolean fairwayHit;
    private int stablefordGross;
    private int stablefordNet;
}
