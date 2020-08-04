const { createHmac } = require("crypto");
const axios = require("axios");

// Credentials and Endpoint URL
const clientId = "<client id here>";
const secret = "<client secret here>";
const tokenEndpointUrl =
  "<SAT token endpoint here. See SAT Playground code examples to easily copy this URL>";

function getSignature() {
  const timestamp = Math.trunc(new Date().getTime() / 1000);
  const toSign = timestamp + clientId;
  const signature = createHmac("sha256", secret).update(toSign).digest("hex");
  return { clientId, timestamp, signature };
}

// Retrieves a Secure Anonymous Token (JWT).
async function getToken() {
  const { clientId, timestamp, signature } = getSignature();

  // Include optional params such as first_name, last_name, email_domain, email, or metadata.
  const data = {
    first_name: "Jason",
    last_name: "Thompson",
    email: "jason.123456@acme.com",
    metadata: {
      exampleId: 123456,
      language: "EN",
      timezone: "PT",
    },
  };

  const result = await axios({
    method: "post",
    url: tokenEndpointUrl,
    headers: {
      "X-Frame-ClientId": clientId,
      "X-Frame-Timestamp": timestamp,
      "X-Frame-Signature": signature,
    },
    data: data,
  });

  return result.data;
}

// Retrieves metadata or "assertions" using the generated SAT.
async function getUserAssertions(token) {
  const result = await axios({
    url:
      "https://cpanel-backend-prod.frame.nutanix.com/api/rest/v1/me/assertions",
    headers: { Authorization: `Bearer ${token}` },
  });

  return result.data;
}

// Run the script.
(async () => {
  console.log("Retrieving token");
  try {
    const token = await getToken();
    console.log(`Frame SAT: ${token}`);

    const metadata = await getUserAssertions(token);
    console.log(`Retrieved assertions: ${metadata}`);
  } catch (err) {
    console.error(err);
  }
})();
