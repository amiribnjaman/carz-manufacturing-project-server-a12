import { Module } from "@nestjs/common";
import { UserCtroller } from "./user.contoller";
import { UserServices } from "./user.services";
import { PrismaService } from "src/prisma.service";

@Module({
    imports: [],
    controllers: [UserCtroller],
    providers: [UserServices, PrismaService]
})

export class userModule {}