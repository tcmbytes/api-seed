Feature: List greeting

    Scenario: List previous created greetings
        Given I have a bunch of greetings created
        When I request to list all greetings
        Then The greetings are successfully listed

    Scenario: Get empty list
        Given I have no greetings created
        When I request to list all greetings
        Then I receive an empty list