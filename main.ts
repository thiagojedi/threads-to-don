import { parse } from "https://deno.land/std@0.207.0/yaml/mod.ts";

type Config = {
  mastodon: {
    server: string;
    apiToken: string;
  };
  threads: {
    accounts: string[];
  };
};

const filename = "./config.yml";

const input = await Deno.readTextFile(filename);

const config = parse(input) as Config;

for (const account of config.threads.accounts) {
  console.groupEnd();

  const acc = account + "@threads.net";

  console.group(acc);

  const response = await fetch(
    "https://threads.net/.well-known/webfinger?resource=acct:" + acc,
    {
      headers: {
        Accept: "application/activity+json",
      },
    },
  );

  if (!response.ok) {
    console.log(`Federation: OFF (${response.status})`);
    continue;
  }

  console.log("Federation: OK");

  const { server, apiToken } = config.mastodon;

  const fetchOptions = {
    headers: {
      "Authorization": `Bearer ${apiToken}`,
      "Accept": "application/json",
    },
  };

  console.log("Searching on " + server);

  const searchResponse = await fetch(
    `https://${server}/api/v1/accounts/search?q=${acc}&resolve=true`,
    fetchOptions,
  );

  if (!searchResponse.ok) {
    console.log("Not Found");
    continue;
  }

  const parsedResponse = await searchResponse.json() as Array<
    { id: string; display_name: string }
  >;

  const accountToFollow = parsedResponse[0];

  console.log(
    "Found",
    accountToFollow.display_name,
    "with local id",
    accountToFollow.id,
  );

  const followResponse = await fetch(
    `https://${server}/api/v1/accounts/${accountToFollow.id}/follow`,
    {
      ...fetchOptions,
      method: "POST",
    },
  );

  if (followResponse.ok) {
    console.log("Following Account: OK");
  } else {
    console.log("Error following account (" + followResponse.status + ")");
  }
}

console.groupEnd();
