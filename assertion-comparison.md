# JUnit vs Playwright アサーション比較

## 基本的な違い

### JUnit (Java)
```java
import static org.junit.Assert.*;

@Test
public void testExample() {
    assertEquals("expected", actual);
    assertTrue(condition);
    assertNotNull(object);
}
```

### Playwright (TypeScript/JavaScript)
```typescript
import { expect } from '@playwright/test';

test('example', async ({ page }) => {
    await expect(page).toHaveTitle('expected');
    await expect(element).toBeVisible();
    await expect(element).not.toBeNull();
});
```

## 主な違いと特徴

### 1. 非同期処理
- **JUnit**: 同期的（即座に評価）
- **Playwright**: 非同期的（`await`が必要）

### 2. 自動リトライ
- **JUnit**: リトライなし（即座に失敗）
- **Playwright**: デフォルト5秒間リトライ（要素が条件を満たすまで待機）

### 3. Web特化のアサーション
Playwrightには、Web要素専用のアサーションが豊富：

```typescript
// Playwright独自のWebアサーション
await expect(page).toHaveURL('https://example.com');
await expect(element).toBeVisible();
await expect(element).toBeHidden();
await expect(element).toBeEnabled();
await expect(element).toBeDisabled();
await expect(element).toHaveText('Hello');
await expect(element).toContainText('Hello');
await expect(element).toHaveValue('input value');
await expect(element).toHaveAttribute('href', '/link');
await expect(element).toHaveClass('active');
await expect(element).toHaveCount(3);
```

## 対応表

| JUnit | Playwright | 説明 |
|-------|------------|------|
| `assertEquals(expected, actual)` | `expect(actual).toBe(expected)` | 完全一致 |
| `assertTrue(condition)` | `expect(condition).toBeTruthy()` | 真であることを確認 |
| `assertFalse(condition)` | `expect(condition).toBeFalsy()` | 偽であることを確認 |
| `assertNull(object)` | `expect(object).toBeNull()` | nullであることを確認 |
| `assertNotNull(object)` | `expect(object).not.toBeNull()` | nullでないことを確認 |
| `assertArrayEquals(expected, actual)` | `expect(actual).toEqual(expected)` | 配列の比較 |
| `assertThrows()` | `expect(async () => {}).toThrow()` | 例外のテスト |

## Playwrightの利点

### 1. 自動待機機能
```typescript
// これは要素が表示されるまで最大5秒待つ
await expect(element).toBeVisible();

// JUnitでは手動で待機処理が必要
WebDriverWait wait = new WebDriverWait(driver, 10);
wait.until(ExpectedConditions.visibilityOf(element));
assertTrue(element.isDisplayed());
```

### 2. より読みやすい構文
```typescript
// Playwright
await expect(page).toHaveTitle(/.*Playwright.*/);

// JUnit + Selenium
assertTrue(driver.getTitle().contains("Playwright"));
```

### 3. 否定の表現
```typescript
// Playwright
await expect(element).not.toBeVisible();

// JUnit
assertFalse(element.isDisplayed());
```

## 実用例

```typescript
test('実践的なアサーション例', async ({ page }) => {
  await page.goto('https://example.com');
  
  // ページタイトル
  await expect(page).toHaveTitle('Example Domain');
  
  // URL確認
  await expect(page).toHaveURL(/.*example.com/);
  
  // 要素の存在と表示
  const heading = page.getByRole('heading', { level: 1 });
  await expect(heading).toBeVisible();
  await expect(heading).toHaveText('Example Domain');
  
  // 複数要素のカウント
  const links = page.getByRole('link');
  await expect(links).toHaveCount(1);
  
  // 属性の確認
  await expect(links.first()).toHaveAttribute('href', 'https://www.iana.org/domains/example');
});
```

## まとめ

- **基本的な考え方は同じ**: テスト対象の状態を検証
- **Playwrightは非同期**: `await`を忘れずに
- **自動リトライ**: 要素が条件を満たすまで待ってくれる
- **Web専用メソッド**: より直感的で読みやすい