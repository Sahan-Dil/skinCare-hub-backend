import { Request, Response } from 'express'
import { User } from '../models/user'
import bcrypt from 'bcrypt'

const registerHandler = async (req: Request, res: Response) => {
  try {
    // Validation
    if (!req.body.userName || !req.body.email || !req.body.password) {
      return res.status(400).send({
        message: 'Send all required fields: userName, email, and password'
      })
    }

    const newUser = {
      userName: req.body.userName,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10)
    }

    const existingUser = await User.findOne({
      $or: [{ userName: newUser.userName }, { email: newUser.email }]
    })
    if (existingUser) {
      return res.status(400).send({
        message: 'User with the same email or username already exists'
      })
    }

    // Create a new user instance and save to the database
    const user = await User.create(newUser)

    // Send a success response
    return res.status(201).send(user)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return res.status(500).send({ message: 'Internal Server Error' })
  }
}

export default registerHandler
