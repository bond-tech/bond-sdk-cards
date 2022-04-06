# Bond Card Management JavaScript SDK

**Note: this repository will be deprecated soon in favor of a combined SDK for Cards and External Account linking.**

Storing and processing card details including primary account number (PAN), CVV, expiration date, and personal identification number (PIN) involves complying with PCI DSS data security requirements. PCI compliance typically requires high overhead, so Bond created an SDK that vaults and tokenizes this card information. Using the below SDK, you can easily allow your customers to retrieve their card details, set PINs, and reset PINS without entering PCI scope, or worrying about seeing and storing your customers' sensitive card details.

-This overview outlines Requirements, Installation, and Usage.
-The Docs folder provides Bond Cards SDK Documentation you can run.
-Then check out the sample files to see sample implementation you can build and run.

## Requirements

When working with [Bond](https://bond.tech), you'll create API Keys to enable access to the platform. Then you're ready to build.

To use this SDK you can just import it using the steps under 'Installation'. But if you'd like to build the repo yourself, with or without sample files, you'll need:

- [Node.js **v6.3.0 or above**](https://nodejs.org/)

Node installation will include [NPM](https://www.npmjs.com/), which is
responsible for dependency management.

## Installation

### NPM

To install the module in your repo use your terminal to type:
`npm install bond-sdk-cards`

Then import it in your Javascript code:
`import BondCards from 'bond-sdk-cards';`

### CDN

Or you can install the SDK from a CDN.

#### Using JS

`import BondCards from 'cdn.bond.tech/sdk/cards/v1/bond-sdk-cards.js';`

#### Using HTML

<script type="text/javascript" src="cdn.bond.tech/sdk/cards/v1/bond-sdk-cards.js"></script>

## Usage

This SDK relies heavily on [Promises](https://developers.google.com/web/fundamentals/getting-started/primers/promises), making it easier to handle the asynchronous
requests made to the API. The SDK provides a `BondCards` object containing
several methods which map to the calls and parameters described in [BondCards's API documentation](https://docs.bond.tech/docs/retrieve-card-details-set-pins-and-reset-pins).

The following snippet is a generic example of how brands can use the SDK. If you need
details for a specific module, refer to the [sample files](https://github.com/bond-tech/bond-sdk-cards).

Before executing any request, you need to authorize the calls to the Bond API:

#### Using temporary tokens

1. Make an authorized call from your backend with the correct customer_id to
   receive temporary tokens of {Identity, Authorization}.

cURL

```
curl --request POST \
  --url https://api.bond.tech/api/v0/auth/key/temporary \
  --header 'Content-Type: application/json' \
  --header 'Identity: YOUR_IDENTITY' \
  --header 'Authorization: YOUR_AUTHORIZATION' \
  --data '{"customer_id": "YOUR_CUSTOMER_ID"}'
```

Python

```python
import requests

url = "https://api.bond.tech/api/v0/auth/key/temporary"

headers = { "Content-type": "application/json", "Identity": "YOUR_IDENTITY", "Authorization": "YOUR_AUTHORIZATION" }

payload = { 'customer_id': 'YOUR_CUSTOMER_ID' }

response = requests.post(url, headers=headers, json=payload)

print(response.text)
```

Ruby

```ruby
uri = URI.parse("https://api.bond.tech/api/v0/auth/key/temporary")
params = {'customer_id' => 'YOUR_CUSTOMER_ID'}
headers = {
    'Content-Type'=>'application/json',
    'Identity'=>'YOUR_IDENTITY',
    'Authorization'=>'YOUR_AUTHORIZATION'
}

http = Net::HTTP.new(uri.host, uri.port)
response = http.post(uri.path, params.to_json, headers)
output = response.body
puts output
```

Node

```js
const fetch = require("node-fetch");

let url = "https://api.bond.tech/api/v0/auth/key/temporary";
let options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Identity: "YOUR_IDENTITY",
    Authorization: "YOUR_AUTHORIZATION",
  },
  body: { customer_id: "YOUR_CUSTOMER_ID" },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error("error:" + err));
```

Javascript

```js
// Client-side example for quick testing.
// You would call this from your backend in production

fetch("https://api.bond.tech/api/v0/auth/key/temporary", {
  method: "POST",
  headers: {
    "Content-type": "application/json",
    Identity: "YOUR_IDENTITY",
    Authorization: "YOUR_AUTHORIZATION",
  },
  body: {
    customer_id: "YOUR_CUSTOMER_ID",
  },
});
```

Java

```
OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://api.bond.tech/api/v0/auth/key/temporary")
  .addHeader("Content-Type", "application/json")
  .addHeader("Identity", "YOUR_IDENTITY")
  .addHeader("Authorization", "YOUR_AUTHORIZATION")
  .post(RequestBody
                .create(MediaType
                    .parse("application/json"),
                        "{\"customer_id\": \"" + YOUR_CUSTOMER_ID + "\"}"
                ))
  .build();

Response response = client.newCall(request).execute();
```

C#

```
var client = new RestClient("https://api.bond.tech/api/v0/auth/key/temporary");
var request = new RestRequest(Method.POST);
request.AddHeader("Content-Type", "application/json");
request.AddHeader("Identity", "YOUR_IDENTITY");
request.AddHeader("Authorization", "YOUR_AUTHORIZATION");
request.AddParameter("application/json", {"customer_id": "YOUR_CUSTOMER_ID"}, ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
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
    format: {
        replaceThis: "(\\d{4})(\\d{4})(\\d{4})(\\d{4})",
        withThis: "$1-$2-$3-$4",
      },
  })
  .then((data) => {
    // Handle data
  })
  .catch((error) => {
    // Handle an error
  });
```

4. You can easily control loading with the various methods from the SDK. You should
   use`.then()`/`.catch()` to handle the successful and failed requests,
   respectively.

```js
// Handle show loader
bondCards
    .showMultiple(configuration)
    .then((data) => {
        // Handle hide loader
    })
    .catch((error) => {
        // Handle hide loader
    });
```

## Available methods

See [API Documentation](https://github.com/bond-tech/bond-sdk-cards/docs/gen/BondCards.html)

### Working with the Repo

The following script aliases are available:

- `npm run doc`: Run JSDoc to create a 'docs' folder with automatically
  generated documentation for the source code.
- `npm run build`: Create a production build minified and transpiled js bundle
  without any sample code.
- `npm run start`: Lint SDK and Sample files, then Deploy a web server from the
  root folder at `localhost:8080` to run the html samples.

### Developing the BondCards SDK

To handle all implementation use cases, Engineers should always build this
project (`npm run build`) before committing.

Include the /dist folder in your commit for customers that link to the built
bond-sdk-cards.js file directly.
