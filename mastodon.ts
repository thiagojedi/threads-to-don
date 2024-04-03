export const getMastodonClient = (server: string, token: string) => {
  const fetchOptions = {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json",
    },
  };

  const search = async (acc: string) => {
    const response = await fetch(
      `https://${server}/api/v1/accounts/search?q=${acc}&resolve=true`,
      fetchOptions,
    );
    
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
      `https://${server}/api/v1/accounts/${id}/follow`,
      {
        ...fetchOptions,
        method: "POST",
      },
    );

  return { search, follow };
};
