Feature: Show greeting

    Scenario: Greeting is successfuly retrieved
        Given I have previously created a greeting
        When I request the greeting details
        Then The greeting is successfully retrieved


    Scenario: Greeting is not successfuly retrieved
        When I request a greeting that does not exists
        Then I receive a 404 error and message