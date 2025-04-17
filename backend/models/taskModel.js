const db = require('../db');

exports.create = async({title, description, due_date, user_id}) =>{
    const result = await db.query(
        'insert into tasks(title,description,due_date,user_id) values ($1,$2,$3,$4) returning *',
        [title,description,due_date,user_id]
    )
    return result.rows[0];
}

exports.getByUserId = async (userId) =>{
    const result = await db.query(
        'select * from tasks where user_id = $1 order by created_at desc',
        [userId]
    );
    return result.rows;
}

exports.getById = async (taskId) =>{
    const result = await db.query(
        'select * from tasks where id = $1',[taskId]
    );
    return result.rows[0];
}

exports.update = async(id, {title,description,due,is_completed}) =>{
    const result = await db.query(
        'update tasks set title=$1, description = $2, due=$3, is_completed =$4 where id = $5 returning *',
        [title,description,due,is_completed,id]
    );
    return result.rows[0];
}

exports.delete = async(id) =>{
    await db.query('delete from tasks where id = $1', [id]);
}
