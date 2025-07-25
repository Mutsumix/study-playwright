# テストファイル一覧と内容

## 1. example.spec.ts（Playwright公式サイトのテスト）

### テスト1: has title
- **内容**: Playwright公式サイトのタイトルを確認
- **動作**:
  1. https://playwright.dev/ にアクセス
  2. ページタイトルに「Playwright」が含まれることを確認

### テスト2: get started link
- **内容**: 「Get started」リンクの動作確認
- **動作**:
  1. https://playwright.dev/ にアクセス
  2. 「Get started」リンクをクリック
  3. 「Installation」見出しが表示されることを確認

## 2. todo-app.spec.ts（Todoアプリの機能テスト）

### テスト1: should add a new todo
- **内容**: 新しいTodoアイテムの追加
- **動作**:
  1. Todoアプリにアクセス
  2. 入力欄に「買い物に行く」と入力
  3. Enterキーを押す
  4. Todoリストに「買い物に行く」が追加されたことを確認

### テスト2: should complete a todo
- **内容**: Todoアイテムの完了処理
- **動作**:
  1. Todoアプリにアクセス
  2. 「宿題を終わらせる」というTodoを追加
  3. チェックボックスをクリック
  4. completedクラスが付与されることを確認（取り消し線が表示される）

### テスト3: should filter todos
- **内容**: Todoアイテムのフィルター機能
- **動作**:
  1. Todoアプリにアクセス
  2. 「タスク1」と「タスク2」を追加
  3. 「タスク1」を完了状態にする
  4. 「Active」フィルターをクリック → 「タスク2」のみ表示
  5. 「Completed」フィルターをクリック → 「タスク1」のみ表示

## 3. visual-demo.spec.ts（視覚的デモテスト）

### テスト1: ゆっくり動作するTodo追加デモ
- **内容**: 視覚的に分かりやすいTodo追加のデモ
- **動作**:
  1. Todoアプリにアクセス（1秒待機）
  2. 入力欄にマウスオーバー（0.5秒待機）
  3. 入力欄をクリック（0.5秒待機）
  4. 「Playwrightでテストを書く」をゆっくりタイピング（1文字100ms）
  5. Enterキーで追加（1秒待機）
  6. チェックボックスにマウスオーバー（0.5秒待機）
  7. チェックボックスをクリック（1秒待機）
  8. 完了状態になったことを確認

## テスト実行コマンドまとめ

```bash
# すべてのテストを実行
npx playwright test --headed

# 特定のファイルのみ実行
npx playwright test tests/todo-app.spec.ts --headed

# 特定のテスト名で実行（部分一致）
npx playwright test -g "should add" --headed

# visual-demoのみ実行（最も視覚的）
npx playwright test tests/visual-demo.spec.ts --headed
```

## 各テストの学習ポイント

1. **example.spec.ts**: 基本的なページ遷移とアサーション
2. **todo-app.spec.ts**: 実践的なユーザー操作（入力、クリック、フィルター）
3. **visual-demo.spec.ts**: 待機処理とゆっくりした動作の実装方法

## 個別テスト実行コマンド

### example.spec.ts
```bash
# ファイル全体
npx playwright test tests/example.spec.ts --headed

# "has title"テストのみ
npx playwright test tests/example.spec.ts -g "has title" --headed

# "get started link"テストのみ
npx playwright test tests/example.spec.ts -g "get started link" --headed
```

### todo-app.spec.ts
```bash
# ファイル全体
npx playwright test tests/todo-app.spec.ts --headed

# "should add a new todo"テストのみ
npx playwright test tests/todo-app.spec.ts -g "should add a new todo" --headed

# "should complete a todo"テストのみ
npx playwright test tests/todo-app.spec.ts -g "should complete a todo" --headed

# "should filter todos"テストのみ
npx playwright test tests/todo-app.spec.ts -g "should filter todos" --headed
```

### visual-demo.spec.ts
```bash
# ファイル全体（1テストのみ）
npx playwright test tests/visual-demo.spec.ts --headed

# デバッグモードで実行（ステップ実行可能）
npx playwright test tests/visual-demo.spec.ts --debug
```

## その他の便利なコマンド

```bash
# テスト一覧を表示（実行せずに）
npx playwright test --list

# 特定のブラウザでのみ実行
npx playwright test --project=chromium --headed
npx playwright test --project=firefox --headed
npx playwright test --project=webkit --headed

# 失敗したテストのみ再実行
npx playwright test --last-failed --headed

# 並列実行数を制限（デフォルトは並列）
npx playwright test --workers=1 --headed
```