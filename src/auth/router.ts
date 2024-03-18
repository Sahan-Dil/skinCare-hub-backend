import express from 'express'
import registerHandler from './registerHandler'
import loginHandler from './loginHandler'

const router = express.Router()

router.post('/', registerHandler)
router.get('/', loginHandler)

export default router
