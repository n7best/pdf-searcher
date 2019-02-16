## Quick Start

### Using Docker
```
docker-compose up
```

### Manually
- Setup an mongodb server
- Fill environment requirement using environment or in `packages/server/.env.example` and make it `.env`
- `npm install ` on root directory
- `npx lerna boostrap` on root directory
- `npm run build` on `packages/server` directory
- `npm run build` on `packages/client` directory
- `npm run start` on root directory

## Folder Structure 

`/packages/client` for frontend react sever
`/packages/server` for backend nodejs server

## Stacks

- `Docker/pm2` for runtime and container
- `React (16.8 w/ hooks)/Redux` for frontend
- `Express/Mongoose` for backend
- `lerna` for monorepo management

## Development

- backend, cd into `packages/server` and run `npm run dev`
- frontend, cd into `packages/client` and run `npm run dev`
