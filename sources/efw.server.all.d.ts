/**** efw4.X Copyright 2026 efwGrp ****/
/**
 * _eventfolder 定数は、イベント フォルダーの絶対パスを格納するために設定されています。
 */
declare const _eventfolder: string;

/**
 * _isdebug 定数は、 efw.isdebug のプロパティ値を格納するために設定されています。
 */
declare const _isdebug: boolean;
/**
 * バッチ処理の結果を保持するためのクラス。
 * @author Chang Kejun
 */
declare class Batch {
  /**
   * バッチのエラーレベル（終了コード）。
   * @private
   */
  private errorlevel: number;

  /**
   * ログメッセージを保持する配列。
   * @private
   */
  private logs: string[];

  /**
   * エコーメッセージを保持する配列。
   * @private
   */
  private echos: string[];

  /**
   * Batchクラスのコンストラクタ。
   */
  constructor();

  /**
   * 他のBatchオブジェクトの結果を現在のオブジェクトに結合します。
   * @param {Batch} batch 必須。結合対象のBatchオブジェクト。
   * @returns {Batch} メソッドチェーン用の自分自身のインスタンス。
   */
  concat(batch: Batch): Batch;

  /**
   * エラーレベル（終了コード）を設定します。
   * @param {number} errorlevel 必須。設定するエラーレベル。
   * @returns {Batch} メソッドチェーン用の自分自身のインスタンス。
   */
  exit(errorlevel: number): Batch;

  /**
   * ログメッセージを追加します。
   * @param {string} message 必須。ログに出力する文字列。
   * @returns {Batch} メソッドチェーン用の自分自身のインスタンス。
   */
  log(message: string): Batch;

  /**
   * エコーメッセージを追加します。
   * @param {string} message 必須。表示（エコー）する文字列。
   * @returns {Batch} メソッドチェーン用の自分自身のインスタンス。
   */
  echo(message: string): Batch;
}

/**
 * バイナリファイルを読み込むためのクラス。
 * @author Chang kejun
 */
declare class BinaryReader {
  /**
   * @param {string} path - 必須。ファイルパス。
   * @param {number[]} aryFieldsDef - 必須。各フィールドのバイト長を定義した配列。
   * @param {string[]} aryEncoding - 必須。各フィールドの文字コードを定義した配列。
   * @param {number} rowSize - 必須。1行あたりの総バイト長。
   * @param {number} [skipRows] - 任意。スキップする行数。
   * @param {number} [rowsToRead] - 任意。読み込む最大行数。
   */
  constructor(
    path: string,
    aryFieldsDef: number[],
    aryEncoding: string[],
    rowSize: number,
    skipRows?: number,
    rowsToRead?: number,
  );

  /**
   * リーダーオープン時の排他制御用ロッカー。
   * @private
   */
  private _locker: any;

  /**
   * ファイルパスを保持する内部プロパティ。
   * @private
   */
  private _path: string;

  /**
   * フィールド長定義配列を保持する内部プロパティ。
   * @private
   */
  private _aryFieldsDef: number[];

  /**
   * エンコーディング定義配列を保持する内部プロパティ。
   * @private
   */
  private _aryEncoding: string[];

  /**
   * 1行のサイズ（バイト）を保持する内部プロパティ。
   * @private
   */
  private _rowSize: number;

  /**
   * スキップ行数を保持する内部プロパティ。
   * @private
   */
  private _skipRows: number;

  /**
   * 読み込み制限行数を保持する内部プロパティ。
   * @private
   */
  private _rowsToRead: number;

  /**
   * 全ての行を読み込み、2次元配列として返します。
   * @returns {string[][]} 1行ごとのフィールド配列を格納したマトリックス。
   */
  readAllLines(): string[][];

  /**
   * 全ての行をループし、各行に対してコールバック関数を実行します。
   * @param {Function} callback - 必須。実行するコールバック関数。引数は(aryField, intNum)。
   */
  loopAllLines(callback: (aryField: string[], intNum: number) => void): void;
}

/**
 * バイナリファイルを書き込むためのクラス。
 * @author Chang Kejun
 */
declare class BinaryWriter {
  /**
   * @param {string} path - 必須。出力ファイルパス。
   * @param {number[]} aryFieldsDef - 必須。フィールド長定義配列。
   * @param {string[]} aryEncoding - 必須。エンコーディング定義配列。
   * @param {number} rowSize - 必須。1行のバイト長。
   */
  constructor(
    path: string,
    aryFieldsDef: number[],
    aryEncoding: string[],
    rowSize: number,
  );

  /**
   * ファイルパスを保持する内部プロパティ。
   * @private
   */
  private _path: string;

  /**
   * フィールド長定義配列を保持する内部プロパティ。
   * @private
   */
  private _aryFieldsDef: number[];

  /**
   * エンコーディング定義配列を保持する内部プロパティ。
   * @private
   */
  private _aryEncoding: string[];

  /**
   * 1行のサイズ（バイト）を保持する内部プロパティ。
   * @private
   */
  private _rowSize: number;

  /**
   * Java側のバイナリライターインスタンスを保持する内部プロパティ。
   * @private
   */
  private _printWriter: any;

  /**
   * Java側のバイナリライターを閉じます。
   */
  close(): void;

  /**
   * 全てのバイナリライターを一括で閉じます。
   * @private
   */
  private _closeAll(): void;

  /**
   * 全ての行をファイルに一括書き込みします。
   * @param {any[][]} aryLines - 必須。書き込むデータの2次元配列。
   */
  writeAllLines(aryLines: any[][]): void;

  /**
   * 1行のデータをファイルに書き込みます。
   * @param {any[]} aryLine - 必須。書き込むデータの配列。
   */
  writeLine(aryLine: any[]): void;

  /**
   * 配列データを定義に基づいて結合し、バイナリバッファを作成する内部関数。
   * @param {any[]} aryLine - 必須。1行分のデータ配列。
   * @returns {any} バイナリデータ（バイト配列）。
   * @private
   */
  private _join(aryLine: any[]): any;
}

/**
 * CSVファイルを読み込むためのクラス。
 * @author Chang Kejun
 */
declare class CSVReader {
  /**
   * @param {string} path - 必須。ストレージ内の相対パス。
   * @param {string} [separator=","] - 任意。項目区切り文字。
   * @param {string} [delimiter="\""] - 任意。囲み文字。
   * @param {string} [encoding="UTF-8"] - 任意。文字エンコーディング。
   * @param {number} [skipRows] - 任意。読み込み開始前にスキップする行数。
   * @param {number} [rowsToRead] - 任意。読み込む最大行数。
   * @param {number} [offsetBytes] - 任意。読み込み開始位置のバイトオフセット。
   * @param {number} [offsetRows] - 任意。読み込み開始位置の行オフセット。
   */
  constructor(
    path: string,
    separator?: string,
    delimiter?: string,
    encoding?: string,
    skipRows?: number,
    rowsToRead?: number,
    offsetBytes?: number,
    offsetRows?: number,
  );

  /**
   * CSVリーダーオープン時の排他制御用ロッカー。
   * @private
   */
  private _locker: any;

  /**
   * ファイルパスを保持する内部プロパティ。
   * @private
   */
  private _path: string;

  /**
   * 項目区切り文字。
   * @private
   */
  private _separator: string;

  /**
   * 項目囲み文字。
   * @private
   */
  private _delimiter: string;

  /**
   * 文字エンコーディング。
   * @private
   */
  private _encoding: string;

  /**
   * 分割処理用の正規表現オブジェクト。
   * @private
   */
  private _match: RegExp;

  /**
   * 現在のバイトオフセット位置。
   * @private
   */
  private _offsetBytes: number;

  /**
   * 現在の行オフセット位置。
   * @private
   */
  private _offsetRows: number;

  /**
   * スキップする行数。
   * @private
   */
  private _skipRows: number;

  /**
   * 読み込む最大行数。
   * @private
   */
  private _rowsToRead: number;

  /**
   * 改行コード（デフォルト "\r\n"）。
   * @private
   */
  private _CRLFCode: string;

  /**
   * すべての行を読み込み、配列のマトリックス（2次元配列）として返します。
   * @param {string} [CRLFCode] - 任意。改行コードを指定。
   * @returns {string[][]}
   */
  readAllLines(CRLFCode?: string): string[][];

  /**
   * すべての行をループし、各行に対してコールバック関数を実行します。
   * 大容量ファイルの処理に適しています。
   * @param {(aryField: string[], index: number) => void} callback - 必須。
   * @param {string} [CRLFCode] - 任意。改行コードを指定。
   */
  loopAllLines(
    callback: (aryField: string[], index: number) => void,
    CRLFCode?: string,
  ): void;

  /**
   * 1行の文字列を、区切り文字と囲み文字に従って配列に分割する内部関数。
   * @private
   */
  private _split(rowdata: string, index: number): string[];
}

/**
 * CSVファイルを書き出すためのクラス。
 * @author Chang Kejun
 */
declare class CSVWriter {
  /**
   * @param {string} path - 必須。出力先の相対パス。
   * @param {string} [separator=","] - 任意。項目区切り文字。
   * @param {string} [delimiter="\""] - 任意。項目囲み文字。
   * @param {string} encoding - 必須。文字エンコーディング。
   */
  constructor(
    path: string,
    separator?: string,
    delimiter?: string,
    encoding?: string,
  );

  /**
   * ファイルパスを保持する内部プロパティ。
   * @private
   */
  private _path: string;

  /**
   * 項目区切り文字。
   * @private
   */
  private _separator: string;

  /**
   * 項目囲み文字。
   * @private
   */
  private _delimiter: string;

  /**
   * 文字エンコーディング。
   * @private
   */
  private _encoding: string;

  /**
   * Java側のPrintWriterインスタンス。
   * @private
   */
  private _printWriter: any;

  /**
   * Java側のライターを閉じ、リソースを解放します。
   */
  close(): void;

