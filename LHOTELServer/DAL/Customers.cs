﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Customers
    {
        //public Customers(string mail, string password)
        //{
        //    this.mail = mail;
        //    this.password = password;
        //}

        //public Customers(int customerID, int customerType, string firstName, string lastName, string mail,
        //   string password, string phoneNumber)
        //{
        //    this.customerID = customerID;
        //    this.customerType = customerType;
        //    this.firstName = firstName;
        //    this.lastName = lastName;
        //    this.mail = mail;
        //    this.password = password;
        //    this.phoneNumber = phoneNumber;
        //}


        //public Customers(int customerID, int customerType, string firstName, string lastName, string mail,
        //    string password, string phoneNumber, 
        //    string cardHolderName , string creditCardDate, int threeDigit, string credit_Card_Number)
        //{
        //    this.customerID = customerID;
        //    this.customerType = customerType;
        //    this.firstName = firstName;
        //    this.lastName = lastName;
        //    this.mail = mail;
        //    this.password = password;
        //    this.phoneNumber = phoneNumber;
        //    this.cardHolderName = cardHolderName;
        //    this.creditCardDate = creditCardDate;
        //    this.threeDigit = threeDigit;
        //    this.credit_Card_Number = credit_Card_Number;
        //}
        
    

        public int customerID { set; get; }
        public int customerType { set; get; }
        public string firstName { set; get; }
        public string lastName { set; get; }
        public string mail { set; get; }
        public string password { set; get; }

        public string phoneNumber { set; get; }
        public string cardHolderName { set; get; }
        public string creditCardDate { set; get; }
        public int threeDigit { set; get; }
        public string credit_Card_Number { set; get; }

        public override string ToString()
        {
            return $"Customer ID:{customerID}, Customer Type:{customerType}, First Name:{firstName}, Last Name:{lastName}, Mail:{mail}, Phone Number:{phoneNumber}, Card Holder Name:{cardHolderName}, Credit Card Date:{creditCardDate}, Three Digit:{threeDigit}";
        }

    }
}