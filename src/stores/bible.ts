import { defineStore } from 'pinia';
import { nextTick } from 'vue';

import bibleJson from 'src/assets/bible/nkjv.json';

interface IVerse {
  text: string;
  num: number;
}

interface IChapter {
  verses: IVerse[];
  num: number;
}

interface IBook {
  name: string;
  chapters: IChapter[];
}

interface IBible {
  version: string;
  books: IBook[];
}

export const useBibleStore = defineStore('bible', {
  state: () => ({
    bible: bibleJson as IBible,
    selectedBook: undefined as undefined | IBook,
    selectedChapter: undefined as undefined | IChapter,
    selectedVerse: undefined as undefined | IVerse,
  }),

  getters: {
    //
  },

  actions: {
    setBook(book: IBook) {
      this.selectedBook = book;
    },
    setChapter(chapter: IChapter) {
      this.selectedChapter = chapter;
    },
    setVerse(verse: IVerse) {
      this.selectedVerse = verse;
    },
    resetState() {
      this.selectedBook = undefined;
      this.selectedChapter = undefined;
      this.selectedVerse = undefined;
    },
    resetChapter() {
      this.selectedChapter = undefined;
      this.selectedVerse = undefined;
    },
    resetVerse() {
      this.selectedVerse = undefined;
    },
    setToNextChapter() {
      if (this.selectedBook) {
        this.selectedChapter = this.selectedBook.chapters.find((item) => {
          if (this.selectedChapter) {
            return item.num == this.selectedChapter.num + 1;
          }
        });

        if (this.selectedChapter) {
          this.selectedVerse = this.selectedChapter.verses[0];
        } else {
          this.selectedVerse = undefined;
        }

        nextTick().then(() => {
          setTimeout(() => {
            window.scroll({
              behavior: 'smooth',
              left: 0,
              top: 0,
            });
          }, 500);
        });
      }
    },
    setToPreviousChapter() {
      if (this.selectedBook) {
        this.selectedChapter = this.selectedBook.chapters.find((item) => {
          if (this.selectedChapter) {
            return item.num == this.selectedChapter.num - 1;
          }
        });

        if (this.selectedChapter) {
          this.selectedVerse = this.selectedChapter.verses[0];
        } else {
          this.selectedVerse = undefined;
        }

        nextTick().then(() => {
          setTimeout(() => {
            window.scroll({
              behavior: 'smooth',
              left: 0,
              top: 0,
            });
          }, 500);
        });
      }
    },
    getVerses(
      bookName: string,
      chapterNumber: number,
      verseFromNumber: number,
      verseToNumber: number | null = null
    ): IVerse[] {
      const book = this.bible.books.find((item) => {
        return item.name == bookName;
      });

      // Generate array verses for number from the given range
      let arrayVerses: number[] = [];
      if (verseToNumber) {
        for (let i = verseFromNumber; i <= verseToNumber; i++) {
          arrayVerses.push(i);
        }
      } else {
        arrayVerses = [verseFromNumber];
      }

      if (book) {
        const chapter = book.chapters.find((item) => {
          return item.num == chapterNumber;
        });
        if (chapter) {
          // Get the verses from given verse number range array
          const verses = chapter.verses.filter((item) => {
            return arrayVerses.includes(item.num);
          });

          if (verses) {
            return verses;
          }
        }
      }

      return [];
    },
  },
});
