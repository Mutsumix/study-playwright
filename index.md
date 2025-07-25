# Playwright E2Eテスト学習記録

## 1. プロジェクトの初期化

### 1.1 Node.jsプロジェクトの作成
```bash
npm init -y
```
これにより`package.json`ファイルが作成されます。

## 2. Playwrightのインストール

### 2.1 Playwrightテストパッケージのインストール
```bash
npm install -D @playwright/test
```
- `-D`オプションは`--save-dev`の省略形で、開発依存関係としてインストールします
- `@playwright/test`はPlaywrightのテストランナーを含むパッケージです

### 2.2 ブラウザのインストール
```bash
npx playwright install
```
このコマンドで以下のブラウザがインストールされます：
- Chromium（Chromeのオープンソース版）
- Firefox
- WebKit（Safariのエンジン）
- FFMPEG（動画録画用）

## 3. 設定ファイルの作成

### 3.1 playwright.config.ts
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',                    // テストファイルの場所
  fullyParallel: true,                   // テストを並列実行
  forbidOnly: !!process.env.CI,          // CI環境でtest.onlyを禁止
  retries: process.env.CI ? 2 : 0,       // CI環境では2回リトライ
  workers: process.env.CI ? 1 : undefined, // CI環境では1ワーカー
  reporter: 'html',                      // HTMLレポートを生成
  use: {
    baseURL: 'http://localhost:3000',    // ベースURL
    trace: 'on-first-retry',             // リトライ時にトレースを記録
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

## 4. テストの作成

### 4.1 基本的なテスト例（tests/example.spec.ts）
```typescript
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  // ページに移動
  await page.goto('https://playwright.dev/');

  // タイトルに"Playwright"が含まれることを確認
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // "Get started"リンクをクリック
  await page.getByRole('link', { name: 'Get started' }).click();

  // "Installation"見出しが表示されることを確認
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
```

### 4.2 実践的なテスト例（tests/todo-app.spec.ts）
```typescript
import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
  test('should add a new todo', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    // プレースホルダーで入力欄を取得
    const newTodo = page.getByPlaceholder('What needs to be done?');
    
    // テキストを入力してEnterキーを押す
    await newTodo.fill('買い物に行く');
    await newTodo.press('Enter');
    
    // todoアイテムにテキストが含まれることを確認
    await expect(page.getByTestId('todo-item')).toContainText('買い物に行く');
  });

  test('should complete a todo', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    const newTodo = page.getByPlaceholder('What needs to be done?');
    
    await newTodo.fill('宿題を終わらせる');
    await newTodo.press('Enter');
    
    // チェックボックスをチェック
    await page.getByTestId('todo-item').getByRole('checkbox').check();
    
    // completedクラスが付与されることを確認
    await expect(page.getByTestId('todo-item')).toHaveClass(/completed/);
  });

  test('should filter todos', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    const newTodo = page.getByPlaceholder('What needs to be done?');
    
    // 2つのtodoを追加
    await newTodo.fill('タスク1');
    await newTodo.press('Enter');
    
    await newTodo.fill('タスク2');
    await newTodo.press('Enter');
    
    // タスク1を完了にする
    await page.getByTestId('todo-item').filter({ hasText: 'タスク1' }).getByRole('checkbox').check();
    
    // Activeフィルターをクリック
    await page.getByRole('link', { name: 'Active' }).click();
    await expect(page.getByTestId('todo-item')).toHaveCount(1);
    await expect(page.getByTestId('todo-item')).toContainText('タスク2');
    
    // Completedフィルターをクリック
    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(page.getByTestId('todo-item')).toHaveCount(1);
    await expect(page.getByTestId('todo-item')).toContainText('タスク1');
  });
});
```

## 5. NPMスクリプトの設定

### 5.1 package.jsonの更新
```json
{
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    "test:report": "playwright show-report"
  }
}
```

各スクリプトの説明：
- `test`: すべてのテストをヘッドレスモードで実行
- `test:ui`: UIモードで実行（視覚的にテストを確認できる）
- `test:debug`: デバッグモードで実行（ステップごとに実行）
- `test:report`: テスト結果のHTMLレポートを表示

## 6. Playwrightの主要概念

### 6.1 セレクター（要素の選択方法）
- **`getByRole()`**: アクセシビリティロールで選択（推奨）
  ```typescript
  page.getByRole('button', { name: 'Submit' })
  ```
- **`getByText()`**: テキスト内容で選択
  ```typescript
  page.getByText('Hello World')
  ```
- **`getByPlaceholder()`**: プレースホルダーで選択
  ```typescript
  page.getByPlaceholder('Enter your name')
  ```
- **`getByTestId()`**: data-testid属性で選択
  ```typescript
  page.getByTestId('submit-button')
  ```

### 6.2 アサーション（検証）
- **`toHaveTitle()`**: ページタイトルの確認
- **`toBeVisible()`**: 要素が表示されているか確認
- **`toContainText()`**: テキストを含むか確認
- **`toHaveClass()`**: CSSクラスを持つか確認
- **`toHaveCount()`**: 要素の数を確認

### 6.3 アクション
- **`click()`**: クリック
- **`fill()`**: テキスト入力
- **`press()`**: キー入力
- **`check()`/`uncheck()`**: チェックボックス操作
- **`selectOption()`**: セレクトボックス操作

## 7. テストの実行

### 7.1 基本的な実行コマンド
```bash
# すべてのテストを実行
npm test

# 特定のファイルのみ実行
npx playwright test tests/todo-app.spec.ts

# 特定のテスト名で絞り込み
npx playwright test -g "should add"

# ブラウザを表示して実行
npx playwright test --headed

# 特定のブラウザでのみ実行
npx playwright test --project=chromium
```

### 7.2 デバッグ方法
```bash
# UIモード（推奨）
npm run test:ui

# デバッグモード
npm run test:debug

# コード内でのデバッグ
await page.pause(); // この行で実行が一時停止
```

## 8. Playwright UIモードの使い方

### 8.1 UIモードの起動
```bash
npm run test:ui
```

### 8.2 UIモードでのテスト実行方法
UIモードが起動すると、以下のような画面が表示されます：

1. **左サイドバー**: テストファイルとテストケースの一覧
2. **中央パネル**: テストコードとブラウザプレビュー
3. **右パネル**: テスト実行時のアクションログ

#### テストを実行する手順：
1. 左サイドバーでテストファイル（例：`todo-app.spec.ts`）を選択
2. 実行したいテストケースの横にある**再生ボタン（▶）**をクリック
3. または、ファイル名の横の再生ボタンで全テストを実行

#### UIモードの便利な機能：
- **Watch Mode**: ファイルを保存すると自動的にテストが再実行される
- **Time Travel**: テストの各ステップをクリックすると、その時点のブラウザ状態を確認できる
- **Locator Picker**: ブラウザ上の要素をクリックして、セレクターを生成できる
- **並列実行の可視化**: 複数のテストが同時に実行される様子を確認できる

### 8.3 トラブルシューティング
もしUIモードでテストが表示されない場合：
1. `tests`フォルダ内に`.spec.ts`ファイルがあることを確認
2. ブラウザのキャッシュをクリア（Cmd+Shift+R）
3. UIモードを再起動

## 9. 学習のポイント

1. **セレクターの優先順位**
   - ユーザー視点のセレクター（role、text）を優先
   - テストIDは最後の手段

2. **アサーションの使い方**
   - Playwrightのアサーションは自動リトライ機能付き
   - 要素が表示されるまで待機してくれる

3. **並列実行**
   - デフォルトでテストは並列実行される
   - 依存関係がある場合は`test.describe.serial()`を使用

4. **トレース機能**
   - 失敗時の原因調査に便利
   - スクリーンショット、ネットワークログなどが記録される