
const Book = require('../models/Book.model');
const User = require('../models/User.model');
const auditLogService = require('./auditLogService');

class BorrowService {
  async borrowBook(userId, bookId) {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) throw new Error('User or Book not found');
    if (user.borrowedBooks.length >= user.maxBorrowLimit) throw new Error('Borrow limit reached');
    if (book.availableCopies === 0) throw new Error('No available copies');

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    user.borrowedBooks.push({ book: bookId, dueDate });
    book.availableCopies -= 1;

    await user.save();
    await book.save();

    await auditLogService.logAction(user._id, 'BORROW_BOOK', `Book ID: ${bookId}`);
  }

  async returnBook(userId, bookId) {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) throw new Error('User or Book not found');

    const borrowedBook = user.borrowedBooks.find(b => b.book.toString() === bookId && !b.returned);

    if (!borrowedBook) throw new Error('This book was not borrowed by the user');

    borrowedBook.returned = true;
    book.availableCopies += 1;

    await user.save();
    await book.save();

    await auditLogService.logAction(user._id, 'RETURN_BOOK', `Book ID: ${bookId}`);
  }
}

module.exports = new BorrowService();
