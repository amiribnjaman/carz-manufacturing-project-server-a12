import { Controller, Get } from "@nestjs/common";
import { UserServices } from "./user.services";

@Controller('/user')
export class UserCtroller {
    constructor(private readonly userServices: UserServices) { }
    
    @Get()
    getUser(): string{
        return this.userServices.getUser()
    }

    @Get('/single-user')
    getSingleUser(): string {
        return this.userServices.getSingleUser()
    }

}