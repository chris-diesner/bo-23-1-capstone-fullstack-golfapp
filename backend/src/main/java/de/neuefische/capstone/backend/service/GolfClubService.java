package de.neuefische.capstone.backend.service;

import de.neuefische.capstone.backend.model.GolfClub;
import de.neuefische.capstone.backend.repo.GolfClubRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GolfClubService {

    private final GolfClubRepo golfClubRepo;

    public GolfClub getGolfClubByClubID(String clubID) {
        return golfClubRepo.findGolfClubByClubID(clubID).orElseThrow();
    }

    public List<GolfClub> getAllGolfClubs() {
        return golfClubRepo.findAll();
    }
}
