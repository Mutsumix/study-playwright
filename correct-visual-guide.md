# Playwright 正しい視覚的実行方法

## スローモーションの正しい設定方法

### 方法1: 設定ファイルで指定
```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    // スローモーションを設定（ミリ秒）
    launchOptions: {
      slowMo: 1000,
    },
    // ブラウザを表示
    headless: false,
  },
});
```

### 方法2: テストコード内で指定
```typescript
import { test } from '@playwright/test';

test.use({
  launchOptions: {
    slowMo: 1000, // 1秒の遅延
  },
  headless: false, // ブラウザを表示
});

test('スローモーションテスト', async ({ page }) => {
  await page.goto('https://example.com');
  // 各アクションが1秒遅延される
});
```

### 方法3: 環境変数で制御
```bash
# .env ファイルを作成
SLOWMO=1000

# テスト実行
npx playwright test --headed
```

## 実際に使える視覚的実行コマンド

### 1. ブラウザを表示して実行
```bash
npx playwright test --headed
```

### 2. デバッグモード（手動制御）
```bash
npx playwright test --debug
```

### 3. UIモード
```bash
npx playwright test --ui
```

### 4. 特定のプロジェクトで実行
```bash
npx playwright test --project=chromium --headed
```

## テストコードでの遅延追加

```typescript
test('視覚的に確認しやすいテスト', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc');
  await page.waitForTimeout(1000); // 1秒待機
  
  const newTodo = page.getByPlaceholder('What needs to be done?');
  await newTodo.fill('タスクを追加');
  await page.waitForTimeout(1000); // 1秒待機
  
  await newTodo.press('Enter');
  await page.waitForTimeout(1000); // 1秒待機
});
```

## 申し訳ございません

誤った情報をお伝えして申し訳ありませんでした。
Playwrightの`test`コマンドには`--slowmo`オプションはありません。
スローモーションを使用するには、設定ファイルかテストコード内で指定する必要があります。