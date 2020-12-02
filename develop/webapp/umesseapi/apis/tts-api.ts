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
import { TtsItem } from '../models';
/**
 * TtsApi - axios parameter creator
 * @export
 */
export const TtsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 新規録音データ
         * @param {string} xToken ID of token to return
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {string} [filename] 
         * @param {string} [recordedFile] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUserTts: async (xToken: string, xUnisCustomerCd: string, filename?: string, recordedFile?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'xToken' is not null or undefined
            if (xToken === null || xToken === undefined) {
                throw new RequiredError('xToken','Required parameter xToken was null or undefined when calling createUserTts.');
            }
            // verify required parameter 'xUnisCustomerCd' is not null or undefined
            if (xUnisCustomerCd === null || xUnisCustomerCd === undefined) {
                throw new RequiredError('xUnisCustomerCd','Required parameter xUnisCustomerCd was null or undefined when calling createUserTts.');
            }
            const localVarPath = `/user/tts`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new FormData();

            // authentication ApiKeyAuth required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("x-api-key")
                    : await configuration.apiKey;
                localVarHeaderParameter["x-api-key"] = localVarApiKeyValue;
            }

            if (xToken !== undefined && xToken !== null) {
                localVarHeaderParameter['x-token'] = String(xToken);
            }

            if (xUnisCustomerCd !== undefined && xUnisCustomerCd !== null) {
                localVarHeaderParameter['x-unis-customer-cd'] = String(xUnisCustomerCd);
            }


            if (filename !== undefined) { 
                localVarFormParams.append('filename', filename as any);
            }

            if (recordedFile !== undefined) { 
                localVarFormParams.append('recordedFile', recordedFile as any);
            }

            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
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
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary TTSデータ削除
         * @param {string} xToken ID of token to return
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {string} ttsId ID of tts to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUserTts: async (xToken: string, xUnisCustomerCd: string, ttsId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'xToken' is not null or undefined
            if (xToken === null || xToken === undefined) {
                throw new RequiredError('xToken','Required parameter xToken was null or undefined when calling deleteUserTts.');
            }
            // verify required parameter 'xUnisCustomerCd' is not null or undefined
            if (xUnisCustomerCd === null || xUnisCustomerCd === undefined) {
                throw new RequiredError('xUnisCustomerCd','Required parameter xUnisCustomerCd was null or undefined when calling deleteUserTts.');
            }
            // verify required parameter 'ttsId' is not null or undefined
            if (ttsId === null || ttsId === undefined) {
                throw new RequiredError('ttsId','Required parameter ttsId was null or undefined when calling deleteUserTts.');
            }
            const localVarPath = `/user/tts/{ttsId}`
                .replace(`{${"ttsId"}}`, encodeURIComponent(String(ttsId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication ApiKeyAuth required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("x-api-key")
                    : await configuration.apiKey;
                localVarHeaderParameter["x-api-key"] = localVarApiKeyValue;
            }

            if (xToken !== undefined && xToken !== null) {
                localVarHeaderParameter['x-token'] = String(xToken);
            }

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
         * @summary TTSデータ取得
         * @param {string} xToken ID of token to return
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {string} ttsId ID of tts to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUserTts: async (xToken: string, xUnisCustomerCd: string, ttsId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'xToken' is not null or undefined
            if (xToken === null || xToken === undefined) {
                throw new RequiredError('xToken','Required parameter xToken was null or undefined when calling getUserTts.');
            }
            // verify required parameter 'xUnisCustomerCd' is not null or undefined
            if (xUnisCustomerCd === null || xUnisCustomerCd === undefined) {
                throw new RequiredError('xUnisCustomerCd','Required parameter xUnisCustomerCd was null or undefined when calling getUserTts.');
            }
            // verify required parameter 'ttsId' is not null or undefined
            if (ttsId === null || ttsId === undefined) {
                throw new RequiredError('ttsId','Required parameter ttsId was null or undefined when calling getUserTts.');
            }
            const localVarPath = `/user/tts/{ttsId}`
                .replace(`{${"ttsId"}}`, encodeURIComponent(String(ttsId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication ApiKeyAuth required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("x-api-key")
                    : await configuration.apiKey;
                localVarHeaderParameter["x-api-key"] = localVarApiKeyValue;
            }

            if (xToken !== undefined && xToken !== null) {
                localVarHeaderParameter['x-token'] = String(xToken);
            }

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
         * @summary TTSデータリスト取得
         * @param {string} xToken ID of token to return
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listUserTts: async (xToken: string, xUnisCustomerCd: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'xToken' is not null or undefined
            if (xToken === null || xToken === undefined) {
                throw new RequiredError('xToken','Required parameter xToken was null or undefined when calling listUserTts.');
            }
            // verify required parameter 'xUnisCustomerCd' is not null or undefined
            if (xUnisCustomerCd === null || xUnisCustomerCd === undefined) {
                throw new RequiredError('xUnisCustomerCd','Required parameter xUnisCustomerCd was null or undefined when calling listUserTts.');
            }
            const localVarPath = `/user/tts`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication ApiKeyAuth required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("x-api-key")
                    : await configuration.apiKey;
                localVarHeaderParameter["x-api-key"] = localVarApiKeyValue;
            }

            if (xToken !== undefined && xToken !== null) {
                localVarHeaderParameter['x-token'] = String(xToken);
            }

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
         * @summary TTSデータ更新（メタデータのみ）
         * @param {string} xToken ID of token to return
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {string} ttsId ID of tts to return
         * @param {string} [title] 
         * @param {string} [description] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUserTts: async (xToken: string, xUnisCustomerCd: string, ttsId: string, title?: string, description?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'xToken' is not null or undefined
            if (xToken === null || xToken === undefined) {
                throw new RequiredError('xToken','Required parameter xToken was null or undefined when calling updateUserTts.');
            }
            // verify required parameter 'xUnisCustomerCd' is not null or undefined
            if (xUnisCustomerCd === null || xUnisCustomerCd === undefined) {
                throw new RequiredError('xUnisCustomerCd','Required parameter xUnisCustomerCd was null or undefined when calling updateUserTts.');
            }
            // verify required parameter 'ttsId' is not null or undefined
            if (ttsId === null || ttsId === undefined) {
                throw new RequiredError('ttsId','Required parameter ttsId was null or undefined when calling updateUserTts.');
            }
            const localVarPath = `/user/tts/{ttsId}`
                .replace(`{${"ttsId"}}`, encodeURIComponent(String(ttsId)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;
            const localVarFormParams = new FormData();

            // authentication ApiKeyAuth required
            if (configuration && configuration.apiKey) {
                const localVarApiKeyValue = typeof configuration.apiKey === 'function'
                    ? await configuration.apiKey("x-api-key")
                    : await configuration.apiKey;
                localVarHeaderParameter["x-api-key"] = localVarApiKeyValue;
            }

            if (xToken !== undefined && xToken !== null) {
                localVarHeaderParameter['x-token'] = String(xToken);
            }

            if (xUnisCustomerCd !== undefined && xUnisCustomerCd !== null) {
                localVarHeaderParameter['x-unis-customer-cd'] = String(xUnisCustomerCd);
            }


            if (title !== undefined) { 
                localVarFormParams.append('title', title as any);
            }

            if (description !== undefined) { 
                localVarFormParams.append('description', description as any);
            }

            localVarHeaderParameter['Content-Type'] = 'multipart/form-data';
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
            localVarRequestOptions.data = localVarFormParams;

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * TtsApi - functional programming interface
 * @export
 */
export const TtsApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary 新規録音データ
         * @param {string} xToken ID of token to return
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {string} [filename] 
         * @param {string} [recordedFile] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async createUserTts(xToken: string, xUnisCustomerCd: string, filename?: string, recordedFile?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<TtsItem>>> {
            const localVarAxiosArgs = await TtsApiAxiosParamCreator(configuration).createUserTts(xToken, xUnisCustomerCd, filename, recordedFile, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary TTSデータ削除
         * @param {string} xToken ID of token to return
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {string} ttsId ID of tts to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async deleteUserTts(xToken: string, xUnisCustomerCd: string, ttsId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await TtsApiAxiosParamCreator(configuration).deleteUserTts(xToken, xUnisCustomerCd, ttsId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary TTSデータ取得
         * @param {string} xToken ID of token to return
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {string} ttsId ID of tts to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getUserTts(xToken: string, xUnisCustomerCd: string, ttsId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TtsItem>> {
            const localVarAxiosArgs = await TtsApiAxiosParamCreator(configuration).getUserTts(xToken, xUnisCustomerCd, ttsId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary TTSデータリスト取得
         * @param {string} xToken ID of token to return
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listUserTts(xToken: string, xUnisCustomerCd: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<TtsItem>>> {
            const localVarAxiosArgs = await TtsApiAxiosParamCreator(configuration).listUserTts(xToken, xUnisCustomerCd, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary TTSデータ更新（メタデータのみ）
         * @param {string} xToken ID of token to return
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {string} ttsId ID of tts to return
         * @param {string} [title] 
         * @param {string} [description] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async updateUserTts(xToken: string, xUnisCustomerCd: string, ttsId: string, title?: string, description?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<TtsItem>> {
            const localVarAxiosArgs = await TtsApiAxiosParamCreator(configuration).updateUserTts(xToken, xUnisCustomerCd, ttsId, title, description, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * TtsApi - factory interface
 * @export
 */
export const TtsApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary 新規録音データ
         * @param {string} xToken ID of token to return
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {string} [filename] 
         * @param {string} [recordedFile] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        createUserTts(xToken: string, xUnisCustomerCd: string, filename?: string, recordedFile?: string, options?: any): AxiosPromise<Array<TtsItem>> {
            return TtsApiFp(configuration).createUserTts(xToken, xUnisCustomerCd, filename, recordedFile, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary TTSデータ削除
         * @param {string} xToken ID of token to return
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {string} ttsId ID of tts to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        deleteUserTts(xToken: string, xUnisCustomerCd: string, ttsId: string, options?: any): AxiosPromise<void> {
            return TtsApiFp(configuration).deleteUserTts(xToken, xUnisCustomerCd, ttsId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary TTSデータ取得
         * @param {string} xToken ID of token to return
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {string} ttsId ID of tts to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getUserTts(xToken: string, xUnisCustomerCd: string, ttsId: string, options?: any): AxiosPromise<TtsItem> {
            return TtsApiFp(configuration).getUserTts(xToken, xUnisCustomerCd, ttsId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary TTSデータリスト取得
         * @param {string} xToken ID of token to return
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listUserTts(xToken: string, xUnisCustomerCd: string, options?: any): AxiosPromise<Array<TtsItem>> {
            return TtsApiFp(configuration).listUserTts(xToken, xUnisCustomerCd, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary TTSデータ更新（メタデータのみ）
         * @param {string} xToken ID of token to return
         * @param {string} xUnisCustomerCd ID of unis customer cd to return
         * @param {string} ttsId ID of tts to return
         * @param {string} [title] 
         * @param {string} [description] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        updateUserTts(xToken: string, xUnisCustomerCd: string, ttsId: string, title?: string, description?: string, options?: any): AxiosPromise<TtsItem> {
            return TtsApiFp(configuration).updateUserTts(xToken, xUnisCustomerCd, ttsId, title, description, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * TtsApi - object-oriented interface
 * @export
 * @class TtsApi
 * @extends {BaseAPI}
 */
export class TtsApi extends BaseAPI {
    /**
     * 
     * @summary 新規録音データ
     * @param {string} xToken ID of token to return
     * @param {string} xUnisCustomerCd ID of unis customer cd to return
     * @param {string} [filename] 
     * @param {string} [recordedFile] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TtsApi
     */
    public createUserTts(xToken: string, xUnisCustomerCd: string, filename?: string, recordedFile?: string, options?: any) {
        return TtsApiFp(this.configuration).createUserTts(xToken, xUnisCustomerCd, filename, recordedFile, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary TTSデータ削除
     * @param {string} xToken ID of token to return
     * @param {string} xUnisCustomerCd ID of unis customer cd to return
     * @param {string} ttsId ID of tts to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TtsApi
     */
    public deleteUserTts(xToken: string, xUnisCustomerCd: string, ttsId: string, options?: any) {
        return TtsApiFp(this.configuration).deleteUserTts(xToken, xUnisCustomerCd, ttsId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary TTSデータ取得
     * @param {string} xToken ID of token to return
     * @param {string} xUnisCustomerCd ID of unis customer cd to return
     * @param {string} ttsId ID of tts to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TtsApi
     */
    public getUserTts(xToken: string, xUnisCustomerCd: string, ttsId: string, options?: any) {
        return TtsApiFp(this.configuration).getUserTts(xToken, xUnisCustomerCd, ttsId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary TTSデータリスト取得
     * @param {string} xToken ID of token to return
     * @param {string} xUnisCustomerCd ID of unis customer cd to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TtsApi
     */
    public listUserTts(xToken: string, xUnisCustomerCd: string, options?: any) {
        return TtsApiFp(this.configuration).listUserTts(xToken, xUnisCustomerCd, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary TTSデータ更新（メタデータのみ）
     * @param {string} xToken ID of token to return
     * @param {string} xUnisCustomerCd ID of unis customer cd to return
     * @param {string} ttsId ID of tts to return
     * @param {string} [title] 
     * @param {string} [description] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TtsApi
     */
    public updateUserTts(xToken: string, xUnisCustomerCd: string, ttsId: string, title?: string, description?: string, options?: any) {
        return TtsApiFp(this.configuration).updateUserTts(xToken, xUnisCustomerCd, ttsId, title, description, options).then((request) => request(this.axios, this.basePath));
    }
}
