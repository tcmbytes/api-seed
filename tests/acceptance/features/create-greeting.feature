Feature: Create greeting

    I can create a new greeting

    Scenario: Greeting is successfuly created
        Given I request to create a new greering
        Then a new greeting is created in the database
        And returned back to me
