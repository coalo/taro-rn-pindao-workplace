/**
 * API 响应类型定义
 * 统一管理所有接口的请求和响应类型
 */

// ==================== 通用类型 ====================

/** API 通用响应结构 */
export interface ApiResponse<T = any> {
  /** 响应码，0 表示成功 */
  code: number
  /** 响应消息 */
  message?: string
  /** 响应数据 */
  data: T
  /** 时间戳 */
  timestamp?: number
}

/** 分页请求参数 */
export interface PageParams {
  /** 页码，从 1 开始 */
  pageNum?: number
  /** 每页条数 */
  pageSize?: number
}

/** 分页响应数据 */
export interface PageData<T = any> {
  /** 数据列表 */
  list: T[]
  /** 总数 */
  total: number
  /** 当前页码 */
  pageNum: number
  /** 每页条数 */
  pageSize: number
  /** 总页数 */
  pages?: number
}

// ==================== 首页模块类型 ====================

/** Banner 信息 */
export interface BannerInfo {
  /** Banner ID */
  id: string | number
  /** 图片地址 */
  imageUrl: string
  /** 跳转链接 */
  jumpUrl?: string
  /** 跳转类型 */
  jumpType?: number
  /** 标题 */
  title?: string
  /** 排序 */
  sort?: number
}

/** 首页配置响应 */
export interface HomeConfigData {
  /** Banner 列表 */
  banners?: BannerInfo[]
  /** 营销位配置 */
  marketPosition?: any[]
  /** 其他配置 */
  [key: string]: any
}

/** 门店信息 */
export interface StoreInfo {
  /** 门店 ID */
  storeId: string
  /** 门店名称 */
  storeName: string
  /** 门店类型 */
  storeType?: number
  /** 城市 ID */
  cityId?: string
  /** 城市名称 */
  cityName?: string
  /** 门店地址 */
  address?: string
  /** 经度 */
  longitude?: number
  /** 纬度 */
  latitude?: number
  /** 营业状态 */
  businessStatus?: number
  /** 距离（米） */
  distance?: number
  /** 货币标识 */
  countryCurrency?: string
  /** 货币符号 */
  countryCurrencyTag?: string
  /** 部门区域 ID */
  departAreaId?: string
  /** 其他信息 */
  [key: string]: any
}

/** 门店列表响应 */
export interface StoreListData {
  /** 门店列表 */
  list: StoreInfo[]
  /** 总数 */
  total?: number
}

// ==================== 用户模块类型 ====================

/** 用户信息 */
export interface UserInfo {
  /** 用户 ID */
  userId: string
  /** 用户昵称 */
  nickName?: string
  /** 用户头像 */
  avatarUrl?: string
  /** 手机号 */
  phoneNumber?: string
  /** 性别 1-男 2-女 */
  gender?: number
  /** 生日 */
  birthday?: string
  /** 会员等级 */
  memberLevel?: number
  /** 会员等级名称 */
  memberLevelName?: string
  /** 是否会员 */
  isMember?: boolean
  /** 其他信息 */
  [key: string]: any
}

/** 地址信息 */
export interface AddressInfo {
  /** 地址 ID */
  addressId: string
  /** 收货人姓名 */
  receiverName: string
  /** 收货人手机号 */
  receiverPhone: string
  /** 省 */
  province?: string
  /** 市 */
  city?: string
  /** 区 */
  district?: string
  /** 详细地址 */
  detailAddress: string
  /** 是否默认地址 */
  isDefault?: boolean
  /** 经度 */
  longitude?: number
  /** 纬度 */
  latitude?: number
}

// ==================== 商品模块类型 ====================

/** 商品分类 */
export interface ProductCategory {
  /** 分类 ID */
  categoryId: string
  /** 分类名称 */
  categoryName: string
  /** 排序 */
  sort?: number
  /** 商品列表 */
  items?: ProductItem[]
}

/** 商品项 */
export interface ProductItem {
  /** 商品 ID */
  itemId: string
  /** 商品名称 */
  itemName: string
  /** 商品图片 */
  imageUrl?: string
  /** 商品价格 */
  price: number
  /** 原价 */
  originalPrice?: number
  /** 库存 */
  stock?: number
  /** 销量 */
  salesVolume?: number
  /** 商品描述 */
  description?: string
  /** 是否有规格 */
  hasSpecs?: boolean
  /** 标签 */
  tags?: string[]
  /** 其他信息 */
  [key: string]: any
}

/** 菜单数据 */
export interface MenuData {
  /** 分类列表 */
  categories: ProductCategory[]
  /** 推荐商品 */
  recommendItems?: ProductItem[]
  /** 其他信息 */
  [key: string]: any
}

