import client from "../db/db.js"
import createNanoID from "../utils/nanoId.js";

export const getChildren = async (req, res) => {
  try {
    const result = await client.query('SELECT child_id, name, balance FROM children');
    const { rows } = result;
    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json({ success: false, error })
  }
}

export const getChild = async (req, res) => {
  const child_id = req.params.id;
  const query = 'SELECT child_id, name, balance FROM children WHERE child_id = $1';
  const param = [child_id];

  try {
    const result = await client.query(query, param);
    const { rows } = result;
    console.log(rows);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json({ success: false, error })
  }

}

export const insertChild = async (req, res) => {
  const { name } = req.body;
  const query = {
    text: 'INSERT INTO children(child_id, name, balance) VALUES($1, $2, $3) returning child_id',
    values: [createNanoID(), name, 0]
  };
  try {
    const result = await client.query(query);
    const { rows } = result;
    res.status(200).json(rows);
  } catch (error) {
    console.error('error inserting child');
    console.error(error);
    res.status(400).json({ success: false, error })
  }
}

// const createPost = async (req, res) => {
//   try {
//     const post = new Post(req.body);
//     await post.save();
//     res.status(201).json(post);
//   } catch (error) {
//     res.status(400).json({ success: false, error });
//   }
// }