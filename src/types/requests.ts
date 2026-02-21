export interface ContactRequestPayload {
  name: string
  phone: string
  email?: string
  message: string
}

export interface OrderItemPayload {
  id: number
  title: string
  quantity: number
  price: number
}

export interface OrderPayload {
  name: string
  phone: string
  email?: string
  address: string
  comment?: string
  items: OrderItemPayload[]
  total_price: number
}
