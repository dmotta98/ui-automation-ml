#### Project README

# Mercado Libre Automation Project

This project is an automation project developed as part of the technical evaluation process for a new company. The goal of the project is to navigate to the Mercado Libre website, perform a search for "camisetas" (t-shirts), and collect the names and prices of the products from the first three pages.

## Technologies Used

- WebDriverIO: A JavaScript-based WebDriver implementation that provides a simple and concise API for interacting with web browsers.
- Jasmine: A feature-rich JavaScript testing framework that enables writing and executing test cases.
- Google Chrome: The web browser used for running the automation tests.

## Setup Instructions

Follow these instructions to set up and run the project:

1. Clone the project repository:

```bash
git clone <repository_url>
```

2. Navigate to the project directory:

```bash
cd mercado-libre-automation
```

3. Install project dependencies:

```bash
npm install
```

## Running the Tests

To execute the automation tests, use the following command:

```bash
npm run wdio
```

This command will trigger the WebDriverIO test runner and launch Google Chrome to perform the automated navigation and data collection tasks.

## Test Results

Upon completion of the test execution, the results will be displayed in the console. The names and prices of the products from the first three pages will be logged.

## Project Structure

The project follows a standard test automation structure, as outlined below:

```
├── test
│   ├── pageobjects
│   │    ├── home.page.js
│   │    └── page.js
│   ├── specs
│   │    └── shirtDataCollection.js
│   └── utils
│        └── utils.js
│      
│   
└── wdio.conf.js
```

- The `pageobjects` directory contains page object files that define the elements and actions on each page.
- The `specs` directory contains the test specification files that use the page objects to perform the required actions and assertions.
- The `wdio.conf.js` file contains the configuration for WebDriverIO, including browser settings and test execution options.