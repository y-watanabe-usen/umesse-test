/* tslint:disable */
/* eslint-disable */
/**
 * U MESSE API
 * U MESSE API
 *
 * OpenAPI spec version: 0.0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { ExternalCompleteItem } from '../models';
import { ExternalItem } from '../models';
import { ExternalItems } from '../models';
/**
 * ExternalApi - axios parameter creator
 * @export
 */
export const ExternalApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 外部連携したCMの結果を登録する
         * @summary CM外部連携完了（外部システム専用）
         * @param {string} external 外部システム区分
         * @param {string} unisCustomerCd UNIS顧客CD
         * @param {any} [body] 外部連携完了リクエストBody
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        completeExternalCm: async (external: string, unisCustomerCd: string, body?: any, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'external' is not null or undefined
            if (external === null || external === undefined) {
                throw new RequiredError('external','Required parameter external was null or undefined when calling completeExternalCm.');
            }
            // verify required parameter 'unisCustomerCd' is not null or undefined
            if (unisCustomerCd === null || unisCustomerCd === undefined) {
                throw new RequiredError('unisCustomerCd','Required parameter unisCustomerCd was null or undefined when calling completeExternalCm.');
            }
            const localVarPath = `/{external}/cm/{unisCustomerCd}`
                .replace(`{${"external"}}`, encodeURIComponent(String(external)))
                .replace(`{${"unisCustomerCd"}}`, encodeURIComponent(String(unisCustomerCd)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 外部連携するCMの情報を取得する
         * @summary CM外部連携情報取得（外部システム専用）
         * @param {string} external 外部システム区分
         * @param {string} unisCustomerCd UNIS顧客CD
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getExternalCm: async (external: string, unisCustomerCd: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'external' is not null or undefined
            if (external === null || external === undefined) {
                throw new RequiredError('external','Required parameter external was null or undefined when calling getExternalCm.');
            }
            // verify required parameter 'unisCustomerCd' is not null or undefined
            if (unisCustomerCd === null || unisCustomerCd === undefined) {
                throw new RequiredError('unisCustomerCd','Required parameter unisCustomerCd was null or undefined when calling getExternalCm.');
            }
            const localVarPath = `/{external}/cm/{unisCustomerCd}`
                .replace(`{${"external"}}`, encodeURIComponent(String(external)))
                .replace(`{${"unisCustomerCd"}}`, encodeURIComponent(String(unisCustomerCd)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 外部連携するCMの情報を一覧で取得する
         * @summary CM外部連携情報一覧取得（外部システム専用）
         * @param {string} external 外部システム区分
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listExternalCm: async (external: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'external' is not null or undefined
            if (external === null || external === undefined) {
                throw new RequiredError('external','Required parameter external was null or undefined when calling listExternalCm.');
            }
            const localVarPath = `/{external}/cm`
                .replace(`{${"external"}}`, encodeURIComponent(String(external)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ExternalApi - functional programming interface
 * @export
 */
export const ExternalApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 外部連携したCMの結果を登録する
         * @summary CM外部連携完了（外部システム専用）
         * @param {string} external 外部システム区分
         * @param {string} unisCustomerCd UNIS顧客CD
         * @param {any} [body] 外部連携完了リクエストBody
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async completeExternalCm(external: string, unisCustomerCd: string, body?: any, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ExternalCompleteItem>> {
            const localVarAxiosArgs = await ExternalApiAxiosParamCreator(configuration).completeExternalCm(external, unisCustomerCd, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 外部連携するCMの情報を取得する
         * @summary CM外部連携情報取得（外部システム専用）
         * @param {string} external 外部システム区分
         * @param {string} unisCustomerCd UNIS顧客CD
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getExternalCm(external: string, unisCustomerCd: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ExternalItem>> {
            const localVarAxiosArgs = await ExternalApiAxiosParamCreator(configuration).getExternalCm(external, unisCustomerCd, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 外部連携するCMの情報を一覧で取得する
         * @summary CM外部連携情報一覧取得（外部システム専用）
         * @param {string} external 外部システム区分
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listExternalCm(external: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ExternalItems>> {
            const localVarAxiosArgs = await ExternalApiAxiosParamCreator(configuration).listExternalCm(external, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ExternalApi - factory interface
 * @export
 */
export const ExternalApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 外部連携したCMの結果を登録する
         * @summary CM外部連携完了（外部システム専用）
         * @param {string} external 外部システム区分
         * @param {string} unisCustomerCd UNIS顧客CD
         * @param {any} [body] 外部連携完了リクエストBody
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        completeExternalCm(external: string, unisCustomerCd: string, body?: any, options?: any): AxiosPromise<ExternalCompleteItem> {
            return ExternalApiFp(configuration).completeExternalCm(external, unisCustomerCd, body, options).then((request) => request(axios, basePath));
        },
        /**
         * 外部連携するCMの情報を取得する
         * @summary CM外部連携情報取得（外部システム専用）
         * @param {string} external 外部システム区分
         * @param {string} unisCustomerCd UNIS顧客CD
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getExternalCm(external: string, unisCustomerCd: string, options?: any): AxiosPromise<ExternalItem> {
            return ExternalApiFp(configuration).getExternalCm(external, unisCustomerCd, options).then((request) => request(axios, basePath));
        },
        /**
         * 外部連携するCMの情報を一覧で取得する
         * @summary CM外部連携情報一覧取得（外部システム専用）
         * @param {string} external 外部システム区分
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listExternalCm(external: string, options?: any): AxiosPromise<ExternalItems> {
            return ExternalApiFp(configuration).listExternalCm(external, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ExternalApi - object-oriented interface
 * @export
 * @class ExternalApi
 * @extends {BaseAPI}
 */
export class ExternalApi extends BaseAPI {
    /**
     * 外部連携したCMの結果を登録する
     * @summary CM外部連携完了（外部システム専用）
     * @param {string} external 外部システム区分
     * @param {string} unisCustomerCd UNIS顧客CD
     * @param {any} [body] 外部連携完了リクエストBody
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ExternalApi
     */
    public completeExternalCm(external: string, unisCustomerCd: string, body?: any, options?: any) {
        return ExternalApiFp(this.configuration).completeExternalCm(external, unisCustomerCd, body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 外部連携するCMの情報を取得する
     * @summary CM外部連携情報取得（外部システム専用）
     * @param {string} external 外部システム区分
     * @param {string} unisCustomerCd UNIS顧客CD
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ExternalApi
     */
    public getExternalCm(external: string, unisCustomerCd: string, options?: any) {
        return ExternalApiFp(this.configuration).getExternalCm(external, unisCustomerCd, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 外部連携するCMの情報を一覧で取得する
     * @summary CM外部連携情報一覧取得（外部システム専用）
     * @param {string} external 外部システム区分
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ExternalApi
     */
    public listExternalCm(external: string, options?: any) {
        return ExternalApiFp(this.configuration).listExternalCm(external, options).then((request) => request(this.axios, this.basePath));
    }
}
