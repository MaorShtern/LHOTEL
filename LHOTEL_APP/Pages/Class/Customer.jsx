
export default class Customer {

    constructor(Customer) {
        this.customerID = Customer.CustomerID,
            this.customerType = Customer.customerType,
            this.FirstName = Customer.FirstName,
            this.LastName = Customer.LastName,
            this.Mail = Customer.Mail,
            this.password = Customer.password
            this.PhoneNumber = Customer.PhoneNumber,
            this.cardHolderName = Customer.cardHolderName,
            this.Credit_Card_Number = Customer.Credit_Card_Number
            this.creditCardDate = Customer.cardDate,
            this.threeDigit = Customer.cardCVC
    }
}