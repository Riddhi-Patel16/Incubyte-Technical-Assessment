# Incubyte-Technical-Assessment
The Library Management System is a simple TypeScript-based application created as part of Incubyte Technical Assessment that allows users to perform basic library operations such as adding books, borrowing books, returning books, and viewing available books.

# Incubyte-Technical-Assessment

## Library Management System

The Library Management System is a simple TypeScript-based application created as part of Incubyte Technical Assessment. This application allows users to perform basic library operations, such as adding books, borrowing books, returning books, viewing available books, and searching for books. The system includes different types of users with distinct access permissions:

- **Admin**: Can add books.
- **LibraryUser**: Can borrow books, return books, view available books, and search books.
- **NonRegisteredUser**: Can only search books.

## Features

1. **Add Book**: 
   - Only admins can add books to the system.
   - Admins need to provide the book details: ID, title, author, publication year, and availability status.

2. **Borrow Book**:
   - Only library users can borrow books.
   - The book must be available and not borrowed by another user.
   - Borrowing requires updating the book status and keeping track of the user who borrowed it.

3. **Return Book**:
   - Only library users can return books.
   - The user must have borrowed the book to return it.
   - The book status is updated to available once returned.

4. **View Available Books**:
   - Only library users can view all available books.
   - The system displays books that are currently available for borrowing.

5. **Search Book**:
   - All users, including non-registered users, can search for books.
   - The search functionality allows users to find books by their title, author, or other criteria.

## User Types and Permissions

- **Admin**: 
  - Registers as an admin by providing a specific admin key.
  - Has permission to add books.

- **LibraryUser**:
  - Registers as a library user by default if no admin key is provided.
  - Has permission to borrow books, return books, view available books, and search books.

- **NonRegisteredUser**:
  - Does not register and is considered a guest.
  - Can only search books.

## Test Report

Test Report images available at src/Test Images


The above screenshot shows the overall coverage and results of the tests.



