// DBにアクセスするためのクライアントライブラリ
import { PrismaClient } from "@prisma/client";

// PrismClientのインスタンスを作成
const prisma = new PrismaClient();

async function main() {
  const newLink = await prisma.link.create({
    data: {
      description: "this is zuoboo's github",
      url: "https://github.com/zuoboo",
    },
  });
  const allLinks = await prisma.link.findMany();
  console.log(allLinks);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
