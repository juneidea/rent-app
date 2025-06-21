import { PropertyType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeResponseDto } from 'src/home/dto/home.dto';
import { JwtUser } from 'src/user/decorators/user.decorator';
interface GetHomesParam {
    city?: string;
    price?: {
        gte?: number;
        lte?: number;
    };
    property_type?: PropertyType;
}
interface CreateHomeParams {
    address: string;
    numberOfBedrooms: number;
    numberOfBathrooms: number;
    city: string;
    price: number;
    landSize: number;
    propertyType: PropertyType;
    images: {
        url: string;
    }[];
}
interface UpdateHomeParams {
    address?: string;
    numberOfBedrooms?: number;
    numberOfBathrooms?: number;
    city?: string;
    price?: number;
    landSize?: number;
    propertyType?: PropertyType;
}
export declare class HomeService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getHomes(filters: GetHomesParam): Promise<HomeResponseDto[]>;
    getHomeById(id: number): Promise<HomeResponseDto>;
    createHome({ address, numberOfBedrooms, numberOfBathrooms, city, price, landSize, propertyType, images, }: CreateHomeParams, userId: number): Promise<HomeResponseDto>;
    updateHomeById(id: number, data: UpdateHomeParams): Promise<HomeResponseDto>;
    deleteHomeById(id: number): Promise<void>;
    getRealtorByHomeId(id: number): Promise<{
        id: number;
        name: string;
        phone: string;
        email: string;
    }>;
    inquire(buyer: JwtUser, homeId: number, message: string): Promise<{
        id: number;
        message: string;
        home_id: number;
        realtor_id: number;
        buyer_id: number;
    }>;
    getMessagesByHome(homeId: number): import(".prisma/client").Prisma.PrismaPromise<{
        message: string;
        buyer: {
            name: string;
            phone: string;
            email: string;
        };
    }[]>;
}
export {};
