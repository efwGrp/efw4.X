# Formatter and Rounder

## Number Formatter

| 半角 | 全角 |
|---|---|
| 0 | ０ |
| # | ＃ |
| , | ， |
| . | ． |
| % | ％ |

## Date Formatter

| 半角 | 全角 | 示例 |
|---|---|---|
| GGGGy | ＧＧＧＧｙ | 日本和历, 2016 -- 平成28 |
| Gy | Ｇｙ | 日本和历, 2016 -- H28 |
| yyyy | ｙｙｙｙ |  |
| yy | ｙｙ |  |
| MM | ＭＭ |  |
| M | Ｍ |  |
| dd | ｄｄ |  |
| d | ｄ |  |
| HH | ＨＨ |  |
| H | Ｈ |  |
| mm | ｍｍ |  |
| m | ｍ |  |
| ss | ｓｓ |  |
| s | ｓ |  |
| SSS | ＳＳＳ |  |
| S | Ｓ |  |
| JSON_DATE |  | 2024-01-17T02:11:18.605Z |

## Number Rounder

| 舍入方式 | 5.5 | 2.5 | 1.6 | 1.1 | 1.0 | -1.0 | -1.1 | -1.6 | -2.5 | -5.5 |
|---|---|---|---|---|---|---|---|---|---|---|
| UP (向上) | 6 | 3 | 2 | 2 | 1 | -1 | -2 | -2 | -3 | -6 |
| DOWN (向下) | 5 | 2 | 1 | 1 | 1 | -1 | -1 | -1 | -2 | -5 |
| CEILING (向上取整) | 6 | 3 | 2 | 2 | 1 | -1 | -1 | -1 | -2 | -5 |
| FLOOR (向下取整) | 5 | 2 | 1 | 1 | 1 | -1 | -2 | -2 | -3 | -6 |
| HALF_UP (四舍五入) | 6 | 3 | 2 | 1 | 1 | -1 | -1 | -2 | -3 | -6 |
| HALF_DOWN (五舍六入) | 5 | 2 | 2 | 1 | 1 | -1 | -1 | -2 | -2 | -5 |
| HALF_EVEN (偶数位舍入) | 6 | 2 | 2 | 1 | 1 | -1 | -1 | -2 | -2 | -6 |