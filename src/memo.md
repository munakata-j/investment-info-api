## Interface

## Get Stocks
### endpoint
```
/api/v1/getStockInfo?code=?selectorCode=?compayname=
```
### Query parameter

``` 
code: company code(7203)
selectorCode: 1
companyname: トヨタ自動車
```

## Get stock financial data
### endpoint
```
/api/v1/getStockDetail/:code
```
### Request parameter
```angular2html
code: company code
```

### 一括Export処理の概要 案1
* 1.登録リストに銘柄データを登録した段階で財務・時価データを取得
* 2.JQuantsからのレスポンスデータはNest経由で、Stateで管理、保持
* 3.フロントでResponse.StateをCSVファイルとしてExport
* 
### 一括Export処理　案2
* 1.検索が実行されたタイミングではてはまる銘柄の時価と財務データをJquantsから取得
* 2.Redisに保存
* 3.詳細情報の取得リクエスト、Exportリクエストの場合、Redisから取得し、クライアントに渡す
* 4.一括Exportの場合、リクエスト時にまとめてAPIに送り、Redisから情報を取得、CSVの生成
→レスポンスとして返す。

### task
* 1.銘柄一覧のDTOの作成
* 2.外部APIから財務データと時価データを取得する処理を追加
* 3.上記のデータをRedisに保存
* 4.2.3の一連の処理を上記の処理を検索結果処理、一覧取得処理時に実施

