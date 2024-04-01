# Threads-to-don (beta)

How to run:

1. Clone this repo
1. Create a new application on your server
    1. Access `https://[your.instance]/settings/applications`
    2. Create a new application with at least `read:accounts` and `write:follows`
    3. Get the `access code`
2. Fill `config.yml` with correct data
2. Run the following command:

```shell
deno run --allow-read=config.yml --allow-net=threads.net,[your.instance] main.ts
```

Example Output:

```
evanprodromou@threads.net
    Federation: OK
    Searching on bolha.us
    Found Evan Prodromou with local id 112056484382697052
    Following Account: OK
feliciaday@threads.net
    Federation: OFF (404)
```
