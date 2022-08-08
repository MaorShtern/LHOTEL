
export default class Customer {
    
    constructor(Customer) {
        this.customerID = Customer.id,
            this.customerType = 1,
            this.firstName = Customer.first_name,
            this.lastName = Customer.last_name,
            this.mail = Customer.email,
            this.phoneNumber = Customer.phone,
            this.cardHolderName = Customer.cardNum,
            this.creditCardDate = Customer.cardDate,
            this.threeDigit = Customer.cardCVC
    }
}