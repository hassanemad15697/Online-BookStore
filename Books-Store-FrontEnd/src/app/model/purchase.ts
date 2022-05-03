
import { BillingAddress } from "./billing-address";
import { Customer } from "./customer";
import { Order } from "./order";
import { OrderItem } from "./order-item";
import { ShippingAddress } from "./shipping-address";

export class Purchase {
    customer: Customer;
    shippingAddress: ShippingAddress;
    billingAddress: BillingAddress;
    order: Order;
    orderItems: OrderItem[];
}
