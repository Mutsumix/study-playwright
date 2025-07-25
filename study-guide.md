# Playwright E2Eテスト学習ガイド

## 各実行モードの違い

### 1. 通常モード（ヘッドレス）
```bash
npm test
```
- ブラウザは表示されない
- 最速で実行
- CI/CD環境向け

### 2. ヘッドフルモード
```bash
npx playwright test --headed
```
- ブラウザが表示される
- 自動的に最後まで実行
- 動作は高速

### 3. スローモーション付き
```bash
npx playwright test --headed --slowmo=1000
```
- ブラウザが表示される
- 各アクションの間に遅延（1000ms）
- 自動的に最後まで実行

### 4. デバッグモード（手動制御）
```bash
npx playwright test --debug
```
- **最初で一時停止する（仕様）**
- Playwright Inspectorで制御
- 「Resume」ボタン：最後まで実行
- 「Step over」ボタン：1ステップずつ実行
- 「Continue to here」：特定の行まで実行

### 5. UIモード（インタラクティブ）
```bash
npm run test:ui
```
- テストを選択して実行
- 「Show browser」でブラウザ表示
- タイムトラベル機能付き

## おすすめの使い分け

- **開発中**: `--headed --slowmo=500`
- **デバッグ時**: `--debug`
- **通常実行**: `npm test`
- **視覚的確認**: UIモード + Show browser

## セットアップ完了内容

1. **Playwrightのインストール**
   - `@playwright/test`パッケージをインストール
   - ブラウザ（Chromium、Firefox、WebKit）をインストール

2. **基本的なテストファイル作成**
   - `tests/example.spec.ts`: Playwright公式サイトのテスト
   - `tests/todo-app.spec.ts`: TodoアプリのE2Eテスト

3. **NPMスクリプト設定**
   - `npm test`: テストを実行
   - `npm run test:ui`: UIモードでテスト（視覚的なデバッグ）
   - `npm run test:debug`: デバッグモード
   - `npm run test:report`: HTMLレポートを表示

## テストの実行方法

```bash
# すべてのテストを実行
npm test

# 特定のテストファイルを実行
npx playwright test tests/todo-app.spec.ts

# UIモードで実行（推奨）
npm run test:ui

# ヘッドレスモードを無効にして実行（ブラウザが見える）
npx playwright test --headed

# 特定のブラウザでのみ実行
npx playwright test --project=chromium
```

## Playwrightの主要な機能

### 1. セレクター
- `page.getByRole()`: アクセシビリティロールでの選択
- `page.getByText()`: テキストコンテンツでの選択
- `page.getByPlaceholder()`: プレースホルダーでの選択
- `page.getByTestId()`: data-testid属性での選択

### 2. アサーション
- `expect(page).toHaveTitle()`: ページタイトルの確認
- `expect(element).toBeVisible()`: 要素の表示確認
- `expect(element).toContainText()`: テキスト内容の確認
- `expect(element).toHaveClass()`: クラスの確認

### 3. デバッグ機能
- `page.pause()`: テスト実行を一時停止
- `--debug`フラグ: ステップバイステップ実行
- トレース機能: 実行履歴の記録

## 次のステップ

1. **高度な機能の探索**
   - スクリーンショットの撮影
   - 動画の録画
   - ネットワークリクエストのモック
   - 認証状態の保持

2. **実践的なテストシナリオ**
   - フォームバリデーション
   - APIとの連携テスト
   - マルチページのワークフロー

3. **CI/CDへの統合**
   - GitHub Actionsでの自動実行
   - テストレポートの生成