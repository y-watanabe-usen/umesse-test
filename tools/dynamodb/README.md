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

# monthly report
# node report_find.js [table name]
node report_find.js umesse-users > ./output.json

# node report_output.js [json file] [cm | recording | tts]
# summary
node report_output.js ./output.json
# cm data
node report_output.js ./output.json cm > cm_$(date '+%Y%m%d').csv
# recording data
node report_output.js ./output.json recording > recording_$(date '+%Y%m%d').csv
# tts data
node report_output.js ./output.json tts > tts_$(date '+%Y%m%d').csv

# create demo
# node create_demo.js [table name] [unis customer cd] [service cd]
ex. node create_demo.js stg-umesse-users 220125001-220125066 U19
```
