import {prisma} from "@database/PrismaClient"
import { Descarte } from "@prisma/client"

interface IRequest {
  lat:string
  long:string
  cep: string 
  cidade: string
  rua: string
  bairro:string
  numero:string
  estado: string
  tipoDescarte: string
}

export class CreateDescarteService {
    public async execute(data: IRequest): Promise<Descarte> {
      const descarte = await prisma.descarte.create({
        data
      })

      return descarte

    }
}