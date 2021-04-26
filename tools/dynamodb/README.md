# dynamodb data put

https://drive.google.com/drive/u/1/folders/1qkjYI80C-0_WQFxZkWIy4Aq2GcYhdn5N

```bash
npm install

# csv data contents check 
# node check_contents.js [data dir] [csv file]
node check_contents.js ./umesse-contents umesse-contents.csv

# csv data japanese check 
# node check_kanji.js [data dir] [csv file]
node check_kanji.js umesse-contents.csv

# s3 put
aws --profile umesse s3 sync --exact-timestamps --delete ./umesse-contents/ s3://dev-umesse-contents/

# dynamodb put
# node put.js [table name] [csv file]
node put.js dev-umesse-contents umesse-contents.csv
```
