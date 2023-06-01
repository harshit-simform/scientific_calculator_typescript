import pool from "./server.js";
import bcrypt from "bcryptjs";

export async function getAllUser(req, res) {
  const result = await pool.query("SELECT * FROM user");
  return result;
}

export async function createUser(req, res) {
  let { name, email, password, address } = req.body;
  password = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO user(name,email,address,password) VALUES(?,?,?,?)`,
    [name, email, address, password]
  );
  return result;
}

export async function getUser(id) {
  const result = await pool.query("SELECT * FROM user WHERE id = ?", id);
  return result;
}

export async function deleteUser(id) {
  const result = await pool.query("DELETE FROM user WHERE id = ?", id);
  return result;
}

/// products

export async function getAllProduct(req, res) {
  const result = await pool.query("SELECT * FROM products");
  return result;
}

export async function createProduct(req, res) {
  let { title, amount, description } = req.body;
  password = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO products(title,amount,description) VALUES(?,?,?)`,
    [title, amount, description]
  );
  return result;
}

export async function getProduct(id) {
  const result = await pool.query("SELECT * FROM products WHERE id = ?", id);
  return result;
}

export async function deleteProduct(id) {
  const result = await pool.query("DELETE FROM products WHERE id = ?", id);
  return result;
}
