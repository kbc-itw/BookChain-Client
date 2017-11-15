import { IBook } from './ibook';



describe('book', () => {

  it('インスタンス生成', () => {
    const book: IBook = {
      id:            's4CRHAAACAAJ',
      title:         'アラビアの夜の種族',
      authors:       [' 古川日出男'],
      publishedDate: '2006-07',
      isbn10:        '4043636032',
      isbn13:        '9784043636037',
      thumbnailURL:  'http://books.google.com/books/content?id=s4CRHAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    };
    expect(book).toBeTruthy();
  });
});
