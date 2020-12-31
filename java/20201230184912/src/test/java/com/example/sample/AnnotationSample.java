package com.example.sample;

import java.nio.file.Path;
import java.util.concurrent.TimeUnit;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Timeout;
import org.junit.jupiter.api.io.TempDir;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class AnnotationSample {

    @Nested
    public class NestedClass{

        @Test
        public void nestedTest(){
            System.out.println("nestedTest");
            assertTrue(true);
        }
    }

    @Disabled
    @Test
    public void disabledTest(){
        assertTrue(true);
    }

    @BeforeEach
    public void setUp(){
        System.out.println("setUp");
    }

    @AfterEach
    public void tearDown(){
        System.out.println("tearDown");
    }

    @Test
    public void testWithTempDir(@TempDir Path path){
        System.out.println(path);
        assertTrue(true);
    }

    @BeforeAll
    static void setUpBeforeClass(){
        System.out.println("setUpBeforeClass");
    }

    @AfterAll
    static void tearDownAfterClass(){
        System.out.println("tearDownAfterClass");
    }

    @Timeout(value = 3, unit = TimeUnit.SECONDS)
    @Test
    public void testWithTimeout() throws InterruptedException {
        Thread.sleep(5000); // fail
    }
}
