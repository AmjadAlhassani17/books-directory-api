const Joi = require("joi");
const db = require("../config/db");

class Book {
  constructor({ title, author, publication_year, description, price }) {
    this.title = title;
    this.author = author;
    this.publication_year = publication_year;
    this.description = description;
    this.price = price;
  }

  save() {
    let sql = `INSERT INTO books (title, author, publication_year, description, price) VALUES ('${this.title}', '${this.author}', ${this.publication_year}, '${this.description}', ${this.price});`;
    return db.execute(sql);
  }

  static getAllBook() {
    let sql = `SELECT * FROM books;`;
    return db.execute(sql);
  }

  static getBookById(id) {
    let sql = `SELECT * FROM books WHERE id = ${id};`;
    return db.execute(sql);
  }

  static updateBookById(id , title , author , publication_year , description , price) {
    const book = {
      title: title,
      author: author,
      publication_year: publication_year,
      description: description,
      price: price,
    };

    let sql = `UPDATE books SET `;
    const updates = [];
    for (const key in book) {
      if (book[key] !== undefined) {
        updates.push(`${key} = '${book[key]}'`);
      }
    }
    
    sql += updates.join(', ') + ` WHERE id = ${id};`;
    
    return db.execute(sql);
  }

  static deleteBookById(id) {
    let sql = `DELETE FROM books WHERE id = ${id};`;
    return db.execute(sql);
  }

  static validationPostBook(obj) {
    const schema = Joi.object({
      title: Joi.string().min(3).max(255).required(),
      author: Joi.string().min(3).max(255).required(),
      publication_year: Joi.number().integer().min(1200).max(2023).required(),
      description: Joi.string().min(3).max(200).required(),
      price: Joi.number().min(5).required(),
    });

    return schema.validate(obj);
  }

  static validationUpdateBook(obj) {
    const schema = Joi.object({
      title: Joi.string().min(3).max(255),
      author: Joi.string().min(3).max(255),
      publication_year: Joi.number().integer().min(1200).max(2023),
      description: Joi.string().min(3).max(200),
      price: Joi.number().min(5),
    });

    return schema.validate(obj);
  }
}

module.exports = Book;
