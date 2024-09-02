Feature: Fetch country attributes by code

  Scenario Outline: Successfully retrieve country attributes for a valid code
    Given the GraphQL API endpoint is available
    When I send a query to fetch attributes for the code "<code>"
    Then the response status should be 200
    And the response should contain name "<name>"
    And the response should contain native name "<native>"
    And the response should contain capital city "<capital>"
    And the response should contain emoji "<emoji>"
    And the response should contain currency "<currency>"
    And the response should contain languages
      | code | name           |
      | <languageCode1> | <languageName1> |

    Examples:
      | code | name          | native      | capital       | emoji | currency | languageCode1 | languageName1 |
      | US   | United States | United States     | Washington D.C. | 🇺🇸   | USD,USN,USS      | en            | English        |
      | FR   | France        | France    | Paris         | 🇫🇷   | EUR      | fr            | French         |
      | JP   | Japan         | 日本        | Tokyo         | 🇯🇵   | JPY      | ja            | Japanese       |

  Scenario Outline: Handle an invalid code
    Given the GraphQL API endpoint is available
    When I send a query to fetch attributes for the code "<code>"
    Then the response status should be 200
    And the response should not indicate an error
    And the country object in response should be null

    Examples:
      | code |
      | XYZ  |
      | ABC  |

  Scenario Outline: Handle a missing code
    Given the GraphQL API endpoint is available
    When I send a query without providing a code
    Then the response status should be 200
    And the response should not indicate an error
    And the country object in response should be null

    Examples:
      | code |
      |      |

  Scenario: Validate response schema
    Given the GraphQL API endpoint is available
    When I send a query to fetch attributes for the code "FR"
    Then the response status should be 200
    And the response should match the expected schema
      | field      | type      |
      | name       | String    |
      | native     | String    |
      | capital    | String    |
      | emoji      | String    |
      | currency   | String    |
      | languages  | Array     |
