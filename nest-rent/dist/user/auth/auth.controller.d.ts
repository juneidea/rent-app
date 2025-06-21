import { UserType } from '@prisma/client';
import { JwtUser } from '../decorators/user.decorator';
import { AuthService } from './auth.service';
import { SignupDto, SigninDto, GenerateProductKeyDto } from './dtos/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(body: SignupDto, userType: UserType): Promise<string>;
    signin(body: SigninDto): Promise<string>;
    generateProductKey({ email, userType }: GenerateProductKeyDto): Promise<string>;
    me(user: JwtUser): JwtUser;
}
