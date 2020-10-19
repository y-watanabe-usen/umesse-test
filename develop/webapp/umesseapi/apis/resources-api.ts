/* tslint:disable */
/* eslint-disable */
/**
 * U-Messe API
 * U-Messe API
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
import { InlineResponse2001 } from '../models';
import { InlineResponse2002 } from '../models';
import { InlineResponse2003 } from '../models';
import { InlineResponse2004 } from '../models';
/**
 * ResourcesApi - axios parameter creator
 * @export
 */
export const ResourcesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary BGM
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        bgmGet: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/bgm`;
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
         * 
         * @summary Open/Endチャイム
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        chimeGet: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/chime`;
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
         * 
         * @summary ナレーション
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        narrationGet: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/narration`;
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
         * 
         * @summary TTSテンプレート一覧
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        ttsGet: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/tts`;
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
 * ResourcesApi - functional programming interface
 * @export
 */
export const ResourcesApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary BGM
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async bgmGet(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2002>> {
            const localVarAxiosArgs = await ResourcesApiAxiosParamCreator(configuration).bgmGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary Open/Endチャイム
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async chimeGet(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2004>> {
            const localVarAxiosArgs = await ResourcesApiAxiosParamCreator(configuration).chimeGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary ナレーション
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async narrationGet(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2003>> {
            const localVarAxiosArgs = await ResourcesApiAxiosParamCreator(configuration).narrationGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary TTSテンプレート一覧
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async ttsGet(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2001>> {
            const localVarAxiosArgs = await ResourcesApiAxiosParamCreator(configuration).ttsGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * ResourcesApi - factory interface
 * @export
 */
export const ResourcesApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary BGM
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        bgmGet(options?: any): AxiosPromise<InlineResponse2002> {
            return ResourcesApiFp(configuration).bgmGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary Open/Endチャイム
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        chimeGet(options?: any): AxiosPromise<InlineResponse2004> {
            return ResourcesApiFp(configuration).chimeGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary ナレーション
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        narrationGet(options?: any): AxiosPromise<InlineResponse2003> {
            return ResourcesApiFp(configuration).narrationGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary TTSテンプレート一覧
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        ttsGet(options?: any): AxiosPromise<InlineResponse2001> {
            return ResourcesApiFp(configuration).ttsGet(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * ResourcesApi - object-oriented interface
 * @export
 * @class ResourcesApi
 * @extends {BaseAPI}
 */
export class ResourcesApi extends BaseAPI {
    /**
     * 
     * @summary BGM
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ResourcesApi
     */
    public bgmGet(options?: any) {
        return ResourcesApiFp(this.configuration).bgmGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary Open/Endチャイム
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ResourcesApi
     */
    public chimeGet(options?: any) {
        return ResourcesApiFp(this.configuration).chimeGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary ナレーション
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ResourcesApi
     */
    public narrationGet(options?: any) {
        return ResourcesApiFp(this.configuration).narrationGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary TTSテンプレート一覧
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ResourcesApi
     */
    public ttsGet(options?: any) {
        return ResourcesApiFp(this.configuration).ttsGet(options).then((request) => request(this.axios, this.basePath));
    }
}
