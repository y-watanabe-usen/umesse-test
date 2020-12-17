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
/**
 * 
 * @export
 * @interface CmItem
 */
export interface CmItem {
    /**
     * CM ID
     * @type {string}
     * @memberof CmItem
     */
    id?: any;
    /**
     * タイトル名
     * @type {string}
     * @memberof CmItem
     */
    title?: any;
    /**
     * 説明文
     * @type {string}
     * @memberof CmItem
     */
    description?: any;
    /**
     * 秒数
     * @type {number}
     * @memberof CmItem
     */
    seconds?: any;
    /**
     * 掲載開始日
     * @type {string}
     * @memberof CmItem
     */
    startDate?: any;
    /**
     * 掲載終了日
     * @type {string}
     * @memberof CmItem
     */
    endDate?: any;
    /**
     * CM区分(音楽系:BGMあり, 素ナレ:BGMなし)
     * @type {string}
     * @memberof CmItem
     */
    productionType?: any;
    /**
     * 
     * @type {Array&lt;IndustryItem&gt;}
     * @memberof CmItem
     */
    industry?: any;
    /**
     * 
     * @type {Array&lt;SceneItem&gt;}
     * @memberof CmItem
     */
    scene?: any;
    /**
     * 
     * @type {Array&lt;CmMaterialListItem&gt;}
     * @memberof CmItem
     */
    materials?: any;
    /**
     * CMステータス
     * @type {string}
     * @memberof CmItem
     */
    status?: any;
    /**
     * 
     * @type {string}
     * @memberof CmItem
     */
    timestamp?: any;
}
