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
        const availableBooks = libraryService.getAvailableBooks();
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

});
