package de.neuefische.capstone.backend.service;

import de.neuefische.capstone.backend.model.GolfClub;
import de.neuefische.capstone.backend.repo.GolfClubRepo;
import de.neuefische.capstone.backend.service.GolfClubService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class GolfClubServiceTest {

    private GolfClubRepo golfClubRepo;
    private GolfClubService golfClubService;

    @BeforeEach
    public void setup() {
        golfClubRepo = Mockito.mock(GolfClubRepo.class);
        golfClubService = new GolfClubService(golfClubRepo);
    }

    @Test
    void testGetGolfClubByClubID() {
        String clubID = "123";
        GolfClub expectedClub = new GolfClub();
        expectedClub.setClubID(clubID);
        when(golfClubRepo.findGolfClubByClubID(clubID)).thenReturn(Optional.of(expectedClub));
        GolfClub actualClub = golfClubService.getGolfClubByClubID(clubID);
        assertEquals(expectedClub, actualClub);
    }

    @Test
    void testGetAllGolfClubs() {
        List<GolfClub> expectedClubs = Arrays.asList(new GolfClub(), new GolfClub());
        when(golfClubRepo.findAll()).thenReturn(expectedClubs);
        List<GolfClub> actualClubs = golfClubService.getAllGolfClubs();
        assertEquals(expectedClubs, actualClubs);
    }
}
