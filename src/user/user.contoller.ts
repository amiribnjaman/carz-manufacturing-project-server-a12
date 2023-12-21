import { Controller, Get } from "@nestjs/common";
import { UserServices } from "./user.services";

@Controller('/api/user')
export class UserCtroller {
    constructor(private readonly userServices: UserServices) { }
    
    @Get()
    getUser(): string{
        return this.userServices.getUser()
    }

}