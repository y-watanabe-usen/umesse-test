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
import { InlineResponseDefault } from '../models';
/**
 * PingApi - axios parameter creator
 * @export
 */
export const PingApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary ping
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        ping: async (options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/ping`;
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
 * PingApi - functional programming interface
 * @export
 */
export const PingApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary ping
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async ping(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponseDefault>> {
            const localVarAxiosArgs = await PingApiAxiosParamCreator(configuration).ping(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * PingApi - factory interface
 * @export
 */
export const PingApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary ping
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        ping(options?: any): AxiosPromise<InlineResponseDefault> {
            return PingApiFp(configuration).ping(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PingApi - object-oriented interface
 * @export
 * @class PingApi
 * @extends {BaseAPI}
 */
export class PingApi extends BaseAPI {
    /**
     * 
     * @summary ping
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PingApi
     */
    public ping(options?: any) {
        return PingApiFp(this.configuration).ping(options).then((request) => request(this.axios, this.basePath));
    }
}
