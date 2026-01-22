"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * バッチ処理の結果を保持するためのクラス。
 * * @author Chang Kejun
 */
function Batch() {
	if (this == null) { throw new Packages.efw.NewKeywordWasForgottenException("Batch"); }
	this.errorlevel = 0;
	this.logs = [];
	this.echos = [];
};

/**
 * バッチのエラーレベル（終了コード）。
 */
Batch.prototype.errorlevel = null;
/**
 * ログメッセージを保持する配列。
 */
Batch.prototype.logs = null;
/**
 * エコーメッセージを保持する配列。
 */
Batch.prototype.echos = null;

/**
 * 他のBatchオブジェクトの結果を現在のオブジェクトに結合します。
 * * @param {Batch} batch: 必須。結合対象のBatchオブジェクト。<br>
 * @returns {Batch} メソッドチェーン用の自分自身のインスタンス。
 */
Batch.prototype.concat = function (batch) {
	if (batch) {
		// 高い方のエラーレベルを維持する
		if (this.errorlevel < batch.errorlevel) this.errorlevel = batch.errorlevel;
		if (batch.logs) {
			this.logs = this.logs.concat(batch.logs);
		}
		if (batch.echos) {
			this.echos = this.echos.concat(batch.echos);
		}
	}
	return this;
};
/**
 * エラーレベル（終了コード）を設定します。
 * * @param {Number} errorlevel: 必須。設定するエラーレベル。<br>
 * @returns {Batch} メソッドチェーン用の自分自身のインスタンス。
 */
Batch.prototype.exit = function (errorlevel) {
	this.errorlevel = errorlevel;
	return this;
};
/**
 * ログメッセージを追加します。
 * * @param {String} message: 必須。ログに出力する文字列。<br>
 * @returns {Batch} メソッドチェーン用の自分自身のインスタンス。
 */
Batch.prototype.log = function (message) {
	this.logs.push(message);
	return this;
};
/**
 * エコーメッセージを追加します。
 * * @param {String} message: 必須。表示（エコー）する文字列。<br>
 * @returns {Batch} メソッドチェーン用の自分自身のインスタンス。
 */
Batch.prototype.echo = function (message) {
	this.echos.push(message);
	return this;
};