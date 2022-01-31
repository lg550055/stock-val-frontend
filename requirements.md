# Software Requirements

## Vision

A user-friendly interface to display a simple but meaningful stock valuation comparison.

Despite a plethora of finance websites, it is very hard to find a site that offers a simple but meaningful way to see in one place how cheap or expensive a stock or group of stocks is.

This app provides quantitative measures used by sophisticated investors that are typically not available to the general public.  These metrics offer a better gauge because they avoid the distortions found in common metrics like p/e ratios.

## Scope (In/Out)
*IN - What will the app do*

- Allow the user to enter a stock to see its valuation metrics
- A number of stocks could be displayed to see abolute and relative valuation comparisons
- Once the database is populated, a user may chose to see the valuation metrics of a few of the most popular market indexes

*OUT - What will your product not do.*

This product will probably remain a web app (as opposed to a mobile app)
While calculation will be based on official sources, the app will not provide its raw data.

## Minimum Viable Product

A one-page React app that allows a user to enter a stock idenfier, the valuation metrics of which would be displayed in a table.

The app will request the data from its sibling backend server, which will in turn fetch it from its database or from an API.

## Stretch Goals

- User authentication using Auth0
- CIK lookup (to allow users to just enter a ticker)
- Allow each user to save a watchlist, to which the user can add or delete tickers; or delete the watchlist

## Functional Requirements

- User can submit a stock identifier
- The app to request relevan data from its backend server
- App to display data in table format
- User to add or delete stock to table (comparison)

## Data Flow

- Application loads with an example of one or two stocks and their valuation metrics
- User enters a stock identifier and submits
- App sends request to backend server
- Backend server checks its database for the info requested, if present returns it to the app; otherwise it makes an API call for the info, process and stores it, and returns it to the app
- App displays response by re-rendering comparison table

## Non-Functional Requirements

- Usability -simple interface with attractive design; responsive and with high-contrast
- Security -user info guarded by Auth0
- Scalability -standardized data stored on cloud platforms
