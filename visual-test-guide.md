# Playwright 視覚的テスト実行ガイド

## 1. UIモードでブラウザを表示する方法

### 方法1: UIモードの設定を変更
1. `npm run test:ui`でUIモードを起動
2. 画面上部のツールバーで「**Show browser**」チェックボックスをONにする
3. テストを実行すると、実際のブラウザウィンドウが表示される

### 方法2: ヘッドフルモードで実行
```bash
# ブラウザを表示してテストを実行
npx playwright test --headed

# 実行速度を遅くして動作を確認しやすくする
npx playwright test --headed --slowmo=1000
```

## 2. より視覚的なテスト実行方法

### 2.1 デバッグモード（最も視覚的）
```bash
npm run test:debug
```
または
```bash
npx playwright test --debug
```

このモードでは：
- Playwright Inspectorが起動
- ステップごとに実行を制御可能
- 「Step over」ボタンで1ステップずつ進める
- ブラウザの状態を確認しながらデバッグ

### 2.2 トレースビューワー
```bash
# トレース付きでテストを実行
npx playwright test --trace on

# テスト後にトレースを表示
npx playwright show-trace
```

## 3. テストコードに視覚的な要素を追加

### 3.1 実行速度を遅くする
```typescript
import { test, expect } from '@playwright/test';

test.use({
  // すべてのアクションを1秒遅延
  actionTimeout: 30000,
  // ビューポートサイズを設定
  viewport: { width: 1280, height: 720 },
});

test('視覚的に確認しやすいテスト', async ({ page }) => {
  // 各アクションの間に遅延を追加
  await page.goto('https://demo.playwright.dev/todomvc');
  await page.waitForTimeout(1000); // 1秒待機
  
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await newTodo.fill('買い物に行く');
  await page.waitForTimeout(1000);
  
  await newTodo.press('Enter');
  await page.waitForTimeout(1000);
});
```

### 3.2 スクリーンショットを撮影
```typescript
test('スクリーンショット付きテスト', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  
  // スクリーンショットを撮影
  await page.screenshot({ path: 'screenshots/before-add-todo.png' });
  
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await newTodo.fill('買い物に行く');
  await newTodo.press('Enter');
  
  // 追加後のスクリーンショット
  await page.screenshot({ path: 'screenshots/after-add-todo.png' });
});
```

## 4. 推奨される視覚的テスト方法

### 初心者向け（最も視覚的）
```bash
# デバッグモードで実行
npx playwright test tests/todo-app.spec.ts --debug

# または特定のテストのみデバッグ
npx playwright test tests/todo-app.spec.ts -g "should add" --debug
```

### 開発中のテスト
```bash
# ヘッドフルモード + スローモーション
npx playwright test --headed --slowmo=500
```

### UIモードでの視覚的実行
1. `npm run test:ui`
2. 「Show browser」をON
3. 「Show trace viewer」をON
4. テストを実行

## 5. コード例：視覚的に分かりやすいテスト

```typescript
import { test, expect } from '@playwright/test';

test.describe('視覚的なTodoアプリテスト', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    // ページが完全に読み込まれるまで待機
    await page.waitForLoadState('networkidle');
  });

  test('ステップバイステップでTodo追加', async ({ page }) => {
    // 1. 入力欄をハイライト
    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.hover();
    await page.waitForTimeout(500);
    
    // 2. クリックして入力準備
    await newTodo.click();
    await page.waitForTimeout(500);
    
    // 3. ゆっくりタイピング
    await newTodo.type('買い物に行く', { delay: 100 });
    await page.waitForTimeout(500);
    
    // 4. Enterキーで追加
    await newTodo.press('Enter');
    await page.waitForTimeout(1000);
    
    // 5. 結果を確認
    const todoItem = page.getByTestId('todo-item');
    await todoItem.hover();
    await expect(todoItem).toContainText('買い物に行く');
  });
});
```

## 6. トラブルシューティング

### ブラウザが表示されない場合
1. `--headed`オプションを追加
2. UIモードで「Show browser」を確認
3. `playwright.config.ts`で`use: { headless: false }`を設定

### 動作が速すぎる場合
1. `--slow-mo=1000`を追加（ミリ秒単位）
2. コード内で`page.waitForTimeout()`を使用
3. デバッグモードを使用

### 最も確実な方法
```bash
# これが最も視覚的
npx playwright test --debug
```