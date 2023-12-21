import { Injectable } from "@nestjs/common";

@Injectable()
export class UserServices{
    getUser(): string {
        return 'Hello from user'
    }
}