package de.neuefische.capstone.backend.service;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class GenerateUUIDServiceTest {

    UUIDService generateUUID = new UUIDService();

    @Test
    void testGenerateUUID_returns_uuid() {
        // when
        String actualUUID = generateUUID.generateUUID();

        // then
        assertNotNull(actualUUID);
    }

}