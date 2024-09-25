import { parse } from "https://deno.land/std@0.207.0/yaml/mod.ts";
import { checkAccounts } from "./threads.ts";
import { getMastodonClient } from "./mastodon.ts";

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

const federated = await checkAccounts(config.threads.accounts);

const { server, apiToken } = config.mastodon;

const { search, follow } = getMastodonClient(server, apiToken);

let success = 0;

for (const acc of federated) {
  const accountToFollow = await search(acc);

  if (!accountToFollow) {
    console.log("Instance", server, "does not federate with Threads.net");
    break;
  }

  console.group(acc);

  console.log("Federation: OK");

  console.log(
    "Found",
    accountToFollow.display_name,
    "with local id",
    accountToFollow.id,
  );

  const followResponse = await follow(accountToFollow.id);
  if (followResponse.ok) {
    console.log("Following Account: OK");
    success += 1;
  } else {
    console.log("Error following account (" + followResponse.status + ")");
  }
  console.groupEnd();
}

console.log(
  `Result: following ${success} of ${config.threads.accounts.length}`,
);
