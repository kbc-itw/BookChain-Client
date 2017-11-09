/**
 * 書籍扱いのインタフェース。
 * 現在、手入力シーケンスは存在せず、Google Books APIsから取得したデータをもとに生成することになっている。
 * よって、生成後の変更は認めないものとし、安全のためreadonlyを指定する。
 * @author kbc14a12
 */
export interface Book {

    // このシステムで割り振るidでなく、Google Books APIsが用意するid。
    // これを利用すると、Google Books上の該当書籍のページへのリンクが生成できる。
    readonly id: string;

    readonly isbn10: string;
    readonly isbn13: string;

    readonly title: string;
    readonly authors: string[];
    readonly publishedDate: string;
    readonly thumbnailURL: string;
}
