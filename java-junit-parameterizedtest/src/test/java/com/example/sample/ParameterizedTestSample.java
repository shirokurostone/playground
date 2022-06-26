package com.example.sample;

import java.util.stream.Stream;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.ArgumentsProvider;
import org.junit.jupiter.params.provider.ArgumentsSource;
import org.junit.jupiter.params.provider.CsvFileSource;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.EmptySource;
import org.junit.jupiter.params.provider.EnumSource;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.NullSource;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class ParameterizedTestSample {

    // "case0", "case1", "case2" の3ケース実行
    @ParameterizedTest
    @ValueSource(strings = {"case0", "case1", "case2"})
    public void testWithValueSource(final String argument){
        assertEquals(5, argument.length());
    }

    // null の1ケース実行
    @ParameterizedTest
    @NullSource
    public void testWithNullSource(final String argument){
        assertNull(argument);
    }

    // "" の1ケース実行
    @ParameterizedTest
    @EmptySource
    public void testWithEmptySource(final String argument){
        assertTrue(argument.isEmpty());
    }

    // null, "" の2ケース実行
    @ParameterizedTest
    @NullAndEmptySource
    public void testWithNullAndEmptySource(final String argument){
        assertTrue(argument == null || argument.isEmpty());
    }

    public enum TestCases{
        CASE0,
        CASE1,
        CASE2
    }

    // TestCases.CASE0, TestCases.CASE1, TestCases.CASE2 の3ケース実行
    @ParameterizedTest
    @EnumSource
    public void testWithEnumSource(final TestCases argument){
        assertNotNull(argument);
    }

    public static Stream<String> provider(){
        return Stream.of("case0", "case1", "case2");
    }

    // "case0", "case1", "case2" の3ケース実行
    @ParameterizedTest
    @MethodSource("provider")
    public void testWithMethodSource(final String argument){
        assertNotNull(argument);
    }

    // ("case0","value0"), ("case1","value1"), ("case2","value2") の3ケース実行
    @ParameterizedTest
    @CsvSource({
            "case0, value0",
            "case1, value1",
            "case2, value2",
    })
    public void testWithCsvSource(final String argument1, final String argument2){
        assertTrue(argument1.startsWith("case"));
        assertEquals(5, argument1.length());
        assertTrue(argument2.startsWith("value"));
        assertEquals(6, argument2.length());
    }

    // ("case0","value0"), ("case1","value1"), ("case2","value2") の3ケース実行
    @ParameterizedTest
    @CsvFileSource(resources = "/testdata.csv")
    public void testWithCsvFileSource(final String argument1, final String argument2){
        assertTrue(argument1.startsWith("case"));
        assertEquals(5, argument1.length());
        assertTrue(argument2.startsWith("value"));
        assertEquals(6, argument2.length());
    }

    public static class Provider implements ArgumentsProvider {
        @Override
        public Stream<? extends Arguments> provideArguments(ExtensionContext context) {
            return Stream.of("case0", "case1", "case2").map(Arguments::of);
        }
    }

    // "case0", "case1", "case2" の3ケース実行
    @ParameterizedTest
    @ArgumentsSource(Provider.class)
    public void testWithArgumentsSource(final String argument){
        assertEquals(5, argument.length());
    }

}
