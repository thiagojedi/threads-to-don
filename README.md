# Threads-to-don (beta)

Simple script to add followers from threads to your Mastodon account.

## How to run:

1. Clone this repo
1. Create a new application on your server
   1. Access `https://[your.instance]/settings/applications`
   2. Create a new application with at least `read:accounts` and `write:follows`
   3. Get the `access code`
1. Fill `config.yml` with correct data
1. Run the following command:

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

## Limitations

As of the time of writing, Threads API is not yet public. So you'll need to pass
a list of accounts you want to "monitor".

## Motivation

This project was motivated by a toot from
[Cassidy James](https://mastodon.com.br/@cassidy@blaede.family/112192146238323309)
asking for a migration tool for Threads to Mastodon.