  /**
   * 全てのCSVライターを一括で閉じます。
   * @private
   */
  private _closeAll(): void;

  /**
   * 指定された配列データをすべてファイルに書き出します。
   * @param {any[][]} aryLines - 必須。書き出すデータの配列（2次元）。
   */
  writeAllLines(aryLines: any[][]): void;

  /**
   * 配列データを1行としてファイルに書き出します。
   * @param {any[]} aryLine - 必須。書き出すデータの配列。
   */
  writeLine(aryLine: any[]): void;

  /**
   * 配列を区切り文字と囲み文字に従って1本の文字列に結合する内部関数。
   * @private
   */
  private _join(aryLine: any[]): string;
}

/**
 * Excelファイルを操作するためのクラス。
 * 同一イベント内で同じファイルを複数回オープンしないでください。
 * 新規ファイルを作成する場合も、テンプレートファイルから作成する必要があります。
 * @author Chang Kejun
 */
declare class Excel {
  /**
   * @param {string} path - 必須。ファイルパス。
   * @param {boolean} [isLarge=false] - 任意。大量データ(SXSSF)モードを使用するかどうか。
   */
  constructor(path: string, isLarge?: boolean);

  /**
   * 操作中のワークブックインスタンスを保持する内部プロパティ。
   * @private
   */
  private _workbook: any;

  /**
   * ワークブックをファイルに保存します。
   * @param {string} path - 必須。保存先の相対パス（ストレージフォルダ基準）。
   * @param {string} [password=""] - 任意。設定するパスワード。
   * @returns {Excel} メソッドチェーン用の自分自身のインスタンス。
   */
  save(path: string, password?: string): Excel;

  /**
   * Excelファイルのハンドルを閉じ、リソースを解放します。
   */
  close(): void;

  /**
   * すべてのExcelハンドルを一括で閉じ、リソースを解放します。
   * @private
   */
  private _closeAll(): void;

  /**
   * 指定したシートの最終行番号を取得します。
   * @param {string} sheetName - 必須。シート名。
   * @returns {number} 1から始まる行番号。
   */
  getMaxRow(sheetName: string): number;

  /**
   * 指定したシートの最終列番号を取得します。
   * @param {string} sheetName - 必須。シート名。
   * @returns {number} 1から始まる列番号。
   */
  getMaxCol(sheetName: string): number;

  /**
   * シートから複数の行データを配列として取得します。
   * @param {string} sheetName - 必須。シート名。
   * @param {number} startRow - 必須。開始行（1から開始）。
   * @param {number | ((row: number) => boolean)} endCondition - 必須。終了行番号、または終了判定関数。
   * @param {object | any[]} positionRowMaps - 必須。データ取得位置のマッピング定義。
   * @returns {any[]} 取得したデータのオブジェクト配列。
   */
  getArray(
    sheetName: string,
    startRow: number,
    endCondition: number | ((row: number) => boolean),
    positionRowMaps: object | any[],
  ): any[];

  /**
   * シートから定義に基づき、単一のデータオブジェクトを取得します。
   * @param {string} sheetName - 必須。シート名。
   * @param {object} positionMap - 必須。{"data1": "A1", "data2": ["B1", "#,##0"]} 形式のマッピング。
   * @returns {any} 取得したデータのオブジェクト。
   */
  getSingle(sheetName: string, positionMap: object): any;

  /**
   * @private
   */
  private _getSingle(
    sheetName: string,
    positionMap: object,
    currentRow?: number,
  ): any;

  /**
   * セルから値を取得します。フォーマッタを使用して文字列として取得することも可能です。
   * @param {string} sheetName - 必須。シート名。
   * @param {string} position - 必須。"A1"形式などのセル位置。
   * @param {string} [formatter] - 任意。数値や日付の書式（"#,##0"、"yyyy/MM/dd"など）。
   * @param {string} [rounder="HALF_EVEN"] - 任意。丸め処理の方法（UP, DOWN, HALF_UP等）。
   * @returns {string | number | Date | boolean} セルの値。
   */
  getValue(
    sheetName: string,
    position: string,
    formatter?: string,
    rounder?: string,
  ): string | number | Date | boolean;

  /**
   * ワークブック内の全シート名の配列を取得します。
   * @returns {string[]} シート名の配列。
   */
  getSheetNames(): string[];

  /**
   * 新しいシートを作成するか、既存のシートをコピー（クローン）します。
   * @param {string} sheetName - 必須。作成する新しいシートの名前。
   * @param {string} [copyFrom] - 任意。コピー元となる既存のシート名。
   * @returns {Excel}
   */
  createSheet(sheetName: string, copyFrom?: string): Excel;

  /**
   * シートの印刷範囲を設定します。
   * @param {string} sheetName - 必須。シート名。
   * @param {number} startRow - 必須。開始行（0ベース）。
   * @param {number} endRow - 必須。終了行（0ベース）。
   * @param {number} startCol - 必須。開始列（0ベース）。
   * @param {number} endCol - 必須。終了列（0ベース）。
   * @returns {Excel}
   */
  setPrintArea(
    sheetName: string,
    startRow: number,
    endRow: number,
    startCol: number,
    endCol: number,
  ): Excel;

  /**
   * 指定したシートを削除します。
   * @param {string} sheetName - 必須。シート名。
   * @returns {Excel}
   */
  removeSheet(sheetName: string): Excel;

  /**
   * セルにハイパーリンクを設定します。
   * @param {string} sheetName - 必須。シート名。
   * @param {string} position - 必須。セル位置（"A1"など）。
   * @param {string} linkUrl - 必須。リンク先のURL。
   * @returns {Excel}
   */
  setLink(sheetName: string, position: string, linkUrl: string): Excel;

  /**
   * シートの順序（タブの位置）を移動します。
   * @param {string} sheetName - 必須。シート名。
   * @param {number} order - 必須。並び順（1から開始）。
   * @returns {Excel}
   */
  setSheetOrder(sheetName: string, order: number): Excel;

  /**
   * 指定したシートをアクティブ状態に設定します。
   * @param {string} sheetName - 必須。シート名。
   * @returns {Excel}
   */
  setActiveSheet(sheetName: string): Excel;

  /**
   * セルに値を設定します。テンプレートを指定することで書式や数式、結合状態もコピー可能です。
   * @param {string} sheetName - 必須。シート名。
   * @param {string} position - 必須。セル位置（"A1"など）。
   * @param {string | number | Date | boolean | null} value - 必須。設定する値。
   * @param {string} [templateSheetName] - 任意。書式コピー元のシート名。
   * @param {string} [templatePosition] - 任意。書式コピー元のセル位置。
   * @returns {Excel}
   */
  setCell(
    sheetName: string,
    position: string,
    value: string | number | Date | boolean | null,
    templateSheetName?: string,
    templatePosition?: string,
  ): Excel;

  /**
   * 指定したセル位置が、図形（Shape）によって囲まれているかどうかを判定します。
   * @param {string} sheetName - 必須。シート名。
   * @param {string} position - 必須。セル位置。
   * @param {number} [checkpointXRate=0.5] - 任意。セル内のチェックポイントX座標割合(0-1)。
   * @param {number} [checkpointYRate=0.5] - 任意。セル内のチェックポイントY座標割合(0-1)。
   * @returns {boolean} 囲まれている場合はtrue。
   */
  isEncircled(
    sheetName: string,
    position: string,
    checkpointXRate?: number,
    checkpointYRate?: number,
  ): boolean;

  /**
   * テンプレート図形をコピーして、指定したセルを囲むように配置します（印影など）。
   * @param {string} sheetName - 必須。出力先シート名。
   * @param {string} position - 必須。配置位置（"A1"など）。
   * @param {string} templateSheetName - 必須。コピー元図形があるシート名。
   * @param {string} templateShapeName - 必須。コピー元図形の名前。
   * @param {number} [shapeCenterXRate=0.5] - 任意。セル幅に対する図形中心のX座標割合。
   * @param {number} [shapeCenterYRate=0.5] - 任意。セル高さに対する図形中心のY座標割合。
   * @param {number} [shapeWidthRate=0.5] - 任意。セル幅に対する図形の幅の割合。
   * @param {number} [shapeHeightRate=0.5] - 任意。セル高さに対する図形の高さの割合。
   * @returns {Excel}
   */
  encircle(
    sheetName: string,
    position: string,
    templateSheetName: string,
    templateShapeName: string,
    shapeCenterXRate?: number,
    shapeCenterYRate?: number,
    shapeWidthRate?: number,
    shapeHeightRate?: number,
  ): Excel;

  /**
   * セル内に図形（Shape）を追加します。
   * @param {string} sheetName - 必須。シート名。
   * @param {string} position - 必須。セル位置。
   * @param {string} templateSheetName - 必須。コピー元図形があるシート名。
   * @param {string} templateShapeName - 必須。コピー元図形の名前。
   * @param {string} [text=""] - 任意。図形に設定するテキスト。
   * @param {number} [x=0] - 任意。セル内のX座標オフセット。
   * @param {number} [y=0] - 任意。セル内のY座標オフセット。
   * @param {number} [width=0] - 任意。図形の幅。
   * @param {number} [height=0] - 任意。図形の高さ。
   * @returns {Excel}
   */
  addShape(
    sheetName: string,
    position: string,
    templateSheetName: string,
    templateShapeName: string,
    text?: string,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
  ): Excel;

