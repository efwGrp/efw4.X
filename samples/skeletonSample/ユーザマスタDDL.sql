-- DROP TABLE "ユーザマスタ";

CREATE TABLE "ユーザマスタ"
(
  "ユーザID" character varying(10) NOT NULL, -- ユーザID
  "パスワード" character varying(10), -- パスワード
  "ユーザ名" character varying(20), -- ユーザ名
  "メール" character varying(50), -- メール
  "コメント" character varying(200), -- コメント
  "初期化フラグ" integer, -- 初期化フラグ	 1：初期パスワードの場合　...
  "ロックフラグ" integer, -- ロックフラグ
  "パスワード更新日" date, -- パスワード更新日
  "作成日時" date, -- 作成日時
  "作成者" character varying(10), -- 作成者
  "更新日時" date, -- 更新日時
  "更新者" character varying(10), -- 更新者
  CONSTRAINT "ユーザマスタ_PKC" PRIMARY KEY ("ユーザID")
)