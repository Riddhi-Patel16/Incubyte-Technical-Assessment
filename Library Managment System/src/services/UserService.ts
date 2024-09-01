export interface User {
    id: string;
    name: string;
    role: 'Admin' | 'LibraryUser';
  }
  

export class UserService {
 users: Map<string, User> = new Map();
   adminKey = 'admin123'; // Example admin key

  // Register user and determine role based on adminKey
  registerUser(id: string, name: string, providedAdminKey?: string): User {
    if (this.users.has(id)) {
      throw new Error('User ID must be unique.');
    }

    //if admin key is not valid
    if (providedAdminKey && providedAdminKey !== this.adminKey) {
      throw new Error('Invalid admin key.');
    }

    //if user is admin
    if (providedAdminKey === this.adminKey) {
      const admin: User = { id, name, role: 'Admin' };
      this.users.set(id, admin);
      return admin;
    }

    //if user is library user
    const libraryUser: User = { id, name, role: 'LibraryUser' };
    this.users.set(id, libraryUser);
    return libraryUser;
  }

  // Verify if a user is registered
  isRegistered(userId: string): boolean {
    return this.users.has(userId);
  }

  // Retrieve a user by ID
  getUserById(userId: string): User | undefined {
    return this.users.get(userId);
  }
  
}

