interface PochaInfo {
    pochaID: number;
    startDate: Date;
    endDate: Date;
    title: string;
    description: string;
    ongoing: boolean;
}
type PochaTab = "menu" | "orders";
type PochaDashboardTab = "orders" | "stock" | "history";
export type { PochaInfo, PochaTab, PochaDashboardTab };
interface MenuItem {
    menuID: number;
    nameKor: string;
    nameEng: string;
    price: number;
    stock: number;
    isImmediatePrep: boolean;
    parentPochaId: number;
    ageCheckRequired: boolean;
}
interface MenuItemWithQuantity {
    menuID: number;
    quantity: number;
}
interface MenuByCategory {
    category: string;
    menusList: MenuItem[];
}
export type { MenuItem, MenuByCategory, MenuItemWithQuantity };
interface CartItem {
    menu: MenuItem;
    quantity: number;
}
interface AddItemToCartBody {
    menuID: number;
    quantity: number;
}
type Cart = Map<number, CartItem>;
type PayInfo = {
    amount: number;
    ageCheckRequired: "true" | "false";
};
export type { Cart, CartItem, AddItemToCartBody, PayInfo };
type OrderTabs = "all" | OrderStatus;
declare const enum OrderStatus {
    PENDING = "pending",
    PREPARING = "preparing",
    READY = "ready",
    CLOSED = "closed"
}
interface OrderItem {
    orderItemID: number;
    status: OrderStatus;
    menu: MenuItem;
    quantity: number;
    ordererName: string;
    ordererEmail: string;
}
interface Orders {
    pending: OrderItem[];
    preparing: OrderItem[];
    ready: OrderItem[];
}
interface OrderHistory {
    closed: OrderItem[];
}
export { OrderStatus };
export type { OrderItem, Orders, OrderHistory, OrderTabs };
//# sourceMappingURL=types.d.ts.map