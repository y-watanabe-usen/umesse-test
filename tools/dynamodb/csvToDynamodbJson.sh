#!/usr/bin/env bash
set -u
HERE=$(cd $(dirname $0);pwd)
DIST="dynamodb-umesse-"

convert() {
  cat << EOS
{
  "dev-umesse-contents": [
EOS

  while read row; do
    contentsId=`echo $row | cut -d , -f 1 | sed 's/"//g'`
    category=`echo $row | cut -d , -f 2 | sed 's/"//g'`
    title=`echo $row | cut -d , -f 3 | sed 's/"//g'`
    description=`echo $row | cut -d , -f 4 | sed 's/"//g'`
    manuscript=`echo $row | cut -d , -f 5 | sed 's/"//g'`
    seconds=`echo $row | cut -d , -f 6 | sed 's/"//g'`
    industryCd=`echo $row | cut -d , -f 7 | sed 's/"//g'`
    industryName=`echo $row | cut -d , -f 8 | sed 's/"//g'`
    sceneCd=`echo $row | cut -d , -f 9 | sed 's/"//g'`
    sceneName=`echo $row | cut -d , -f 10 | sed 's/"//g'`

    cat << EOS
    {
      "PutRequest": {
        "Item": {
          "contentsId": { "S": "$contentsId" },
          "category": { "S": "$category" },
          "title": { "S": "$title" },
          "description": { "S": "$description" },
          "manuscript": { "S": "$manuscript" },
          "seconds": { "N": "10" },
          "industry": {
            "L": [
              {
                "M": {
                  "industryCd": { "S": "$industryCd" },
                  "industryName": { "S": "$industryName" }
                }
              }
            ]
          },
          "scene": {
            "L": [
              {
                "M": {
                  "sceneCd": { "S": "$sceneCd" },
                  "sceneName": { "S": "$sceneName" }
                }
              }
            ]
          },
          "timestamp": { "S": "2021-02-01T00:00:00+9:00" }
        }
      }
    },
EOS
  done < $1

  cat << EOS
  ]
}
EOS
}

if [ $# = 0 ]; then
  echo "argument error."
  exit 1
fi

if [ ! -e $HERE/$1 ]; then
  echo "not file."
  exit 1
fi


rm -f $HERE/$DIST*
split -l 25 -d $1 $DIST

for file in `find $HERE -maxdepth 1 -type f -name "$DIST*"`; do
  convert $file > $file.json
  rm -f $file
done

exit