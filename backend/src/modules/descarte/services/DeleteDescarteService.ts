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

export class DeleteDescarteService {
    public async execute(id: string): Promise<void> {
        await prisma.descarte.delete({
            where: { id }
        });
    }
}
