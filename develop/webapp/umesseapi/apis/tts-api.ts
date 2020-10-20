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
import { InlineResponse2002 } from '../models';
/**
 * TtsApi - axios parameter creator
 * @export
 */
export const TtsApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary TTSデータリスト取得
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userTtsGet: async (options: any = {}): Promise<RequestArgs> => {
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
         * @summary 新規録音データ
         * @param {string} [filename] 
         * @param {string} [recordedFile] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userTtsPost: async (filename?: string, recordedFile?: string, options: any = {}): Promise<RequestArgs> => {
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
         * @param {string} ttsId ID of tts to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userTtsTtsIdDelete: async (ttsId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'ttsId' is not null or undefined
            if (ttsId === null || ttsId === undefined) {
                throw new RequiredError('ttsId','Required parameter ttsId was null or undefined when calling userTtsTtsIdDelete.');
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
         * @param {string} ttsId ID of tts to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userTtsTtsIdGet: async (ttsId: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'ttsId' is not null or undefined
            if (ttsId === null || ttsId === undefined) {
                throw new RequiredError('ttsId','Required parameter ttsId was null or undefined when calling userTtsTtsIdGet.');
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
         * @param {string} ttsId ID of tts to return
         * @param {string} [filename] 
         * @param {string} [recordedFile] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userTtsTtsIdPost: async (ttsId: string, filename?: string, recordedFile?: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'ttsId' is not null or undefined
            if (ttsId === null || ttsId === undefined) {
                throw new RequiredError('ttsId','Required parameter ttsId was null or undefined when calling userTtsTtsIdPost.');
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
         * @summary TTSデータリスト取得
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userTtsGet(options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse2002>> {
            const localVarAxiosArgs = await TtsApiAxiosParamCreator(configuration).userTtsGet(options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary 新規録音データ
         * @param {string} [filename] 
         * @param {string} [recordedFile] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userTtsPost(filename?: string, recordedFile?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await TtsApiAxiosParamCreator(configuration).userTtsPost(filename, recordedFile, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary TTSデータ削除
         * @param {string} ttsId ID of tts to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userTtsTtsIdDelete(ttsId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await TtsApiAxiosParamCreator(configuration).userTtsTtsIdDelete(ttsId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary TTSデータ取得
         * @param {string} ttsId ID of tts to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userTtsTtsIdGet(ttsId: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await TtsApiAxiosParamCreator(configuration).userTtsTtsIdGet(ttsId, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary TTSデータ更新（メタデータのみ）
         * @param {string} ttsId ID of tts to return
         * @param {string} [filename] 
         * @param {string} [recordedFile] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async userTtsTtsIdPost(ttsId: string, filename?: string, recordedFile?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>> {
            const localVarAxiosArgs = await TtsApiAxiosParamCreator(configuration).userTtsTtsIdPost(ttsId, filename, recordedFile, options);
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
         * @summary TTSデータリスト取得
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userTtsGet(options?: any): AxiosPromise<InlineResponse2002> {
            return TtsApiFp(configuration).userTtsGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary 新規録音データ
         * @param {string} [filename] 
         * @param {string} [recordedFile] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userTtsPost(filename?: string, recordedFile?: string, options?: any): AxiosPromise<void> {
            return TtsApiFp(configuration).userTtsPost(filename, recordedFile, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary TTSデータ削除
         * @param {string} ttsId ID of tts to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userTtsTtsIdDelete(ttsId: string, options?: any): AxiosPromise<void> {
            return TtsApiFp(configuration).userTtsTtsIdDelete(ttsId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary TTSデータ取得
         * @param {string} ttsId ID of tts to return
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userTtsTtsIdGet(ttsId: string, options?: any): AxiosPromise<void> {
            return TtsApiFp(configuration).userTtsTtsIdGet(ttsId, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary TTSデータ更新（メタデータのみ）
         * @param {string} ttsId ID of tts to return
         * @param {string} [filename] 
         * @param {string} [recordedFile] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        userTtsTtsIdPost(ttsId: string, filename?: string, recordedFile?: string, options?: any): AxiosPromise<void> {
            return TtsApiFp(configuration).userTtsTtsIdPost(ttsId, filename, recordedFile, options).then((request) => request(axios, basePath));
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
     * @summary TTSデータリスト取得
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TtsApi
     */
    public userTtsGet(options?: any) {
        return TtsApiFp(this.configuration).userTtsGet(options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary 新規録音データ
     * @param {string} [filename] 
     * @param {string} [recordedFile] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TtsApi
     */
    public userTtsPost(filename?: string, recordedFile?: string, options?: any) {
        return TtsApiFp(this.configuration).userTtsPost(filename, recordedFile, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary TTSデータ削除
     * @param {string} ttsId ID of tts to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TtsApi
     */
    public userTtsTtsIdDelete(ttsId: string, options?: any) {
        return TtsApiFp(this.configuration).userTtsTtsIdDelete(ttsId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary TTSデータ取得
     * @param {string} ttsId ID of tts to return
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TtsApi
     */
    public userTtsTtsIdGet(ttsId: string, options?: any) {
        return TtsApiFp(this.configuration).userTtsTtsIdGet(ttsId, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary TTSデータ更新（メタデータのみ）
     * @param {string} ttsId ID of tts to return
     * @param {string} [filename] 
     * @param {string} [recordedFile] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof TtsApi
     */
    public userTtsTtsIdPost(ttsId: string, filename?: string, recordedFile?: string, options?: any) {
        return TtsApiFp(this.configuration).userTtsTtsIdPost(ttsId, filename, recordedFile, options).then((request) => request(this.axios, this.basePath));
    }
}