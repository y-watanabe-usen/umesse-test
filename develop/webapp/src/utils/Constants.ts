export type Industry = {
  cd: string, // id
  name: string,
  sort: number | null,
}

export type Scene = {
  cd: string, // id
  name: string,
}

export type UploadSystem = {
  cd: string, // id
  name: string,
}

export type CmStatus = {
  cd: string, // id
  status: string,
  name: string,
}

export type Sorts = {
  cd: number, // id
  name: string,
}

export default class Constants {
  public static readonly APP_NAME = "U MESSE"

  public static readonly INDUSTORIES: Industry[] = [
    { cd: '01', name: '新着おすすめ', sort: 1 },
    { cd: '02', name: 'ユーザー作成音声', sort: 2 },
    { cd: '03', name: 'U MESSE CM', sort: null },
    { cd: '10', name: '飲食店向け', sort: 3 },
    { cd: '20', name: 'サービス業向け', sort: 4 },
    { cd: '30', name: '小売店向け', sort: 5 },
    { cd: '31', name: 'スーパー／ドラッグ／量販店向け', sort: 6 },
    { cd: '40', name: '医療／福祉向け', sort: 7 },
    { cd: '50', name: 'オフィス／事務所／教育機関向け', sort: 8 },
    { cd: '51', name: '金融機関向け', sort: 9 },
    { cd: '90', name: '施設向け', sort: 10 },
    { cd: '99', name: '全業種のシーン一覧', sort: 11 },
  ]

  public static readonly SCENES: Scene[] = [
    { cd: '001', name: 'チャイム' },
    { cd: '002', name: 'ブザー' },
    { cd: '003', name: '効果ＢＧＭ' },
    { cd: '004', name: '開店' },
    { cd: '005', name: '閉店' },
    { cd: '006', name: 'エスカレーター' },
    { cd: '007', name: '案内' },
    { cd: '008', name: '年末営業告知' },
    { cd: '009', name: '年始営業告知' },
    { cd: '010', name: '年中行事販促' },
    { cd: '011', name: '時報' },
    { cd: '012', name: '営業時間案内' },
    { cd: '013', name: '駐車場' },
    { cd: '014', name: 'カード' },
    { cd: '015', name: '注意・禁止' },
    { cd: '016', name: 'スタッフコール' },
    { cd: '017', name: '呼び出し' },
    { cd: '018', name: '防犯' },
    { cd: '019', name: 'エコ推奨' },
    { cd: '020', name: 'ＡＴＭ注意事項' },
    { cd: '021', name: '体操' },
    { cd: '022', name: 'セール' },
    { cd: '023', name: '起床・消灯' },
    { cd: '024', name: '食事' },
    { cd: '025', name: '入浴' },
    { cd: '026', name: '面会' },
    { cd: '027', name: '受付' },
    { cd: '028', name: '診察' },
    { cd: '029', name: '回診' },
    { cd: '030', name: 'イベント' },
    { cd: '031', name: 'レクリエーション' },
    { cd: '032', name: '検診案内' },
    { cd: '033', name: '通年健康情報' },
    { cd: '034', name: '季節健康情報' },
    { cd: '035', name: '歯科向け' },
    { cd: '036', name: 'バス時間' },
    { cd: '037', name: '朝礼・終礼' },
    { cd: '038', name: '業務時間' },
    { cd: '039', name: '作業時間' },
    { cd: '040', name: '休憩・昼休み' },
    { cd: '041', name: '集荷時間' },
    { cd: '042', name: '会議' },
    { cd: '043', name: '工場見学' },
    { cd: '044', name: '身なり・衛生' },
    { cd: '045', name: '整理・清掃' },
    { cd: '046', name: '注意・心がけ' },
    { cd: '047', name: '禁止事項' },
    { cd: '048', name: '催事' },
    { cd: '049', name: '風営法' },
    { cd: '050', name: '営業開始案内' },
    { cd: '051', name: '営業終了案内' },
    { cd: '052', name: 'コロナ関連' },
    { cd: '053', name: '誕生日演出' },
    { cd: '901', name: '録音' },
    { cd: '902', name: '音声合成' },
  ]

  public static readonly UPLOAD_SYSTEMS: UploadSystem[] = [
    { cd: '01', name: 'U MUSIC' },
    { cd: '02', name: "S'sence" },
  ]

  public static readonly CM_STATUS: CmStatus[] = [
    { cd: "00", status: "DELETE", name: "CM削除" },
    { cd: "01", status: "CREATING", name: "CM作成中" },
    { cd: "02", status: "COMPLETE", name: "CM作成完了" },
    { cd: "03", status: "CONVERT", name: "CMエンコード中" },
    { cd: "04", status: "SHARING", name: "CM共有中" },
    { cd: "09", status: "ERROR", name: "CMエラー" },
    { cd: "11", status: "EXTERNAL_UPLOADING", name: "外部システムアップロード中" },
    { cd: "12", status: "EXTERNAL_COMPLETE", name: "外部システムアップロード完了" },
    { cd: "19", status: "EXTERNAL_ERROR", name: "外部システムアップロードエラー" },
  ]

  public static readonly SORTS: Sorts[] = [
    { cd: 1, name: '名前昇順'},
    { cd: 2, name: '名前降順'},
    { cd: 3, name: '日時昇順'},
    { cd: 4, name: '日時降順'},
  ]
}