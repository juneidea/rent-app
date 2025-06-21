"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const home_dto_1 = require("./dto/home.dto");
let HomeService = class HomeService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getHomes(filters) {
        const homes = await this.prismaService.home.findMany({
            select: {
                id: true,
                address: true,
                city: true,
                price: true,
                property_type: true,
                number_of_bathrooms: true,
                number_of_bedrooms: true,
                images: {
                    select: {
                        url: true,
                    },
                    take: 1,
                },
            },
            where: filters,
        });
        if (!homes[0]) {
            throw new common_1.NotFoundException();
        }
        return homes.map((home) => {
            const fetchHome = { ...home, image: home.images[0].url };
            delete fetchHome.images;
            return new home_dto_1.HomeResponseDto(fetchHome);
        });
    }
    async getHomeById(id) {
        const home = await this.prismaService.home.findFirst({
            select: {
                id: true,
                address: true,
                city: true,
                price: true,
                property_type: true,
                number_of_bathrooms: true,
                number_of_bedrooms: true,
                images: {
                    select: {
                        url: true,
                    },
                },
            },
            where: {
                id,
            },
        });
        if (!home) {
            throw new common_1.NotFoundException();
        }
        return new home_dto_1.HomeResponseDto(home);
    }
    async createHome({ address, numberOfBedrooms, numberOfBathrooms, city, price, landSize, propertyType, images, }, userId) {
        const home = await this.prismaService.home.create({
            data: {
                address,
                number_of_bedrooms: numberOfBedrooms,
                number_of_bathrooms: numberOfBathrooms,
                city,
                price,
                land_size: landSize,
                property_type: propertyType,
                realtor_id: userId,
            },
        });
        const homeImages = images.map((image) => {
            return { ...image, home_id: home.id };
        });
        await this.prismaService.image.createMany({ data: homeImages });
        return new home_dto_1.HomeResponseDto(home);
    }
    async updateHomeById(id, data) {
        const home = await this.prismaService.home.findUnique({
            where: {
                id,
            },
        });
        if (!home) {
            throw new common_1.NotFoundException();
        }
        const updatedHome = await this.prismaService.home.update({
            where: {
                id,
            },
            data,
        });
        return new home_dto_1.HomeResponseDto(updatedHome);
    }
    async deleteHomeById(id) {
        await this.prismaService.image.deleteMany({
            where: {
                home_id: id,
            },
        });
        await this.prismaService.home.delete({
            where: {
                id,
            },
        });
    }
    async getRealtorByHomeId(id) {
        const home = await this.prismaService.home.findUnique({
            where: {
                id,
            },
            select: {
                realtor: {
                    select: {
                        name: true,
                        id: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });
        if (!home) {
            throw new common_1.NotFoundException();
        }
        return home.realtor;
    }
    async inquire(buyer, homeId, message) {
        const realtor = await this.getRealtorByHomeId(homeId);
        return this.prismaService.message.create({
            data: {
                realtor_id: realtor.id,
                buyer_id: buyer.id,
                home_id: homeId,
                message,
            },
        });
    }
    getMessagesByHome(homeId) {
        return this.prismaService.message.findMany({
            where: {
                home_id: homeId,
            },
            select: {
                message: true,
                buyer: {
                    select: {
                        name: true,
                        phone: true,
                        email: true,
                    },
                },
            },
        });
    }
};
exports.HomeService = HomeService;
exports.HomeService = HomeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], HomeService);
//# sourceMappingURL=home.service.js.map