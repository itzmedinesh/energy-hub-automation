# Cypress Test Automation with Cucumber BDD

Welcome to the Cypress Test Automation project using Cucumber BDD! This repository contains an automated testing framework designed to enhance your testing strategy with behavior-driven development (BDD) using Cypress and Cucumber.

## Project Overview

This project leverages Cypress for end-to-end testing and Cucumber for BDD, allowing you to write tests in a natural language format. The combination of these tools helps bridge the gap between technical and non-technical team members by promoting clear and readable test cases.

## Features

- **Cypress**: Fast, reliable, and feature-rich end-to-end testing framework.
- **Cucumber**: Write tests in Gherkin syntax for clear and understandable test scenarios.
- **BDD**: Focus on behavior and expected outcomes rather than implementation details.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Cypress](https://www.cypress.io/)
- [Cucumber](https://cucumber.io/)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/itzmedinesh/energy-hub-automation.git
    cd your-repo
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

### Writing Tests

1. **Feature Files**: Write your test scenarios in Gherkin syntax and save them in the `cypress/e2e/<web/api/mobile>/<module_name>` directory.

2. **Step Definitions**: Implement the step definitions in the `cypress/e2e//<web/api/mobile>/<module_name>` directory.

### Running Tests

To run the tests, use the following command:
```bash
npx cypress open
```
To run the tests in headless mode

```bash
npx cypress run
```