  /**
   * セル範囲を覆うように図形（Shape）を追加します。
   * @param {string} sheetName - 必須。シート名。
   * @param {string} firstCellPosition - 必須。範囲の開始セル。
   * @param {string} lastCellPosition - 必須。範囲の終了セル。
   * @param {string} templateSheetName - 必須。テンプレート図形があるシート名。
   * @param {string} templateShapeName - 必須。テンプレート図形の名前。
   * @param {string} [text=""] - 任意。設定するテキスト。
   * @param {number} [x1=0] - 任意。開始セル内の開始X座標。
   * @param {number} [y1=0] - 任意。開始セル内の開始Y座標。
   * @param {number} [x2=0] - 任意。終了セル内の終了X座標。
   * @param {number} [y2=0] - 任意。終了セル内の終了Y座標。
   * @returns {Excel}
   */
  addShapeInRange(
    sheetName: string,
    firstCellPosition: string,
    lastCellPosition: string,
    templateSheetName: string,
    templateShapeName: string,
    text?: string,
    x1?: number,
    y1?: number,
    x2?: number,
    y2?: number,
  ): Excel;

  /**
   * 既存の図形（Shape）内の画像を新しい画像に差し替えます。
   * @param {string} sheetName - 必須。シート名。
   * @param {string} shapeName - 必須。図形の名前。
   * @param {string} newPicturePath - 必須。新しい画像のパス。
   * @returns {Excel}
   */
  replacePicture(
    sheetName: string,
    shapeName: string,
    newPicturePath: string,
  ): Excel;

  /**
   * 行を挿入します。
   * @param {string} sheetName - 必須。シート名。
   * @param {number} startRow - 必須。挿入位置（0ベース）。
   * @param {number} [n=1] - 任意。挿入する行数。
   * @returns {Excel}
   */
  addRow(sheetName: string, startRow: number, n?: number): Excel;

  /**
   * 行を削除します。
   * @param {string} sheetName - 必須。シート名。
   * @param {number} startRow - 必須。削除開始位置（0ベース）。
   * @param {number} [n=1] - 任意。削除する行数。
   * @returns {Excel}
   */
  delRow(sheetName: string, startRow: number, n?: number): Excel;

  /**
   * 指定した範囲の行を表示します。
   * @param {string} sheetName - 必須。シート名。
   * @param {number} startRow - 必須。削除開始位置（0ベース）。
   * @param {number} [endRow] - 任意。終了行（デフォルトはstartRow）。
   * @returns {Excel}
   */
  showRow(sheetName: string, startRow: number, endRow?: number): Excel;

  /**
   * 指定した範囲の行を非表示にします。
   * @param {string} sheetName - 必須。シート名。
   * @param {number} startRow - 必須。開始行（0ベース）。
   * @param {number} [endRow] - 任意。終了行（デフォルトはstartRow）。
   * @returns {Excel}
   */
  hideRow(sheetName: string, startRow: number, endRow?: number): Excel;

  /**
   * 指定した範囲の列を表示します。
   * @param {string} sheetName - 必須。シート名。
   * @param {number} startCol - 必須。開始列（0ベース）。
   * @param {number} [endCol] - 任意。終了列（デフォルトはstartCol）。
   * @returns {Excel}
   */
  showCol(sheetName: string, startCol: number, endCol?: number): Excel;

  /**
   * 指定した範囲の列を非表示にします。
   * @param {string} sheetName - 必須。シート名。
   * @param {number} startCol - 必須。開始列（0ベース）。
   * @param {number} [endCol] - 任意。終了列（デフォルトはstartCol）。
   * @returns {Excel}
   */
  hideCol(sheetName: string, startCol: number, endCol?: number): Excel;

  /**
   * 指定したシートを表示状態にします。
   * @param {string} sheetName - 必須。シート名。
   * @returns {Excel}
   */
  showSheet(sheetName: string): Excel;

  /**
   * 指定したシートを非表示状態にします。
   * @param {string} sheetName - 必須。シート名。
   * @returns {Excel}
   */
  hideSheet(sheetName: string): Excel;

  /**
   * シートの表示倍率（ズーム）を設定します。
   * @param {string} sheetName - 必須。シート名。
   * @param {number} percent - 必須。倍率（100で100%）。
   * @returns {Excel}
   */
  zoomSheet(sheetName: string, percent: number): Excel;

  /**
   * コンソールにデバッグ情報を出力します。
   * @param {string} [label=""] - 任意。デバッグ出力のラベル。
   */
  debug(label?: string): Excel;
}

/**
 * PDFファイルを操作するためのクラス。
 * 新規PDFを作成する場合も、テンプレートファイルから作成する必要があります。
 * @author Chang Kejun
 */
declare class Pdf {
  /**
   * @param {string} path - 必須。テンプレートとなるPDFファイルのパス。
   */
  constructor(path: string);

  /**
   * 操作中のPDFインスタンスを保持する内部プロパティ。
   * @private
   */
  private _pdf: any;

  /**
   * PDFオブジェクトをファイルに保存します。
   * @param {string} path - 必須。保存先の相対パス（ストレージフォルダ基準）。
   * @returns {Pdf} メソッドチェーン用の自分自身のインスタンス。
   */
  save(path: string): Pdf;

  /**
   * PDFファイルのハンドルを閉じ、リソースを解放します。
   */
  close(): void;

  /**
   * すべてのPDFハンドルを一括で閉じ、リソースを解放します。
   * @private
   */
  private _closeAll(): void;

  /**
   * PDFフォームのフィールドに値を設定します。
   * @param {string} fieldName - 必須。フィールド名。
   * @param {string} [fieldValue=""] - 任意。設定する値。
   * @returns {Pdf} メソッドチェーン用の自分自身のインスタンス。
   */
  setField(fieldName: string, fieldValue?: string): Pdf;

  /**
   * HTML文字列をPDFに変換します。
   * @param {string} html - 必須。変換対象のHTML文字列。
   * @param {string} baseUrl - 必須。外部リソース（画像等）を解決するためのベースURL。
   * @param {string} pdfPath - 必須。出力先のPDFパス。
   * @param {string} fontsPath - 必須。使用するフォントが格納されているパス。
   * @param {boolean} [fontsPathIsAbs=false] - 任意。fontsPathが絶対パスかどうか。
   */
  static html2pdf(
    html: string,
    baseUrl: string,
    pdfPath: string,
    fontsPath: string,
    fontsPathIsAbs?: boolean,
  ): void;

  /**
   * 指定されたパスに含まれるすべてのフォント名の配列を取得します。
   * @param {string} fontsPath - 必須。フォントが格納されているパス。
   * @param {boolean} [fontsPathIsAbs=false] - 任意。fontsPathが絶対パスかどうか。
   * @returns {string[]} フォント名の配列。
   */
  static getFontNames(fontsPath: string, fontsPathIsAbs?: boolean): string[];

  /**
   * コンソールにデバッグ情報を出力します。
   * @param {string} [label=""] - 任意。デバッグ出力のラベル。
   * @returns {Pdf} メソッドチェーン用の自分自身のインスタンス。
   */
  debug(label?: string): Pdf;
}

/**
 * 配列データを操作するためのクラス。
 * @author Chang Kejun
 */
declare class EfwRecord {
  /**
   * @param {any[]} [array=[]] - 任意。基となるオブジェクト配列。
   */
  constructor(array?: any[]);

  /**
   * レコードの件数。
   */
  length: number;

  /**
   * 保持しているレコード配列。
   * @private
   */
  private values: any[];

  /**
   * レコードを検索（フィルタリング）します。
   * @param {string} field - 必須。検索対象のフィールド名。
   * @param {"eq" | "gt" | "lt" | "like" | "!eq" | "!gt" | "!lt" | "!like"} action - 必須。比較演算子。
   * @param {string | number | Date | boolean} value - 必須。比較する値。likeの場合は "%値%" 形式が使用可能。
   * @returns {EfwRecord} 検索結果を保持する新しいRecordインスタンス。
   */
  seek(
    field: string,
    action: "eq" | "gt" | "lt" | "like" | "!eq" | "!gt" | "!lt" | "!like",
    value: string | number | Date | boolean,
  ): EfwRecord;

  /**
   * レコードをソートします。
   * @param {string} field - 必須。ソート対象のフィールド名。
   * @param {"asc" | "desc" | "ASC" | "DESC"} action - 必須。ソート順 [ asc | desc ]。
   * @returns {EfwRecord} ソート後のRecordインスタンス。
   */
  sort(field: string, action: "asc" | "desc" | "ASC" | "DESC"): EfwRecord;

  /**
   * すべてのキー名を大文字に変換します。
   * @returns {EfwRecord} 変換後のRecordインスタンス。
   */
  makeAllKeysUpperCase(): EfwRecord;

  /**
   * すべてのキー名を小文字に変換します。
   * @returns {EfwRecord} 変換後のRecordインスタンス。
   */
  makeAllKeysLowerCase(): EfwRecord;

  /**
   * 指定されたマッピングルールに従ってレコードの形式を変換します。
   * @param {RecordMapping} mapping - 必須。マッピング定義。
   * @returns {EfwRecord} 変換後のRecordインスタンス。
   */
  map(mapping: RecordMapping): EfwRecord;

  /**
   * 最初のレコードを取得します（ディープコピー）。
   * @returns {any} 最初のデータアイテム。空の場合は空オブジェクト。
   */
  getSingle(): any;

  /**
   * レコード全体を配列として取得します（ディープコピー）。
   * @returns {any[]} オブジェクト配列。
   */
  getArray(): any[];

  /**
   * 最初のレコードから指定したフィールドの値を取得します。
   * @param {string} field - 必須。フィールド名。
   * @returns {string | number | Date | boolean | null} フィールドの値。
   */
  getValue(field: string): string | number | Date | boolean | null;

  /**
   * 指定されたフィールドでレコードをグルーピング（階層化）します。
   * @param {...string} fields - 必須。グルーピングのキーとする1つ以上のフィールド名。
   * @returns {any | null} 階層化されたオブジェクト。
   */
  group(...fields: string[]): any | null;

  /**
   * コンソールにデバッグ情報を出力します。
   * @param {string} [label=""] - 任意。出力ラベル。
   * @returns {EfwRecord}
   */
  debug(label?: string): EfwRecord;
}

/**
 * EfwRecord.map メソッドで使用するマッピング定義の型。
 */
