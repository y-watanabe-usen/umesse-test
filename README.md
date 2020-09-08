# umesse

U-Messe 簡易CM作成アプリ

## 参考資料

https://docs.google.com/presentation/d/1plloUJstdpIdemTB1MyP4VQUClir-DfiCY6seTF-Xgs/edit#slide=id.p

## start command

```bash
docker-compose up -d
docker run -it --rm -v $PWD/deploy:/deploy -w /deploy hashicorp/terraform:light init
docker run -it --rm -v $PWD/deploy:/deploy -v $PWD/src/lambda:/lambda -w /deploy hashicorp/terraform:light plan -var 'access_key=dummy' -var 'secret_key=dummy'
docker run -it --rm -v $PWD/deploy:/deploy -v $PWD/src/lambda:/lambda -w /deploy hashicorp/terraform:light apply -var 'access_key=dummy' -var 'secret_key=dummy'
```
