export const getMastodonClient = (server: string, token: string) => {
  const baseUrl = server.startsWith("https://") ? server : `https://${server}`;

  const fetchOptions = {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json",
    },
  };

  const search = async (acc: string) => {
    const url = new URL("/api/v1/accounts/search?resolve=true", baseUrl);
    url.searchParams.append("q", acc);

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      console.log("Instance", server, "does not federate with threads");
      return null;
    }

    const parsed = await response.json() as Array<
      { id: string; display_name: string }
    >;

    return parsed[0];
  };

  const follow = (id: string) =>
    fetch(
      new URL(`/api/v1/accounts/${id}/follow`, baseUrl),
      {
        ...fetchOptions,
        method: "POST",
      },
    );

  return { search, follow };
};
