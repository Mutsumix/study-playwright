# Playwright E2E Testing Study

このリポジトリは Playwright を使った E2E テストの学習用プロジェクトです。

## セットアップ

```bash
npm install
npx playwright install
```

## テスト実行

```bash
# 通常のテスト実行
npm run test

# UI付きテスト実行
npm run test:ui

# デバッグモード
npm run test:debug

# テストレポート表示
npm run test:report
```

## 学習内容

- Playwright の基本設定と初期セットアップ
- 基本的な E2E テストの作成方法
- テスト実行とデバッグ方法
- アサーション（JUnit vs Playwright）
- Headed/Headless モードの違い
- 視覚的なテスト実行方法

## プロジェクト構成

```
study-E2E/
├── package.json              # プロジェクト設定
├── playwright.config.ts      # Playwright設定
├── tests/                    # テストファイル
│   ├── example.spec.ts       # 基本的なテスト例
│   ├── todo-app.spec.ts      # Todoアプリのテスト
│   └── visual-demo.spec.ts   # 視覚的なデモテスト
├── index.md                  # 学習記録（詳細）
├── test-summary.md           # 各テストの解説
├── playwright-commands.md    # コマンドリファレンス
├── assertion-comparison.md   # JUnit vs Playwright比較
├── headed-vs-headless.md     # 実行モード解説
└── README.md                 # このファイル
```

## 作成したテスト

### 1. example.spec.ts
- Playwright公式サイトのタイトル確認
- 「Get started」リンクの動作確認

### 2. todo-app.spec.ts
- 新しいTodoアイテムの追加
- Todoアイテムの完了処理
- Todoアイテムのフィルター機能

### 3. visual-demo.spec.ts
- 視覚的に分かりやすいTodo追加のデモ
- ゆっくりした動作で学習用に最適

## 実行例

```bash
# 特定のテストを実行
npx playwright test tests/todo-app.spec.ts --headed

# テスト名で絞り込み
npx playwright test -g "should add" --headed

# 視覚的なデモテスト（おすすめ）
npx playwright test tests/visual-demo.spec.ts --headed
```

## 参考リンク

- [Playwright 公式ドキュメント](https://playwright.dev/)
- [Playwright 公式チュートリアル](https://playwright.dev/docs/intro)