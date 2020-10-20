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
import { CmItem } from '../models';
/**
 * ShareApi - axios parameter creator
 * @export
 */
export const ShareApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary CM共有削除
         * @param {number} cmId ID of cm to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        shareCmIdDelete: async (cmId: number, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'cmId' is not null or undefined
            if (cmId === null || cmId === undefined) {
                throw new RequiredError('cmId','Required parameter cmId was null or undefined when calling shareCmIdDelete.');
            }
            const localVarPath = `/share/{cmId}`
                .replace(`{${"cmId"}}`, encodeURIComponent(String(cmId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
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
         * 
         * @summary CM共有追加
         * @param {string} cmId ID of cm to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        shareCmIdPost: async (cmId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'cmId' is not null or undefined
            if (cmId === null || cmId === undefined) {
                throw new RequiredError('cmId','Required parameter cmId was null or undefined when calling shareCmIdPost.');
            }
            const localVarPath = `/share/{cmId}`
                .replace(`{${"cmId"}}`, encodeURIComponent(String(cmId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
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
         * 
         * @summary CM共有リスト取得
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        shareGet: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/share`;
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
 * ShareApi - functional programming interface
 * @export
 */
export const ShareApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary CM共有削除
         * @param {number} cmId ID of cm to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async shareCmIdDelete(cmId: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await ShareApiAxiosParamCreator(configuration).shareCmIdDelete(cmId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary CM共有追加
         * @param {string} cmId ID of cm to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async shareCmIdPost(cmId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await ShareApiAxiosParamCreator(configuration).shareCmIdPost(cmId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary CM共有リスト取得
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async shareGet(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<CmItem>>> {
            const localVarAxiosArgs = await ShareApiAxiosParamCreator(configuration).shareGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ShareApi - factory interface
 * @export
 */
export const ShareApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary CM共有削除
         * @param {number} cmId ID of cm to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        shareCmIdDelete(cmId: number, options?: any): AxiosPromise<void> {
            return ShareApiFp(configuration).shareCmIdDelete(cmId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary CM共有追加
         * @param {string} cmId ID of cm to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        shareCmIdPost(cmId: string, options?: any): AxiosPromise<void> {
            return ShareApiFp(configuration).shareCmIdPost(cmId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary CM共有リスト取得
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        shareGet(options?: any): AxiosPromise<Array<CmItem>> {
            return ShareApiFp(configuration).shareGet(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ShareApi - object-oriented interface
 * @export
 * @class ShareApi
 * @extends {BaseAPI}
 */
export class ShareApi extends BaseAPI {
    /**
     * 
     * @summary CM共有削除
     * @param {number} cmId ID of cm to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ShareApi
     */
    public shareCmIdDelete(cmId: number, options?: any) {
        return ShareApiFp(this.configuration).shareCmIdDelete(cmId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary CM共有追加
     * @param {string} cmId ID of cm to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ShareApi
     */
    public shareCmIdPost(cmId: string, options?: any) {
        return ShareApiFp(this.configuration).shareCmIdPost(cmId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary CM共有リスト取得
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ShareApi
     */
    public shareGet(options?: any) {
        return ShareApiFp(this.configuration).shareGet(options).then((request) => request(this.axios, this.basePath));
    }
}