interface RecordMapping {
  [newField: string]:
  | string //旧フィールド
  | [string, string?, string?] // [旧フィールド, フォーマット, 丸め]
  | ((rsdata: any) => any);
}

/**
 * イベントの実行結果を保持するクラス。
 * クライアント側へ送信する描画命令やアクション（alert, navigate等）を蓄積します。
 * @author Chang Kejun
 */
declare class Result {
  /**
   * @param {boolean} [withoutI18nTranslation=false] - 任意。多言語翻訳（i18n）を行わない場合はtrue。
   */
  constructor(withoutI18nTranslation?: boolean);

  /**
   * クライアントサイドで実行するアクション群。
   * @private
   */
  private actions: {
    show?: string;
    hide?: string;
    disable?: string;
    enable?: string;
    navigate?: { url: string; params?: any };
    download?: {
      zip?: string[];
      file?: string;
      zipBasePath?: string;
      isAbs?: boolean;
      saveas?: string;
      password?: string;
      deleteafterdownload?: boolean;
    };
    alert?: string[];
    alertTitle?: string;
    highlight?: string;
    focus?: string;
    error?: { clientMessageId: string; params?: any };
    confirm?: { message: string; buttons: any };
    confirmTitle?: string;
    eval?: string[];
    preview?: { file: string | string[]; isAbs?: boolean };
    progress?: { message: string; percent: number; closeFlag?: boolean };
  };

  /**
   * クライアントサイドへ返すデータ値および描画命令の配列。
   */
  values: Array<{
    runat?: string;
    remove?: string;
    append?: string;
    withdata?: any;
  }>;

  /**
   * 多言語翻訳をスキップするかどうかのフラグ。
   * @private
   */
  private withoutI18nTranslation: boolean;

  /**
   * クライアント側のコールバックへ渡す生データ。
   * @private
   */
  private data?: any;

  /**
   * データ反映の対象となる要素（セレクタ）を指定し、描画命令を開始します。
   * @param {string} [selector] - 任意。jQueryセレクタ形式の文字列。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  runat(selector?: string): Result;

  /**
   * 直前に指定した描画命令に対して、削除対象の要素を指定します。
   * @param {String} selector - 必須。削除する要素のセレクタ。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  remove(selector: string): Result;

  /**
   * 直前に指定した描画命令に対して、HTMLテンプレート（マスク）を指定します。
   * @param {string} mask - 必須。追加する要素のHTMLテンプレート名。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  append(mask: string): Result;

  /**
   * 直前に指定した描画命令に対して、反映するデータを指定します。
   * @param {any[]|object} data - 必須。反映するデータ。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  withdata(data: any[] | object): Result;

  /**
   * 別の Result オブジェクトの内容を現在の Result に統合します。
   * @param {Result} result - 必須。統合元の Result インスタンス。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  concat(result: Result): Result;

  /**
   * クライアント側で要素を表示します。
   * @param {string} selector - 必須。表示する要素のセレクタ。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  show(selector: string): Result;

  /**
   * クライアント側で要素を非表示にします。
   * @param {string} selector - 必須。非表示にする要素のセレクタ。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  hide(selector: string): Result;

  /**
   * クライアント側で要素を無効化（disabled）します。
   * @param {string} selector - 必須。無効化する要素のセレクタ。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  disable(selector: string): Result;

  /**
   * クライアント側で要素を有効化します。
   * @param {string} selector - 必須。有効化する要素のセレクタ。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  enable(selector: string): Result;

  /**
   * クライアント側で別のURLに画面遷移させます。
   * @param {string} url - 必須。遷移先のURL。
   * @param {object} [params] - 任意。URLパラメータ。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  navigate(url: string, params?: object): Result;

  /**
   * クライアント側へ送信（ダウンロード）するファイルやフォルダを添付します。
   * @param {string|string[]} path - 必須。添付するファイルまたはフォルダの相対パス。
   * @param {string} [zipBasePath] - 任意。ZIP圧縮時のルートフォルダ名。
   * @param {boolean} [isAbs=false] - 任意。パスを絶対パスとして扱うかどうか。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  attach(
    path: string | string[],
    zipBasePath?: string,
    isAbs?: boolean,
  ): Result;

  /**
   * ダウンロード時のファイル名およびパスワードを設定します。
   * @param {string} filename - 必須。保存時のファイル名。
   * @param {string} [password] - 任意。暗号化用パスワード。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  saveas(filename: string, password?: string): Result;

  /**
   * ダウンロード完了後、サーバー上の元ファイルを削除するフラグを立てます。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  deleteAfterDownload(): Result;

  /**
   * クライアント側でアラートメッセージを表示します。
   * @param {string|string[]} message - 必須。表示するメッセージまたはメッセージの配列。
   * @param {string} [title] - 任意。アラートダイアログのタイトル。
   * @param {object} [params] - 任意。メッセージ内に埋め込むパラメータ。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  alert(message: string | string[], title?: string, params?: object): Result;
  /**
   * クライアント側でアラートメッセージを表示します。
   * @param {string|string[]} message - 必須。表示するメッセージまたはメッセージの配列。
   * @param {object} [params] - 任意。メッセージ内に埋め込むパラメータ。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  alert(message: string | string[], params?: object): Result;

  /**
   * 指定した要素をハイライト（強調）表示します（主にエラー箇所等）。
   * @param {string} selector - 必須。対象要素のセレクタ。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  highlight(selector: string): Result;

  /**
   * 指定した要素にフォーカスを当てます。
   * @param {string} selector - 必須。対象要素のセレクタ。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  focus(selector: string): Result;

  /**
   * クライアント側へエラーメッセージIDを通知します。
   * @param {string} clientMessageId - 必須。メッセージID。
   * @param {object} [params] - 任意。埋め込みパラメータ。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  error(clientMessageId: string, params?: object): Result;

  /**
   * クライアント側で確認ダイアログを表示します。
   * @param {string} message - 必須。メッセージ。
   * @param {object} buttons - 必須。ボタン構成（コールバック等）。
   * @param {string} [title] - 任意。タイトル。
   * @param {object} [params] - 任意。埋め込みパラメータ。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  confirm(
    message: string,
    buttons: object,
    title?: string,
    params?: object,
  ): Result;
  /**
   * クライアント側で確認ダイアログを表示します。
   * @param {string} message - 必須。メッセージ。
   * @param {object} buttons - 必須。ボタン構成（コールバック等）。
   * @param {object} [params] - 任意。埋め込みパラメータ。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  confirm(message: string, buttons: object, params?: object): Result;

  /**
   * クライアント側で任意のJavaScriptを実行します。
   * @param {string|string[]} script - 必須。実行するスクリプト。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  eval(script: string | string[]): Result;

  /**
   * コンソールにデバッグ情報を出力します。
   * @param {string} [label=""] - 任意。デバッグ用のラベル。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  debug(label?: string): Result;

  /**
   * クライアント側でファイルをプレビュー（PDF表示等）させます。
   * @param {string} filePath - 必須。ファイルパス。
   * @param {boolean} [isAbs=false] - 任意。絶対パスかどうか。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  preview(filePath: string, isAbs?: boolean): Result;

  /**
   * クライアント側の Efw() コールバック関数へ渡す生データをセットします。
   * @param {any} data - 必須。渡すデータ。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  provide(data: any): Result;

  /**
   * バックグラウンド実行時、クライアント側のプログレスバーの状態を更新します。
   * @param {string} message - 必須。表示メッセージ。
   * @param {number} percent - 必須。進捗率（0-100）。
   * @param {boolean} [closeFlag=false] - 任意。完了時に閉じるかどうか。
   * @returns {Result} メソッドチェーン用の自分自身のインスタンス。
   */
  progress(message: string, percent: number, closeFlag?: boolean): Result;
}

/**
 * @deprecated テキストファイル（TXT）を読み込むためのクラス。
 * 正規表現による分割、または固定長での読み込みに対応しています。
 * @author Liu Xinyu
 */
declare class TXTReader {
  /**
   * @param {string} path - 必須。ファイルパス。
   * @param {string} regFieldsDef - 必須。フィールドを抽出するための正規表現文字列。
   * @param {string} [encoding="UTF-8"] - 任意。ファイルの文字エンコーディング。
   * @param {number} [rowSize=-1] - 任意。1行のバイトサイズ（固定長読み込みの場合に指定）。
   * @param {number} [skipRows=-1] - 任意。読み飛ばす行数（rowSize指定時のみ有効）。
   * @param {number} [rowsToRead=-1] - 任意。読み込む最大行数（rowSize指定時のみ有効）。
   */
  constructor(
    path: string,
    regFieldsDef: string,
    encoding?: string,
    rowSize?: number,
    skipRows?: number,
    rowsToRead?: number,
  );

  /**
   * リーダーオープン時の排他制御用ロッカー。
   * @private
   */
  private _locker: any;

  /** @private */
  private _path: string;
  /** @private */
  private _regFieldsDef: string;
  /** @private */
  private _regFieldsDefRegExp: RegExp;
  /** @private */
  private _encoding: string;
  /** @private */
  private _rowSize: number;
  /** @private */
  private _skipRows: number;
  /** @private */
  private _rowsToRead: number;

  /**
   * すべての行を読み込み、配列の行列（マトリックス）として取得します。
   * @returns {string[][]} フィールド値の配列を格納した二次元配列。
   */
  readAllLines(): string[][];

  /**
   * すべての行をループし、各行の内容をコールバック関数に渡します。
   * @param {(aryField: string[], intNum: number) => void} callback - 必須。
   */
  loopAllLines(callback: (aryField: string[], intNum: number) => void): void;

  /**
   * 行文字列を定義済みの正規表現に従って分割し、フィールド配列を作成します。
   * @param {string} rowdata - 必須。行の生データ。
   * @param {number} index - 必須。現在の行番号。
   * @returns {string[]} 分割後のフィールド配列。
   * @throws {Packages.efw.CsvTxtDataException} 正規表現にマッチしなかった場合。
   * @private
   */
  private _split(rowdata: string, index: number): string[];
}

