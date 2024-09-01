import { UserService } from '../services/UserService';

describe('UserService - Register User', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  test('should register a new user as LibraryUser by default', () => {
    const userId = 'user1';
    const userName = 'riddhi';
    const user = userService.registerUser(userId, userName);

    expect(user).toEqual({ id: userId, name: userName, role: 'LibraryUser' });
    expect(userService.isRegistered(userId)).toBe(true);
  });

  test('should register a new user as Admin if the correct admin key is provided', () => {
    const userId = 'admin1';
    const userName = 'Admin User';
    const adminKey = 'admin123'; // Correct admin key

    const user = userService.registerUser(userId, userName, adminKey);

    expect(user).toEqual({ id: userId, name: userName, role: 'Admin' });
    expect(userService.isRegistered(userId)).toBe(true);
  });

  test('should throw an error if the user ID is already registered', () => {
    const userId = 'user2';
    const userName = 'riddhi';
    userService.registerUser(userId, userName); // Register first time

    expect(() => userService.registerUser(userId, 'Another User')).toThrow('User ID must be unique.');
  });

  test('should throw an error if an incorrect admin key is provided', () => {
    const userId = 'user3';
    const userName = 'riddhi';
    const wrongAdminKey = 'wrong-key';

    expect(() => userService.registerUser(userId, userName, wrongAdminKey)).toThrow('Invalid admin key.');
  });

  test('should retrieve a registered user by ID', () => {
    const userId = 'user4';
    const userName = 'riddhi';
    userService.registerUser(userId, userName);

    const user = userService.getUserById(userId);
    expect(user).toEqual({ id: userId, name: userName, role: 'LibraryUser' });
  });
});





