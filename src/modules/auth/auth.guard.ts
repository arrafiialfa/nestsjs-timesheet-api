import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
import { JWT_SECRET } from 'src/constants';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private authService: AuthService, private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            // 💡 See this condition
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.authService.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: JWT_SECRET,
                }
            );
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }
}