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
import { ExternalItem } from '../models';
import { ExternalItems } from '../models';
/**
 * UploadApi - axios parameter creator
 * @export
 */
export const UploadApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * CMを外部連携する
         * @summary CM外部連携追加
         * @param {string} xUnisCustomerCd UNIS顧客CD
         * @param {string} id CM ID
         * @param {any} [body] CM外部連携システムリクエストBody
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUploadCm: async (xUnisCustomerCd: string, id: string, body?: any, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'xUnisCustomerCd' is not null or undefined
            if (xUnisCustomerCd === null || xUnisCustomerCd === undefined) {
                throw new RequiredError('xUnisCustomerCd','Required parameter xUnisCustomerCd was null or undefined when calling createUploadCm.');
            }
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling createUploadCm.');
            }
            const localVarPath = `/upload/cm/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (xUnisCustomerCd !== undefined && xUnisCustomerCd !== null) {
                localVarHeaderParameter['x-unis-customer-cd'] = String(xUnisCustomerCd);
            }

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
         * CMの外部連携を解除する
         * @summary CM外部連携解除
         * @param {string} id CM ID
         * @param {string} xUnisCustomerCd UNIS顧客CD
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUploadCm: async (id: string, xUnisCustomerCd: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling deleteUploadCm.');
            }
            // verify required parameter 'xUnisCustomerCd' is not null or undefined
            if (xUnisCustomerCd === null || xUnisCustomerCd === undefined) {
                throw new RequiredError('xUnisCustomerCd','Required parameter xUnisCustomerCd was null or undefined when calling deleteUploadCm.');
            }
            const localVarPath = `/upload/cm/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (xUnisCustomerCd !== undefined && xUnisCustomerCd !== null) {
                localVarHeaderParameter['x-unis-customer-cd'] = String(xUnisCustomerCd);
            }

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
         * CMの外部連携状態を取得する
         * @summary CM外部連携情報取得
         * @param {string} id CM ID
         * @param {string} xUnisCustomerCd UNIS顧客CD
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUploadCm: async (id: string, xUnisCustomerCd: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getUploadCm.');
            }
            // verify required parameter 'xUnisCustomerCd' is not null or undefined
            if (xUnisCustomerCd === null || xUnisCustomerCd === undefined) {
                throw new RequiredError('xUnisCustomerCd','Required parameter xUnisCustomerCd was null or undefined when calling getUploadCm.');
            }
            const localVarPath = `/upload/cm/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (xUnisCustomerCd !== undefined && xUnisCustomerCd !== null) {
                localVarHeaderParameter['x-unis-customer-cd'] = String(xUnisCustomerCd);
            }

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
         * CMの外部連携状態を一覧で取得する
         * @summary CM外部連携情報一覧取得
         * @param {string} xUnisCustomerCd UNIS顧客CD
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listUploadCm: async (xUnisCustomerCd: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'xUnisCustomerCd' is not null or undefined
            if (xUnisCustomerCd === null || xUnisCustomerCd === undefined) {
                throw new RequiredError('xUnisCustomerCd','Required parameter xUnisCustomerCd was null or undefined when calling listUploadCm.');
            }
            const localVarPath = `/upload/cm`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (xUnisCustomerCd !== undefined && xUnisCustomerCd !== null) {
                localVarHeaderParameter['x-unis-customer-cd'] = String(xUnisCustomerCd);
            }

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
 * UploadApi - functional programming interface
 * @export
 */
export const UploadApiFp = function(configuration?: Configuration) {
    return {
        /**
         * CMを外部連携する
         * @summary CM外部連携追加
         * @param {string} xUnisCustomerCd UNIS顧客CD
         * @param {string} id CM ID
         * @param {any} [body] CM外部連携システムリクエストBody
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createUploadCm(xUnisCustomerCd: string, id: string, body?: any, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ExternalItem>> {
            const localVarAxiosArgs = await UploadApiAxiosParamCreator(configuration).createUploadCm(xUnisCustomerCd, id, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * CMの外部連携を解除する
         * @summary CM外部連携解除
         * @param {string} id CM ID
         * @param {string} xUnisCustomerCd UNIS顧客CD
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteUploadCm(id: string, xUnisCustomerCd: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ExternalItem>> {
            const localVarAxiosArgs = await UploadApiAxiosParamCreator(configuration).deleteUploadCm(id, xUnisCustomerCd, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * CMの外部連携状態を取得する
         * @summary CM外部連携情報取得
         * @param {string} id CM ID
         * @param {string} xUnisCustomerCd UNIS顧客CD
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUploadCm(id: string, xUnisCustomerCd: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ExternalItem>> {
            const localVarAxiosArgs = await UploadApiAxiosParamCreator(configuration).getUploadCm(id, xUnisCustomerCd, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * CMの外部連携状態を一覧で取得する
         * @summary CM外部連携情報一覧取得
         * @param {string} xUnisCustomerCd UNIS顧客CD
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listUploadCm(xUnisCustomerCd: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ExternalItems>> {
            const localVarAxiosArgs = await UploadApiAxiosParamCreator(configuration).listUploadCm(xUnisCustomerCd, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * UploadApi - factory interface
 * @export
 */
export const UploadApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * CMを外部連携する
         * @summary CM外部連携追加
         * @param {string} xUnisCustomerCd UNIS顧客CD
         * @param {string} id CM ID
         * @param {any} [body] CM外部連携システムリクエストBody
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUploadCm(xUnisCustomerCd: string, id: string, body?: any, options?: any): AxiosPromise<ExternalItem> {
            return UploadApiFp(configuration).createUploadCm(xUnisCustomerCd, id, body, options).then((request) => request(axios, basePath));
        },
        /**
         * CMの外部連携を解除する
         * @summary CM外部連携解除
         * @param {string} id CM ID
         * @param {string} xUnisCustomerCd UNIS顧客CD
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUploadCm(id: string, xUnisCustomerCd: string, options?: any): AxiosPromise<ExternalItem> {
            return UploadApiFp(configuration).deleteUploadCm(id, xUnisCustomerCd, options).then((request) => request(axios, basePath));
        },
        /**
         * CMの外部連携状態を取得する
         * @summary CM外部連携情報取得
         * @param {string} id CM ID
         * @param {string} xUnisCustomerCd UNIS顧客CD
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUploadCm(id: string, xUnisCustomerCd: string, options?: any): AxiosPromise<ExternalItem> {
            return UploadApiFp(configuration).getUploadCm(id, xUnisCustomerCd, options).then((request) => request(axios, basePath));
        },
        /**
         * CMの外部連携状態を一覧で取得する
         * @summary CM外部連携情報一覧取得
         * @param {string} xUnisCustomerCd UNIS顧客CD
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listUploadCm(xUnisCustomerCd: string, options?: any): AxiosPromise<ExternalItems> {
            return UploadApiFp(configuration).listUploadCm(xUnisCustomerCd, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UploadApi - object-oriented interface
 * @export
 * @class UploadApi
 * @extends {BaseAPI}
 */
export class UploadApi extends BaseAPI {
    /**
     * CMを外部連携する
     * @summary CM外部連携追加
     * @param {string} xUnisCustomerCd UNIS顧客CD
     * @param {string} id CM ID
     * @param {any} [body] CM外部連携システムリクエストBody
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UploadApi
     */
    public createUploadCm(xUnisCustomerCd: string, id: string, body?: any, options?: any) {
        return UploadApiFp(this.configuration).createUploadCm(xUnisCustomerCd, id, body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * CMの外部連携を解除する
     * @summary CM外部連携解除
     * @param {string} id CM ID
     * @param {string} xUnisCustomerCd UNIS顧客CD
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UploadApi
     */
    public deleteUploadCm(id: string, xUnisCustomerCd: string, options?: any) {
        return UploadApiFp(this.configuration).deleteUploadCm(id, xUnisCustomerCd, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * CMの外部連携状態を取得する
     * @summary CM外部連携情報取得
     * @param {string} id CM ID
     * @param {string} xUnisCustomerCd UNIS顧客CD
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UploadApi
     */
    public getUploadCm(id: string, xUnisCustomerCd: string, options?: any) {
        return UploadApiFp(this.configuration).getUploadCm(id, xUnisCustomerCd, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * CMの外部連携状態を一覧で取得する
     * @summary CM外部連携情報一覧取得
     * @param {string} xUnisCustomerCd UNIS顧客CD
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UploadApi
     */
    public listUploadCm(xUnisCustomerCd: string, options?: any) {
        return UploadApiFp(this.configuration).listUploadCm(xUnisCustomerCd, options).then((request) => request(this.axios, this.basePath));
    }
}
