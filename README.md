# Bond Card Management JavaScript SDK

Storing and processing card details including primary account number (PAN), CVV, expiration date, and personal identification number (PIN) involves complying with PCI DSS data security requirements. PCI compliance typically requires high overhead, so Bond created an SDK that vaults and tokenizes this card information. Using the below SDK, you can easily allow your customers to retrieve their card details, set PINs, and reset PINS without entering PCI scope, or worrying about seeing and storing your customers' sensitive card details.

-This overview outlines Requirements, Installation, and Usage.
-The Docs folder provides Bond Cards SDK Documentation you can run.
-Then check out the sample files to see sample implementation you can build and run.

## Requirements

To use this SDK you can just import it using the steps under 'Installation'. But if you'd like to build the repo yourself, with or without sample files, you'll need:

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

1. Make an authorized call from your backend with the correct customer_id to
   receive temporary tokens of {Identity, Authorization}.

cURL

```
curl --request POST \
  --url https://api.bond.tech/api/v0/auth/key/temporary \
  --header 'Content-Type: application/json' \
  --header 'Identity: [IDENTITY]' \
  --header 'Authorization: [AUTHORIZATION]' \
  --data '{"customer_id":[ID]}'
```

Python

```python
import requests

url = "https://api.bond.tech/api/v0/auth/key/temporary"

headers = { "Content-type": "application/json", "Identity": [IDENTITY], "Authorization": [AUTHORIZATION] }

payload = { customer_id: [ID] }

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
```

Ruby

```ruby
uri = URI.parse("https://api.bond.tech/api/v0/auth/key/temporary")
params = {'customer_id' => [ID]}
headers = {
    'Content-Type'=>'application/json',
    'Identity'=>[IDENTITY],
    'Authorization'=>[AUTHORIZATION]
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
    Identity: [IDENTITY],
    Authorization: [AUTHORIZATION],
  },
  body: { customer_id: [ID] },
};

fetch(url, options)
  .then((res) => res.json())
  .then((json) => console.log(json))
  .catch((err) => console.error("error:" + err));
```

```js
// Client-side example for quick testing.
// You would call this from your backend in production
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

Java

```
OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("https://api.bond.tech/api/v0/auth/key/temporary")
  .addHeader("Content-Type", "application/json")
  .addHeader("Identity", [IDENTITY])
  .addHeader("Authorization", [AUTHORIZATION])
  .post(RequestBody
                .create(MediaType
                    .parse("application/json"),
                        "{\"customer_id\": \"" + ID + "\"}"
                ))
  .build();

Response response = client.newCall(request).execute();
```

C#

```
var client = new RestClient("https://api.bond.tech/api/v0/auth/key/temporary");
var request = new RestRequest(Method.POST);
request.AddHeader("Content-Type", "application/json");
request.AddHeader("Identity", [IDENTITY]);
request.AddHeader("Authorization", [AUTHORIZATION]);
request.AddParameter("application/json", {"customer_id": [ID]}, ParameterType.RequestBody);
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
