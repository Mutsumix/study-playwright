import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
  test('should add a new todo', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    const newTodo = page.getByPlaceholder('What needs to be done?');
    
    await newTodo.fill('買い物に行く');
    await newTodo.press('Enter');
    
    await expect(page.getByTestId('todo-item')).toContainText('買い物に行く');
  });

  test('should complete a todo', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    const newTodo = page.getByPlaceholder('What needs to be done?');
    
    await newTodo.fill('宿題を終わらせる');
    await newTodo.press('Enter');
    
    await page.getByTestId('todo-item').getByRole('checkbox').check();
    
    await expect(page.getByTestId('todo-item')).toHaveClass(/completed/);
  });

  test('should filter todos', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
    
    const newTodo = page.getByPlaceholder('What needs to be done?');
    
    await newTodo.fill('タスク1');
    await newTodo.press('Enter');
    
    await newTodo.fill('タスク2');
    await newTodo.press('Enter');
    
    await page.getByTestId('todo-item').filter({ hasText: 'タスク1' }).getByRole('checkbox').check();
    
    await page.getByRole('link', { name: 'Active' }).click();
    await expect(page.getByTestId('todo-item')).toHaveCount(1);
    await expect(page.getByTestId('todo-item')).toContainText('タスク2');
    
    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(page.getByTestId('todo-item')).toHaveCount(1);
    await expect(page.getByTestId('todo-item')).toContainText('タスク1');
  });
});