/**
 * @deprecated 複数のスレッドを並列に実行・管理するためのクラス。
 * @author Hsu Shang Cheng
 */
declare class Threads {
  /**
   * @param {number} [maxCount=4] - 同時に実行を許可する最大スレッド数。
   */
  constructor(maxCount?: number);

  /**
   * スレッドオブジェクトを保持する内部配列。
   * @private
   */
  private _threads: Array<ThreadObject>;

  /**
   * 同時実行制御用の最大カウント数（デフォルトは4）。
   * @private
   */
  private _maxCount: number;

  /**
   * 並列実行したいスレッドオブジェクトを追加します。
   * 追加されるオブジェクトは run メソッドを実装している必要があります。
   * @param {ThreadObject} thread - 実行ロジックを持つオブジェクト。
   * @returns {Threads} メソッドチェーン用の自インスタンス。
   */
  add(thread: ThreadObject): Threads;

  /**
   * 追加されたすべてのスレッドを並列に実行し、すべての完了を待機します。
   * JavaのSemaphoreを使用して同時実行数を制限します。
   * @returns {EfwRecord} すべてのスレッドオブジェクトの結果を含むRecordオブジェクト。
   */
  run(): EfwRecord;
}

/**
 * Threads.add で受け入れるスレッドオブジェクトのインターフェース。
 */
interface ThreadObject {
  /**
   * スレッドで実行するロジックを実装します。
   */
  run: () => void;
  /**
   * 実行結果などを保持するために、任意のプロパティを付与できます。
   */
  [key: string]: any;
  /**
   * 内部で元のrunを保持するために使用されます。
   * @private
   */
  _run?: () => void;
}

/**
 * efwフレームワークのサーバーサイド基盤を管理するクラス。
 * クライアントからのリクエスト（POST, RestAPI）やバッチ処理の実行を制御します。
 * @author Chang Kejun
 */
declare class Efw {
  constructor();

  /**
   * グローバル汚染チェックを回避するために登録された予約キーのリスト。
   * @private
   */
  private _keys: string[];

  /**
   * 新しいキーを予約リストに登録し、グローバル汚染チェックの対象外にします。
   * @param {string} key - 登録する変数名。
   */
  register(key: string): void;

  /**
   * 指定されたキーが予約リストに含まれているか確認します。
   * @param {string} key - 確認する変数名。
   */
  contains(key: string): boolean;

  /**
   * システムの初期化処理を行います。
   * @private
   */
  private doInit(): void;

  /**
   * システムの終了処理を実行します。
   * @private
   */
  private doDestroy(): void;

  /**
   * デフォルトの破棄処理を保持するためのプロパティ。
   * @private
   */
  private doDefaultDestroy: (() => void) | null;

  /**
   * クライアントからのAjaxリクエストを処理します。
   * @param {string} req - クライアントから送信されたJSON文字列。
   * @returns {string} クライアントへ返す翻訳済みのJSON文字列。
   * @private
   */
  private doPost(req: string): string;

  /**
   * バッチ処理リクエストを処理します。
   * @param {string} req - バッチ起動パラメータを含むJSON文字列。
   * @private
   */
  private doBatch(req: string): void;

  /**
   * RestAPIリクエストを処理します。
   * @param {string} eventId - イベントID。
   * @param {string} reqkeys - URLパスから抽出されたキーのJSON配列文字列。
   * @param {"PUT" | "GET" | "POST" | "DELETE"} httpMethod - HTTPメソッド。
   * @param {string} reqParams - リクエストボディのJSON文字列。
   * @returns {string | void} 処理結果のJSON文字列。
   * @private
   */
  private doRestAPI(
    eventId: string,
    reqkeys: string,
    httpMethod: "PUT" | "GET" | "POST" | "DELETE",
    reqParams: string,
  ): string | void;

  /**
   * 特定の処理（アップロード等）から指定された関数を直接呼び出します。
   * @private
   */
  private callFunction(funcNm: string, reqParams: string): string;

  /**
   * WebSocketを使用してクライアントにデータを送信します。
   * @param {Result} result - 送信するResultオブジェクト。
   * @returns {boolean} 成功した場合はtrue。
   */
  wsSend(result: Result): boolean;
}

/**
 * efwフレームワークのグローバルインスタンス。
 */
declare const efw: Efw;

/**
 * efw framework server library extension definitions
 */

// JSONオブジェクトの拡張
interface JSON {
  /**
   * JSONオブジェクトを拡張し、ディープコピー（深層複製）機能を提供します。
   * @param obj - コピー元のオブジェクト。
   * @param {boolean} execFuncFlag - 任意。値が関数の場合、実行した結果をコピーするかどうか。
   */
  clone<T>(obj: T, execFuncFlag?: boolean): T;
}

// 共通のdebugメソッドを持つインターフェース
interface Debuggable {
  /**
   * コンソールに内容をダンプします。
   * @param label - 出力時のラベル。
   */
  debug(label?: string): this;
}

// 標準インターフェースの拡張
interface String extends Debuggable {
  /**
   * 文字列をBase64でエンコードします。
   * @returns {string} Base64文字列。
   */
  base64Encode(): string;
  /**
   * 文字列をURIセーフなBase64（パディングなし）でエンコードします。
   * @returns {string} URIセーフBase64文字列。
   */
  base64EncodeURI(): string;
  /**
   * Base64でエンコードされた文字列をデコードします。
   * @returns {string} デコード後の文字列。
   */
  base64Decode(): string;
  /**
   * 文字列を列挙型フォーマットに従って変換します。
   * @param {string} formatter - {enum} 形式の文字列。
   * @returns {string}
   */
  format(formatter: string): string;
}

interface StringConstructor {
  /**
   * 値を文字列として解析・変換します。
   * @param {string} value - 対象の値。
   * @param {string} [formatter] - 任意。
   * @returns {string}
   */
  parse(value: String, formatter?: string): string;
}

interface Number extends Debuggable {
  /**
   * 数値をフォーマットまたは列挙型（enum）に従って文字列に変換します。
   * @param {string} formatter - フォーマット形式または {enum}。
   * @param {string} rounder - 任意。丸め方式（HALF_EVEN 等）。
   * @returns {string}
   */
  format(formatter: string, rounder?: string): string;
}

interface NumberConstructor {
  /**
   * 値を数値に変換します。
   * @param {string} value - 対象の値。
   * @param {string} [formatter] - 任意。解析フォーマット。
   * @returns {number}
   */
  parse(value: string, formatter?: string): number;
}

interface Date extends Debuggable {
  /**
   * 日付をフォーマットまたは列挙型（enum）に従って文字列に変換します。
   * @param {string} formatter - 日付フォーマットまたは {enum}。
   * @returns {string}
   */
  format(formatter: string): string;
  /**
   * 現在（または指定日）までの経過年数を取得します。
   * @param {Date} current - 基準日。
   * @returns {number}
   */
  getYears(current?: Date): number;
}

interface DateConstructor {
  /**
   * 値を日付（ミリ秒）に変換します。
   * @param {string} value - 対象の値。
   * @param {string} [formatter] - 任意。解析フォーマット。
   * @returns {number|Date}
   */
  parse(value: string, formatter?: string): number;
}

interface Boolean extends Debuggable {
  /**
   * 真偽値を列挙型フォーマットに従って文字列に変換します。
   * @param {string} formatter - {enum} 形式の文字列。
   * @returns {string}
   */
  format(formatter: string): string;
}

interface BooleanConstructor {
  /**
   * 値を真偽値に変換します。
   * @param {string} value - 対象の値。
   * @param {string} [formatter] - 任意。解析フォーマット。
   * @returns {boolean}
   */
  parse(value: string, formatter?: string): boolean;
}

interface Array<T> extends Debuggable { }

interface Function extends Debuggable { }

interface Object extends Debuggable { }

// Mathオブジェクトの拡張
interface Math {
  /**
   * 四捨五入を行います。
   * @param {number} num - 数値。
   * @param {number} digit - 小数点以下の桁数。
   * @returns {number}
   */
  ROUND(num: number, digit: number): number;
  /**
   * 切り上げを行います。
   * @param {number} num - 数値。
   * @param {number} digit - 小数点以下の桁数。
   * @returns {number}
   */
  ROUNDUP(num: number, digit: number): number;
  /**
   * 切り捨てを行います。
   * @param {number} num - 数値。
   * @param {number} digit - 小数点以下の桁数。
   * @returns {number}
   */
  ROUNDDOWN(num: number, digit: number): number;
}

/**
 * ビジネスルールエンジン（BRMS）を呼び出すためのクラス。
 * @author Chang kejun
 */
declare class EfwServerBRMS {
  constructor();

  /**
   * ルールIDを指定してルールを実行し、結果を取得します。
   * @param {string} ruleId - 必須。ルールのID。
   * @param {Map<String, any>} params - 必須。ルールに渡すパラメータ。{key: value, ...} の形式。
   * @param {Date} ruleDate - 任意。適用日。指定がない場合は当日が使用されます。
   * @returns {EfwRecord} 実行結果を格納したRecordオブジェクト。
   */
  getRuleById(
    ruleId: string,
    params: Map<string, any>,
    ruleDate?: Date,
  ): EfwRecord;

  /**
   * ルール名を指定してルールを実行し、結果を取得します。
   * @param {string} ruleName - 必須。ルールの名称。
   * @param {Map<String, any>} params - 必須。ルールに渡すパラメータ。
   * @param {Date} ruleDate - 任意。適用日。
   * @returns {EfwRecord} 実行結果を格納したRecordオブジェクト。
   */
  getRuleByName(
    ruleName: string,
    params: Map<string, any>,
    ruleDate?: Date,
  ): EfwRecord;

