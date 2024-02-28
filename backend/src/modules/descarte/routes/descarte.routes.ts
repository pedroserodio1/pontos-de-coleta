import { Router } from "express";
import { DescarteController } from "../controller/DescarteController";

const descarteRouter = Router()
const descarteController = new DescarteController()

descarteRouter.post('/', descarteController.create)

descarteRouter.get('/',  descarteController.index)

descarteRouter.get('/cidade/:cidade', descarteController.findByCity);

descarteRouter.delete('/:id', descarteController.delete);

descarteRouter.put('/:id', descarteController.update);

export default descarteRouter