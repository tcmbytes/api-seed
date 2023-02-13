Feature: Update greeting

    Scenario: Greeting exists
        Given I have previously created a greeting
        When I update the greeting
        Then I receive the updated greeting

    Scenario: Greeting does not exists
        When I try to update a greeting that does not exist
        Then I receive a 404 error and message