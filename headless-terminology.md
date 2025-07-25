# Headless/Headed の語源

## なぜ "Head" なのか？

### Headless（ヘッドレス）
- **Head（頭）+ less（なし）= 頭なし**
- コンピュータ用語で「画面（GUI）なし」の意味
- 「頭」= 「画面・ディスプレイ」の比喩

### Headed（ヘッデッド）
- **Head（頭）+ ed（あり）= 頭あり**
- Headlessの反対語として作られた
- 「画面（GUI）あり」の意味

## 由来

もともとは「Headless Server」から来ています：
- **通常のコンピュータ**: モニター（頭）+ 本体
- **Headless Server**: モニターなし、本体のみ

この概念がブラウザにも適用されました：
- **通常のブラウザ**: GUI（頭）+ エンジン
- **Headless Browser**: GUIなし、エンジンのみ

## 他の分野での使用例

### Headless CMS
- 管理画面（頭）と表示部分が分離
- APIのみ提供

### Headless Commerce
- フロントエンド（頭）とバックエンドが分離
- API経由で連携

## Playwrightでの使い方

```bash
# 頭なし（画面なし）- デフォルト
npx playwright test

# 頭あり（画面あり）
npx playwright test --headed
```

## なぜ "head" じゃなくて "headed"？

英語の文法的な理由：

### 形容詞として使うため
- **head**: 名詞（頭）
- **headed**: 形容詞（頭を持った）
- **headless**: 形容詞（頭を持たない）

```bash
# 文法的に正しい
npx playwright test --headed    # headed mode（形容詞）
npx playwright test --headless  # headless mode（形容詞）

# これだと名詞になってしまう
npx playwright test --head  ❌  # head mode？
```

### 英語の形容詞パターン
- one-**armed** = 片腕の
- blue-**eyed** = 青い目の
- long-**haired** = 長髪の
- **headed** = 頭を持つ

### 対義語のバランス
- head**less**（接尾辞 -less = なし）
- head**ed**（接尾辞 -ed = あり）

対になる形容詞として作られています。

## 覚え方

🖥️ **Headed** = 画面（頭）あり = 見える
👻 **Headless** = 画面（頭）なし = 見えない

シンプルに「画面の有無」と覚えればOKです！