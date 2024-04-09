export const checkAccounts = async (accounts: Array<string>) => {
  const federatedAccounts = [];

  for (const account of accounts) {
    const acc = account + "@threads.net";

    const response = await fetch(
      "https://threads.net/.well-known/webfinger?resource=acct:" + acc,
      {
        headers: {
          Accept: "application/activity+json",
        },
      },
    );

    if (response.ok) {
      federatedAccounts.push(acc);
    } else {
      console.warn(`${account} is not federating`);
    }
  }

  return federatedAccounts;
};
