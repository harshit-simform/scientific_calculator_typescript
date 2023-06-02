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
  let { title, amount, description = null } = req.body;
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

/// orders
export async function getAllOrder(req, res) {
  const result = await pool.query("SELECT * FROM orders");
  return result;
}

export async function createOrder(req, res) {
  let {
    userId,
    orderStatus,
    orderDate = new Date().toISOString().slice(0, 10),
    deliveryDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
    productId,
  } = req.body;
  console.log(orderDate);
  const createOrderData = await pool.query(
    `INSERT INTO orders(user_id,order_status,order_date,delivery_date) VALUES(?,?,?,?)`,
    [userId, orderStatus, orderDate, deliveryDate]
  );
  await pool.query(
    `INSERT INTO order_details(order_id,product_id) VALUES(?,?)`,
    [createOrderData[0].insertId, productId]
  );
  return createOrderData;
}

export async function getOrder(id) {
  const result = await pool.query("SELECT * FROM orders WHERE id = ?", id);
  return result;
}

export async function deleteOrder(id) {
  const result = await pool.query("DELETE FROM orders WHERE id = ?", id);
  return result;
}

("select u.name , o.id as order_id , p.title as product_name , order_status , delivery_date  from order_details od join products p on od.product_id = p.id join orders o on od.order_id = o.id join user u on o.user_id = u.id");
("select u.name , o.id as order_id , p.title as product_name , order_status , delivery_date  from order_details od join products p on od.product_id = p.id join orders o on od.order_id = o.id join user u on o.user_id = u.id");
