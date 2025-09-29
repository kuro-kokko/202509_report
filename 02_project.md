## 1. プロジェクト概要

### 1. 目的

- 異なるプログラミング言語（TypeScript/Go）の特性比較
- 同一機能を複数言語で実装し、言語固有の違いを明確にする
- 最小構成でのWeb検索システム構築

## 2. 機能要件

### 2.1 基本機能

|機能ID|機能名|概要|
|---|---|---|
|F001|ユーザー検索|名前による部分一致検索|
|F002|検索結果表示|検索結果の一覧表示|
|F003|エラーハンドリング|適切なエラーメッセージ表示|

### 2.2 詳細機能仕様

#### F001: ユーザー検索

- **入力**: 検索名（1文字以上の文字列）
- **処理**: データベースで部分一致検索（大文字小文字区別なし）
- **出力**: 該当ユーザーリスト + 件数
- **制約**: 削除フラグが立ったユーザーは除外

#### F002: 検索結果表示

- **表示項目**: ID、名前、年齢
- **ソート順**: 名前昇順、ID昇順
- **件数表示**: 検索結果の総件数
- **空結果**: 該当なしメッセージ表示

#### F003: エラーハンドリング

- **バリデーションエラー**: 入力チェック（空文字など）
- **システムエラー**: データベース接続エラーなど
- **HTTPステータス**: 適切なステータスコード返却

## 3. システム構成

### 3.1 アーキテクチャ

```
[Frontend] ←HTTP→ [Backend API] ←TCP→ [PostgreSQL]
```

### 3.2 技術スタック

#### 共通部分

- **データベース**: PostgreSQL 15
- **コンテナ**: Docker Compose
- **フロントエンド**: HTML/CSS/JavaScript（同一）

#### TypeScript版

- **言語**: TypeScript
- **フレームワーク**: Express.js
- **ランタイム**: Node.js 18

#### Go版

- **言語**: Go 1.21
- **フレームワーク**: Gin
- **ドライバ**: lib/pq

### 3.3 データベース設計

#### usersテーブル

|カラム名|データ型|制約|説明|
|---|---|---|---|
|id|SERIAL|PRIMARY KEY|ユーザーID（自動採番）|
|name|VARCHAR(100)|NOT NULL|ユーザー名|
|age|INTEGER|NOT NULL|年齢|
|del_flg|BOOLEAN|DEFAULT FALSE|削除フラグ|

#### インデックス

- name列: 検索性能向上
- del_flg列: 論理削除フィルタリング性能向上

## 4. API仕様

### 4.1 エンドポイント一覧

| メソッド | パス          | 機能      |
| ---- | ----------- | ------- |
| GET  | /health     | ヘルスチェック |
| GET  | /api/search | ユーザー検索  |

### 4.2 詳細API仕様

#### GET /api/search

**リクエスト**

```
GET /api/search?name={検索名}
```

**レスポンス（成功時）**

```json
{
  "users": [
    {
      "id": 1,
      "name": "田中太郎",
      "age": 25,
      "del_flg": false
    }
  ],
  "total": 1
}
```

**レスポンス（エラー時）**

```json
{
  "error": "検索名は必須です"
}
```

## 5. 実装構成

### 5.1 TypeScript実装

- **Express.js**: TypeScriptとの親和性あり
- **生SQL**: 処理の透明性
- **型定義ファイル分離**: TypeScriptの型安全性

### 5.2 Go実装

- **Gin**: 軽量、高性能、シンプルなフレームワーク
- **database/sql**: 標準ライブラリ、型安全性
- **構造体活用**: Goの型システム

### 5.3 Python実装

- **Flask/FastAPI**: 軽量でシンプルなWebフレームワーク
- **生SQL（psycopg2/mysql-connector）**: 軽量、処理の透明性
- **型ヒント**: Python 3.5以降の型アノテーション

### 5.4 Java実装

- **Spring Boot**: エンタープライズ標準、依存性注入
- **JdbcTemplate**: 標準搭載
- **DTOクラス**: Javaの型システム＋Bean規約

## 6. 起動方法

### 6.1 TypeScript版

```bash
cd src/typescript
docker-compose up --build
# Frontend: http://localhost:3001
```

### 6.2 Go版

```bash
cd src/go
docker-compose up --build
# Frontend: http://localhost:3001
```