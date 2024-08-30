import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the login page', () => {
    cy.visit('https://practicetestautomation.com/practice-test-login/');
});

When('I enter my username {string} and password {string}', (username: string, password: string) => {
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
});

When('I click the {string} button', (buttonText: string) => {
    cy.contains(buttonText).click();
});

Then('I should see the dashboard page', () => {
    cy.url().should('include', '/logged-in-successfully');
});

Then('I should see an error message indicating {string}', (errorMessage: string) => {
    cy.get('div[id="error"]').should('contain.text', errorMessage);
});

Then('I should remain on the login page', () => {
    cy.url().should('include', '/practice-test-login');
});