  /**
   * エイリアスを指定してルールを実行し、結果を取得します。
   * @param {string} ruleAlias - 必須。ルールの別名（Alias）。
   * @param {Map<String, any>} params - 必須。ルールに渡すパラメータ。
   * @param {Date} ruleDate - 任意。適用日。
   * @returns {EfwRecord} 実行結果を格納したRecordオブジェクト。
   */
  getRuleByAlias(
    ruleAlias: string,
    params: Map<string, any>,
    ruleDate?: Date,
  ): EfwRecord;

  /**
   * ルールエンジンを実行する内部関数。
   * @private
   */
  /**
   * ルールエンジンを実行する内部関数です。
   * JSの型（Number等）をJavaが要求する型（Double等）に変換してBRMSを呼び出します。
   * * @param {Object} executionParams - 実行パラメータ。
   * @param {string} executionParams.codeType - 識別子の種類（ID/NAME/ALIAS）。
   * @param {string} executionParams.ruleIndentifier - 識別子。
   * @param {Map<string, any>} executionParams.params - 入力パラメータ。
   * @param {Date} [executionParams.ruleDate] - 適用日。
   * @returns {any[]} 取得した行データの配列。
   * @private
   */
  private _executeQuery(executionParams: {
    codeType: "CODETYPE_ID" | "CODETYPE_NAME" | "CODETYPE_ALIAS";
    ruleIndentifier: string;
    params: Map<string, any>;
    ruleDate?: Date;
  }): any[];
}

/**
 * BRMS連携用グローバルインスタンス。
 */
declare const brms: EfwServerBRMS;

/**
 * OSのコマンドラインを実行するためのクラス。
 * @author Chang kejun
 */
declare class EfwServerCmd {
  constructor();

  /**
   * OSのコマンドラインを実行します。
   * コマンドの実行ステータスが 0 以外（異常終了）の場合、エラーメッセージを伴う例外をスローします。
   * @param params - 必須。実行するコマンドとその引数を格納した配列。
   * 例: ["ls", "-l", "/tmp"]
   */
  execute(params: string[]): void;
}

/**
 * コマンド実行用グローバルインスタンス。
 */
declare const cmd: EfwServerCmd;

/**
 * アプリケーションコンテキストを操作するためのクラス。
 * サーバー内でのデータの共有や保持を管理します。
 * @author Chang Kejun
 */
declare class EfwServerContext {
  constructor();

  /**
   * コンテキストからデータを取得します。
   * 取得したデータがJSON形式の場合は自動的にJavaScriptオブジェクトに変換し、
   * 日付文字列もDateオブジェクトへ復元します。
   * @param {string} key - コンテキスト情報を識別するキー。
   * @returns {any} 取得したデータ（オブジェクト、プリミティブ、またはJavaオブジェクト）。
   */
  get(key: string): any;

  /**
   * コンテキストにデータを設定します。
   * JavaScriptオブジェクトは自動的にJSON文字列に変換されて保存されます。
   * @param {string} key - コンテキスト情報を識別するキー。
   * @param {any} value - 設定するデータ。
   */
  set(key: string, value: any): void;

  /**
   * コンテキストから指定された情報を削除します。
   * @param {string} key - 削除する情報のキー。
   */
  remove(key: string): void;

  /**
   * JSONからパースされたオブジェクト内の日付文字列を再帰的に走査し、Dateオブジェクトに復元します。
   * @param {any} obj - 復元対象のオブジェクト。
   * @returns {any} 復元後のオブジェクト。
   * @private
   */
  private _restoreDate(obj: any): any;
}

/**
 * コンテキスト操作用グローバルインスタンス。
 */
declare const context: EfwServerContext;

/**
 * クッキー（Cookie）を操作するためのクラス。
 * クライアントのブラウザにデータを一時保持または取得するために使用します。
 * @author Chang Kejun
 */
declare class EfwServerCookie {
  constructor();

  /**
   * 指定されたキーに対応する値をクッキーから取得します。
   * @param {string} key - 取得したいクッキーのキー名。
   * @returns {string|null} クッキーの値。存在しない場合は null を返します。
   */
  get(key: string): string | null;

  /**
   * 指定されたキーと値をクッキーに設定（保存）します。
   * @param {string} key - 設定するクッキーのキー名。
   * @param {string} value - 設定する値。内部で文字列に変換されます。
   */
  set(key: string, value: string): void;
}

/**
 * クッキー操作用グローバルインスタンス。
 */
declare const cookie: EfwServerCookie;

/**
 * データベース操作を行うためのクラス。
 * SQL実行、マスタデータのキャッシュ、トランザクション管理を行います。
 * @author Chang Kejun
 */
declare class EfwServerDb {
  constructor();

  /**
   * データの登録・更新・削除（INSERT/UPDATE/DELETE）を実行します。
   * @param {string} groupId - SQLグループID、または直接実行するSQL文字列。
   * @param {string} sqlId - SQL ID、または直接実行時のJDBCリソース名。
   * @param Map<string, any> params - SQLパラメータ {key: value, ...}。
   * @param {string} [jdbcResourceName] - 使用するJDBCリソース名。
   * @returns {number} 影響を受けた行数。
   */
  change(
    groupId: string,
    sqlId: string,
    params: Map<string, any>,
    jdbcResourceName?: string,
  ): number;
  /**
   * データの登録・更新・削除（INSERT/UPDATE/DELETE）を実行します。
   * @param {string} sql - SQL文字列。
   * @param {string} [jdbcResourceName] - 使用するJDBCリソース名。
   * @returns {number} 影響を受けた行数。
   */
  change(sql: string, jdbcResourceName?: string): number;

  /**
   * データの検索（SELECT）を実行します。
   * @param {string} groupId - SQLグループID、または直接実行するSQL文字列。
   * @param {string} sqlId - SQL ID、または直接実行時のJDBCリソース名。
   * @param Map<string, any> params - SQLパラメータ {key: value, ...}。
   * @param {string} [jdbcResourceName] - 使用するJDBCリソース名。
   * @returns {EfwRecord} 検索結果を保持するRecordオブジェクト。
   */
  select(
    groupId: string,
    sqlId: string,
    params: Map<string, any>,
    jdbcResourceName?: string,
  ): EfwRecord;

  /**
   * データの検索（SELECT）を実行します。
   * @param {string} sql - SQL文字列。
   * @param {string} [jdbcResourceName] - 使用するJDBCリソース名。
   * @returns {EfwRecord} 検索結果を保持するRecordオブジェクト。
   */
  select(sql: string, jdbcResourceName?: string): EfwRecord;

  /**
   * メモリ上のマスタデータを操作します。
   * 指定されたテーブルの内容を全件取得し、メモリにキャッシュします。
   * @param masterId - マスタ（テーブル）名。
   * @param [reload] - 強制的に再読み込みするかどうか。
   * @param [jdbcResourceName] - JDBCリソース名。
   * @returns マスタデータのRecordオブジェクト。
   */
  master(
    masterId: string,
    reload?: boolean,
    jdbcResourceName?: string,
  ): EfwRecord;

  /**
   * メモリ上のマスタデータを操作します。
   * 指定されたテーブルの内容を全件取得し、メモリにキャッシュします。
   * @param masterId - マスタ（テーブル）名。
   * @param [jdbcResourceName] - JDBCリソース名。
   * @returns マスタデータのRecordオブジェクト。
   */
  master(masterId: string, jdbcResourceName?: string): EfwRecord;

  /** マスタ操作用の排他制御用ロッカー */
  private _locker: any;
  /** メモリ内にキャッシュされたマスタデータ */
  private _masters: EfwRecord;

  /** 検索クエリをJavaレイヤーで実行し、JavaScriptの配列に変換します。 */
  private _executeQuery(executionParams: {
    jdbcResourceName?: string;
    groupId?: string;
    sqlId?: string;
    sql?: string;
    params?: Map<string, any>;
  }): any[] | null;

  /** 更新クエリをJavaレイヤーで実行します。 */
  private _executeUpdate(executionParams: {
    jdbcResourceName?: string;
    groupId?: string;
    sqlId?: string;
    sql?: string;
    params?: Map<string, any>;
  }): number;

  /**
   * 指定したJDBCリソースに対してコミットを実行します。
   * @param {String} [jdbcResourceName]
   */
  _commit(jdbcResourceName?: string): void;
  /**
   * 指定したJDBCリソースに対してロールバックを実行します。
   * @param {String} [jdbcResourceName]
   */
  _rollback(jdbcResourceName?: string): void;
  /**
   * すべてのデータベース接続に対して一括コミットを実行します。
   */
  _commitAll(): void;
  /**
   * すべてのデータベース接続に対して一括ロールバックを実行します。
   */
  _rollbackAll(): void;
  /**
   * すべてのデータベース接続を閉じます。
   * @private
   */
  private _closeAll(): void;
}

/**
 * データベース操作用グローバルインスタンス。
 */
declare const db: EfwServerDb;

/**
 * イベントの実行と管理を行うためのクラス。
 * サーバーサイドのビジネスロジック（イベント）の呼び出しを制御します。
 * @author Chang Kejun
 */
declare class EfwServerEvent {
  constructor();

  /**
   * 指定されたイベントを実行（fire）します。
   * 同一サーバー内のイベントだけでなく、別サーバー（CORS）のイベント呼び出しも可能です。
   * @param {string} eventId - 必須。実行するイベントのID。
   * @param {Map<string, any>} [params={}] - 任意。イベントに渡すパラメータ。
   * @param {string} [server] - 任意。別のefwサーバーのURL（例: http://127.0.0.1:8080/app）。
   * @returns {Result} イベントの実行結果（Resultオブジェクト）。
   */
  fire(eventId: string, params?: Map<string, any>, server?: string): Result;
  /** パラメータなしでリモートサーバーを実行する場合のオーバーロード */
  fire(eventId: string, server: string): Result;

