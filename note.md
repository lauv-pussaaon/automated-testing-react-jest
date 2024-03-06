# Outline

-   Short overview of Jest
-   Jest + TypeScript project setup
-   Properly write unit tests
-   Intro to assertions and matchers

# Jest?

-   JavaScript/TypeScript testing framework developed by fb
-   Test runner: sut of global functions: describe, test, expect
-   Assertion library with powerful set of matchers

### Dependencies

```bash
npm i -D typescript jest ts-jest @types/jest ts-node

npx ts-jest config:init
```

# Structure of Properly Unit Test

AAA principles:

-   arrange
-   act
-   assert

Setup

Teardown

# Intermediate testing topics

-   F.I.R.S.T principles
-   Jest hooks - how to structure tests
-   Test for errors with Jest
-   Jest aliases
-   Debugging - for VSCode
-   Coverage

## F.I.R.S.T principles

1. Fast
2. Independent
3. Repeatable
4. Self-validating
5. Thorough

### Fast:

-   Unit tests should be fast
    -   Faster test = Faster feedback

### Independent/Isolated:

-   Tests should be isolated from:
    -   Other tests
    -   External environment
        -   No shared state with other tests
        -   The order in which tests run should not matter
        -   Contradiction with the F(fast) principle:
            -   Individual tests take more time to setup

### Repeatable:

-   Same result with the same input:
    -   Challenge: Random/Date values - we will often mock these
-   Example: test that writes to a database:
    -   It should ways clean up
-   In contradiction with the Fast principle:
    -   More setup and teardown operations

### Self validating:

-   After the test is finished, it's result should be clear: pass/fail

### Thorough

-   Cover all the cases/path/scenarios (incrementally)
-   Happy cases, bad paths, edge cases
-   Invalid output
-   Large values input
-   High code coverage
