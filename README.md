# Incubyte Technical Assessment

## Library Management System

The Library Management System is a simple TypeScript-based application created as part of the Incubyte Technical Assessment. It allows users to perform basic library operations such as adding books, borrowing books, returning books, and viewing available books. Additionally, it provides a search functionality for all users, including non-registered users.

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

After running the tests, The detailed test report screenshot in src/Test images folder. 

![Complete Test Report](https://github.com/user-attachments/assets/89be57ba-0b96-461f-85ec-874577a77699)