  /**
   * グローバルスコープからイベントオブジェクトを取得します。
   * @param {string} eventId - イベントID。
   * @returns {EfwEventInfo|undefined}
   * @private
   */
  private _get(eventId: string): EfwEventInfo;

  /**
   * グローバルスコープにイベントオブジェクトを設定します。
   * @param {string} eventId - イベントID。
   * @param {EfwEventInfo} ev - イベントオブジェクト。
   * @private
   */
  private _set(eventId: string, ev: EfwEventInfo): void;

  /**
   * イベント操作用の排他制御ロッカー。
   * @private
   */
  private _locker: any;

  /**
   * イベントファイルをロードし、メモリ上に展開します。
   * デバッグモードの場合、ファイルの更新日時をチェックして自動的に再ロードを行います。
   * @param {string} eventId - 必須。ロードするイベントID。
   * @param {boolean} [loadingGlobal] - 内部用。global.jsのロード中かどうか。
   * @returns {EfwEventInfo|null} ロードされたイベント情報。
   * @private
   */
  private _load(eventId: string, loadingGlobal?: boolean): EfwEventInfo;
}

/**
 * イベント操作用グローバルインスタンス。
 */
declare const efwEvent: EfwServerEvent;

/**
 * ストレージ内のファイルを操作するためのクラス。
 * @author Chang Kejun
 */
declare class EfwServerFile {
  /**
   * @param {boolean} isAbsolutePath - 絶対パスとして扱う場合は true、ストレージ相対パスの場合は false。
   */
  constructor(isAbsolutePath: boolean);

  /** 絶対パスモードかどうか */
  readonly isAbsolutePath: boolean;

  /**
   * 指定されたパスが存在するかどうかを判定します。
   * @param {string} path - チェック対象のパス。
   * @returns {boolean} 存在する場合は true。
   */
  exists(path: string): boolean;

  /**
   * 指定されたパスがファイルであるか判定します。
   * @param {string} path - チェック対象のパス。
   * @returns {boolean} ファイルの場合は true。
   */
  isFile(path: string): boolean;

  /**
   * 指定されたパスがフォルダ（ディレクトリ）であるか判定します。
   * @param {string} path - チェック対象のパス。
   * @returns {boolean} フォルダの場合は true。
   */
  isFolder(path: string): boolean;

  /**
   * フォルダ内のファイルおよびサブフォルダの一覧情報を取得します。
   * * @param {string} path - 必須。対象フォルダのパス。
   * @param {boolean} [withoutFolderLength] - 任意。trueの場合、フォルダサイズの計算をスキップします。
   * @returns {FileInfo[]} ファイル情報オブジェクトの配列。
   */
  list(path: string, withoutFolderLength?: boolean): FileInfo[];

  /**
   * 指定されたパスのファイルまたはフォルダ情報を取得します。
   * * @param {string} path - 必須。
   * @param {boolean} [withoutFolderLength] - 任意。
   * @returns {FileInfo} 詳細情報オブジェクト。
   */
  get(path: string, withoutFolderLength?: boolean): FileInfo;

  /**
   * ファイルまたはフォルダを削除します。
   * @param {string} path - 必須。
   */
  remove(path: string): void;

  /**
   * システムのストレージフォルダの絶対パスを取得します。
   * @returns {string}
   */
  getStorageFolder(): string;

  /**
   * アップロードされた単一のファイルを指定パスに保存します。
   * @param {string} path - 必須。
   */
  saveSingleUploadFile(path: string): void;

  /**
   * アップロードされた複数のファイルを指定パスに保存します。
   * @param {string} path - 必須。
   */
  saveUploadFiles(path: string): void;

  /**
   * フォルダ（ディレクトリ）を作成します。
   * @param {string} path - 必須。
   */
  makeDir(path: string): void;

  /**
   * テキストファイルを読み込みます（文字コード自動判別対応）。
   * @param {string} path - 必須。
   * @param {string} [encoding="UTF-8"] - 任意。
   * @returns {string} ファイルの内容。
   */
  readAllLines(path: string, encoding?: string): string;

  /**
   * ファイル名を変更します。
   * @param {string} orgPath - 変更前のパス。
   * @param {string} newName - 新しいファイル名。
   */
  rename(orgPath: string, newName: string): void;

  /**
   * ファイルを移動します。
   * @param {string} orgPath - 移動元。
   * @param {string} newPath - 移動先。
   */
  move(orgPath: string, newPath: string): void;

  /**
   * 空のファイルを作成します。
   * @param {string} path - 必須。
   */
  makeFile(path: string): void;

  /**
   * テキストファイルに内容を書き込みます。
   * @param {string} path - 必須。
   * @param {string} content - 書き込む内容。
   * @param {string} [encoding="UTF-8"] - 任意。
   */
  writeAllLines(path: string, content: string, encoding?: string): void;

  /**
   * ファイルを複製（コピー）します。
   * @param {string} srcPath - 複製元。
   * @param {string} destPath - 複製先。
   */
  duplicate(srcPath: string, destPath: string): void;

  /**
   * フォルダ内に一時ファイル名を生成します。
   * @returns {string} 生成された一時ファイル名。
   */
  getTempFileName(): string;

  /**
   * バイナリファイルを一括で読み込みます。
   * @param {string} path - 必須。
   * @returns {Uint8Array} バイト配列。
   */
  readAllBytes(path: string): Uint8Array; // java.lang.Byte[]

  /**
   * バイナリデータをファイルに一括で書き込みます。
   * @param {string} path - 必須。
   * @param {Uint8Array} content - 書き込むバイトデータ。
   */
  writeAllBytes(path: string, content: Uint8Array): any;
}

/** ファイル情報オブジェクトの型定義 */
interface FileInfo {
  name: string;
  lastModified: Date;
  absolutePath: string;
  mineType: string;
  length: number;
  isBlank: boolean;
  isHidden?: boolean;
}

/** ストレージ相対パス操作用インスタンス */
declare const file: EfwServerFile;

/** 絶対パス操作用インスタンス */
declare const absfile: EfwServerFile;

/**
 * サーバーサイドで日付や数値、列挙型のフォーマット変換を行うためのクラス。
 * @author Chang Kejun
 */
declare class EfwServerFormat {
  constructor();

  /**
   * 数値をフォーマットされた文字列に変換します。
   * 全角文字（０＃，．％）を含むフォーマッタが指定された場合、出力結果も全角に変換されます。
   * @param {number | string} value - 必須。フォーマット対象の数値。
   * @param {string} formatter - 必須。フォーマット形式（例: "#,###", "０．００"）。
   * @param {string} [rounder="HALF_EVEN"] - 任意。丸め方式。
   * (UP | DOWN | CEILING | FLOOR | HALF_UP | HALF_DOWN | HALF_EVEN)
   * @returns {string} フォーマット済み文字列。数値でない場合は空文字を返します。
   */
  formatNumber(
    value: number | string,
    formatter: string,
    rounder?:
      | "UP"
      | "DOWN"
      | "CEILING"
      | "FLOOR"
      | "HALF_UP"
      | "HALF_DOWN"
      | "HALF_EVEN",
  ): string;

  /**
   * 文字列を解析して数値に変換します。
   * @param {string|number} value - 必須。解析対象の文字列。
   * @param {string} formatter - 必須。フォーマット形式。
   * @returns {number|null} 変換後の数値。空の場合は null を返します。
   */
  parseNumber(value: string | number, formatter: string): number | null;

  /**
   * 日付をフォーマットされた文字列に変換します。
   * 全角文字（ＧｙＭｄＨｍｓＳ）を含むフォーマッタが指定された場合、出力結果も全角に変換されます。
   * @param {Date} value - 必須。フォーマット対象の日付。
   * @param {string} formatter - 必須。フォーマット形式（例: "yyyy/MM/dd", "JSON_DATE"）。
   * @returns {string} フォーマット済み文字列。
   */
  formatDate(value: Date, formatter: string): string;

  /**
   * 文字列を解析して日付オブジェクトに変換します。
   * @param {string} value - 必須。解析対象の文字列。
   * @param {string} formatter - 必須。フォーマット形式（例: "yyyyMMdd", "JSON_DATE"）。
   * @returns {Date|null} 変換後のDateオブジェクト。
   */
  parseDate(value: string, formatter: string): Date | null;

  /**
   * 値を列挙型（Enum）の定義に従ってラベル文字列に変換します。
   * @param {any} value - 必須。変換元のコード値。
   * @param {string} formatter - 必須。"{ラベル1=コード1, ラベル2=コード2}" 形式の文字列。
   * @returns {string} 対応するラベル。見つからない場合は空文字を返します。
   */
  formatEnum(value: any, formatter: string): string;

  /**
   * 列挙型のラベル文字列から元の値（Boolean/Number/Date等）を復元します。
   * @param {string} value - 必須。変換対象のラベル。
   * @param {string} formatter - 必須。"{ラベル1=コード1, ラベル2=コード2}" 形式の文字列。
   * @returns {any|null} 復元されたコード値。
   */
  parseEnum(value: string, formatter: string): any;
}

/**
 * メール送信を管理するクラス。
 * 外部のメール定義ファイルに基づき、動的なパラメータを埋め込んでメールを送信します。
 * @author Chang Kejun
 */
declare class EfwServerMail {
  constructor();

  /**
   * 指定されたメールグループおよびメールIDを使用してメールを送信します。
   * * @param {string} groupId - 必須。メール定義ファイル内のグループID。
   * @param {string} mailId - 必須。メール定義ファイル内のメールID。
   * @param {Map<string, any>} params - 必須。メール本文のプレースホルダに埋め込むパラメータオブジェクト。
   * 例: {userName: "田中", orderId: "123"}
   * @param {boolean} [inBackground=false] - 任意。trueの場合、非同期（バックグラウンド）で送信を実行します。
   */
  send(
    groupId: string,
    mailId: string,
    params: Map<string, any>,
    inBackground?: boolean,
  ): void;
}

