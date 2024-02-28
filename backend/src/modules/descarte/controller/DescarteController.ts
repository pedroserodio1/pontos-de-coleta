import { Request, Response } from "express";
import { CreateDescarteService } from "../services/CreateDescarteService";
import { ListAllDescarteService } from "../services/ListAllDescarteService";
import { FindByCityDescarteService } from "../services/FindByCityDescarteService";
import { UpdateDescarteService } from "../services/UpdateDescarteService";
import { DeleteDescarteService } from "../services/DeleteDescarteService";


export class DescarteController {
    public async create(req: Request, res: Response): Promise<Response> {
        const createDescarteService = new CreateDescarteService()

        const data = req.body

        const descarte = await createDescarteService.execute(data)

        return res.status(202).json(descarte)
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const data = req.body;

        const updateDescarteService = new UpdateDescarteService();

        const updatedDescarte = await updateDescarteService.execute(id, data);

        return res.json(updatedDescarte);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        const deleteDescarteService = new DeleteDescarteService();

        await deleteDescarteService.execute(id);

        return res.status(204).send();
    }

    public async index(req: Request, res: Response): Promise<Response> {
        const listAllDescarteService = new ListAllDescarteService()

        const descarte = await listAllDescarteService.execute()

        return res.status(202).json(descarte)
    }

    public async findByCity(req: Request, res: Response): Promise<Response> {
        const { cidade } = req.params;

        const findDescarteByCityService = new FindByCityDescarteService();

        const descartes = await findDescarteByCityService.execute(cidade);

        return res.json(descartes);
    }
}