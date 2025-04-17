const db = require('../db');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

exports.getAll = async () =>{
    const result = await db.query('select * from users order by id');
    return result.rows;
}

exports.getById = async (id)=>{
    const result = await db.query('select *from users where id = $1',[id]);
    return result.rows[0];
};

exports.getByEmail = async (email) => {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

exports.create = async(user)=>{
    const {name,email,password} = user;

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db.query('insert into users (name,email,password) values ($1,$2,$3) returning *',[name,email,hashedPassword]);
    return result.rows[0];
}

exports.update = async(id,user)=>{
    const {name,email} = user;
    const result = await db.query('update users set name = $1, email = $2 where id = $3 returning *',[name,email,id]);
    return result.rows[0]
}

exports.delete = async (id)=>{
    const result = await db.query('delete from users where id = $1',[id]);
    return result.rows[0];
}

exports.comparePassword = async(password,hashedPassword) =>{
    return await bcrypt.compare(password,hashedPassword);
};

exports.setResetToken = async(userId, token, expiry) =>{
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    await db.query(
        'update users set password_reset_token = $1, token_expiry = $2 where id = $3',[hashedToken,expiry,userId]
    );
};

exports.getUserByValidResetToken=async(token)=>{
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const result = await db.query('select * from users where password_reset_token = $1 and token_expiry > now()',[hashedToken]);
    return result.rows[0];
}

exports.resetPasswordWithToken = async (token,newPassword) =>{
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword,salt);

    await db.query(
        'update users set password = $1, password_reset_token = null, token_expiry = null where password_reset_token = $2',[hashedPassword,hashedToken]
    );
};