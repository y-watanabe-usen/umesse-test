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
import { Body4 } from '../models';
import { CmItem } from '../models';
import { InlineResponse200 } from '../models';
import { InlineResponse2001 } from '../models';
/**
 * CenterApi - axios parameter creator
 * @export
 */
export const CenterApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary CMセンター連携追加
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {string} cmId ID of cm to return
         * @param {Body3} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createCenterCm: async (xUnisCustomerCd: string, cmId: string, body?: Body3, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'xUnisCustomerCd' is not null or undefined
            if (xUnisCustomerCd === null || xUnisCustomerCd === undefined) {
                throw new RequiredError('xUnisCustomerCd','Required parameter xUnisCustomerCd was null or undefined when calling createCenterCm.');
            }
            // verify required parameter 'cmId' is not null or undefined
            if (cmId === null || cmId === undefined) {
                throw new RequiredError('cmId','Required parameter cmId was null or undefined when calling createCenterCm.');
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
         * 
         * @summary CMセンター連携削除
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {string} cmId ID of cm to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteCenterCm: async (xUnisCustomerCd: string, cmId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'xUnisCustomerCd' is not null or undefined
            if (xUnisCustomerCd === null || xUnisCustomerCd === undefined) {
                throw new RequiredError('xUnisCustomerCd','Required parameter xUnisCustomerCd was null or undefined when calling deleteCenterCm.');
            }
            // verify required parameter 'cmId' is not null or undefined
            if (cmId === null || cmId === undefined) {
                throw new RequiredError('cmId','Required parameter cmId was null or undefined when calling deleteCenterCm.');
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
         * 
         * @summary センターCM連携取得（センター専用）
         * @param {string} unisCustomerCd ID of unis customer cd to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCenterUpload: async (unisCustomerCd: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'unisCustomerCd' is not null or undefined
            if (unisCustomerCd === null || unisCustomerCd === undefined) {
                throw new RequiredError('unisCustomerCd','Required parameter unisCustomerCd was null or undefined when calling getCenterUpload.');
            }
            const localVarPath = `/center/upload/{unisCustomerCd}`
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
         * 
         * @summary センターCM連携（センター専用）
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listCenterUpload: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/center/upload`;
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
         * @summary センターCM連携完了（センター専用）
         * @param {string} unisCustomerCd ID of unis customer cd to return
         * @param {Body4} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateCenterUpload: async (unisCustomerCd: string, body?: Body4, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'unisCustomerCd' is not null or undefined
            if (unisCustomerCd === null || unisCustomerCd === undefined) {
                throw new RequiredError('unisCustomerCd','Required parameter unisCustomerCd was null or undefined when calling updateCenterUpload.');
            }
            const localVarPath = `/center/upload/{unisCustomerCd}`
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
         * @summary CMセンター連携追加
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {string} cmId ID of cm to return
         * @param {Body3} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createCenterCm(xUnisCustomerCd: string, cmId: string, body?: Body3, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CmItem>> {
            const localVarAxiosArgs = await CenterApiAxiosParamCreator(configuration).createCenterCm(xUnisCustomerCd, cmId, body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary CMセンター連携削除
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {string} cmId ID of cm to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteCenterCm(xUnisCustomerCd: string, cmId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await CenterApiAxiosParamCreator(configuration).deleteCenterCm(xUnisCustomerCd, cmId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary センターCM連携取得（センター専用）
         * @param {string} unisCustomerCd ID of unis customer cd to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getCenterUpload(unisCustomerCd: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse200>> {
            const localVarAxiosArgs = await CenterApiAxiosParamCreator(configuration).getCenterUpload(unisCustomerCd, options);
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
        async listCenterUpload(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<InlineResponse200>>> {
            const localVarAxiosArgs = await CenterApiAxiosParamCreator(configuration).listCenterUpload(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary センターCM連携完了（センター専用）
         * @param {string} unisCustomerCd ID of unis customer cd to return
         * @param {Body4} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateCenterUpload(unisCustomerCd: string, body?: Body4, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2001>> {
            const localVarAxiosArgs = await CenterApiAxiosParamCreator(configuration).updateCenterUpload(unisCustomerCd, body, options);
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
         * @summary CMセンター連携追加
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {string} cmId ID of cm to return
         * @param {Body3} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createCenterCm(xUnisCustomerCd: string, cmId: string, body?: Body3, options?: any): AxiosPromise<CmItem> {
            return CenterApiFp(configuration).createCenterCm(xUnisCustomerCd, cmId, body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary CMセンター連携削除
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {string} cmId ID of cm to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteCenterCm(xUnisCustomerCd: string, cmId: string, options?: any): AxiosPromise<void> {
            return CenterApiFp(configuration).deleteCenterCm(xUnisCustomerCd, cmId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary センターCM連携取得（センター専用）
         * @param {string} unisCustomerCd ID of unis customer cd to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getCenterUpload(unisCustomerCd: string, options?: any): AxiosPromise<InlineResponse200> {
            return CenterApiFp(configuration).getCenterUpload(unisCustomerCd, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary センターCM連携（センター専用）
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listCenterUpload(options?: any): AxiosPromise<Array<InlineResponse200>> {
            return CenterApiFp(configuration).listCenterUpload(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary センターCM連携完了（センター専用）
         * @param {string} unisCustomerCd ID of unis customer cd to return
         * @param {Body4} [body] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateCenterUpload(unisCustomerCd: string, body?: Body4, options?: any): AxiosPromise<InlineResponse2001> {
            return CenterApiFp(configuration).updateCenterUpload(unisCustomerCd, body, options).then((request) => request(axios, basePath));
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
     * @summary CMセンター連携追加
     * @param {string} xUnisCustomerCd ID of unis customer cd to return
     * @param {string} cmId ID of cm to return
     * @param {Body3} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CenterApi
     */
    public createCenterCm(xUnisCustomerCd: string, cmId: string, body?: Body3, options?: any) {
        return CenterApiFp(this.configuration).createCenterCm(xUnisCustomerCd, cmId, body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary CMセンター連携削除
     * @param {string} xUnisCustomerCd ID of unis customer cd to return
     * @param {string} cmId ID of cm to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CenterApi
     */
    public deleteCenterCm(xUnisCustomerCd: string, cmId: string, options?: any) {
        return CenterApiFp(this.configuration).deleteCenterCm(xUnisCustomerCd, cmId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary センターCM連携取得（センター専用）
     * @param {string} unisCustomerCd ID of unis customer cd to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CenterApi
     */
    public getCenterUpload(unisCustomerCd: string, options?: any) {
        return CenterApiFp(this.configuration).getCenterUpload(unisCustomerCd, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary センターCM連携（センター専用）
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CenterApi
     */
    public listCenterUpload(options?: any) {
        return CenterApiFp(this.configuration).listCenterUpload(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary センターCM連携完了（センター専用）
     * @param {string} unisCustomerCd ID of unis customer cd to return
     * @param {Body4} [body] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CenterApi
     */
    public updateCenterUpload(unisCustomerCd: string, body?: Body4, options?: any) {
        return CenterApiFp(this.configuration).updateCenterUpload(unisCustomerCd, body, options).then((request) => request(this.axios, this.basePath));
    }
}
