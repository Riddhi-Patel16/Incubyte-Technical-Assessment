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

  //update available books count
  private updateAvailableBooksCount(): void {
    this.totalAvailableBooks = Array.from(this.books.values()).filter(book => book.available).length;
  }

  getAvailableBooks(userId: string): Book[] {
    const user = this.userService.getUserById(userId);
    if (!user) {
      throw new Error('User is not registered.');
    }
    return Array.from(this.books.values()).filter(book => book.available);
  }
}
