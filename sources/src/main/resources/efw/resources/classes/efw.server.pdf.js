"use strict";
/**** efw4.X Copyright 2025 efwGrp ****/
/**
 * PDFファイルを操作するためのクラス。
 * 新規PDFを作成する場合も、テンプレートファイルから作成する必要があります。
 * @param {String} path - 必須。テンプレートとなるPDFファイルのパス。
 * @author Chang Kejun
 * @constructor
 */
function Pdf(path) {
	if (this == null) { throw new Packages.efw.NewKeywordWasForgottenException("Pdf"); }
	this._pdf = Packages.efw.pdf.PdfManager.open(path);
};

/**
 * PDFオブジェクトをファイルに保存します。
 * @param {String} path - 必須。保存先の相対パス（ストレージフォルダ基準）。
 * @returns {Pdf} メソッドチェーン用の自分自身のインスタンス。
 */
Pdf.prototype.save = function (path) {
	this._pdf.save(path);
	return this;
};

/**
 * PDFファイルのハンドルを閉じ、リソースを解放します。
 */
Pdf.prototype.close = function () {
	Packages.efw.pdf.PdfManager.close(this._pdf.getKey());
};

/**
 * すべてのPDFハンドルを一括で閉じ、リソースを解放します。
 * @private
 */
Pdf.prototype._closeAll = function () {
	Packages.efw.pdf.PdfManager.closeAll();
};

/**
 * 操作中のPDFインスタンスを保持する内部プロパティ。
 * @type {Object}
 * @private
 */
Pdf.prototype._pdf = null;

/**
 * PDFフォームのフィールドに値を設定します。
 * @param {String} fieldName - 必須。フィールド名。
 * @param {String} [fieldValue=""] - 任意。設定する値。
 * @returns {Pdf} メソッドチェーン用の自分自身のインスタンス。
 */
Pdf.prototype.setField = function (fieldName, fieldValue) {
	if (fieldValue == null) fieldValue = "";
	this._pdf.setField(fieldName, fieldValue);
	return this;
}

/**
 * HTML文字列をPDFに変換します。
 * @param {String} html - 必須。変換対象のHTML文字列。
 * @param {String} baseUrl - 必須。外部リソース（画像等）を解決するためのベースURL。
 * @param {String} pdfPath - 必須。出力先のPDFパス。
 * @param {String} fontsPath - 必須。使用するフォントが格納されているパス。
 * @param {Boolean} [fontsPathIsAbs=false] - 任意。fontsPathが絶対パスかどうか。
 */
Pdf.html2pdf = function (html, baseUrl, pdfPath, fontsPath, fontsPathIsAbs) {
	var fl = fontsPathIsAbs
		? Packages.efw.file.FileManager.getByAbsolutePath(fontsPath)
		: Packages.efw.file.FileManager.get(fontsPath);
	Packages.efw.pdf.PdfManager.html2pdf(html, baseUrl, pdfPath, fl);
};

/**
 * 指定されたパスに含まれるすべてのフォント名の配列を取得します。
 * @param {String} fontsPath - 必須。フォントが格納されているパス。
 * @param {Boolean} [fontsPathIsAbs=false] - 任意。fontsPathが絶対パスかどうか。
 * @returns {Array} フォント名の配列。
 */
Pdf.getFontNames = function (fontsPath, fontsPathIsAbs) {
	var fl = fontsPathIsAbs
		? Packages.efw.file.FileManager.getByAbsolutePath(fontsPath)
		: Packages.efw.file.FileManager.get(fontsPath);
	var ary = Packages.efw.pdf.PdfManager.getFontNames(fl);
	var ret = [];
	for (var i = 0; i < ary.length; i++) {
		ret.push("" + ary[i]);
	}
	return ret;
}

/**
 * コンソールにデバッグ情報を出力します。
 * @param {String} [label=""] - 任意。デバッグ出力のラベル。
 * @returns {Pdf} メソッドチェーン用の自分自身のインスタンス。
 */
Pdf.prototype.debug = function (label) {
	if (!label)
		label = "";
	java.lang.System.out.println("-----" + label + "-----");
	java.lang.System.out.println("This is an instance of Pdf class.");
	return this;
};