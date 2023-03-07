import express from 'express'
import * as controller from './../controllers/familyController.js'
const router = express.Router()
router.get('/', controller.getFamilies)
router.get('/:id', controller.getFamilyById)
router.post('/', controller.createFamily)
router.delete('/:id', controller.deleteFamily)
export default router
