# dynamodb data put

https://drive.google.com/drive/u/1/folders/1qkjYI80C-0_WQFxZkWIy4Aq2GcYhdn5N

```bash
npm install

# csv data dir check 
# node check.js [data dir] [csv file]
node check.js ./umesse-contents umesse-contents.csv

# s3 put
aws --profile umesse s3 sync --exact-timestamps --delete ./umesse-contents/ s3://dev-umesse-contents/

# dynamodb put
# node put.js [table name] [csv file]
node put.js dev-umesse-contents umesse-contents.csv
```
