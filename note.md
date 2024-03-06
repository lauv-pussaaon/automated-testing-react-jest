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

# Jest Alias and Watch Mode

## Test Properties

-   only
-   skip
-   concurrent
-   todo : can be used to make skeleton of building application

## Test Alias

-   it
-   test
-   xit (it.skip)
-   fit (it.only)

## Watch Mode

```json
	"test": "jest --watch"
```

# Debugging Mode

-   copy launch config (https://github.com/microsoft/vscode-recipes/tree/main/debugging-jest-tests)[]
-   create launch.json in vscode inside run and debug tab
-   put breakpoint and click run from debug tab

# Gathering Coverage

-   inside Config.InitialOptions in jest.config.ts add the following

```ts
	collectCoverage: true,
	collectCoverageFrom: [
		"<rootDir>/src/app/**/*.ts"
	]
```

-   then run npm via npm script as ususal. the coverage result will be generated inside coverage folder.
-   for more configuration document : (https://github.com/jestjs/jest/blob/main/docs/Configuration.md)[]

### Ingoring some parts of test

```js
/* istanbul ignore next */
function x() {}
```

# Test doubles in jest (Mock Test)

-   What they are and why we need them
-   How we can use different types of test doubles in Jest and TypeScript
    -   Stubs
    -   Fakes
    -   Mocks
    -   Spies
    -   Mock Modules

## What are test doubles?

-   Pretend objects used in place of a real object for testing purposes

    -   Dummy objects: passed around but not used
    -   Fakes: simplified working implementation, it takes a shortcut
    -   Stubs: incomplete objects used as arguments
    -   Spies: tracks information about how a unit is called
    -   Mocks: preprogrammed with expectations

-   Mocks: most used, most debated

    -   The way we use them greatly influences the way we write tests
    -   If we need to use them too much, there is something wrong with our code

-   Spies vs. Mocks

    -   spies are not directly injected into SUT
    -   original functionality is preserved with spies
    -   spies usually track method calls
    -   usually use with classes or modules rather than function alone
