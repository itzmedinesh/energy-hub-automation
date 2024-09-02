import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Define the GraphQL endpoint and query
const GRAPHQL_ENDPOINT = 'https://countries.trevorblades.com/graphql';

const fetchCountryAttributesQuery = `
  query Query($code: ID!) {
    country(code: $code) {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

let response: Cypress.Response<any>;

// Helper function to execute a GraphQL request using cy.request
const executeGraphQLRequest = (code: string) => {
  return cy.request({
    method: 'POST',
    url: GRAPHQL_ENDPOINT,
    body: {
      query: fetchCountryAttributesQuery,
      variables: { code }
    },
    failOnStatusCode: false  // To handle non-200 responses
  });
};

// Step Definitions

Given('the GraphQL API endpoint is available', function () {
  // Check if the endpoint is reachable
  cy.request({ url: GRAPHQL_ENDPOINT, failOnStatusCode: false })
    .its('status')
    .should('be.oneOf', [200, 204, 404, 500]);
});

When('I send a query to fetch attributes for the code {string}', function (code: string) {
  executeGraphQLRequest(code).then((res) => {
          response = res;
          console.log('Full Response Object:',response);
  });
});

When('I send a query without providing a code', function (code: string) {
  executeGraphQLRequest('').then((res) => {
          response = res;
                console.log('Full Response Object:',response);
  });
});

Then('the response status should be {int}', function (statusCode: number) {
  expect(response.status).to.equal(statusCode);
});

Then('the response should contain name {string}', function (expectedName: string) {
  expect(response.body.data.country.name).to.equal(expectedName);
});

Then('the response should contain native name {string}', function (expectedNative: string) {
  expect(response.body.data.country.native).to.equal(expectedNative);
});

Then('the response should contain capital city {string}', function (expectedCapital: string) {
  expect(response.body.data.country.capital).to.equal(expectedCapital);
});

Then('the response should contain emoji {string}', function (expectedEmoji: string) {
  expect(response.body.data.country.emoji).to.equal(expectedEmoji);
});

Then('the response should contain currency {string}', function (expectedCurrency: string) {
  expect(response.body.data.country.currency).to.equal(expectedCurrency);
});

Then('the response should contain languages', function (dataTable) {
  const expectedLanguages = dataTable.hashes();
  const actualLanguages = response.body.data.country.languages;

  expectedLanguages.forEach((expectedLanguage) => {
    const language = actualLanguages.find((lang: any) => lang.code === expectedLanguage.code);
    expect(language).to.not.be.undefined;
    expect(language.name).to.equal(expectedLanguage.name);
  });
});

Then('the response should not indicate an error', function () {
  expect(response.body.errors).to.be.undefined;
});

Then('the country object in response should be null', function (expectedErrorMessage: string) {
  expect(response.body.data.country).to.equal(null);
});

Then('the response should indicate a bad request error', function () {
  expect(response.body.errors).to.not.be.undefined;
});

Then('the error message should be {string}', function (expectedErrorMessage: string) {
  expect(response.body.errors[0].message).to.equal(expectedErrorMessage);
});

Then('the response should match the expected schema', function (dataTable) {
  const expectedSchema = dataTable.hashes();
  const responseSchema = [
    { field: 'name', type: 'String' },
    { field: 'native', type: 'String' },
    { field: 'capital', type: 'String' },
    { field: 'emoji', type: 'String' },
    { field: 'currency', type: 'String' },
    { field: 'languages', type: 'Array' }
  ];

  expectedSchema.forEach((expectedField) => {
    const actualField = responseSchema.find(field => field.field === expectedField.field);
    expect(actualField).to.not.be.undefined;
    expect(actualField.type).to.equal(expectedField.type);
  });
});
