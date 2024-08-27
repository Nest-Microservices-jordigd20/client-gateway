import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const Token = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

  if (!req.token) {
    throw new InternalServerErrorException('Token not found in the request (AuthGuard not called?)');
  }

    return req.token;
});