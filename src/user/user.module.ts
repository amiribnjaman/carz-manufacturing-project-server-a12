import { Module } from "@nestjs/common";
import { UserCtroller } from "./user.contoller";
import { UserServices } from "./user.services";

@Module({
    imports: [],
    controllers: [UserCtroller],
    providers: [UserServices]
})

export class userModule {}