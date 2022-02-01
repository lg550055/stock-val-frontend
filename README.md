# Simple Stock Valuation

**Author**: Polo Gonzalez

**Version**: 1.0.0

## Overview
Responsive single-page app that provides a simple but meaningful valuation comparison for a group of stocks.

## Getting Started
Dependencies on package.json (may use npm install / build)

## Architecture
Responsive React app with react-bootstrap ablte to make axios calls to its sibling backend server to retrieve updated financial information.

- [Domain model](./domainModel.jpg)
- [Wireframe](./wireframe.jpg)

### Database schema

**User profile**
- email: String,
- watchlist: [String]

**Stock**
- 2021: { rev: Number, ebitda: Number, capex: Number, cash: Number, debt: Number},
- 2020: { rev: Number, ebitda: Number, capex: Number, cash: Number, debt: Number},
- 2019: { rev: Number, ebitda: Number, capex: Number, cash: Number, debt: Number}

## Change Log
1.31.2022 - Initial commit: set up, wireframe, domain model, schema, initial README and requirements

## Credit and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
