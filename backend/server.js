const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');

// routes
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req,res) =>{
    res.send('API is running');
})

app.use('/api/users',userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks',taskRoutes);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})