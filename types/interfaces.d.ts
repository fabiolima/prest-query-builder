import { AxiosInstance } from "axios";
export interface ModelConfig {
    domain?: string;
    db?: string;
    table?: string;
    https?: boolean;
    url?: string;
}
export interface Pagination {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    prevPage: number;
    nextPage: number;
    isLast: boolean;
    isFirst: boolean;
    _q?: string;
}
export interface PageOptions {
    page: number;
    pageSize: number;
}
export interface JoinQuery {
    type: 'inner' | 'left' | 'right' | 'outer';
    tableJoin: string;
    tableJoinKey: string;
    operator: '$eq' | '$lt' | '$gt' | '$lte' | '$gte';
    table: string;
    tableKey: string;
}
export interface WhereQuery {
    field: string;
    operator: '$eq' | '$gt' | '$gte' | '$lt' | '$lte' | '$ne' | '$in' | '$nin' | '$null' | '$notnull' | '$true' | '$nottrue' | '$false' | '$notfalse' | '$like' | '$ilike';
    value: string | number;
}
export interface FilterQuery {
    a: string;
    b: string;
}
export declare class BaseModel {
    client: AxiosInstance;
    constructor(client: AxiosInstance);
}
