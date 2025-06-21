export interface JwtUser {
    name: string;
    id: number;
    iat: number;
    exp: number;
}
export declare const User: (...dataOrPipes: any[]) => ParameterDecorator;
