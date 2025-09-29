# プログラミング言語比較レポート

## 本レポートについて

現代のソフトウェア開発においてメジャーな4つのプログラミング言語（Python、TypeScript、Go、Java）について、公式ドキュメントを参考に特徴分析と実装特性の比較を行い、言語毎に特徴、長所、短所、推奨用途をまとめています。

## 1. Python

### 特徴

- 動的型付けとインデントベースの構文を持つインタープリター型言語
- list、dict、set、tupleなどの組み込みデータ構造とクラスベースのオブジェクト指向
- .pyファイルを直接実行可能で、コンパイル不要の迅速な開発サイクル
- Windows、macOS、Linux対応のクロスプラットフォーム言語

### 長所

- ライブラリが豊富で、データ分析やWeb開発など様々な分野で活用できる
- 文法がシンプルで読みやすく、初心者でも学習しやすい
- NumPy、pandas、TensorFlowなど専門的なライブラリが充実
- 無料で利用でき、世界中の開発者がコードを改良し続けている

### 短所

- **実行速度**: プログラムの実行が他の言語より遅い場合がある
- **並列処理の制限**: 複数の処理を同時に実行するのが苦手
- **メモリ使用量**: 同じ処理でも他の言語よりメモリを多く使う傾向がある
- **モバイルアプリ開発**: スマートフォンアプリの開発には向いていない

### 推奨用途

データサイエンス、AI/ML、プロトタイピング、スクリプト作成など

## 2. TypeScript

### 特徴

- JavaScriptに静的型システム（interface、type、generics）を追加したスーパーセット
- 既存のJavaScriptコードをそのまま実行可能で段階的な移行が可能
- tscコンパイラーによりJavaScriptに変換され、Node.js、ブラウザで実行
- VSCodeなどのエディターで型情報に基づく自動補完とリアルタイムエラー検出

### 長所

- JavaScriptの既存知識を活かしながら、より安全なコードが書ける
- コードを書いている最中にエラーを発見できるため、バグを減らせる
- エディターが高機能な入力補完や修正提案を提供してくれる
- 既存のJavaScriptプロジェクトに段階的に導入できる

### 短所

- **学習コストの増加**: 型の概念を覚える必要がある
- **コンパイル時間**: 大きなプロジェクトでは変換処理に時間がかかることがある
- **設定の複雑さ**: プロジェクトの設定ファイルが複雑になることがある
- **外部ライブラリ**: 一部のJavaScriptライブラリで型情報が不完全な場合がある

### 推奨用途

Webフロントエンド開発、Node.jsバックエンド開発、大規模JavaScriptプロジェクトなど

## 3. Go

### 特徴

- 安全でスケーラブルなシステムを構築するためのオープンソースプログラミング言語
- goroutineとchannelによる軽量な並行処理機能を標準で提供
- 静的型付け・コンパイル型でありながら、型推論により動的言語のような記述が可能
- ガベージコレクション機能付きでありながら高速なネイティブバイナリを生成

### 長所

- 複数の処理を効率的に同時実行できるため、高性能なアプリケーションが作れる
- シンプルな文法で覚えることが少なく、コードが読みやすい
- 単体の実行ファイルが作れるため、他の環境への配布が簡単
- コンパイルが高速で、開発時の待ち時間が短い

### 短所

- **エラー処理**: エラーが起きた時の処理コードが冗長になりやすい
- **新しい機能**: 比較的新しい言語のため、他の言語より機能が少ない部分がある
- **ライブラリの少なさ**: PythonやJavaと比べて利用できるライブラリが限られている
- **デスクトップアプリ開発**: WindowsやMacのアプリ開発ツールが少ない

### 推奨用途

マイクロサービス、クラウドネイティブアプリケーション、システムプログラミングなど

## 4. Java

### 特徴

- JVM（Java仮想マシン）上で動作するクロスプラットフォーム対応の言語
- クラスベースのオブジェクト指向でinterface、abstract class、継承をサポート
- .javaファイルをjavacでバイトコード（.class）にコンパイル後、JVMで実行
- JDK（開発キット）にコンパイラー、デバッガー、プロファイラーなどのツール群を同梱

### 長所

- 一度書いたコードが様々なOS（Windows、Mac、Linux）で動作する
- 企業向けシステム開発で長年使われており、安定性と信頼性が高い
- 開発に必要なツールが全て揃っており、大規模開発に適している
- 学習資料が豊富で、世界中に経験豊富な開発者が多数存在

### 短所

- **コード量の多さ**: 同じ機能でも他の言語より多くのコードを書く必要がある
- **起動時間**: プログラムの起動に時間がかかる場合がある
- **メモリ使用量**: JVMがメモリを多く使う傾向がある
- **機能追加の速度**: 新しい機能の追加が他の言語より慎重で時間がかかる
- **ライセンス**: 商用利用時にOracleのライセンス条件を確認する必要がある

### 推奨用途

エンタープライズアプリケーション、大規模システム、Androidアプリ開発など

## 5. 言語特性比較

### 実装の違い

|項目|Python|TypeScript|Go|Java|
|---|---|---|---|---|
|**型定義**|動的型付け/type hints|interface|struct|class/interface|
|**エラー処理**|try-except|try-catch|if err != nil|try-catch|
|**JSON変換**|json.loads/dumps|自動|タグ指定|Jackson/Gson|
|**依存管理**|pip/poetry|npm|go mod|Maven/Gradle|
|**ビルド**|不要（インタープリター）|tsc|go build|javac/Maven/Gradle|
|**実行**|Python インタープリター|Node.js|ネイティブバイナリ|JVM|

### 比較観点

|観点|Python|TypeScript|Go|Java|
|---|---|---|---|---|
|**型安全性**|実行時チェック（オプション静的）|コンパイル時チェック|コンパイル時チェック|コンパイル時チェック|
|**エラーハンドリング**|例外ベース（try-except）|例外ベース（try-catch）|戻り値ベース（if err != nil）|例外ベース（try-catch）|
|**実行方式**|インタープリター|インタープリター（Node.js）|コンパイル済みバイナリ|JVM（バイトコード）|
|**並行処理**|asyncio/threading|Promise/async-await|Goroutine|Thread/CompletableFuture|


## 参考資料(公式ドキュメント)
## Python

- https://www.python.org/doc/ (Our Documentation | Python.org)
- https://docs.python.org/3/contents.html (Python Documentation contents)
- https://docs.python.org/3/ (Python 3.13 documentation)

## TypeScript

- https://www.typescriptlang.org/docs/ (TypeScript Documentation)
- https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html (TypeScript for JavaScript Programmers)
- https://www.typescriptlang.org/docs/handbook/2/basic-types.html (The Basics)
- https://www.typescriptlang.org/docs/handbook/intro.html (The TypeScript Handbook)
- https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html (TypeScript for the New Programmer)
- https://www.typescriptlang.org/tsconfig/ (TSConfig Reference)

## Go

- https://go.dev/doc/ (Documentation - The Go Programming Language)
- https://go.dev/learn/ (Get Started - The Go Programming Language)
- https://tip.golang.org/doc/comment (Go Doc Comments)

## Java（Oracle）

- https://docs.oracle.com/en/java/javase/25/index.html (JDK 25 Documentation)
- https://docs.oracle.com/javase/tutorial/ (The Java™ Tutorials)
- https://docs.oracle.com/en/java/ (Java Documentation - Get Started)
- https://www.oracle.com/java/technologies/javase-documentation.html (Java SE - Documentation)