/**
 * メール操作用グローバルインスタンス。
 */
declare const mail: EfwServerMail;

/**
 * サーバーサイドのメッセージ管理クラス。
 * システム標準メッセージの保持、多言語対応、およびテキスト内のプレースホルダ置換を行います。
 * @author Chang Kejun
 */
declare class EfwServerMessages {
  constructor();

  /**
   * 指定されたメッセージIDに対応するメッセージ文字列を取得します。
   * システム標準のバリデーションメッセージや例外メッセージを定義しています。
   * * @param {string} messageId - メッセージを識別するID。
   * @param {string} [lang] - 言語コード（例: "jp", "en"）。
   * @returns {string} 翻訳されたメッセージ、またはデフォルトメッセージ。
   */
  get(messageId: string, lang?: string): string;

  /**
   * 文字列内の {key} 形式のプレースホルダを翻訳されたメッセージに置換します。
   * @param {string}  jsonString - 置換対象の文字列。
   * @param {string} lang - 言語コード。
   * @returns {string} 翻訳・置換後の文字列。
   */
  translate(jsonString: string, lang: string | null): string;
}

/**
 * メッセージ操作用グローバルインスタンス。
 */
declare const messages: EfwServerMessages;

/**
 * efw.propertiesファイルを操作するためのクラス。
 * サーバーの動作設定や環境変数を動的に取得します。
 * @author Chang Kejun
 */
declare class EfwServerProperties {
  constructor();

  /**
   * efw.propertiesファイルから指定されたキーの値を取得します。
   * defaultValueが指定されている場合、その型に合わせて自動的にキャストします。
   * * @param {String} key - 必須。取得したいプロパティのキー。
   * @param {any} [defaultValue] - 任意。キーが存在しない場合のデフォルト値。
   * この引数の型（String/Number/Boolean）に基づいて戻り値が変換されます。
   * @returns {any} プロパティの値。型はdefaultValueに準拠します。
   */
  get(key: string): string;
  get(key: string, defaultValue: string): string;
  get(key: string, defaultValue: number): number;
  get(key: string, defaultValue: boolean): boolean;
}

/**
 * プロパティ操作用グローバルインスタンス。
 */
declare const properties: EfwServerProperties;

/**
 * リクエスト情報を操作するためのクラス。
 * 主に遷移元URL（Referer）に含まれるパラメータの取得と加工を行います。
 * @author Chang Kejun
 */
declare class EfwServerRequest {
  constructor();

  /**
   * リクエスト（Referer URL）から指定されたキーに対応する値を取得します。
   * 取得時に禁則文字のチェックおよび置換を自動的に行います。
   * @param {String} key - 取得したいパラメータのキー名。
   * @returns {string | null} デコードおよび禁則文字置換済みの値。パラメータが存在しない場合は null。
   */
  get(key: string): string | null;
}

/**
 * リクエスト操作用グローバルインスタンス。
 */
declare const request: EfwServerRequest;

/**
 * RESTサービスにアクセスするためのクラス。
 * 外部APIとの通信（GET, POST, PUT, DELETE）を管理します。
 * @author lndljack
 */
declare class EfwServerRest {
  constructor();

  /**
   * RESTサービスからデータを取得（GET）します。
   * @param {String} apiUrl - 接続先のAPI URL。
   * @param {Map<string, string>} [heads] - 任意。HTTPヘッダーのキー・バリュー。
   * @returns {any | null} レスポンスのJSONオブジェクト。空の場合はnull。
   */
  get(apiUrl: string, heads?: Map<string, string>): any | null;

  /**
   * RESTサービスへデータを送信（POST）します。
   * @param {string} apiUrl - 接続先のAPI URL。
   * @param {any} params - 送信するデータオブジェクト。
   * @param {Map<string, string>} [heads] - 任意。HTTPヘッダー。
   * @returns {any | null} レスポンスのJSONオブジェクト。
   */
  post(
    apiUrl: string,
    params: any,
    heads?: Map<string, string>,
  ): any | null;

  /**
   * RESTサービスへデータを更新送信（PUT）します。
   * @param {string} apiUrl - 接続先のAPI URL。
   * @param {any} params - 更新するデータオブジェクト。
   * @param {Map<string, string>} [heads] - 任意。HTTPヘッダー。
   * @returns {any | null} レスポンスのJSONオブジェクト。
   */
  put(
    apiUrl: string,
    params: any,
    heads?: Map<string, string>,
  ): any | null;

  /**
   * RESTサービスからリソースを削除（DELETE）します。
   * @param {string} apiUrl - 接続先のAPI URL。
   * @param {Map<string, string>} [heads] - 任意。HTTPヘッダー。
   * @returns {any | null} レスポンスのJSONオブジェクト。
   */
  delete(apiUrl: string, heads?: Map<string, string>): any | null;

  /**
   * 直近のREST呼び出し結果のHTTPステータスコードを取得します。
   * @returns {number} HTTPステータスコード（200, 404, 500など）。
   */
  getStatus(): number;
}

/**
 * REST操作用グローバルインスタンス。
 */
declare const rest: EfwServerRest;

/**
 * セッション操作を管理するクラス。
 * データの保持、取得、および型変換（JSON/Date）を自動で行います。
 * @author Chang Kejun
 */
declare class EfwServerSession {
  constructor();

  /**
   * セッションからデータを取得します。
   * JSON文字列として保存されている場合は、自動的にJavaScriptオブジェクトに変換し、日付型も復元します。
   * @param {string} key - セッションキー。
   * @returns {any} 保存されている値。
   */
  get(key: string): any;

  /**
   * セッションにデータを設定します。
   * JavaScriptオブジェクトは「JSON:」プレフィックス付きの文字列に変換して保存されます。
   * @param {string} key - セッションキー。
   * @param {any} value - 保存する値。
   */
  set(key: string, value: any): void;

  /**
   * 新しいセッションを作成します。
   */
  create(): void;

  /**
   * 現在のセッションを無効化（破棄）します。
   */
  invalidate(): void;

  /**
   * オブジェクト内のISO形式の日付文字列をDateオブジェクトに再帰的に変換します。
   * @param {any} obj - 変換対象のオブジェクト。
   * @returns {any} 変換後のオブジェクト。
   * @private
   */
  private _restoreDate(obj: any): any;
}

/**
 * セッション操作用グローバルインスタンス。
 */
declare const session: EfwServerSession;

interface EfwEventInfo { }

/**
 * efwWebイベントのインターフェース定義
 */
interface EfwWebEvent {
  /**
   * リクエストパラメータのバリデーションおよび型変換の定義。
   * キーに対してバリデーションルール（"required:true;format:#,###" 等）を記述します。
   */
  paramsFormat: Map<string, null | string | any>;

  /**
   * イベントの実行制限設定（同時実行数など）。
   */
  service?: {
    /** 同時に実行できる最大リクエスト数。 */
    max: number;
    /** 最大リクエスト数に達した場合のメッセージ。*/
    message?: string;
    /** イベントが自動的に再実行を試みるかどうか。*/
    retriable?: boolean;
    /** 再実行の間隔（秒）。*/
    interval?: number;
  };

  /**
   * イベントのメインロジック。
   * @param {any} params checkStyleによってバリデーション・型変換された後のパラメータ。
   * @returns {Result} 処理結果としてのResultオブジェクト。
   */
  fire: (params: any) => Result;

  /** * 内部管理用：ファイルの最終更新日時（フレームワークが自動設定）
   * @private
   */
  lastModified?: string;
  /** * 内部管理用：ロード元（"file"等）
   * @private
   */
  from?: string;
}

/**
 * efwバッチイベントのインターフェース定義
 */
interface EfwBatchEvent {
  /**
   * リクエストパラメータのバリデーションおよび型変換の定義。
   * キーに対してバリデーションルール（"required:true;format:#,###" 等）を記述します。
   */
  paramsFormat: Map<string, null | string | any>;

  /**
   * イベントのメインロジック。
   * @param {any} params checkStyleによってバリデーション・型変換された後のパラメータ。
   * @returns 処理結果としてのBatchオブジェクト。
   */
  fire: (params: any) => Batch;

  /** * 内部管理用：ファイルの最終更新日時（フレームワークが自動設定）
   * @private
   */
  lastModified?: string;
  /** * 内部管理用：ロード元（"file"等）
   * @private
   */
  from?: string;
}

/**
 * efw Restイベントのインターフェース定義 TODO
 */
interface EfwRestEvent {
  /**
   * RestイベントのPUTメソッド。
   * @param {string[]} keys URL経由し"/"区切りで渡してくれる引数。
   * @param {any} params httpのbody経由し渡してくれるJSONオブジェクト。
   * @returns {any} 処理結果のJSONオブジェクト。
   */
  PUT: (keys: string[], params: any) => any;
  /**
   * RestイベントのPOSTメソッド。
   * @param {string[]} keys URL経由し"/"区切りで渡してくれる引数。
   * @param {any} params httpのbody経由し渡してくれるJSONオブジェクト。
   * @returns {any} 処理結果のJSONオブジェクト。
   */
  POST: (keys: string[], params: any) => any;
  /**
   * RestイベントのGETメソッド。
   * @param {string[]} keys URL経由し"/"区切りで渡してくれる引数。
   * @returns {any} 処理結果のJSONオブジェクト。
   */
  GET: (keys: string[]) => any;
  /**
   * RestイベントのDELETEメソッド。
   * @param {string[]} keys URL経由し"/"区切りで渡してくれる引数。
   * @returns {any} 処理結果のJSONオブジェクト。
   */
  DELETE: (keys: string[]) => any;

  /** * 内部管理用：ファイルの最終更新日時（フレームワークが自動設定）
   * @private
   */
  lastModified?: string;
  /** * 内部管理用：ロード元（"file"等）
   * @private
   */
  from?: string;
}
