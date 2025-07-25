import { test, expect } from '@playwright/test';

test.describe('視覚的デモテスト', () => {
  test('ゆっくり動作するTodo追加デモ', async ({ page }) => {
    // ページに移動
    await page.goto('https://demo.playwright.dev/todomvc');
    await page.waitForTimeout(1000);
    
    // 入力欄を見つける
    const newTodo = page.getByPlaceholder('What needs to be done?');
    
    // 入力欄にマウスオーバー
    await newTodo.hover();
    await page.waitForTimeout(500);
    
    // クリックして入力準備
    await newTodo.click();
    await page.waitForTimeout(500);
    
    // ゆっくりタイピング
    await newTodo.pressSequentially('Playwrightでテストを書く', { delay: 100 });
    await page.waitForTimeout(1000);
    
    // Enterで追加
    await newTodo.press('Enter');
    await page.waitForTimeout(1000);
    
    // 追加されたことを確認
    await expect(page.getByTestId('todo-item')).toContainText('Playwrightでテストを書く');
    
    // チェックボックスをゆっくりクリック
    const checkbox = page.getByTestId('todo-item').getByRole('checkbox');
    await checkbox.hover();
    await page.waitForTimeout(500);
    await checkbox.click();
    await page.waitForTimeout(1000);
    
    // 完了状態を確認
    await expect(page.getByTestId('todo-item')).toHaveClass(/completed/);
  });
});