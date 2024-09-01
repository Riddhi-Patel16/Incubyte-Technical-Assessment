export interface Book {
    id: string; // Unique identifier for the book (ISBN)
    title: string; // Title of the book
    author: string; // Author of the book
    publicationYear: number; // Publication year of the book
    available: boolean; // Availability status of the book
    borrowedBy?: string; // User ID of the borrower (if borrowed)
  }
  