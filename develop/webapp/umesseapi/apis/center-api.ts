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
import { Body3 } from '../models';
import { InlineResponse200 } from '../models';
/**
 * CenterApi - axios parameter creator
 * @export
 */
export const CenterApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary CMセンター連携削除
         * @param {string} cmId ID of cm to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        centerCmIdDelete: async (cmId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'cmId' is not null or undefined
            if (cmId === null || cmId === undefined) {
                throw new RequiredError('cmId','Required parameter cmId was null or undefined when calling centerCmIdDelete.');
            }
            const localVarPath = `/center/{cmId}`
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
         * @summary CMセンター連携追加
         * @param {string} cmId ID of cm to return
         * @param {Body3} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        centerCmIdPost: async (cmId: string, body?: Body3, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'cmId' is not null or undefined
            if (cmId === null || cmId === undefined) {
                throw new RequiredError('cmId','Required parameter cmId was null or undefined when calling centerCmIdPost.');
            }
            const localVarPath = `/center/{cmId}`
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
         * 
         * @summary センターCM連携完了（センター専用）
         * @param {string} cmId ID of cm to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        centerDownloadCmIdPost: async (cmId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'cmId' is not null or undefined
            if (cmId === null || cmId === undefined) {
                throw new RequiredError('cmId','Required parameter cmId was null or undefined when calling centerDownloadCmIdPost.');
            }
            const localVarPath = `/center/download/{cmId}`
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
         * @summary センターCM連携（センター専用）
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        centerDownloadGet: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/center/download`;
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
 * CenterApi - functional programming interface
 * @export
 */
export const CenterApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary CMセンター連携削除
         * @param {string} cmId ID of cm to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async centerCmIdDelete(cmId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await CenterApiAxiosParamCreator(configuration).centerCmIdDelete(cmId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary CMセンター連携追加
         * @param {string} cmId ID of cm to return
         * @param {Body3} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async centerCmIdPost(cmId: string, body?: Body3, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await CenterApiAxiosParamCreator(configuration).centerCmIdPost(cmId, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary センターCM連携完了（センター専用）
         * @param {string} cmId ID of cm to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async centerDownloadCmIdPost(cmId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse200>> {
            const localVarAxiosArgs = await CenterApiAxiosParamCreator(configuration).centerDownloadCmIdPost(cmId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary センターCM連携（センター専用）
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async centerDownloadGet(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse200>> {
            const localVarAxiosArgs = await CenterApiAxiosParamCreator(configuration).centerDownloadGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * CenterApi - factory interface
 * @export
 */
export const CenterApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary CMセンター連携削除
         * @param {string} cmId ID of cm to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        centerCmIdDelete(cmId: string, options?: any): AxiosPromise<void> {
            return CenterApiFp(configuration).centerCmIdDelete(cmId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary CMセンター連携追加
         * @param {string} cmId ID of cm to return
         * @param {Body3} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        centerCmIdPost(cmId: string, body?: Body3, options?: any): AxiosPromise<void> {
            return CenterApiFp(configuration).centerCmIdPost(cmId, body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary センターCM連携完了（センター専用）
         * @param {string} cmId ID of cm to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        centerDownloadCmIdPost(cmId: string, options?: any): AxiosPromise<InlineResponse200> {
            return CenterApiFp(configuration).centerDownloadCmIdPost(cmId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary センターCM連携（センター専用）
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        centerDownloadGet(options?: any): AxiosPromise<InlineResponse200> {
            return CenterApiFp(configuration).centerDownloadGet(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * CenterApi - object-oriented interface
 * @export
 * @class CenterApi
 * @extends {BaseAPI}
 */
export class CenterApi extends BaseAPI {
    /**
     * 
     * @summary CMセンター連携削除
     * @param {string} cmId ID of cm to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CenterApi
     */
    public centerCmIdDelete(cmId: string, options?: any) {
        return CenterApiFp(this.configuration).centerCmIdDelete(cmId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary CMセンター連携追加
     * @param {string} cmId ID of cm to return
     * @param {Body3} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CenterApi
     */
    public centerCmIdPost(cmId: string, body?: Body3, options?: any) {
        return CenterApiFp(this.configuration).centerCmIdPost(cmId, body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary センターCM連携完了（センター専用）
     * @param {string} cmId ID of cm to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CenterApi
     */
    public centerDownloadCmIdPost(cmId: string, options?: any) {
        return CenterApiFp(this.configuration).centerDownloadCmIdPost(cmId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary センターCM連携（センター専用）
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CenterApi
     */
    public centerDownloadGet(options?: any) {
        return CenterApiFp(this.configuration).centerDownloadGet(options).then((request) => request(this.axios, this.basePath));
    }
}
