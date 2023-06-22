package de.neuefische.capstone.backend.service;

import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class DateService {
    private final Instant instant = Instant.now();

    public String currentDate() {
        return String.valueOf(instant).substring(0, 10);
    }
}