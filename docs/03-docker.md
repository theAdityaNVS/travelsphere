# Docker & Containerization

## What was built
A production-ready Docker image based on Node.js 20 Alpine, optimized for serverless deployments.

### Key Components:
- **Multi-Stage Build**: Separates dependencies, build artifacts, and the final runner image.
- **Standalone Mode**: Leverages Next.js standalone output to minimize image size.
- **Security Hardening**: Runs the application as a non-root `nextjs` user.

## Why was it built this way
- **Efficiency**: Multi-stage builds ensure that build tools (like `npm`) and source code are not included in the final production image.
- **Alpine Linux**: Chosen for its minimal footprint and reduced attack surface.
- **Standalone Output**: Traditional `next start` requires a full `node_modules` folder; standalone mode extracts only the code actually needed to run the server.
- **Security**: Running as a non-privileged user follows the principle of least privilege.

## How was it done (Step-by-Step)
1.  **Dependency Isolation**: Created a `deps` stage to install packages. Used `libc6-compat` to support shared libraries.
2.  **Optimized Build**: Created a `builder` stage that runs `npm run build`. 
    -   Set `SKIP_ENV_VALIDATION=true` to allow building without secrets.
    -   Set `NEXT_TELEMETRY_DISABLED=1` for privacy.
3.  **Final Assembly**: Created a `runner` stage that:
    -   Copies only the `./public` and `./.next/standalone` folders.
    -   Copies `./.next/static` into the standalone structure.
    -   Sets `NODE_ENV=production`.
4.  **Runtime Config**:
    -   Exposed port 8080.
    -   Set `HOSTNAME` to `0.0.0.0` so it's accessible within the container network.
    -   Defined `CMD ["node", "server.js"]` as the entry point.
