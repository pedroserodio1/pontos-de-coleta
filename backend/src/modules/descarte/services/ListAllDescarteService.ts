import {prisma} from "@database/PrismaClient"
import { Descarte } from "@prisma/client"
import { AppError } from "@shared/AppError/AppError"


export class ListAllDescarteService {
    public async execute(): Promise<Descarte[]> {

      const descarte = await prisma.descarte.findMany()

      if(!descarte){
        throw new AppError("Nenhum ponto encontrado", 404)
      }

      return descarte

    }
}