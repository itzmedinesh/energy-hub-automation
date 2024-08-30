# cypress/e2e/login.feature
Feature: User Login

Background:
Given I am on the login page

Scenario Outline: Successful login redirects to the dashboard
When I enter my username "<username>" and password "<password>"
And I click the "Submit" button
Then I should see the dashboard page

Examples:
| username | password |
| student | Password123 |

Scenario Outline: Login fails with invalid credentials
When I enter my username "<username>" and password "<password>"
And I click the "Submit" button
Then I should see an error message indicating "<errorMessage>"
And I should remain on the login page

Examples:
| username | password | errorMessage |
| incorrectUser | Password123 | Your username is invalid! |
| incorrectUser | Password123 | Your username is invalid! |

Scenario Outline: Login fails with missing fields
When I enter my username "<username>" and password "<password>"
And I click the "Submit" button
Then I should see an error message indicating "<errorMessage>"
And I should remain on the login page

Examples:
| username | password | errorMessage |
| a | validPass123! | Your username is invalid! |
| student | | Your password is invalid! |