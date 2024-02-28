import descarteRouter from '@modules/descarte/routes/descarte.routes'
import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {

    return res.json({
        version: '1.0.0'
    })
})

router.use('/descarte', descarteRouter)

export default router