/** 商品规格 */
export interface ProductSpec {
  /** 规格 ID */
  specId: string
  /** 规格名称 */
  specName: string
  /** 规格值列表 */
  values: ProductSpecValue[]
}

/** 规格值 */
export interface ProductSpecValue {
  /** 规格值 ID */
  valueId: string
  /** 规格值名称 */
  valueName: string
  /** 加价 */
  extraPrice?: number
  /** 是否选中 */
  selected?: boolean
}

/** 商品详情 */
export interface ProductDetail {
  /** 商品基础信息 */
  item: ProductItem
  /** 规格列表 */
  specs?: ProductSpec[]
  /** 商品详情图 */
  detailImages?: string[]
  /** 其他信息 */
  [key: string]: any
}

// ==================== 购物车模块类型 ====================

/** 购物车商品 */
export interface CartItem {
  /** 购物车项 ID */
  cartItemId: string
  /** 商品 ID */
  itemId: string
  /** 商品名称 */
  itemName: string
  /** 商品图片 */
  imageUrl?: string
  /** 数量 */
  quantity: number
  /** 单价 */
  price: number
  /** 小计 */
  subtotal?: number
  /** 是否选中 */
  selected?: boolean
  /** 规格信息 */
  specs?: any[]
  /** 其他信息 */
  [key: string]: any
}

/** 购物车信息 */
export interface CartInfo {
  /** 购物车项列表 */
  items: CartItem[]
  /** 总数量 */
  totalCount?: number
  /** 选中数量 */
  selectedTotalCount?: number
  /** 总金额 */
  totalAmount?: number
  /** 选中金额 */
  selectedTotalAmount?: number
  /** 失效商品 */
  invalidItems?: CartItem[]
  /** 营销提示 */
  marketToast?: string
  /** 活动限制提示 */
  failurePopInfo?: {
    message: string
    fromType: number
  }
  /** 其他信息 */
  [key: string]: any
}

// ==================== 订单模块类型 ====================

/** 订单状态枚举 */
export enum OrderStatus {
  /** 待支付 */
  UNPAID = 1,
  /** 已支付 */
  PAID = 2,
  /** 制作中 */
  MAKING = 3,
  /** 待取餐 */
  READY = 4,
  /** 已完成 */
  COMPLETED = 5,
  /** 已取消 */
  CANCELED = 6,
  /** 已退款 */
  REFUNDED = 7
}

/** 订单信息 */
export interface OrderInfo {
  /** 订单 ID */
  orderId: string
  /** 订单号 */
  orderNo: string
  /** 订单状态 */
  orderStatus: OrderStatus
  /** 订单金额 */
  totalAmount: number
  /** 实付金额 */
  payAmount: number
  /** 创建时间 */
  createTime: string
  /** 支付时间 */
  payTime?: string
  /** 门店信息 */
  storeInfo?: StoreInfo
  /** 订单商品列表 */
  orderItems?: OrderItem[]
  /** 其他信息 */
  [key: string]: any
}

/** 订单商品项 */
export interface OrderItem {
  /** 订单项 ID */
  orderItemId: string
  /** 商品 ID */
  itemId: string
  /** 商品名称 */
  itemName: string
  /** 商品图片 */
  imageUrl?: string
  /** 数量 */
  quantity: number
  /** 单价 */
  price: number
  /** 小计 */
  subtotal: number
  /** 规格信息 */
  specs?: any[]
}

/** 订单预览数据 */
export interface OrderPreviewData {
  /** 订单商品 */
  orderItems: OrderItem[]
  /** 总金额 */
  totalAmount: number
  /** 优惠金额 */
  discountAmount?: number
  /** 实付金额 */
  payAmount: number
  /** 可用优惠券 */
  availableCoupons?: any[]
  /** 预约时间列表 */
  reservationTimes?: string[]
  /** 其他信息 */
  [key: string]: any
}

// ==================== 卡券模块类型 ====================

/** 优惠券类型枚举 */
export enum CouponType {
  /** 满减券 */
  FULL_REDUCTION = 1,
  /** 折扣券 */
  DISCOUNT = 2,
  /** 兑换券 */
  EXCHANGE = 3
}

/** 优惠券状态枚举 */
export enum CouponStatus {
  /** 未使用 */
  UNUSED = 1,
  /** 已使用 */
  USED = 2,
  /** 已过期 */
  EXPIRED = 3
}

