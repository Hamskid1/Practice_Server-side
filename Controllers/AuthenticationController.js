import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Register from '../Models/RegisterFormModels.js'; // Adjust the path based on your project structure
import Login from '../Models/LoginModels.js'; // Adjust the path based on your project structure

// Register User
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await Register.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user in Register collection
        const newUser = await Register.create({
            username,
            email,
            password: hashedPassword,
        });

        // Sync with Login collection

        await Login.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user in Login collection
        const user = await Login.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });

        res.status(200).json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Logout User
export const logoutUser = async (req, res) => {
    res.status(200).json({
        message: 'Logout successful',
    });
};
