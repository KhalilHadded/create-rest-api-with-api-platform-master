Feature: Hello world
  I need to be able to see hello world

  Scenario: I can see hello world
    When I go to "/"
    Then I should see "Hello World!"

  Scenario: I can't see hello world
    When I go to "/random"
    Then I should not see "Hello World!"