# lambda

## api

- U MESSE RESTful API Lambda
- メインのAPI

## auth

- 認証Lambda
- API GatewayのLambdaオーソライザー

## converter

- 音圧調整・エンコードLambda
- 作成したCMをラウドネス調整、音圧調整、エンコードする
- APIからAWS SQS経由で起動する

## generate

- CM作成Lambda
- 選択した素材を結合してCMを作成する
- APIからAWS SQS経由で起動する

## sync

- ユーザーデータ取得Lambda
- U DS APIからユーザーデータ取得する
- AWS VPC経由でアクセスする
- CloudWatch Eventsから定期的に起動する
