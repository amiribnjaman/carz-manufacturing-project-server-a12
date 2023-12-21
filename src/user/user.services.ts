import { Injectable } from "@nestjs/common";

@Injectable()
export class UserServices{
    getUser(): string {
        return 'Hello from user'
    }

    getSingleUser(): string{
        return 'This is a single user'
    }
}