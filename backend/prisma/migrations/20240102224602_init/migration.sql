-- CreateTable
CREATE TABLE "Descarte" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lat" TEXT NOT NULL,
    "long" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "tipo_descarte" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL
);
