import { BaseModel, JoinQuery, ModelConfig, PageOptions, WhereQuery } from "./interfaces";
export default class Model<T> extends BaseModel {
    private config;
    private pipeline;
    private paginate;
    private _pagination;
    constructor(config: ModelConfig);
    baseUrl(): string;
    where(wQuery: WhereQuery): this;
    select(fields: string[]): this;
    join(jQuery: JoinQuery): this;
    count(field?: string): Promise<number>;
    pagination(paginationOptions?: PageOptions): this;
    private buildPagination;
    run(): Promise<T[] | {
        pagination: PageOptions;
        items: T[];
    }>;
}
