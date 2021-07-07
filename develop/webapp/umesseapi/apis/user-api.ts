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
import { Agree } from '../models';
import { User } from '../models';
/**
 * UserApi - axios parameter creator
 * @export
 */
export const UserApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * ユーザーの同意を登録する
         * @summary 約款同意
         * @param {string} xUnisCustomerCd UNIS顧客CD
         * @param {string} xToken トークンID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        agreeUser: async (xUnisCustomerCd: string, xToken: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'xUnisCustomerCd' is not null or undefined
            if (xUnisCustomerCd === null || xUnisCustomerCd === undefined) {
                throw new RequiredError('xUnisCustomerCd','Required parameter xUnisCustomerCd was null or undefined when calling agreeUser.');
            }
            // verify required parameter 'xToken' is not null or undefined
            if (xToken === null || xToken === undefined) {
                throw new RequiredError('xToken','Required parameter xToken was null or undefined when calling agreeUser.');
            }
            const localVarPath = `/user/agree`;
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

            if (xToken !== undefined && xToken !== null) {
                localVarHeaderParameter['x-token'] = String(xToken);
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
         * ユーザーの情報を取得する
         * @summary ユーザー情報取得
         * @param {string} xUnisCustomerCd UNIS顧客CD
         * @param {string} xToken トークンID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser: async (xUnisCustomerCd: string, xToken: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'xUnisCustomerCd' is not null or undefined
            if (xUnisCustomerCd === null || xUnisCustomerCd === undefined) {
                throw new RequiredError('xUnisCustomerCd','Required parameter xUnisCustomerCd was null or undefined when calling getUser.');
            }
            // verify required parameter 'xToken' is not null or undefined
            if (xToken === null || xToken === undefined) {
                throw new RequiredError('xToken','Required parameter xToken was null or undefined when calling getUser.');
            }
            const localVarPath = `/user`;
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

            if (xToken !== undefined && xToken !== null) {
                localVarHeaderParameter['x-token'] = String(xToken);
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
 * UserApi - functional programming interface
 * @export
 */
export const UserApiFp = function(configuration?: Configuration) {
    return {
        /**
         * ユーザーの同意を登録する
         * @summary 約款同意
         * @param {string} xUnisCustomerCd UNIS顧客CD
         * @param {string} xToken トークンID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async agreeUser(xUnisCustomerCd: string, xToken: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Agree>> {
            const localVarAxiosArgs = await UserApiAxiosParamCreator(configuration).agreeUser(xUnisCustomerCd, xToken, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * ユーザーの情報を取得する
         * @summary ユーザー情報取得
         * @param {string} xUnisCustomerCd UNIS顧客CD
         * @param {string} xToken トークンID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUser(xUnisCustomerCd: string, xToken: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<User>> {
            const localVarAxiosArgs = await UserApiAxiosParamCreator(configuration).getUser(xUnisCustomerCd, xToken, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * UserApi - factory interface
 * @export
 */
export const UserApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * ユーザーの同意を登録する
         * @summary 約款同意
         * @param {string} xUnisCustomerCd UNIS顧客CD
         * @param {string} xToken トークンID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        agreeUser(xUnisCustomerCd: string, xToken: string, options?: any): AxiosPromise<Agree> {
            return UserApiFp(configuration).agreeUser(xUnisCustomerCd, xToken, options).then((request) => request(axios, basePath));
        },
        /**
         * ユーザーの情報を取得する
         * @summary ユーザー情報取得
         * @param {string} xUnisCustomerCd UNIS顧客CD
         * @param {string} xToken トークンID
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUser(xUnisCustomerCd: string, xToken: string, options?: any): AxiosPromise<User> {
            return UserApiFp(configuration).getUser(xUnisCustomerCd, xToken, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * UserApi - object-oriented interface
 * @export
 * @class UserApi
 * @extends {BaseAPI}
 */
export class UserApi extends BaseAPI {
    /**
     * ユーザーの同意を登録する
     * @summary 約款同意
     * @param {string} xUnisCustomerCd UNIS顧客CD
     * @param {string} xToken トークンID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public agreeUser(xUnisCustomerCd: string, xToken: string, options?: any) {
        return UserApiFp(this.configuration).agreeUser(xUnisCustomerCd, xToken, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * ユーザーの情報を取得する
     * @summary ユーザー情報取得
     * @param {string} xUnisCustomerCd UNIS顧客CD
     * @param {string} xToken トークンID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof UserApi
     */
    public getUser(xUnisCustomerCd: string, xToken: string, options?: any) {
        return UserApiFp(this.configuration).getUser(xUnisCustomerCd, xToken, options).then((request) => request(this.axios, this.basePath));
    }
}
