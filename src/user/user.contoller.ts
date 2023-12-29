import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { UserServices } from "./user.services";
import { Users } from "@prisma/client";

@Controller('/user')
export class UserCtroller {
    constructor(private readonly userServices: UserServices) { }
    
    
    /**
     * Crate user method
     * @param userData for create a new user
     * @returns create user method form user service file
     */ 
    @Post()
    async createUser(@Body() userData: { name: string, email: string }): Promise<Users>{
        const {name, email} = userData
        return this.userServices.createUser({
            name,
            email
        })
    }

    /**
     * All user find method
     * @returns All user
     */ 
    @Get()
    getUsers(): Promise<Users[]>{
        return this.userServices.users()
    }

    /**
     * Single user getting method
     * @param id Getting user id as param
     * @returns single user fuction form the user Service file
     */ 
    @Get('/:id')
    async singleUser(@Param('id') id: string): Promise<Users>{
        return this.userServices.singleUser({id: String(id)})
    }

    /**
     * Delete user method
     * @param id Getting user id as a param
     * @returns delete user function form the user Service file
     */ 
    @Delete('/:id')
    async deleteUser(@Param('id') id: string): Promise<Users> {
        return this.userServices.deleteUser({id: String(id)})
    }


}