package de.neuefische.capstone.backend.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DateServiceTest {

    private final DateService dateService = new DateService();

    @Test
    void when_CurrentDate_returnStringWithRightFormat() {
        //Given
        assertTrue(dateService.currentDate().matches("\\d{4}-\\d{2}-\\d{2}"));
    }
}