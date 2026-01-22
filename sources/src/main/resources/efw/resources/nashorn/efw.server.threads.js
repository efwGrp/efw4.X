"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * 複数のスレッドを並列に実行・管理するためのクラス。
 * * @author Hsu Shang Cheng
 * @constructor
 * @param {Number} [maxCount=4] - 同時に実行を許可する最大スレッド数。
 */
function Threads(maxCount) {
	if (this == null) { throw new Packages.efw.NewKeywordWasForgottenException("Threads"); }
	this._threads = [];
	if (maxCount) {
		this._maxCount = maxCount;
	}
}

/**
 * スレッドオブジェクトを保持する内部配列。
 */
Threads.prototype._threads = null;

/**
 * 同時実行制御用の最大カウント数（デフォルトは4）。
 */
Threads.prototype._maxCount = 4;

/**
 * 並列実行したいスレッドオブジェクトを追加します。
 * 追加されるオブジェクトは `run` メソッドを実装している必要があります。
 * * @param {Object} thread - 実行ロジックを持つオブジェクト。
 * @returns {this} メソッドチェーン用の自インスタンス。
 */
Threads.prototype.add = function (thread) {
	this._threads.push(thread);

	return this;
};

/**
 * 追加されたすべてのスレッドを並列に実行し、すべての完了を待機します。
 * JavaのSemaphoreを使用して同時実行数を制限します。
 * * @returns {Record} すべてのスレッドオブジェクトの結果を含むRecordオブジェクト。
 */
Threads.prototype.run = function () {
	var handles = [];
	// 同時実行数を制限するためのセマフォを生成
	var semaphore = new java.util.concurrent.Semaphore(this._maxCount);

	for (var i = 0; i < this._threads.length; i++) {
		// 元のrunメソッドをバックアップ
		this._threads[i]._run = this._threads[i].run;

		// Javaスレッドから呼び出される新しいrunメソッドを定義
		this._threads[i].run = function () {
			try {
				// パーミッションを取得（空きが出るまで待機）
				semaphore.acquire();
				this._run();
			} catch (e) {
				// エラー時は標準出力へ（デバッグ用）
				java.lang.System.out.println(e);
			} finally {
				// パーミッションを解放
				semaphore.release();
			}
		};

		// Javaのスレッドとして生成して開始
		handles[i] = new java.lang.Thread(
			new java.lang.Runnable(this._threads[i])
		);
		handles[i].start();
	}

	// すべてのスレッドが終了するのを待機
	for (var i = 0; i < this._threads.length; i++) {
		handles[i].join();
	}

	// 実行結果を含むRecordオブジェクトを返す
	return new Record(this._threads);
};