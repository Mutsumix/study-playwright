# Playwright コマンドリファレンス

## 基本コマンド

### テスト実行
```bash
# すべてのテストを実行（ヘッドレス）
npx playwright test

# ブラウザを表示して実行
npx playwright test --headed

# 特定のファイルを実行
npx playwright test tests/example.spec.ts

# 特定のディレクトリのテストを実行
npx playwright test tests/e2e/
```

### テストの絞り込み
```bash
# テスト名で絞り込み（部分一致）
npx playwright test -g "should add"

# 正規表現で絞り込み
npx playwright test -g "Todo.*add"

# 特定のプロジェクト（ブラウザ）のみ
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# 複数プロジェクトを指定
npx playwright test --project=chromium --project=firefox
```

## デバッグ・開発用コマンド

### デバッグモード
```bash
# Playwright Inspectorを起動（ステップ実行）
npx playwright test --debug

# 特定のテストをデバッグ
npx playwright test example.spec.ts --debug

# 特定の行からデバッグ開始
npx playwright test example.spec.ts:10 --debug
```

### UIモード
```bash
# インタラクティブなUIモードで実行
npx playwright test --ui

# ウォッチモード付き（ファイル変更を監視）
npx playwright test --ui --watch
```

## レポート・結果

### レポート生成
```bash
# HTMLレポートを生成（デフォルト）
npx playwright test --reporter=html

# 複数のレポーターを使用
npx playwright test --reporter=html,line

# JSONレポート
npx playwright test --reporter=json > results.json

# JUnitレポート（CI用）
npx playwright test --reporter=junit > results.xml
```

### レポート表示
```bash
# 最後のテスト実行のレポートを表示
npx playwright show-report

# 特定のレポートを表示
npx playwright show-report path/to/report
```

## トレース・記録

### トレース
```bash
# トレースを常に記録
npx playwright test --trace=on

# 失敗時のみトレースを記録（推奨）
npx playwright test --trace=on-first-retry

# トレースを表示
npx playwright show-trace trace.zip
```

### スクリーンショット・動画
```bash
# スクリーンショットを常に撮影
npx playwright test --screenshot=on

# 失敗時のみスクリーンショット
npx playwright test --screenshot=only-on-failure

# 動画を録画
npx playwright test --video=on

# 失敗時のみ動画を保持
npx playwright test --video=retain-on-failure
```

## 並列実行・リトライ

### ワーカー数の制御
```bash
# シングルワーカーで実行（順次実行）
npx playwright test --workers=1

# 4つのワーカーで並列実行
npx playwright test --workers=4

# CPUコア数の50%を使用
npx playwright test --workers=50%
```

### リトライ
```bash
# 失敗したテストを2回までリトライ
npx playwright test --retries=2

# リトライなし
npx playwright test --retries=0
```

## その他の便利なコマンド

### 情報表示
```bash
# テスト一覧を表示（実行せず）
npx playwright test --list

# 実行されるテストの詳細を表示
npx playwright test --list --reporter=json
```

### 前回の実行に基づく操作
```bash
# 前回失敗したテストのみ実行
npx playwright test --last-failed

# 前回失敗したテストを除外
npx playwright test --only-changed
```

### タイムアウト設定
```bash
# グローバルタイムアウトを設定（ミリ秒）
npx playwright test --timeout=60000

# テストごとのタイムアウト
npx playwright test --timeout=30000
```

## 設定・環境

### 設定ファイル
```bash
# 特定の設定ファイルを使用
npx playwright test --config=playwright.config.ts

# 設定ファイルなしで実行
npx playwright test --config=/dev/null
```

### 環境変数
```bash
# ベースURLを上書き
BASE_URL=http://localhost:3000 npx playwright test

# CI環境として実行
CI=true npx playwright test
```

## インストール・セットアップ

### Playwright のインストール
```bash
# プロジェクトに追加
npm install -D @playwright/test

# グローバルインストール
npm install -g @playwright/test
```

### ブラウザのインストール
```bash
# すべてのブラウザをインストール
npx playwright install

# 特定のブラウザのみ
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit

# 依存関係も含めてインストール
npx playwright install --with-deps
```

### コードジェネレーター
```bash
# テストコードを自動生成（録画）
npx playwright codegen https://example.com

# 特定の言語で生成
npx playwright codegen --target=python https://example.com

# デバイスをエミュレート
npx playwright codegen --device="iPhone 13" https://example.com
```

## よく使う組み合わせ

```bash
# 開発時：ブラウザ表示 + 特定ファイル
npx playwright test tests/todo.spec.ts --headed

# デバッグ：単一テスト + デバッグモード
npx playwright test -g "should add todo" --debug

# CI：並列実行 + リトライ + JUnitレポート
npx playwright test --workers=4 --retries=2 --reporter=junit

# 失敗の調査：トレース + スクリーンショット
npx playwright test --trace=on --screenshot=on

# 高速確認：単一ブラウザ + ヘッドレス
npx playwright test --project=chromium
```

## Tips

1. **開発時は UIモード が便利**
   ```bash
   npx playwright test --ui
   ```

2. **CI では並列数を制限**
   ```bash
   npx playwright test --workers=2
   ```

3. **デバッグは --debug が最強**
   ```bash
   npx playwright test --debug
   ```

4. **設定より CLI オプションが優先される**
   - 設定ファイル < 環境変数 < CLIオプション