Feature: Delete greeting

    Scenario: Greeting is successfuly deleted
        Given I have previously created a greeting
        When I delete the greeting
        Then The greeting is successfully deleted


    Scenario: Greeting is not successfuly deleted
        When I delete a greeting that does not exists
        Then I receive a 404 error and message