
export default class Customer {

    constructor(Customer) {
       
        this.CustomerID = Customer.CustomerID,
            this.CustomerType = Customer.CustomerType,
            this.FirstName = Customer.FirstName,
            this.LastName = Customer.LastName,
            this.Mail = Customer.Mail,
            this.Password = Customer.password
            this.PhoneNumber = Customer.PhoneNumber,
            this.CardHolderName = Customer.CardHolderName,
            this.CreditCardNumber = Customer.CreditCardNumber
            this.CreditCardDate = Customer.CreditCardDate,
            this.ThreeDigit = Customer.ThreeDigit
    }
}