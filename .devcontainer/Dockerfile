FROM denoland/deno:bin AS deno
FROM mcr.microsoft.com/devcontainers/base:jammy
COPY --from=deno /deno /usr/local/bin/deno