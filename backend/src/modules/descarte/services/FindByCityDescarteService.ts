import { prisma } from "@database/PrismaClient";
import { Descarte } from "@prisma/client";

export class FindByCityDescarteService {
    public async execute(cidade: string): Promise<Descarte[]> {
        const descartes = await prisma.descarte.findMany({
            where: {
                cidade: cidade
            }
        });

        return descartes;
    }
}
