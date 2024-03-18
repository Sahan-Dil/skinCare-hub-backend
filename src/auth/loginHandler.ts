import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'

const loginHandler = async (req: Request, res: Response) => {
  try {
    // Validate request body
    if (!req.body.userName || !req.body.password) {
      return res.status(400).send({
        message: 'Send all required fields: userName and password'
      })
    }

    const { userName, password } = req.body

    // Find user by userName
    const user = await User.findOne({ userName })
    if (!user) {
      return res.status(404).send({ message: 'User not found' })
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(401).send({ message: 'Invalid credentials' })
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' })

    // Send token in response
    return res.status(200).send({ token })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return res.status(500).send({ message: 'Internal Server Error' })
  }
}

export default loginHandler
