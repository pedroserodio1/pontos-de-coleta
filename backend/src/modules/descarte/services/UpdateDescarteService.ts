import { prisma } from "@database/PrismaClient";
import { Descarte } from "@prisma/client";

interface IRequest {
    lat?: string;
    long?: string;
    cep?: string;
    cidade?: string;
    rua?: string;
    bairro?: string;
    numero?: string;
    estado?: string;
    tipoDescarte?: string;
}

export class UpdateDescarteService {
    public async execute(id: string, data: IRequest): Promise<Descarte> {
        const updatedDescarte = await prisma.descarte.update({
            where: { id },
            data
        });
        return updatedDescarte;
    }
}

