"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInterceptor = void 0;
const jwt = require("jsonwebtoken");
class UserInterceptor {
    async intercept(context, handler) {
        const request = context.switchToHttp().getRequest();
        const token = request?.headers?.authorization?.split('Bearer ')[1];
        const user = await jwt.decode(token);
        request.user = user;
        return handler.handle();
    }
}
exports.UserInterceptor = UserInterceptor;
//# sourceMappingURL=user.interceptor.js.map