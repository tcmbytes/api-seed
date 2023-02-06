Feature: Create greeting

    I can create a new greeting

    Scenario: Greeting is successfuly created
        When I request to create a new greering
        Then The greeting is successfully created
