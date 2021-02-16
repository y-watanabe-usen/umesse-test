# dynamodb data put（仮）

```bash
sh csvToDynamodbJson.sh dev-umesse-contents.csv
aws --profile umesse dynamodb batch-write-item --request-items file://./dynamodb-umesse-00.json
```
