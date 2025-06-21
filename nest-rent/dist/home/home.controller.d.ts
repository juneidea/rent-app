import { PropertyType } from '@prisma/client';
import { HomeService } from './home.service';
import { HomeResponseDto, CreateHomeDto, UpdateHomeDto, InquireDto } from './dto/home.dto';
import { JwtUser } from 'src/user/decorators/user.decorator';
export declare class HomeController {
    private readonly homeService;
    constructor(homeService: HomeService);
    getHomes(city?: string, minPrice?: string, maxPrice?: string, propertyType?: PropertyType): Promise<HomeResponseDto[]>;
    getHome(id: number): Promise<HomeResponseDto>;
    createHome(body: CreateHomeDto, user: JwtUser): Promise<HomeResponseDto>;
    updateHome(id: number, body: UpdateHomeDto, user: JwtUser): Promise<HomeResponseDto>;
    deleteHome(id: number, user: JwtUser): Promise<void>;
    inquire(homeId: number, user: JwtUser, { message }: InquireDto): Promise<{
        id: number;
        message: string;
        home_id: number;
        realtor_id: number;
        buyer_id: number;
    }>;
    getHomeMessages(homeId: number, user: JwtUser): Promise<{
        message: string;
        buyer: {
            name: string;
            phone: string;
            email: string;
        };
    }[]>;
}