/** 优惠券信息 */
export interface CouponInfo {
  /** 优惠券 ID */
  couponId: string
  /** 优惠券编码 */
  couponCode: string
  /** 优惠券名称 */
  couponName: string
  /** 优惠券类型 */
  couponType: CouponType
  /** 优惠券状态 */
  couponStatus: CouponStatus
  /** 面值 */
  faceValue?: number
  /** 折扣 */
  discount?: number
  /** 使用门槛 */
  threshold?: number
  /** 有效期开始 */
  validStartTime?: string
  /** 有效期结束 */
  validEndTime?: string
  /** 适用商品 */
  applicableItems?: string[]
  /** 适用门店 */
  applicableStores?: string[]
  /** 其他信息 */
  [key: string]: any
}

/** 优惠券列表数据 */
export interface CouponListData {
  /** 未使用 */
  unused?: CouponInfo[]
  /** 已使用 */
  used?: CouponInfo[]
  /** 已过期 */
  expired?: CouponInfo[]
  /** 总数 */
  total?: number
}

// ==================== 登录认证类型 ====================

/** 登录响应数据 */
export interface LoginData {
  /** 访问令牌 */
  accessToken: string
  /** OpenID */
  openId: string
  /** UnionID */
  unionId?: string
  /** 刷新令牌 */
  refreshToken?: string
  /** 过期时间（秒） */
  expiresIn?: number
}

// ==================== 通用配置类型 ====================

/** 通用配置信息 */
export interface ConfigInfo {
  /** 加载图片 */
  loadingImage?: string
  /** 货币符号 */
  currency?: string
  /** 其他配置 */
  [key: string]: any
}

/** 分享配置 */
export interface ShareInfo {
  /** 首页分享 */
  home?: ShareConfig
  /** 菜单分享 */
  menu?: ShareConfig
  /** 订单分享 */
  order?: ShareConfig
  /** 其他配置 */
  [key: string]: any
}

/** 分享配置项 */
export interface ShareConfig {
  /** 分享标题 */
  title?: string
  /** 分享描述 */
  desc?: string
  /** 分享图片 */
  imageUrl?: string
  /** 分享路径 */
  path?: string
}

/** 协议信息 */
export interface AgreementInfo {
  /** 协议 ID */
  id: string
  /** 协议名称 */
  name: string
  /** 协议链接 */
  url: string
  /** 协议类型 */
  type?: number
}

// ==================== 营销活动类型 ====================

/** 活动信息 */
export interface ActivityInfo {
  /** 活动 ID */
  activityId: string
  /** 活动名称 */
  activityName: string
  /** 活动类型 */
  activityType?: number
  /** 活动开始时间 */
  startTime?: string
  /** 活动结束时间 */
  endTime?: string
  /** 活动图片 */
  imageUrl?: string
  /** 活动链接 */
  jumpUrl?: string
  /** 其他信息 */
  [key: string]: any
}

// ==================== 导出类型映射 ====================

/** API 响应类型映射表 */
export interface ApiResponseMap {
  // 首页模块
  getHomeBanner: ApiResponse<BannerInfo[]>
  getHomeConfig: ApiResponse<HomeConfigData>
  getStoreInfo: ApiResponse<StoreInfo>
  getStoreList: ApiResponse<StoreListData>
  getProtocols: ApiResponse<{ rules: AgreementInfo[] }>
  getCommonConfig: ApiResponse<ConfigInfo>
  getShareConfig: ApiResponse<ShareInfo>
  
  // 用户模块
  getUserInfo: ApiResponse<UserInfo>
  getAddressList: ApiResponse<AddressInfo[]>
  getAddressInfo: ApiResponse<AddressInfo>
  
  // 商品模块
  getMenuList: ApiResponse<MenuData>
  getProductDetail: ApiResponse<ProductDetail>
  
  // 购物车模块
  findNormalCartInfo: ApiResponse<CartInfo>
  updateNormalCartInfo: ApiResponse<CartInfo>
  updateNormalCartCount: ApiResponse<CartInfo>
  updateNormalCartSelect: ApiResponse<CartInfo>
  
  // 订单模块
  postOrderNowList: ApiResponse<PageData<OrderInfo>>
  postOrderHistoryList: ApiResponse<PageData<OrderInfo>>
  postOrderDetail: ApiResponse<OrderInfo>
  postOrderPreview: ApiResponse<OrderPreviewData>
  
  // 卡券模块
  postCouponList: ApiResponse<CouponListData>
  postCouponDetail: ApiResponse<CouponInfo>
  
  // 登录模块
  loginVerify: ApiResponse<LoginData>
  
  // 营销活动
  getABApi: ApiResponse<Record<string, any>>
  getStrategyInfo: ApiResponse<{ strategyInfo: string }>
}
