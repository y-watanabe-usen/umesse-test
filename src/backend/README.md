# start command

```bash
docker-compose up -d
docker run -it --rm -v $PWD/deploy:/deploy -w /deploy hashicorp/terraform:light init
docker run -it --rm -v $PWD/deploy:/deploy -v $PWD/lambda:/lambda -w /deploy hashicorp/terraform:light plan -var 'access_key=dummy' -var 'secret_key=dummy'
docker run -it --rm -v $PWD/deploy:/deploy -v $PWD/lambda:/lambda -w /deploy hashicorp/terraform:light apply -var 'access_key=dummy' -var 'secret_key=dummy'
```

```bash
docker-compose up -d
cd lambda
sam build
sam local start-api --docker-network docker_default
# TODO
# https://github.com/aws/aws-sam-cli/issues/1921
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

## storage

- endpoint: `http://localhost:9000`
- url: `http://localhost:9080`

## dynamodb

- endpoint: `http://localhost:8000`
- url: `http://localhost:8000/shell`

### create table

```bash
// This CreateTable request will create the UMesseUsers table.
var params = {
    TableName: 'UMesseUsers',
    KeySchema: [
        {
            AttributeName: 'Id',
            KeyType: 'HASH'
        }
    ],
    AttributeDefinitions: [
        {
            AttributeName: 'Id',
            AttributeType: 'S'
        }
    ],
    ProvisionedThroughput:  {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
};
console.log("Creating the UMesseUsers table");
dynamodb.createTable(params, function(err, data) {
        if (err) ppJson(err); // an error occurred
        else ppJson(data); // successful response
    });
```

### put item

```bash
// The PutItem API inserts a new item into DynamoDB.
// If an item already exists with the same primary key value,
// the item is replaced with the new item.
// The API has several other useful parameters not shown here, including:
//  * Expected: DynamoDB will perform the write only if certain attributes
//    match the values you expect them to have
//  * ReturnValues: DynamoDB can return the value you are replacing
var params = {
    TableName: 'UMesseUsers',
    Item: {
        Id: 'USER000001',
        Info: {
            Name: 'テスト店舗000001',
            OpenTime: '1000',
            CloseTime: '2200',
            GroupId: 'GROUP000001',
            Status: true,
            Date: new Date().toISOString(),
        },
        Auth: {
            Token: 'TOKEN0000001',
            Expiration: '2020-10-01T00:00:00+09:00',
        },
        Contents: [
            {
                CmId: 'CM000001.aac',
                StartChime: {
                    Id: 'チャイム/se_maoudamashii_chime01.mp3',
                    Volume: 0.5,
                },
                EndChime: {
                    Id: 'チャイム/se_maoudamashii_chime02.mp3',
                    Volume: 0.5,
                },
                Bgm: {
                    Id: 'BGM/11_NSF227-011.mp3',
                    Volume: 0.5,
                },
                Narrations: [
                    {
                        Id: 'ナレーション/NA_001.mp3',
                        Volume: 3.0,
                    },
                    {
                        Id: 'ナレーション/NA_002.mp3',
                        Volume: 3.0,
                    },
                    {
                        Id: 'ナレーション/NA_003.mp3',
                        Volume: 3.0,
                    },
                ],
                Share: false,
                Center: false,
                Date: new Date().toISOString(),
            },
            {
                CmId: 'CM000002.aac',
                Narrations: [
                    {
                        Id: 'ナレーション/NA_001.mp3',
                        Volume: 3.0,
                    },
                ],
                Share: false,
                Center: false,
                Date: new Date().toISOString(),
            },
        ],
    }
};
console.log("Calling PutItem");
ppJson(params);
docClient.put(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else console.log("PutItem returned successfully");
});
```

## swagger

- url: `http://localhost:8080`

## webapp

[Nust.js](https://ja.nuxtjs.org/)

- url: `http://localhost:3001/`
