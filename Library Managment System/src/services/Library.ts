import { Book } from '../models/Book';
import { User } from '../models/User';
import { UserService } from './UserService';

export class Library {
  private books: Map<string, Book> = new Map();
  private userService: UserService;
  public totalAvailableBooks: number = 0; // Property to keep track of total available books

  constructor(userService: UserService) {
    this.userService = userService;
  }

  // Add a book - only for Admins who are registered
  addBook(book: Book, userId: string): void {
    const user = this.userService.getUserById(userId);
    if (!user) {
      throw new Error('User is not registered.');
    }
    if (user.role !== 'Admin') {
      throw new Error('Only Admins can add books.');
    }
    if (this.books.has(book.id)) {
      throw new Error('Book with this ID already exists.');
    }
    this.books.set(book.id, { ...book, available: true });
    this.updateAvailableBooksCount();
  }


  // Borrow a book - only for LibraryUsers who are registered
    borrowBook(bookId: string, userId: string): void {
        const user = this.userService.getUserById(userId);
        if (!user) {
          throw new Error('User is not registered.');
        }
        if (user.role !== 'LibraryUser') {
          throw new Error('Only Library Users can borrow books.');
        }
        if (!this.books.has(bookId)) {
          throw new Error('Book not found.');
        }
        const book = this.books.get(bookId)!;
        if (!book.available) {
          throw new Error('Book is not available.');
        }
        this.books.set(bookId, { ...book, available: false, borrowedBy: userId });
        this.updateAvailableBooksCount();
    }


    // Return a book - only for LibraryUsers who are registered and borrow book they allow
  returnBook(bookId: string, userId: string): void {
    const user = this.userService.getUserById(userId);
    if (!user) {
      throw new Error('User is not registered.');
    }
    if (user.role !== 'LibraryUser') {
      throw new Error('Only Library Users can return books.');
    }
    if (!this.books.has(bookId)) {
      throw new Error('Book not found.');
    }
    const book = this.books.get(bookId)!;
    if (book.borrowedBy !== userId) {
      throw new Error('This book was not borrowed by you.');
    }
    this.books.set(bookId, { ...book, available: true, borrowedBy: undefined });
    this.updateAvailableBooksCount();
  }

    //get book by book id
    getBookById(bookId: string): Book | undefined {
        return this.books.get(bookId);
      }


    //update available books count
    private updateAvailableBooksCount(): void {
        this.totalAvailableBooks = Array.from(this.books.values()).filter(book => book.available).length;
    }

    // View All available books Feature
    getAvailableBooks(userId: string): Book[] {
        const user = this.userService.getUserById(userId);
        if (!user) {
        throw new Error('User is not registered.');
        }
        return Array.from(this.books.values()).filter(book => book.available);
    }

    //Search Feature Get  details for a book
    getBookDetails(bookId: string): Book {
        if (!this.books.has(bookId)) {
        throw new Error('Book not found.');
        }
        return this.books.get(bookId)!;
    }
}
