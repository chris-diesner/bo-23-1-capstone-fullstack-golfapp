package de.neuefische.capstone.backend.controller;

import de.neuefische.capstone.backend.model.GolfClub;
import de.neuefische.capstone.backend.service.GolfClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/golfapp")
@RequiredArgsConstructor
public class GolfClubController {

    private final GolfClubService golfClubService;

    @GetMapping("/club/{clubID}")
    public GolfClub getGolfClubByClubID(@PathVariable String clubID) {
        return golfClubService.getGolfClubByClubID(clubID);
    }

    @GetMapping("/clubs")
    public List<GolfClub> getAllGolfClubs() {
        return golfClubService.getAllGolfClubs();
    }
}
