import * as service from './../../services/parentService.js'
import throwError from '../../utils/errors.js'

export const getParents = async (req, res) => {
    try {
        const rows = await service.queryAllParents()
        res.status(200).json(rows)
    } catch (error) {
        throwError(res, error)
    }
}

export const getParentById = async (req, res) => {
    const parentId = req.params.id

    try {
        const rows = await service.queryParentById(parentId)
        res.status(200).json(rows)
    } catch (error) {
        throwError(res, error)
    }
}

export const createParent = async (req, res) => {
    const parent = req.body
    try {
        const row = await service.createParent(parent)
        res.status(200).json(row)
    } catch (error) {
        throwError(res, error)
    }
}

export const deleteParent = async (req, res) => {
    const parentId = req.params.id
    try {
        const row = await service.deleteParent(parentId)
        res.status(200).json(row)
    } catch (error) {
        throwError(res, error)
    }
}
