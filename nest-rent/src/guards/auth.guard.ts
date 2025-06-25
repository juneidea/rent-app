import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (roles) {
      const request = context.switchToHttp().getRequest();
      const token = request?.headers?.authorization?.split('Bearer ')[1];
      try {
        const jwtUser = (await jwt.verify(
          token,
          process.env.JSON_TOKEN_KEY,
        )) as jwt.JwtPayload;
        // const user = await this.prismaService.user.findUnique({
        //   where: {
        //     id: jwtUser.id,
        //   },
        // });
        // if (!user) return false;
        // if (roles.includes(user.user_type)) return true;
        return false;
      } catch (error) {
        return false;
      }
    }

    return true;
  }
}
