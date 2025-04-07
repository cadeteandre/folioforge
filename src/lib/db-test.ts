import { prisma } from "./db"

async function main() {
  try {
    // Tenta fazer uma consulta simples
    const userCount = await prisma.user.count()
    console.log(`Conexão com o banco de dados bem-sucedida! Número de usuários: ${userCount}`)
    return { success: true, message: "Conexão com o banco de dados bem-sucedida!" }
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error)
    return { success: false, error }
  } finally {
    await prisma.$disconnect()
  }
}

export { main as testDatabaseConnection }

