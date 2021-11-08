export type UseCaseConstructor<Params, Request, Response> = (params: Params) => UseCase<Request, Response>
export type UseCase<Request, Response> = (input: Request) => Promise<Response> | Response
