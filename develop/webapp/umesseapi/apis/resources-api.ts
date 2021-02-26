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
import { BgmItem } from '../models';
import { ChimeItem } from '../models';
import { FreeItem } from '../models';
import { InlineResponse200 } from '../models';
import { NarrationItem } from '../models';
import { TemplateItem } from '../models';
/**
 * ResourcesApi - axios parameter creator
 * @export
 */
export const ResourcesApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 試聴再生、音声素材アップロードのURLを取得する
         * @summary S3オブジェクトの署名付きURLの取得
         * @param {string} id 音源ID
         * @param {string} category カテゴリー
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSignedUrl: async (id: string, category: string, options: any = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            if (id === null || id === undefined) {
                throw new RequiredError('id','Required parameter id was null or undefined when calling getSignedUrl.');
            }
            // verify required parameter 'category' is not null or undefined
            if (category === null || category === undefined) {
                throw new RequiredError('category','Required parameter category was null or undefined when calling getSignedUrl.');
            }
            const localVarPath = `/signedUrl`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (id !== undefined) {
                localVarQueryParameter['id'] = id;
            }

            if (category !== undefined) {
                localVarQueryParameter['category'] = category;
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
         * BGM素材を一覧で取得する
         * @summary BGM
         * @param {string} [industryCd] 業種CD
         * @param {number} [sort] ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listBgm: async (industryCd?: string, sort?: number, options: any = {}): Promise<RequestArgs> => {
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

            if (industryCd !== undefined) {
                localVarQueryParameter['industryCd'] = industryCd;
            }

            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
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
         * 開始/終了チャイムを一覧で取得する
         * @summary Open/Endチャイム
         * @param {number} [sort] ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listChime: async (sort?: number, options: any = {}): Promise<RequestArgs> => {
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

            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
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
         * TTSのフリーワード素材を一覧で取得する
         * @summary TTSフリーワード一覧
         * @param {string} [industryCd] 業種CD
         * @param {string} [sceneCd] シーンCD
         * @param {number} [sort] ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFree: async (industryCd?: string, sceneCd?: string, sort?: number, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/free`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (industryCd !== undefined) {
                localVarQueryParameter['industryCd'] = industryCd;
            }

            if (sceneCd !== undefined) {
                localVarQueryParameter['sceneCd'] = sceneCd;
            }

            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
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
         * ナレーション素材を一覧で取得する
         * @summary ナレーション
         * @param {string} [industryCd] 業種CD
         * @param {string} [sceneCd] シーンCD
         * @param {number} [sort] ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listNarration: async (industryCd?: string, sceneCd?: string, sort?: number, options: any = {}): Promise<RequestArgs> => {
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

            if (industryCd !== undefined) {
                localVarQueryParameter['industryCd'] = industryCd;
            }

            if (sceneCd !== undefined) {
                localVarQueryParameter['sceneCd'] = sceneCd;
            }

            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
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
         * TTSのテンプレート素材を一覧で取得する
         * @summary TTSテンプレート一覧
         * @param {string} [industryCd] 業種CD
         * @param {string} [sceneCd] シーンCD
         * @param {number} [sort] ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listTemplate: async (industryCd?: string, sceneCd?: string, sort?: number, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/template`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (industryCd !== undefined) {
                localVarQueryParameter['industryCd'] = industryCd;
            }

            if (sceneCd !== undefined) {
                localVarQueryParameter['sceneCd'] = sceneCd;
            }

            if (sort !== undefined) {
                localVarQueryParameter['sort'] = sort;
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
 * ResourcesApi - functional programming interface
 * @export
 */
export const ResourcesApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 試聴再生、音声素材アップロードのURLを取得する
         * @summary S3オブジェクトの署名付きURLの取得
         * @param {string} id 音源ID
         * @param {string} category カテゴリー
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getSignedUrl(id: string, category: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<InlineResponse200>> {
            const localVarAxiosArgs = await ResourcesApiAxiosParamCreator(configuration).getSignedUrl(id, category, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * BGM素材を一覧で取得する
         * @summary BGM
         * @param {string} [industryCd] 業種CD
         * @param {number} [sort] ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listBgm(industryCd?: string, sort?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<BgmItem>>> {
            const localVarAxiosArgs = await ResourcesApiAxiosParamCreator(configuration).listBgm(industryCd, sort, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 開始/終了チャイムを一覧で取得する
         * @summary Open/Endチャイム
         * @param {number} [sort] ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listChime(sort?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<ChimeItem>>> {
            const localVarAxiosArgs = await ResourcesApiAxiosParamCreator(configuration).listChime(sort, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * TTSのフリーワード素材を一覧で取得する
         * @summary TTSフリーワード一覧
         * @param {string} [industryCd] 業種CD
         * @param {string} [sceneCd] シーンCD
         * @param {number} [sort] ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listFree(industryCd?: string, sceneCd?: string, sort?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<FreeItem>>> {
            const localVarAxiosArgs = await ResourcesApiAxiosParamCreator(configuration).listFree(industryCd, sceneCd, sort, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * ナレーション素材を一覧で取得する
         * @summary ナレーション
         * @param {string} [industryCd] 業種CD
         * @param {string} [sceneCd] シーンCD
         * @param {number} [sort] ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listNarration(industryCd?: string, sceneCd?: string, sort?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<NarrationItem>>> {
            const localVarAxiosArgs = await ResourcesApiAxiosParamCreator(configuration).listNarration(industryCd, sceneCd, sort, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * TTSのテンプレート素材を一覧で取得する
         * @summary TTSテンプレート一覧
         * @param {string} [industryCd] 業種CD
         * @param {string} [sceneCd] シーンCD
         * @param {number} [sort] ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async listTemplate(industryCd?: string, sceneCd?: string, sort?: number, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<TemplateItem>>> {
            const localVarAxiosArgs = await ResourcesApiAxiosParamCreator(configuration).listTemplate(industryCd, sceneCd, sort, options);
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
         * 試聴再生、音声素材アップロードのURLを取得する
         * @summary S3オブジェクトの署名付きURLの取得
         * @param {string} id 音源ID
         * @param {string} category カテゴリー
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getSignedUrl(id: string, category: string, options?: any): AxiosPromise<InlineResponse200> {
            return ResourcesApiFp(configuration).getSignedUrl(id, category, options).then((request) => request(axios, basePath));
        },
        /**
         * BGM素材を一覧で取得する
         * @summary BGM
         * @param {string} [industryCd] 業種CD
         * @param {number} [sort] ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listBgm(industryCd?: string, sort?: number, options?: any): AxiosPromise<Array<BgmItem>> {
            return ResourcesApiFp(configuration).listBgm(industryCd, sort, options).then((request) => request(axios, basePath));
        },
        /**
         * 開始/終了チャイムを一覧で取得する
         * @summary Open/Endチャイム
         * @param {number} [sort] ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listChime(sort?: number, options?: any): AxiosPromise<Array<ChimeItem>> {
            return ResourcesApiFp(configuration).listChime(sort, options).then((request) => request(axios, basePath));
        },
        /**
         * TTSのフリーワード素材を一覧で取得する
         * @summary TTSフリーワード一覧
         * @param {string} [industryCd] 業種CD
         * @param {string} [sceneCd] シーンCD
         * @param {number} [sort] ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listFree(industryCd?: string, sceneCd?: string, sort?: number, options?: any): AxiosPromise<Array<FreeItem>> {
            return ResourcesApiFp(configuration).listFree(industryCd, sceneCd, sort, options).then((request) => request(axios, basePath));
        },
        /**
         * ナレーション素材を一覧で取得する
         * @summary ナレーション
         * @param {string} [industryCd] 業種CD
         * @param {string} [sceneCd] シーンCD
         * @param {number} [sort] ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listNarration(industryCd?: string, sceneCd?: string, sort?: number, options?: any): AxiosPromise<Array<NarrationItem>> {
            return ResourcesApiFp(configuration).listNarration(industryCd, sceneCd, sort, options).then((request) => request(axios, basePath));
        },
        /**
         * TTSのテンプレート素材を一覧で取得する
         * @summary TTSテンプレート一覧
         * @param {string} [industryCd] 業種CD
         * @param {string} [sceneCd] シーンCD
         * @param {number} [sort] ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        listTemplate(industryCd?: string, sceneCd?: string, sort?: number, options?: any): AxiosPromise<Array<TemplateItem>> {
            return ResourcesApiFp(configuration).listTemplate(industryCd, sceneCd, sort, options).then((request) => request(axios, basePath));
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
     * 試聴再生、音声素材アップロードのURLを取得する
     * @summary S3オブジェクトの署名付きURLの取得
     * @param {string} id 音源ID
     * @param {string} category カテゴリー
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ResourcesApi
     */
    public getSignedUrl(id: string, category: string, options?: any) {
        return ResourcesApiFp(this.configuration).getSignedUrl(id, category, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * BGM素材を一覧で取得する
     * @summary BGM
     * @param {string} [industryCd] 業種CD
     * @param {number} [sort] ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ResourcesApi
     */
    public listBgm(industryCd?: string, sort?: number, options?: any) {
        return ResourcesApiFp(this.configuration).listBgm(industryCd, sort, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 開始/終了チャイムを一覧で取得する
     * @summary Open/Endチャイム
     * @param {number} [sort] ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ResourcesApi
     */
    public listChime(sort?: number, options?: any) {
        return ResourcesApiFp(this.configuration).listChime(sort, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * TTSのフリーワード素材を一覧で取得する
     * @summary TTSフリーワード一覧
     * @param {string} [industryCd] 業種CD
     * @param {string} [sceneCd] シーンCD
     * @param {number} [sort] ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ResourcesApi
     */
    public listFree(industryCd?: string, sceneCd?: string, sort?: number, options?: any) {
        return ResourcesApiFp(this.configuration).listFree(industryCd, sceneCd, sort, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * ナレーション素材を一覧で取得する
     * @summary ナレーション
     * @param {string} [industryCd] 業種CD
     * @param {string} [sceneCd] シーンCD
     * @param {number} [sort] ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ResourcesApi
     */
    public listNarration(industryCd?: string, sceneCd?: string, sort?: number, options?: any) {
        return ResourcesApiFp(this.configuration).listNarration(industryCd, sceneCd, sort, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * TTSのテンプレート素材を一覧で取得する
     * @summary TTSテンプレート一覧
     * @param {string} [industryCd] 業種CD
     * @param {string} [sceneCd] シーンCD
     * @param {number} [sort] ソート (1：title昇順, 2：title降順, 3：timestamp昇順, 4：timestamp降順)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ResourcesApi
     */
    public listTemplate(industryCd?: string, sceneCd?: string, sort?: number, options?: any) {
        return ResourcesApiFp(this.configuration).listTemplate(industryCd, sceneCd, sort, options).then((request) => request(this.axios, this.basePath));
    }
}
