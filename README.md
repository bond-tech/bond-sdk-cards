# Bond Card Management JavaScript SDK

This SDK aims to help the development of a brand's JavaScript integrations with
[Bond](https://www.bond.tech/), providing an easy interface to transmit and
manage PCI-sensitive data through a secure vault without housing it in Bond.

## Requirements

To use this SDK, you will need:

- [Node.js **v6.3.0 or above**](https://nodejs.org/)

Node installation will include [NPM](https://www.npmjs.com/), which is
responsible for dependency management.

## Installation

### JS

`import BondCards from 'https://www.bond.tech/sdk/1.0/bond-sdk-cards.js';`

<script type="text/javascript" src="https://www.bond.tech/sdk/1.0/bond-sdk-cards.js"></script>

## Usage

This SDK relies heavily on [Promises](https://developers.google.com/web/fundamentals/getting-started/primers/promises), making it easier to handle the asynchronous
requests made to the API. The SDK provides a `BondCards` object containing
several methods which map to the calls and parameters described in [BondCards's API documentation](https://docs.bond.tech/docs/retrieve-card-details-set-pins-and-reset-pins).

The following snippet is a generic example of how brands can use the SDK. If you need
details for a specific module, refer to the [sample files](https://github.com/bond-tech/bond-sdk-cards).

Before executing any request, you need to authorize the calls to the Bond API:

#### Using temporary tokens

1. Make an authorized call with the correct customer_id to receive temporary
   tokens of {Identity, Authorization}.

```js
fetch("https://api.bond.tech/api/v0/auth/key/temporary", {
  method: "POST",
  headers: {
    "Content-type": "application/json",
    Identity: identity,
    Authorization: authorization,
  },
  body: {
    customer_id: [ID],
  },
});
```

#### Initialize BondCards

2. Call the constructor ( 'live: false' to access the Sandbox environment )

```js
const bondCards = new BondCards({ live: true });
```

#### Making requests

3. You can now use the various methods from the SDK to reveal/manage PCI-sensitive
   data for a particular Bond Card ID. Following the Promises notation, you should
   use`.then()`/`.catch()` to handle the successful and failed requests,
   respectively.

Most of the calls take an object as the only parameter but please refer to the
API documentation to tune the query as intended.

```js
bondCards
  .show({
    cardId: [BOND CARD ID],
    identity: [TEMP IDENTITY TOKEN],
    authorization: [TEMP AUTH TOKEN],
    field: "number",
    htmlSelector: "#num",
  })
  .then((data) => {
    // Handle data
  })
  .catch((error) => {
    // Handle an error
  });
```

## Available methods

See [API Documentation](https://github.com/bond-tech/bond-sdk-cards/docs/gen/BondCards.html)

### Working with the Repo

The following script aliases are available:

- `npm run test`: Run Unit Tests
- `npm run doc`: Run JSDoc to create a 'docs' folder with automatically
  generated documentation for the source code.
- `npm run build`: Create a production build minified and transpiled js bundle
  without any sample code.
- `npm run start`: Lint SDK and Sample files, then Deploy a web server from the
  root folder at `localhost:8080` to run the html samples.
