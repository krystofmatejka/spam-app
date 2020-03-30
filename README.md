# spam.app

![demo.gif](demo.gif)

## Run locally

```bash
npm run start:watch:api
npm run start:watch:web
```

## Deploy to heroku

```bash
heroku container:push web --context-path="../../" && heroku container:release web &&  heroku logs --tail
```
