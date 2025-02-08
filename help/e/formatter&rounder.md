# Formatter and Rounder

## Number Formatter

| Half Width | Full Width |
|---|---|
| 0 | ０ |
| # | ＃ |
| , | ， |
| . | ． |
| % | ％ |

## Date Formatter

| Half Width | Full Width | Example |
|---|---|---|
| GGGGy | ＧＧＧＧｙ | Japan WAREKI, 2016 -- 平成28 |
| Gy | Ｇｙ | Japan WAREKI, 2016 -- H28 |
| yyyy | ｙｙｙｙ |  |
| yy | ｙ |  |
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

| Number Rounder | 5.5 | 2.5 | 1.6 | 1.1 | 1.0 | -1.0 | -1.1 | -1.6 | -2.5 | -5.5 |
|---|---|---|---|---|---|---|---|---|---|---|
| UP | 6 | 3 | 2 | 2 | 1 | -1 | -2 | -2 | -3 | -6 |
| DOWN | 5 | 2 | 1 | 1 | 1 | -1 | -1 | -1 | -2 | -5 |
| CEILING | 6 | 3 | 2 | 2 | 1 | -1 | -1 | -1 | -2 | -5 |
| FLOOR | 5 | 2 | 1 | 1 | 1 | -1 | -2 | -2 | -3 | -6 |
| HALF_UP | 6 | 3 | 2 | 1 | 1 | -1 | -1 | -2 | -3 | -6 |
| HALF_DOWN | 5 | 2 | 2 | 1 | 1 | -1 | -1 | -2 | -2 | -5 |
| HALF_EVEN | 6 | 2 | 2 | 1 | 1 | -1 | -1 | -2 | -2 | -6 |