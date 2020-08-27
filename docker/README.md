# start command

```bash
docker-compose up -d
cd lambda
sam build
sam local start-api --docker-network docker_default
http://localhost:3000/
```

## lambda

[AWS SAM CLI]((https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html))

### build

```bash
sam build

# To build inside a AWS Lambda like Docker container
sam build --use-container
```

### invoke

```bash
sam local invoke --docker-network docker_default

# Invoking a Lambda function without an input event
sam local invoke "UMesseFunction" --docker-network docker_default

# Invoking a Lambda function using an event file
sam local invoke "UMesseFunction" --docker-network docker_default -e event.json

# Invoking a Lambda function using input from stdin
echo '{"handler": "get" }' | sam local invoke "UMesseFunction" --docker-network docker_default --event -

```

### api

```bash
sam local start-api --docker-network docker_default
```

- url: `http://localhost:3000/`

### validate

```bash
sam validate
```

### deploy

```bash
sam deploy -g
```

## s3

- endpoint: `http://localhost:9000`
- url: `http://localhost:9080`

## dynamodb

- endpoint: `http://localhost:8000`
- url: `http://localhost:8000/shell`

## swagger

- url: `http://localhost:8080`
