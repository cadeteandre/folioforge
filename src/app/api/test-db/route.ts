import { NextResponse } from "next/server"
import { testDatabaseConnection } from "@/lib/db-test"

export async function GET() {
  try {
    const result = await testDatabaseConnection()

    if (result.success) {
      return NextResponse.json({ message: result.message }, { status: 200 })
    } else {
      return NextResponse.json(
        { error: "Falha na conexão com o banco de dados", details: result.error },
        { status: 500 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao testar a conexão com o banco de dados", details: error },
      { status: 500 },
    )
  }
}

