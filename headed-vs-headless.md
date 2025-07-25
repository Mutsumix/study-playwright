# Headed vs Headless モード解説

## --headed オプションの意味

`--headed`は「ブラウザのGUI（画面）を表示してテストを実行する」という意味です。

## 2つのモードの違い

### 1. Headless モード（デフォルト）
```bash
npx playwright test
```
- **ブラウザは起動するが画面は表示されない**
- バックグラウンドで実行
- 高速
- CI/CD環境向け
- メモリ使用量が少ない

### 2. Headed モード
```bash
npx playwright test --headed
```
- **実際のブラウザウィンドウが表示される**
- テストの動作を目で確認できる
- デバッグに便利
- 少し遅い
- 開発時に推奨

## 実行例の違い

### Headlessモード（画面なし）
```
Running 3 tests using 3 workers

  ✓ 1 [chromium] › example.spec.ts:3:5 › has title (2s)
  ✓ 2 [chromium] › example.spec.ts:9:5 › get started link (1s)
  ✓ 3 [chromium] › todo-app.spec.ts:4:8 › Todo App › should add (1s)

  3 passed (4s)
```
↑ ターミナルに結果だけ表示

### Headedモード（画面あり）
- Chromiumブラウザが起動
- ページ遷移が見える
- クリックやタイピングが見える
- テストの流れが視覚的に理解できる

## 使い分け

| シーン | 推奨モード | 理由 |
|--------|-----------|------|
| 開発中 | `--headed` | 動作を確認しながら開発 |
| デバッグ | `--headed` | 問題箇所を視覚的に特定 |
| CI/CD | デフォルト（headless） | 高速で効率的 |
| デモ・説明 | `--headed` | 他の人に見せる時 |

## その他の表示オプション

```bash
# フルスクリーンで表示
npx playwright test --headed --viewport-size=1920,1080

# 特定のブラウザサイズ
npx playwright test --headed --viewport-size=375,667  # iPhone SE

# デバイスエミュレーション
npx playwright test --headed --device="iPhone 13"
```

## 設定ファイルでの指定

```typescript
// playwright.config.ts
export default defineConfig({
  use: {
    // 常にheadedモードにする
    headless: false,
    
    // または環境変数で制御
    headless: process.env.CI ? true : false,
  },
});
```

## よくある質問

### Q: headedモードでもテストが速すぎて見えない
A: スローモーションを追加：
```typescript
// playwright.config.ts
use: {
  launchOptions: {
    slowMo: 1000, // 1秒遅延
  },
}
```

### Q: headlessとheadedで結果が違う
A: まれに発生。原因：
- 画面サイズの違い
- レンダリングエンジンの微妙な差
- タイミングの問題

### Q: どちらが正式な結果？
A: 両方とも正式。ただしCI/CDではheadlessが標準

## まとめ

- **Headless（デフォルト）**: 画面なし、高速、CI向け
- **Headed（--headed）**: 画面あり、視覚的、開発・デバッグ向け

開発時は`--headed`を使って、テストの動作を確認しながら進めるのがおすすめです！