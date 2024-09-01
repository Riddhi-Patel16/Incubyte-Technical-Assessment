import { UserService } from '../services/UserService';
import { Library } from '../services/Library';
import { Book } from '../models/Book';

describe('Library System', () => {
  let userService: UserService;
  let libraryService: Library;

  beforeEach(() => {
    userService = new UserService();
    libraryService = new Library(userService);
  });

  describe('Add Book Feature',()=>{
    test('should allow admin to add a book', () => {
        // Arrange
        const adminId = 'admin1';
        const adminName = 'Admin User';
        userService.registerUser(adminId, adminName, 'admin123');

        const book: Book = {
        id: 'book1',
        title: 'Book Title',
        author: 'Author Name',
        publicationYear: 2000,
        available: true
        };

        // Act
        libraryService.addBook(book, adminId);

        // Assert
        const availableBooks = libraryService.getAvailableBooks(adminId);
        expect(availableBooks).toContainEqual(book);
    });

    test('should not allow non-admin to add a book', () => {
        // Arrange
        const libraryUserId = 'user1';
        const libraryUserName = 'Library User';
        userService.registerUser(libraryUserId, libraryUserName);

        const book: Book = {
        id: 'book2',
        title: 'Another Book Title',
        author: 'Another Author',
        publicationYear: 2021,
        available: true
        };

        // Act & Assert
        expect(() => libraryService.addBook(book, libraryUserId)).toThrow('Only Admins can add books.');
    });

    test('should not allow adding a book with an existing ID', () => {
        // Arrange
        const adminId = 'admin2';
        const adminName = 'Another Admin';
        userService.registerUser(adminId, adminName, 'admin123');

        const book: Book = {
        id: 'book3',
        title: 'Third Book Title',
        author: 'Third Author',
        publicationYear: 2015,
        available: true
        };

        libraryService.addBook(book, adminId); // First addition should succeed

        // Act & Assert
        expect(() => libraryService.addBook(book, adminId)).toThrow('Book with this ID already exists.');
    });
  })

  describe('BorrowBook Feature', () => {
  
    it('should throw an error if the user is not registered', () => {
      const userId = 'unknownUser';
      const bookId = 'book1';
  
      expect(() => libraryService.borrowBook(bookId, userId)).toThrow('User is not registered.');
    });
  
    it('should throw an error if the book is not found', () => {
      const userId = 'user1';
      userService.registerUser(userId, 'Library User');
  
      const bookId = 'unknownBook';
  
      expect(() => libraryService.borrowBook(bookId, userId)).toThrow('Book not found.');
    });
  
    it('should throw an error if the book is not available', () => {
      const userId = 'user1';
      userService.registerUser(userId, 'Library User');
  
      const adminId = 'admin1';
      userService.registerUser(adminId, 'Admin User', 'admin123');
  
      const book: Book = { id: 'book1', title: 'Book Title', author: 'Author Name', publicationYear: 2000, available: false };
      libraryService.addBook(book, adminId);
      libraryService.borrowBook(book.id, userId);
      expect(() => libraryService.borrowBook(book.id, userId)).toThrow('Book is not available.');
    });
  
    it('should allow a Library User to borrow an available book', () => {
      const userId = 'user1';
      userService.registerUser(userId, 'Library User');
  
      const adminId = 'admin1';
      userService.registerUser(adminId, 'Admin User', 'admin123');
  
      const book: Book = { id: 'book1', title: 'Book Title', author: 'Author Name', publicationYear: 2000, available: true };
      libraryService.addBook(book, adminId);
  
      libraryService.borrowBook(book.id, userId);
  
      // Retrieve the borrowed book directly
      const borrowedBook = libraryService.getBookById(book.id);
      expect(borrowedBook?.available).toBe(false);
      expect(borrowedBook?.borrowedBy).toBe(userId);
    });
  });

  describe('Return Book Feature',()=>{

    it('should allow a Library User to return a book they borrowed', () => {
        // Arrange
        const userId = 'user1';
        userService.registerUser(userId, 'Library User');
      
        const adminId = 'admin1';
        userService.registerUser(adminId, 'Admin User', 'admin123');
      
        const book: Book = {
          id: 'book1',
          title: 'Book Title',
          author: 'Author Name',
          publicationYear: 2000,
          available: true
        };
      
        libraryService.addBook(book, adminId);
        libraryService.borrowBook(book.id, userId);
      
        // Act
        libraryService.returnBook(book.id, userId);
      
        // Assert
        const returnedBook = libraryService.getBookById(book.id);
        expect(returnedBook?.available).toBe(true);
        expect(returnedBook?.borrowedBy).toBeUndefined();
      });

      it('should not allow a non-registered user to return a book', () => {
        // Arrange
        const userId = 'user1';
      
        const book: Book = {
          id: 'book1',
          title: 'Book Title',
          author: 'Author Name',
          publicationYear: 2000,
          available: true
        };
      
        // Act & Assert
        expect(() => libraryService.returnBook(book.id, userId)).toThrow('User is not registered.');
      });
      
      it('should not allow a non-Library User to return a book', () => {
        // Arrange
        const adminId = 'admin1';
        userService.registerUser(adminId, 'Admin User', 'admin123');
      
        const book: Book = {
          id: 'book1',
          title: 'Book Title',
          author: 'Author Name',
          publicationYear: 2000,
          available: true
        };
      
        libraryService.addBook(book, adminId);
      
        // Act & Assert
        expect(() => libraryService.returnBook(book.id, adminId)).toThrow('Only Library Users can return books.');
      });

      it('should not allow returning a book that does not exist', () => {
        // Arrange
        const userId = 'user1';
        userService.registerUser(userId, 'Library User');
      
        // Act & Assert
        expect(() => libraryService.returnBook('nonexistentBookId', userId)).toThrow('Book not found.');
      });    
  })



});
