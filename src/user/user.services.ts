import { Injectable } from "@nestjs/common";
import { Prisma, Users } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class UserServices{
    constructor(private prisma: PrismaService) { }
    
    /**
     * create user method
     * @param data as User object to create a single user
     * @returns created new user
     */
    async createUser(data: Prisma.UsersCreateInput): Promise<Users | null> {
        const newUser = await this.prisma.users.create({ data })
        return newUser
    }


    /**
     * All user find method
     * @returns All the users
     */ 
    
    async users(): Promise<Users[]>{
        const users = await this.prisma.users.findMany()
        return users

    }

    /**
     * Single user find method
     * @param UsersWhereUniqueInput as User unique Id
     * @returns the find user 
     */ 
    async singleUser(UsersWhereUniqueInput: Prisma.UsersWhereUniqueInput): Promise<Users> {
        const finduser = await this.prisma.users.findUnique({
            where: UsersWhereUniqueInput
        })
        return finduser
    }

    /**
     * Delete user method
     * @param UsersWhereUniqueInput take the user id 
     * @returns deleted user
     */ 
    async deleteUser(UsersWhereUniqueInput: Prisma.UsersWhereUniqueInput): Promise<Users>{
        const deletedUser = await this.prisma.users.delete({
            where: UsersWhereUniqueInput
        })
        return deletedUser
    }


}