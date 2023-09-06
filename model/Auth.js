const Joi = require("joi");
const db = require("../config/db");

class Auth {
  constructor({
    username,
    email,
    password,
    first_name,
    last_name,
    date_of_birth,
    address,
    phone_number,
    isAdmin,
  }) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.first_name = first_name;
    this.last_name = last_name;
    this.date_of_birth = date_of_birth;
    this.address = address;
    this.phone_number = phone_number;
    this.isAdmin = isAdmin;
  }

  save() {
    let sql = `INSERT INTO user (username, email, password, first_name, last_name, date_of_birth, address, phone_number, isAdmin) VALUES ('${this.username}' , '${this.email}' , '${this.password}' , '${this.first_name}' , '${this.last_name}' , '${this.date_of_birth}' , '${this.address}' , '${this.phone_number}' , ${this.isAdmin});`;
    return db.execute(sql);
  }

  static getAllUser() {
    let sql = `SELECT * FROM user;`;
    return db.execute(sql);
  }

  static getUserById(id) {
    let sql = `SELECT * FROM user WHERE id = ${id};`;
    return db.execute(sql);
  }

  static checkUserEmail(email) {
    let sql = `SELECT * FROM user WHERE email = '${email}';`;
    return db.execute(sql);
  }

  static updateUserById(
    id,
    username,
    email,
    password,
    first_name,
    last_name,
    date_of_birth,
    address,
    phone_number,
    isAdmin
  ) {
    const user = {
      username: username,
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      date_of_birth: date_of_birth,
      address: address,
      phone_number: phone_number,
      isAdmin: isAdmin,
    };

    let sql = `UPDATE user SET `;
    const updates = [];
    for (const key in user) {
      if (user[key] !== undefined) {
        updates.push(`${key} = '${user[key]}'`);
      }
    }

    sql += updates.join(", ") + ` WHERE id = ${id};`;

    return db.execute(sql);
  }

  static deleteUserById(id) {
    let sql = `DELETE FROM user WHERE id = ${id};`;
    return db.execute(sql);
  }

  static validationPostUser(obj) {
    const schema = Joi.object({
      username: Joi.string().min(3).max(255).required(),
      email: Joi.string().min(3).max(255).required(),
      password: Joi.string().min(6).max(255).required(),
      first_name: Joi.string().min(3).max(255).required(),
      last_name: Joi.string().min(3).max(255).required(),
      date_of_birth: Joi.date().required(),
      address: Joi.string().min(3).max(255).required(),
      phone_number: Joi.string().min(6).max(20).required(),
      isAdmin: Joi.boolean(),
    });

    return schema.validate(obj);
  }

  static validationLoginUser(obj) {
    const schema = Joi.object({
      email: Joi.string().min(3).max(255).required(),
      password: Joi.string().min(6).max(255).required(),
    });

    return schema.validate(obj);
  }

  static validationUpdateUser(obj) {
    const schema = Joi.object({
      username: Joi.string().min(3).max(255),
      email: Joi.string().min(3).max(255),
      password: Joi.string().min(6).max(255),
      first_name: Joi.string().min(3).max(255),
      last_name: Joi.string().min(3).max(255),
      date_of_birth: Joi.date(),
      address: Joi.string().min(3).max(255),
      phone_number: Joi.string().min(6).max(20),
      isAdmin: Joi.boolean(),
    });

    return schema.validate(obj);
  }
}

module.exports = Auth;
