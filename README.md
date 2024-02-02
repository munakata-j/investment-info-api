## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Directory structure
```
project-name/
│
├── src/
│   ├── config/                 # アプリケーション設定と環境変数
│   │   └── configuration.ts
│   │
│   ├── modules/                # アプリケーションの各機能モジュール
│   │   ├── cats/               # 「cats」機能モジュールの例
│   │   │   ├── dto/            # データ転送オブジェクト（DTO）
│   │   │   │   │── creat-dto.xxx.ts # crud毎にDTOを定義
│   │   │   ├── entities/       # データベースエンティティモデル
│   │   │   ├── cats.module.ts  # 'Cats'モジュールの定義
│   │   │   ├── cats.service.ts # 'Cats'サービス
│   │   │   └── cats.controller.ts # 'Cats'コントローラ
│   │   │
│   │   └── users/              # 「users」機能モジュールの例
│   │
│   ├── app.module.ts           # アプリケーションのルートモジュール
│   ├── main.ts                 # アプリケーションのエントリポイント
│
├── test/                       # テストファイル
│
├── .env                        # 環境変数ファイル
├── .eslintrc.js                # ESLintの設定
├── .prettierrc                 # Prettierの設定
├── package.json                # パッケージ依存関係とスクリプト
└── tsconfig.json               # TypeScriptのコンパイラ設定

```
Nest is [MIT licensed](LICENSE).
