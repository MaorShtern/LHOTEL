

----  יצירת משתמש
--CREATE USER MyLogin FOR LOGIN MyLogin
--ALTER ROLE db_owner ADD MEMBER MyLogin
--GO

SET DATEFORMAT dmy;  
GO


create table Employees_Types
(
	Worker_Code int NOT NULL,
	Description NVARCHAR(30)
	CONSTRAINT [PK_Worker_Code] PRIMARY KEY (Worker_Code)
)
go


create table Tasks_Types
(
	Task_Number int NOT NULL,
	Task_Name NVARCHAR(30) NOT NULL,
	CONSTRAINT [PK_Task_Number] PRIMARY KEY (Task_Number)
)
go


create table Customers_Types
(
	Customers_Type int NOT NULL,
	Description NVARCHAR(30),
	CONSTRAINT [PK_Customers_Type] PRIMARY KEY (Customers_Type)
)
go



create table Category
(
	Category_Number int not null,
	Description NVARCHAR(30)
	CONSTRAINT [PK_Category_Number] PRIMARY KEY (Category_Number)
)
go


create table Products
(
	Product_Code int identity(1,1),
	Category_Number int not null,
	Description NVARCHAR(30),
	Price_Per_Unit DECIMAL(10,2) NOT NULL,
	Discount_Percentage DECIMAL(10,2) NOT NULL,
	CONSTRAINT [PK_Product_Code] PRIMARY KEY (Product_Code),
	CONSTRAINT [Fk_Category_Number] FOREIGN KEY (Category_Number) REFERENCES Category (Category_Number)
)
go



create table Purchase_Of_Goods
(
	Product_Code int not null,
	Category_Number int not null,
	Price_Per_Unit DECIMAL(10,2) NOT NULL,
	Amount int NOT NULL,
	Purchase_Date Date NOT NULL,
	Sum_Total DECIMAL(10,2) NOT NULL,
	CONSTRAINT [Fk_Purchase_Of_Goods] FOREIGN KEY (Product_Code) REFERENCES Products (Product_Code),
	CONSTRAINT [Fk_Category_Number1] FOREIGN KEY (Category_Number) REFERENCES Category (Category_Number)
)
go


create table Employees
(
	Employee_ID int NOT NULL,
	Employee_Code int identity(1,1),
	Employee_Name nvarchar(30) NOT NULL,
	Phone_Number nvarchar(30) ,
    Birth_Date Date,
	Worker_Code int NOT NULL,
	Hourly_Wage int,
	Address nvarchar(30),
	CONSTRAINT [PK_Employee_ID] PRIMARY KEY (Employee_ID),
   CONSTRAINT [Fk_Worker_Code] FOREIGN KEY 
  (Worker_Code) REFERENCES Employees_Types (Worker_Code)
)
go



create table Employees_Tasks
(
	Employee_ID int NOT NULL,
	Task_Number int,
	Start_Date Date  NOT NULL,
    Start_Time Time  NOT NULL,
	End_Date Date ,
	Task_Status nvarchar(30),
	Description NVARCHAR(30),
	CONSTRAINT [PK_Employee_ID2] PRIMARY KEY (Employee_ID,Task_Number,Start_Date,Start_Time),
	CONSTRAINT [Fk_Employee_ID] FOREIGN KEY (Employee_ID) REFERENCES Employees (Employee_ID),
	CONSTRAINT [Fk_Task_Number] FOREIGN KEY (Task_Number) REFERENCES Tasks_Types (Task_Number)
)
go


create table Customers
(
	Customer_ID int NOT NULL,
	Customer_Type int NOT NULL,
	First_Name nvarchar(30) NOT NULL,
	Last_Name nvarchar(30),
	Mail nvarchar(100) NOT NULL,
	Password nvarchar(30) NOT NULL,
	Phone_Number nvarchar(30) ,
	Card_Holder_Name nvarchar(30) ,
	Credit_Card_Date nvarchar(5) ,
	Three_Digit int ,
	Credit_Card_Number nvarchar(12),
	CONSTRAINT [PK_Customer_ID] PRIMARY KEY (Customer_ID),
	CONSTRAINT [Fk_Customer_Type] FOREIGN KEY 
    (Customer_Type) REFERENCES Customers_Types (Customers_Type)
)
go


create table Rooms
(
	Room_Number int identity(1,1),
	Room_Type NVARCHAR(30) NOT NULL,
	Price_Per_Night int NOT NULL,
	Details NVARCHAR(100) NOT NULL,
	CONSTRAINT [PK_Room_Number] PRIMARY KEY (Room_Number)
)
go


drop table Bill
create table Bill
(
	Bill_Number int identity(1,1) NOT NULL,
	Customer_ID int NOT NULL,
	Purchase_Date Date NOT NULL,
	Employee_ID int NOT NULL,
	Credit_Card_Number nvarchar(12),
	Bill_Status nvarchar(10) NOT NULL,
	CONSTRAINT [PK_Bill_Number1] PRIMARY KEY (Bill_Number,Customer_ID,Purchase_Date),
	CONSTRAINT [Fk_Employee_ID2] FOREIGN KEY (Employee_ID) REFERENCES Employees (Employee_ID),
	CONSTRAINT [Fk_Customer_ID] FOREIGN KEY (Customer_ID) REFERENCES Customers (Customer_ID)
)
go


drop table Bill_Details
create table Bill_Details
(
	Bill_Number int NOT NULL,
	Product_Code int NOT NULL,
	Amount int NOT NULL,
	Purchase_Date date,
	Purchase_Time time,
	Payment_Method nvarchar(20) NOT NULL,
	CONSTRAINT [Fk_Product_Code] FOREIGN KEY 
          (Product_Code) REFERENCES Products (Product_Code),
	CONSTRAINT Bill_Number FOREIGN KEY 
          (Bill_Number) REFERENCES Bill (Bill_Number),
)
go
--6	5	2	2021-01-13	21:00:00.0000000	Credit
--6	5	2	2021-01-13	21:00:00.0000000	Credit
--4	3	6	2021-03-12	16:00:00.0000000	Credit
--3	1	3	2021-12-12	21:00:00.0000000	Credit
--5	1	10	2021-12-12	21:00:00.0000000	Credit
--3	1	3	2021-12-12	21:00:00.0000000	Credit
--3	6	1	2021-12-12	21:00:00.0000000	Cash
--1	2	10	2021-12-12	13:00:00.0000000	Cash

--drop table Room_Reservations
--create table Room_Reservations
--(
--	Room_Number int not null,
--	Customer_ID int NOT NULL,
--	Room_Status nvarchar(30) NOT NULL,
--	CONSTRAINT [PK_Reservations_Room_Number] PRIMARY KEY (Room_Number),
--	CONSTRAINT [Fk_Reservation_Customer_ID] FOREIGN KEY (Customer_ID) REFERENCES Customers (Customer_ID),
--	CONSTRAINT [Fk_Reservation_Room_Number] FOREIGN KEY (Room_Number) REFERENCES Rooms (Room_Number),
--)
--go


drop table Customers_Rooms
create table Customers_Rooms
(
	Room_Number int NOT NULL,
	Bill_Number int ,
	Customer_ID int NOT NULL,
	Entry_Date Date NOT NULL,
	Exit_Date Date NOT NULL,
	Amount_Of_People int NOT NULL,
	Room_Status nvarchar(30) NOT NULL,
	CONSTRAINT [PK_Room_Number2] PRIMARY KEY (Room_Number),
	CONSTRAINT [Fk_Room_Number] FOREIGN KEY (Room_Number) REFERENCES Rooms (Room_Number),
	CONSTRAINT [Fk_Bill_Number3] FOREIGN KEY (Bill_Number) REFERENCES Bill (Bill_Number),
)
go
--2	2	222	2022-09-08	2022-09-14	2	Occupied
--20	NULL	888	2022-08-15	2022-08-17	10	Reserved
--3	3	333	2022-07-21	2022-07-25	2	Reserved
--8	4	444	2022-07-14	2022-07-20	8	Occupied
--9	5	555	2021-07-05	2021-07-08	2	Reserved
--7	6	666	2021-06-06	2021-06-12	4	Occupied


create table Shifts
(
	Employee_ID int NOT NULL,
	Employee_Code int NOT NULL,
	Worker_Code int NOT NULL,
	Date date not null,
	Entrance_Time time NOT NULL,
	Leaving_Time time ,
	CONSTRAINT [PK_Shifts_Employee_Entrance_Time] PRIMARY KEY (Employee_ID,Date),
	CONSTRAINT [Fk_Shifts_Employee_ID] FOREIGN KEY (Employee_ID) REFERENCES Employees (Employee_ID)
)
go



--sp_rename 'table_name.old_column_name', 'new_column_name', 'COLUMN';

--insert [dbo].[Employees_Types] values(1,'Manager')
--insert [dbo].[Employees_Types] values(2,'Receptionist')
--insert [dbo].[Employees_Types] values(3,'Room service')
--select * from [Employees_Types]

--select * from [dbo].[Customers_Types]
--insert [dbo].[Customers_Types] values(1,'occasional')
--insert [dbo].[Customers_Types] values(2,'Regular')
--insert [dbo].[Customers_Types] values(3,'VIP')

--select * from [dbo].[Category]
--insert [dbo].[Category] values(1,'Alcohol')
--insert [dbo].[Category] values(2,'Snack')
--insert [dbo].[Category] values(3,'Sweet Drink')

--select * from [dbo].[Tasks_Types]
--insert [dbo].[Tasks_Types] values(1,'Room Cleaning')
--insert [dbo].[Tasks_Types] values(2,'Room Service')
--insert [dbo].[Tasks_Types] values(3,'Change of towels')
--insert [dbo].[Tasks_Types] values(4,'Refill mini bar')
--insert [dbo].[Tasks_Types] values(5,'Check-in Customer')
--insert [dbo].[Tasks_Types] values(6,'Check-out Customer')
--insert [dbo].[Tasks_Types] values(7,'Reception desk arrangement')
=================================================================================================================================================
                                                                                                               פרוצדורות
=================================================================================================================================================

-- פרוצדורות עובדים
create proc GetAllEmployees
as
	SELECT dbo.Employees.Employee_ID, dbo.Employees_Types.Description, dbo.Employees.Employee_Name,
	dbo.Employees.Phone_Number, dbo.Employees.Birth_Date, dbo.Employees.Hourly_Wage, 
	dbo.Employees.Address, dbo.Employees.Employee_Code
	FROM dbo.Employees INNER JOIN dbo.Employees_Types 
	ON dbo.Employees.Worker_Code = dbo.Employees_Types.Worker_Code
	GROUP BY dbo.Employees.Employee_ID, dbo.Employees_Types.Description,
	dbo.Employees.Employee_Name, dbo.Employees.Phone_Number, dbo.Employees.Birth_Date, 
	dbo.Employees.Hourly_Wage, dbo.Employees.Address, dbo.Employees.Employee_Code
go
--exec GetAllEmployees



create proc GetEmployeeById
@id int
as
select * from [dbo].[Employees] where [Employee_ID] = @id
go
--exec GetEmployeeById 111


create proc InsertEmployee 
@id int, 
@name nvarchar(30),
@phoneNumber nvarchar(30),
@birthDate date, 
@worker_Code int, 
@hourly_Wage int, 
@address nvarchar(30)
as
	insert  [dbo].[Employees] values (@id,@name,@phoneNumber,@birthDate,@worker_Code,@hourly_Wage,@address)
go
--exec InsertEmployee 111,'aaa','0526211881','1999-02-23',1,40,'aaa'
--exec InsertEmployee 222,'bbb','0526211881','1999-03-23',2,40,'bbb'
--exec InsertEmployee 333,'ccc','0542611881','1999-04-23',3,40,'ccc'
--exec InsertEmployee 444,'ddd','0548937881','1978-03-11',3,41,'ddd'
--exec InsertEmployee 555,'eee','0528057777','1998-05-30',3,41,'eee'
--exec InsertEmployee 666,'fff','0502359678','1972-04-24',1,41,'fff'
--exec InsertEmployee 777,'ggg','0502233344','1997-11-12',3,41,'ggg'
--exec InsertEmployee 888,'hhh','0523491528','1990-10-03',2,41,'hhh'



create proc AlterEmployee
@id int, 
@name nvarchar(30),
@phoneNumber nvarchar(30),
@birthDate date, 
@worker_Code int, 
@hourly_Wage int, 
@address nvarchar(30)
as
	UPDATE [dbo].[Employees]
	SET [Employee_Name] = @name ,[Phone_Number]= @phoneNumber,[Birth_Date]=@birthDate
	,[Worker_Code]=@worker_Code,[Hourly_Wage]=@hourly_Wage,[Address]=@address
	WHERE [Employee_ID] = @id
go
--exec AlterEmployee 111,'aaa','0526211881','23/02/1999',1,40,'bbb'


--drop proc DeleteEmployeeById
--create proc DeleteEmployeeById
--@id int
--as
--	DECLARE @RowCount1 INTEGER
--    DECLARE @RowCount2 INTEGER
--    DECLARE @RowCount3 INTEGER

--	DELETE FROM Employees_Tasks WHERE [Employee_ID] = @id
--	SELECT @RowCount1 = @@ROWCOUNT
--	DELETE FROM Bill WHERE [Employee_ID] = @id
--	SELECT @RowCount2 = @@ROWCOUNT
--	DELETE FROM Employees WHERE [Employee_ID] = @id
--	SELECT @RowCount3 = @@ROWCOUNT
--	SELECT @RowCount1 + @RowCount2 + @RowCount3 AS Result
--go
--exec DeleteEmployeeById 999



-- פרוצדורות לקוחות

create proc GetAllCustomers
as
	select * from [dbo].[Customers]
go

--exec GetAllCustomers
-- exec DeleteCustomerById 999 


create proc GetCustomerById 
@id int
as
	select * from [dbo].[Customers] where [Customer_ID] = @id
go
--exec GetCustomerById 111


create proc GetCustomerByMailAndPassword
@Mail nvarchar(100),
@Password nvarchar(30) 
as
	select * from [dbo].[Customers] 
	where Mail = @Mail and Password = @Password
go

-- exec GetCustomerByMailAndPassword 'ccc@gmail.com','ccc'


create proc AddNewCustomer
@id int,
@Customer_Type int,
@First_Name nvarchar(30),
@Last_Name nvarchar(30),
@Mail nvarchar(100),
@Password nvarchar(30),
@Phone_Number nvarchar(30) ,
@Card_Holder_Name  nvarchar(30),
@Credit_Card_Date nvarchar(5),
@Three_Digit int,
@Credit_Card_Number nvarchar(12)
as
	insert [dbo].[Customers] values (@id ,@Customer_Type,@First_Name,@Last_Name,@Mail,@Password,@Phone_Number
	,@Card_Holder_Name,@Credit_Card_Date,@Three_Digit,@Credit_Card_Number)
go
--exec AddNewCustomer 111,1,'aaa','aaa','aaa@gmail.com','aaa','0524987762','aaa','02/28',569,'4580111122223333'
--exec AddNewCustomer 222,2,'bbb','bbb','bbb@gmail.com','bbb','0501264859','bbb','02/28',781,'4580211122223333'
--exec AddNewCustomer 333,3,'ccc','ccc','ccc@gmail.com','ccc','0541528971','ccc','02/28',569,'4580311122223333'
--exec AddNewCustomer 444,2,'ddd','ddd','ddd@gmail.com','ddd','0526487912','ddd','02/28',212,'4580411122223333'
--exec AddNewCustomer 555,1,'eee','eee','eee@gmail.com','eee','0500123889','eee','02/28',954,'4580511122223333'
--exec AddNewCustomer 666,2,'fff','fff','fff@gmail.com','fff','0531528966','fff','02/28',856,'4580611122223333'
--exec AddNewCustomer 777,2,'ggg','ggg','ggg@gmail.com','ggg','0531528966','ggg','02/28',569,'4580711122223333'
--exec AddNewCustomer 888,3,'hhh','hhh','hhh@gmail.com','hhh','0576488918','hhh','02/28',381,'4580811122223333'
--exec AddNewCustomer 999,1,'mmm','mmm','mmm@gmail.com','mmm','0526159848','','',-1,''


create proc AlterCustomerById
@id int,
@Customer_Type int,
@First_Name nvarchar(30),
@Last_Name nvarchar(30),
@Mail nvarchar(100),
@Password nvarchar(30),
@Phone_Number nvarchar(30) ,
@Card_Holder_Name  nvarchar(30),
@Credit_Card_Date nvarchar(5),
@Three_Digit int,
@Credit_Card_Number nvarchar(12)
as
	UPDATE [dbo].[Customers]
	SET  [Customer_Type] = @Customer_Type, 
	[First_Name]=@First_Name,
	[Last_Name]=@Last_Name,
	[Mail] = @Mail,
	[Phone_Number] =@Phone_Number, 
	[Card_Holder_Name] =@Card_Holder_Name, 
	[Credit_Card_Date]=@Credit_Card_Date,
	[Three_Digit]=@Three_Digit,
	[Credit_Card_Number] = @Credit_Card_Number,
	[Password] = @Password 
	WHERE [Customer_ID] = @id
go

--exec AlterCustomerById 111,1,'aaa','aaa','aaa@gmail.com','aaa','0524987762','aaa','02/28',569
--exec AlterCustomerById 222,2,'bbb','bbb','bbb@gmail.com','bbb','0501264859','bbb','02/28',781
--exec AlterCustomerById 333,3,'ccc','ccc','ccc@gmail.com','ccc','0541528971','ccc','02/28',569
--exec AlterCustomerById 444,2,'ddd','ddd','ddd@gmail.com','ddd','0526487912','ddd','02/28',212
--exec AlterCustomerById 555,1,'eee','eee','eee@gmail.com','eee','0500123889','eee','02/28',954
--exec AlterCustomerById 666,2,'fff','fff','fff@gmail.com','fff','0531528966','fff','02/28',856
--exec AlterCustomerById 777,2,'ggg','ggg','ggg@gmail.com','ggg','0531528966','ggg','02/28',569
--exec AlterCustomerById 888,3,'hhh','hhh','hhh@gmail.com','hhh','0576488918','hhh','02/28',381
--exec AlterCustomerById 999,1,'mmm','mmm','mmm@gmail.com','mmm','0526159848','','',0,''


create proc UpdateCustomerCredit
@id int,
@Card_Holder_Name  nvarchar(30),
@Credit_Card_Date nvarchar(5),
@Three_Digit int,
@Credit_Card_Number nvarchar(12)
as
	UPDATE [dbo].[Customers]
	SET 	
	[Card_Holder_Name] =@Card_Holder_Name, 
	[Credit_Card_Date]=@Credit_Card_Date,
	[Three_Digit]=@Three_Digit,
	[Credit_Card_Number] = @Credit_Card_Number
	WHERE [Customer_ID] = @id
go

--exec UpdateCustomerCredit 999,'mmm','02/28',123,'458081112222'


--drop proc DeleteCustomerById
--create proc DeleteCustomerById
--@id int
--as
--	DELETE FROM [dbo].[Customers] WHERE [Customer_ID] = @id
--go
--exec DeleteCustomerById 315201913 



-- פרוצדורות קטגוריה
create proc GetCategory
as
	select * from [dbo].[Category]
go
-- exec GetCategory


create proc AddNewCategory
@Category_Number int,
@Description nvarchar(30)
as
	insert [dbo].[Category] values(@Category_Number,@Description)
go
--exec AddNewCategory 1,'sweet drink'
--exec AddNewCategory 2,'Alcohol'
--exec AddNewCategory 3,'Snacks'


create proc AlterCategory
@Category_Number int,
@Description nvarchar(30)
as
	update [dbo].[Category]
	set Description = @Description
	where Category_Number = @Category_Number
go
-- exec AlterCategory 1,'Sweet Drink'



-- פרוצדורות מוצרים
create proc GetAllProducts
as
	select * from [dbo].[Products]
go
--exec GetAllProducts


create proc GetProductById
@id int
as
	select * from dbo.Products where Products.Product_Code = @id
go
--exec GetProductById 7


create proc AddNewProduct
@Category_Number int,
@Description nvarchar(30) ,
@Price_Per_Unit int ,
@Discount_Percentage int
as
	Insert [dbo].[Products] Values (@Category_Number,@Description,@Price_Per_Unit,@Discount_Percentage)
go
--exec AddNewProduct 1,'Coca cola',15,0
--exec AddNewProduct 2,'Vodka',35,0
--exec AddNewProduct 3,'Doritos',20,0
--exec AddNewProduct 3,'Doritos',20,50
--exec AddNewProduct 1,'Sprite',15,15
--exec AddNewProduct 2,'Whiskey',45,0
--exec AddNewProduct 3,'Doritos',20,0


create proc AlterProductById
@id int,
@Description nvarchar(30) ,
@Price_Per_Unit int ,
@Discount_Percentage int
as
	UPDATE [dbo].[Products]
	SET [Description] = @Description,
	[Price_Per_Unit]=@Price_Per_Unit,
	[Discount_Percentage] = @Discount_Percentage
	WHERE [Product_Code] = @id
go
-- exec AlterProductById 1,'Coca cola',15,50


create proc DeleteProductById
@id int
as
	DELETE FROM [dbo].[Products] WHERE [Product_Code] = @id
go
-- exec DeleteProductById 2



---  פרוצדורות רכישות הספקה
create proc GetAllPurchase_Of_Goods
as
	select * from [dbo].[Purchase_Of_Goods]
	order by [Purchase_Date] desc
go
-- exec GetAllPurchase_Of_Goods


create proc GetPurchase_Of_Goods_ByCode
@Code int
as
	select * from [dbo].[Purchase_Of_Goods]
	where [Product_Code] = @Code
	order by [Purchase_Date] desc
go

-- exec GetPurchase_Of_Goods_ByCode 1 


create proc AddNewPurchase_Of_Goods
@Product_Code int,
@Category_Number int,
@Price_Per_Unit decimal(10,2),
@Amount int,
@Purchase_Date date
as
	declare @Sum_Total as decimal(10,2) = @Price_Per_Unit * @Amount
	insert [dbo].[Purchase_Of_Goods] 
	values(@Product_Code , @Category_Number , @Price_Per_Unit , @Amount, @Purchase_Date , @Sum_Total)
go

--exec AddNewPurchase_Of_Goods 1,1,7.5,100,'07/07/2022'
--exec AddNewPurchase_Of_Goods 2,2,25,230,'07/07/2022'
--exec AddNewPurchase_Of_Goods 3,3,10,300,'07/07/2022'
--exec AddNewPurchase_Of_Goods 4,3,15,50,'07/07/2022'
--exec AddNewPurchase_Of_Goods 5,1,9,76,'07/07/2022'
--exec AddNewPurchase_Of_Goods 6,2,30,89,'07/07/2022'
--exec AddNewPurchase_Of_Goods 7,3,10,191,'07/07/2022'



create proc AlterPurchase_Of_Goods
@Product_Code int,
@Category_Number int,
@Price_Per_Unit decimal(10,2),
@Amount int,
@Purchase_Date date
as
	declare @Sum_Total as decimal(10,2) = @Price_Per_Unit * @Amount
	update [dbo].[Purchase_Of_Goods]
	set [Product_Code] = @Product_Code , [Category_Number] = @Category_Number , [Price_Per_Unit] = @Price_Per_Unit,
	[Amount] = @Amount , [Purchase_Date] = @Purchase_Date, [Sum_Total] = @Sum_Total
	where [Product_Code] = @Product_Code
go

--exec AlterPurchase_Of_Goods 1,1,8,200,'07/07/2022'


create proc DeletePurchase_Of_Goods
@Product_Code int,
@Purchase_Date date
as
	delete from [dbo].[Purchase_Of_Goods] 
	where [Product_Code] = @Product_Code and [Purchase_Date] = @Purchase_Date
go

--exec DeletePurchase_Of_Goods 1 ,'07/07/2022'



--  פרוצדורות חדרים 
create proc GetAllRooms
as
	select * from [dbo].[Rooms]
go 
-- exec GetAllRooms


create proc GetRoomById
@id int
as
	select * from [dbo].[Rooms] where [Room_Number] = @id
go
-- exec GetRoomById 1


create proc AddNewRoom
@Room_Type nvarchar(30),
@Price_Per_Night int,
@Details NVARCHAR(100)
as
	Insert [dbo].[Rooms] Values (@Room_Type,@Price_Per_Night,@Details)
go
--exec AddNewRoom 'Single room',100,'A personal room adapted for a single person'
--exec AddNewRoom 'Single room',100,'A personal room adapted for a single person'
--exec AddNewRoom 'Single room',100,'A personal room adapted for a single person'
--exec AddNewRoom 'Single room',100,'A personal room adapted for a single person'
--exec AddNewRoom 'Single room',100,'A personal room adapted for a single person'
--exec AddNewRoom 'Single room',100,'A personal room adapted for a single person'
--exec AddNewRoom 'Single room',100,'A personal room adapted for a single person'
--exec AddNewRoom 'Single room',100,'A personal room adapted for a single person'
--exec AddNewRoom 'Single room',100,'A personal room adapted for a single person'
--exec AddNewRoom 'Single room',100,'A personal room adapted for a single person'

--exec AddNewRoom 'Double room',300,'A double room suitable for two people'
--exec AddNewRoom 'Double room',300,'A double room suitable for two people'
--exec AddNewRoom 'Double room',300,'A double room suitable for two people'
--exec AddNewRoom 'Double room',300,'A double room suitable for two people'
--exec AddNewRoom 'Double room',300,'A double room suitable for two people'
--exec AddNewRoom 'Double room',300,'A double room suitable for two people'
--exec AddNewRoom 'Double room',300,'A double room suitable for two people'
--exec AddNewRoom 'Double room',300,'A double room suitable for two people'
--exec AddNewRoom 'Double room',300,'A double room suitable for two people'
--exec AddNewRoom 'Double room',300,'A double room suitable for two people'

--exec AddNewRoom 'Suite',500,'A suite designed to accommodate an amount of about 3 to 10 people'
--exec AddNewRoom 'Suite',500,'A suite designed to accommodate an amount of about 3 to 10 people'
--exec AddNewRoom 'Suite',500,'A suite designed to accommodate an amount of about 3 to 10 people'
--exec AddNewRoom 'Suite',500,'A suite designed to accommodate an amount of about 3 to 10 people'
--exec AddNewRoom 'Suite',500,'A suite designed to accommodate an amount of about 3 to 10 people'
--exec AddNewRoom 'Suite',500,'A suite designed to accommodate an amount of about 3 to 10 people'
--exec AddNewRoom 'Suite',500,'A suite designed to accommodate an amount of about 3 to 10 people'
--exec AddNewRoom 'Suite',500,'A suite designed to accommodate an amount of about 3 to 10 people'
--exec AddNewRoom 'Suite',500,'A suite designed to accommodate an amount of about 3 to 10 people'
--exec AddNewRoom 'Suite',500,'A suite designed to accommodate an amount of about 3 to 10 people'



create proc AlterRoomById
@Room_Number int,
@Customer_ID int,
@Status NVARCHAR(30)
as
	UPDATE [dbo].[Rooms]
	SET  [Customer_ID] = @Customer_ID , [Status] = @Status
	WHERE [Room_Number] = @Room_Number
go

--exec AlterRoomById 5,null,'Available'


--drop proc DeleteRoomById
--create proc DeleteRoomById
--@Room_Number int
--as
--	DELETE FROM [dbo].[Rooms] WHERE [Room_Number] = @Room_Number
--go
-- exec DeleteRoomById 1


---  פרוצדורות טבלת משמרות
create proc GetShifts
as
	select * from [dbo].[Shifts]
go
--exec GetShifts


create proc AddShift
@Employee_ID int
as
	DECLARE @Employee_Code int=(select Employee_Code  from Employees 
	where Employee_ID = @Employee_ID)
	DECLARE @Worker_Code int =(select Worker_Code from Employees 
	where Employee_ID = @Employee_ID)
	insert [dbo].[Shifts] values (@Employee_ID,@Employee_Code,@Worker_Code,getdate(),
	(select convert(varchar, getdate(), 120)),null)
go
--exec AddShift 111


create proc DeleteShift
@Employee_ID int,
@Entrance_Time datetime 
as
	delete from [dbo].[Shifts]
	where Employee_ID = @Employee_ID and Entrance_Time = @Entrance_Time
go
--exec DeleteShift 111,'2022-08-17 02:16:12.000'




--  פרוצדורות משימות
create proc GetAllTasks
as
	SELECT dbo.Employees_Tasks.Employee_ID, dbo.Tasks_Types.Task_Name, dbo.Employees_Tasks.Start_Date, 
	dbo.Employees_Tasks.Start_Time, dbo.Employees_Tasks.End_Date, dbo.Employees_Tasks.Task_Status, 
	dbo.Employees_Tasks.Description
	FROM dbo.Tasks_Types INNER JOIN dbo.Employees_Tasks 
	ON dbo.Tasks_Types.Task_Number = dbo.Employees_Tasks.Task_Number
	GROUP BY dbo.Employees_Tasks.Employee_ID, dbo.Tasks_Types.Task_Name, dbo.Employees_Tasks.Start_Date, 
	dbo.Employees_Tasks.Start_Time, dbo.Employees_Tasks.End_Date, dbo.Employees_Tasks.Task_Status, 
    dbo.Employees_Tasks.Description
	order by dbo.Employees_Tasks.Task_Status desc
go
-- exec GetAllTasks


create proc GetTaskById
@id int
as
	select * from [dbo].[Employees_Tasks] 
	where [Employee_ID] = @id  
	order by [Task_Status] desc
go
-- exec GetTaskById 222


create proc AddNewTask
@Employee_ID int, 
@Task_Number int,
@Start_Date date,
@Start_Time time(7) ,
@End_Date date,
@Task_Status nvarchar(30),
@Description nvarchar(30)
as
	if EXISTS( select [Employee_ID],[Date],[Entrance_Time] from [dbo].[Shifts]
	where [Employee_ID] = 111 and [Date] = @Start_Date and [Entrance_Time] <= @Start_Time )
		insert [dbo].[Employees_Tasks]
		values (@Employee_ID,@Task_Number,@Start_Date,@Start_Time,@End_Date,@Task_Status,@Description)
go

--exec AddNewTask 222,7,'2022-08-17','13:00','03/02/2022','Open','Clean the counter is filthy'
-- exec AddNewTask 333,1,'02/02/2022','13:10','03/02/2022','Close','Room cleaning 21'
-- exec AddNewTask 444,2,'02/02/2022','13:05','03/02/2022','Open','Schnitzel, chips and coke for room 23'
-- exec AddNewTask 555,4,'02/02/2022','13:07','03/02/2022','Close','Mini bar filling for room 10'
-- exec AddNewTask 777,3,'02/02/2022','13:08','03/02/2022','Open','Room 15 request dry towels'
-- exec AddNewTask 888,6,'02/02/2022','13:12','03/02/2022','Close','A customer requests to check out'
--exec AddNewTask 222,7,'02/02/2022','13:12','03/02/2022','Open','Clean the counter is filthy'


create proc AlterTask
@Employee_ID int, 
@Task_Number int,
@Start_Date date,
@Start_Time time(7) ,
@End_Date date,
@Task_Status nvarchar(30),
@Description nvarchar(30)
as
	UPDATE [dbo].[Employees_Tasks]
	SET 
	[End_Date]=@End_Date,[Task_Status]=@Task_Status,[Description]=@Description
	WHERE [Employee_ID] = @Employee_ID and [Task_Number]=@Task_Number and [Start_Date]=@Start_Date 
	and [Start_Time]=@Start_Time
go

-- exec AlterTask 222,7,'02/02/2022','13:00','03/02/2022','Close','Clean the counter is filthy'


create proc DeleteTask
@Employee_ID int, 
@Task_Number int,
@Start_Date date,
@Start_Time time(7)
as
	delete from [dbo].[Employees_Tasks]
	where [Employee_ID] = @Employee_ID and [Task_Number]=@Task_Number
	and [Start_Date]=@Start_Date and [Start_Time]=@Start_Time
go

-- exec DeleteTask 222,7,'02/02/2022','13:00'



-- פרוצדורות חשבון ללקוח

create proc GetAllBills
as
	select * from [dbo].[Bill]
	order by [Bill_Number] desc
go
--exec GetAllBills
--exec GetAllEmployees

create proc  GetBillByNumber
@Bill_Number int
as
	select * from [dbo].[Bill]
	where Bill_Number = @Bill_Number
go
-- exec GetBillByNumber 1 


create proc AddNewBill
@Employee_ID int,
@Customer_ID int,
@Credit_Card_Number nvarchar(12),
@Purchase_Date date,
@Bill_Status nvarchar(10)
as
	insert [dbo].[Bill] 
	values(@Employee_ID, @Customer_ID,@Credit_Card_Number,@Purchase_Date,@Bill_Status)
go
--- 
--  לפני הוספת שורה לטבלה יש לבצע בדיקת כפיליות 
---
--exec AddNewBill 111,111,'4580266514789456','01/01/2021','Close'
--exec AddNewBill 222,222,'4580266514789456','01/01/2021','Close'
--exec AddNewBill 333,333,'4580266514789456','01/01/2021','Close'
--exec AddNewBill 444,444,'4580266514789456','01/01/2021','Close'
--exec AddNewBill 555,555,'4580266514789456','12/09/2020','Open'
--exec AddNewBill 666,444,'458026651478','23/09/2020','Open'
--exec AddNewBill 222,666,'458026651478','2022-10-08','Open'
--exec AddNewBill 111,888,'458026651478','2022-12-06','Open'
--exec AddNewBill 222,666,'458026651478','2021-10-07','Open'
--exec AddNewBill 111,888,'458026651478','2022-12-05','Open'
--exec AddNewBill 111,999,'458026651478','2022-12-05','Open'


create proc AlterBill
@Bill_Number int,
@Employee_ID int,
@Customer_ID int,
@Credit_Card_Number nvarchar(12),
@Purchase_Date date
as
	UPDATE [dbo].[Bill]
	SET Employee_ID = @Employee_ID,
	Customer_ID=@Customer_ID, 
	Credit_Card_Number = @Credit_Card_Number,
	Purchase_Date = @Purchase_Date
	where Bill_Number = @Bill_Number 
go
--exec AlterBill 111,111,'4580266514789456','01/01/2021'
--exec AlterBill 222,222,'4580266514789456','01/01/2021'
--exec AlterBill 333,333,'4580266514789456','01/01/2021'
--exec AlterBill 444,444,'4580266514789456','01/01/2021'
--exec AlterBill 555,555,'4580266514789456','12/09/2020'
--exec AlterBill 666,444,'458026651478','23/09/2020'
--exec AlterBill 222,666,'458026651478','2022-10-07'
--exec AlterBill 111,888,'458026651478','2022-12-06'
--exec AlterBill 222,666,'458026651478','2021-10-07'
--exec AlterBill 777,888,'458026651478','2022-12-05'

create proc DeleteBill
@Bill_Number int,
@Customer_ID int,
@Credit_Card_Number nvarchar(12)
as
	DELETE FROM [dbo].[Bill] 
	WHERE Bill_Number = @Bill_Number and Customer_ID = @Customer_ID and Credit_Card_Number = @Credit_Card_Number
go

 --exec DeleteBill 20,999,458022223333
 -- exec DeleteBill 21,999,458022223333
--exec GetAllBills


--  פרוצדורות חדרים שמורים ללקוחות
create proc GetCustomersRooms
as
	select * from [dbo].[Customers_Rooms] order by [Entry_Date] DESC
go
-- exec GetCustomersRooms


create proc AddNewCustomerRooms
@Room_Number int,
@Bill_Number int,
@Customer_ID int,
@Entry_Date date,
@Exit_Date date,
@Amount_Of_People int,
@Room_Status nvarchar(30)
as
	insert [dbo].[Customers_Rooms] 
	values(@Room_Number,@Bill_Number,@Customer_ID,@Entry_Date,@Exit_Date,@Amount_Of_People,@Room_Status)
go

--exec AddNewCustomerRooms 2,2,222,'2022-09-09','2022-09-15',1,'Occupied'
--exec AddNewCustomerRooms 20,null,888,'2022-09-08','2022-09-14',2,'Reserved'
--exec AddNewCustomerRooms 3,3,333,'2022-07-21','2022-07-25',2,'Reserved'
--exec AddNewCustomerRooms 8,4,444,'2022-07-14','2022-07-20',8,'Occupied'
--exec AddNewCustomerRooms 9,5,555,'2021-07-05','2021-07-08',2,'Reserved'
--exec AddNewCustomerRooms 7,6,666,'2021-06-06','2021-06-12',4,'Occupied'



create proc DeleteCustomerRoom
@Room_Number int,
@Customer_ID int,
@Entry_Date date
as
	DELETE FROM [dbo].[Customers_Rooms] 
	WHERE [Customer_ID] = @Customer_ID and [Room_Number] = @Room_Number and [Entry_Date] = @Entry_Date
go
--exec GetCustomersRooms
 --exec DeleteCustomerRoom 19,333,'2021-12-21'



create proc FindCustomerRoomByKeys
@Customer_ID int,
@Room_Number int,
@Entry_Date date
as
	select * from [dbo].[Customers_Rooms]
	where [Customer_ID] = @Customer_ID and [Room_Number] = @Room_Number and [Entry_Date] = @Entry_Date
go

-- exec FindCustomerRoomByKeys 111,1,'2022-09-09'


create proc AlterCustomerRoom
@Room_Number int,
@Bill_Number int,
@Customer_ID int,
@Entry_Date date,
@Exit_Date date,
@Amount_Of_People int,
@Room_Status nvarchar(30)
as
	UPDATE [dbo].[Customers_Rooms]
	SET 
	[Entry_Date] = @Entry_Date ,
	[Exit_Date]=@Exit_Date, 
	[Customer_ID] = @Customer_ID,
	[Amount_Of_People] = @Amount_Of_People,
	[Bill_Number] = @Bill_Number,
	[Room_Status] = @Room_Status
	WHERE  	[Room_Number] = @Room_Number
go
--exec GetAllCustomersRooms
--exec AlterCustomerRoom  1, 20,111,'2022-08-22','2022-08-24',5,'Occupied'
--exec AlterCustomerRoom 1,1,111,'2022-09-09','2022-09-15',1,'Reserved'
--exec AlterCustomerRoom 2,2,222,'2022-09-08','2022-09-14',2,'Reserved'
--exec AlterCustomerRoom 3,3,333,'2022-07-21','2022-07-25',2,'Occupied'
--exec AlterCustomerRoom 5,2,222,'2022-08-21','2022-08-25',1,'Occupied'




--  מביא את החדרים שתאריך היציאה שלהם גדול מהתאריך של היום
--  מצביא על חדרים תפוסים
create proc GetTakenRooms
as
	select * from [dbo].[Customers_Rooms]
	where [Room_Status] = 'Occupied'
go
-- exec GetTakenRooms




--  תביא לי את כול החדרים הפנויים
create FUNCTION AvailableRooms()
returns @Temp TABLE ( Room_Number int ,Room_Type nvarchar(30), Price_Per_Night int, Details nvarchar(100) )                     
as
	begin
		insert @Temp SELECT Room_Number,Room_Type, Price_Per_Night, Rooms.Details FROM Rooms
		WHERE Room_Number NOT IN (SELECT Room_Number FROM Customers_Rooms)

		--insert @Temp SELECT Room_Number,Room_Type, Price_Per_Night, Rooms.Details FROM Rooms
		--WHERE Room_Number IN (select Room_Number from [dbo].[Customers_Rooms] where [Room_Status] = 'Available')

		RETURN
	end
go

--SELECT * FROM  AvailableRooms() order by Room_Number



--  פרוצדורה אשר מבצעת את שמירת החדרים ללקוח
create proc SaveRoomReservation
@id int,
@Card_Holder_Name  nvarchar(30),
@Credit_Card_Date nvarchar(5),
@Three_Digit int,
@Credit_Card_Number nvarchar(12),
@Employee_ID int,
@Counter_Single int,
@Counter_Double int,
@Counter_Suite int,
@Entry_Date date,
@Exit_Date date,
@Amount_Of_People int
as
	exec UpdateCustomerCredit @id,@Card_Holder_Name,@Credit_Card_Date,@Three_Digit,@Credit_Card_Number


	DECLARE @date as date = (SELECT FORMAT(CAST( GETDATE() AS Date ),'dd/MM/yyyy' ))
	DECLARE @if_exist_date as date = (SELECT FORMAT(CAST( (select [Purchase_Date] from [dbo].[Bill] 
	where [Customer_ID] = @id) AS Date ),'dd/MM/yyyy'))

	if @date != @if_exist_date
		exec AddNewBill @Employee_ID,@id,@Credit_Card_Number,@date ,'Open'

	DECLARE @bill_number as int = (select Bill_Number from Bill where Customer_ID = @id)
	DECLARE @room_number as int




	while @Counter_Single > 0
		begin
		set @room_number = (SELECT MIN(Room_Number) AS Room_Number FROM dbo.AvailableRooms() WHERE  Room_Type = 'Single room')
		IF NOT EXISTS(select Room_Number from [dbo].[Customers_Rooms] where Room_Number = @room_number)
			exec AddNewCustomerRooms @room_number, @bill_number,@id,@Entry_Date,@Exit_Date,@Amount_Of_People,'Reserved'
		else
			exec AlterCustomerRoom @room_number, @bill_number,@id,@Entry_Date,@Exit_Date,@Amount_Of_People,'Reserved'
		set @Counter_Single = @Counter_Single - 1
		end

	while @Counter_Double > 0
		begin
		set @room_number = (SELECT MIN(Room_Number) AS Room_Number FROM dbo.AvailableRooms() WHERE  Room_Type = 'Double room')
		IF NOT EXISTS(select Room_Number from [dbo].[Customers_Rooms] where Room_Number = @room_number)
			exec AddNewCustomerRooms @room_number, @bill_number,@id,@Entry_Date,@Exit_Date,@Amount_Of_People,'Reserved'
		else
			exec AlterCustomerRoom @room_number, @bill_number,@id,@Entry_Date,@Exit_Date,@Amount_Of_People,'Reserved'
		set @Counter_Double = @Counter_Double - 1
		end

	while @Counter_Suite > 0
		begin
		set @room_number = (SELECT MIN(Room_Number) AS Room_Number FROM dbo.AvailableRooms() WHERE  Room_Type = 'Suite')
		IF NOT EXISTS(select Room_Number from [dbo].[Customers_Rooms] where Room_Number = @room_number)
			exec AddNewCustomerRooms @room_number, @bill_number,@id,@Entry_Date,@Exit_Date,@Amount_Of_People,'Reserved'
		else
			exec AlterCustomerRoom @room_number, @bill_number,@id,@Entry_Date,@Exit_Date,@Amount_Of_People,'Reserved'
		set @Counter_Suite = @Counter_Suite - 1
		end
go
exec GetAllBills
exec GetCustomersRooms
--exec SaveRoomReservation 999,'mmm','12/29',912,'4580222233334444',111,1,1,1,'22/08/2022','24/08/2022',5


--  פרוצדורה עבור צאק אין
create proc CheckIn
@id int,
@entry_date date
as
	UPDATE [dbo].[Customers_Rooms]
	SET 
	[Room_Status] = 'Occupied'
	WHERE  	[Customer_ID] = @id and [Entry_Date] = @entry_date
go
--exec CheckIn 999 , '2022-08-22'


create proc CheckOut
@id int,
@exit_date date
as
	DELETE FROM [dbo].[Customers_Rooms] 
	WHERE  Customer_ID = @id and [Exit_Date] = @exit_date
go
--exec CheckOut 999 , '2022-08-24'
select * from [dbo].[Bill]
select * from [dbo].[Bill_Details]



--  פרוצדורות פרטי רכישות
create proc GetAllBill_Details
as
	select * from [dbo].[Bill_Details]
	order by [Purchase_Date] 
go
-- exec GetAllBill_Details



create proc GetBill_DetailsByNumber
@Bill_Number int
as
	select * from [dbo].[Bill_Details]
	where Bill_Number = @Bill_Number
go
-- exec GetBill_DetailsByNumber 1



alter proc AddNewBill_Detail
@id int,
@Product_Code int,
@Amount int,
@Purchase_Date date,
@Purchase_Time time,
@Payment_Method nvarchar(20)
as
	DECLARE @bill_number as int = (select Bill_Number from [dbo].[Bill] 
		where [Customer_ID] = @id and [Bill_Status] = 'Open')
	--if Exists( select [Bill_Status] from Bill 
	--	where  )
	--insert [dbo].[Bill_Details]
	--values (@Bill_Number, @Product_Code, @Amount,@Purchase_Date,@Purchase_Time,@Payment_Method)
go
exec GetAllBills
exec GetAllBill_Details
exec GetCustomersRooms
exec AddNewBill_Detail id,2,6,'12/12/2022','13:00','Cash'


select Bill_Number from [dbo].[Bill] 
		where [Customer_ID] = 888 and [Bill_Status] = 'Open'
		and [Purchase_Date] = '2022-12-06'

--exec AddNewBill_Detail 1,2,6,'12/12/2022','13:00','Cash'
--exec AddNewBill_Detail 4,3,6,'03/12/2022','16:00','Credit'
--exec AddNewBill_Detail 3,1,6,'12/12/2022','21:00','Credit'
--exec AddNewBill_Detail 5,1,10,'12/12/2022','21:00','Credit'
--exec AddNewBill_Detail 6,5,2,'12/12/2022','21:00','Cash'
--exec AddNewBill_Detail 3,1,3,'12/12/2022','21:00','Credit'
--exec AddNewBill_Detail 3,6,1,'12/12/2022','21:00','Cash'
--exec AddNewBill_Detail 6,5,2,'13/01/2022','21:00','Credit'



create proc DeleteBill_Detail
@Product_Code int,
@Amount int,
@Purchase_Date date,
@Purchase_Time time
as
	DELETE FROM [dbo].[Bill_Details] 
	WHERE Product_Code = @Product_Code and @Amount = @Amount 
	and Purchase_Date = @Purchase_Date and Purchase_Time = @Purchase_Time
go

-- exec DeleteBill_Detail 2,6,'12/12/2022','13:00'


create proc AlterBill_Detail
@Bill_Number int,
@Product_Code int,
@Amount int,
@Purchase_Date date,
@Purchase_Time time,
@Payment_Method nvarchar(20)
as
	UPDATE [dbo].[Bill_Details]
	SET Bill_Number = @Bill_Number , Product_Code = @Product_Code, 
	Amount = @Amount , [Payment_Method]  = @Payment_Method 
	WHERE Bill_Number = @Bill_Number and Product_Code = @Product_Code
	and Purchase_Date = @Purchase_Date and Purchase_Time = @Purchase_Time
go
 --exec AlterBill_Detail 1,2,10,'2021-12-12','13:00','Cash'




create proc ProductPurchaseByName
@Description nvarchar(30)
as
	SELECT dbo.Bill_Details.Product_Code, dbo.Products.Description, dbo.Category.Description AS Category, dbo.Products.Price_Per_Unit, dbo.Products.Discount_Percentage, sum(dbo.Bill_Details.Amount) as Amount
	FROM     dbo.Bill_Details INNER JOIN dbo.Products 
	ON dbo.Bill_Details.Product_Code = dbo.Products.Product_Code INNER JOIN dbo.Category 
	ON dbo.Products.Category_Number = dbo.Category.Category_Number
	WHERE  (dbo.Products.Description = @Description)
	GROUP BY dbo.Bill_Details.Product_Code, dbo.Products.Description, dbo.Category.Description, dbo.Products.Price_Per_Unit, dbo.Products.Discount_Percentage
go
exec GetAllProducts
-- exec ProductPurchaseByName 'Coca cola'



create proc Product_Resit
@Bill_Number int
as
	SELECT dbo.Bill_Details.Bill_Number, dbo.Bill_Details.Product_Code, dbo.Products.Description, dbo.Products.Price_Per_Unit, dbo.Products.Discount_Percentage, dbo.Bill_Details.Amount, dbo.Bill_Details.Purchase_Date, dbo.Bill_Details.Purchase_Time
	FROM dbo.Bill_Details INNER JOIN dbo.Products 
	ON dbo.Bill_Details.Product_Code = dbo.Products.Product_Code
	WHERE  (dbo.Bill_Details.Bill_Number = @Bill_Number)
	GROUP BY dbo.Bill_Details.Bill_Number, dbo.Bill_Details.Product_Code, dbo.Products.Description, dbo.Products.Price_Per_Unit, dbo.Products.Discount_Percentage, dbo.Bill_Details.Amount, dbo.Bill_Details.Purchase_Date, dbo.Bill_Details.Purchase_Time
go

--exec Product_Resit 3


---  לתקן קבלה של החדר
--- פרוצדורה למטרת צאק אווט
create proc Room_Resit
@ID int
as
	SELECT dbo.Customers_Rooms.Bill_Number, dbo.Bill.Customer_ID, dbo.Customers_Rooms.Room_Number,dbo.Customers_Rooms.Room_Status,
	dbo.Rooms.Room_Type, dbo.Rooms.Price_Per_Night, dbo.Customers_Rooms.Entry_Date,dbo.Customers_Rooms.Exit_Date,
	(SELECT DATEDIFF(day, dbo.Customers_Rooms.Entry_Date, dbo.Customers_Rooms.Exit_Date)) as Number_Of_Nights,
	dbo.Customers_Rooms.Amount_Of_People, 
	(SELECT DATEDIFF(day, dbo.Customers_Rooms.Entry_Date, dbo.Customers_Rooms.Exit_Date) * dbo.Rooms.Price_Per_Night) as Sum_Total,
	dbo.Bill.Credit_Card_Number, dbo.Bill.Purchase_Date
	FROM dbo.Customers_Rooms INNER JOIN dbo.Bill 
	ON dbo.Customers_Rooms.Bill_Number = dbo.Bill.Bill_Number INNER JOIN dbo.Rooms 
	ON dbo.Customers_Rooms.Room_Number = dbo.Rooms.Room_Number
	WHERE  (dbo.Bill.Customer_ID = @ID)
	GROUP BY dbo.Customers_Rooms.Bill_Number, dbo.Bill.Customer_ID, dbo.Customers_Rooms.Room_Number, dbo.Rooms.Room_Type, dbo.Rooms.Price_Per_Night, dbo.Customers_Rooms.Entry_Date, dbo.Customers_Rooms.Exit_Date, dbo.Customers_Rooms.Amount_Of_People, dbo.Bill.Credit_Card_Number, dbo.Bill.Purchase_Date,dbo.Customers_Rooms.Room_Status
	order by dbo.Customers_Rooms.Room_Status desc

	--SELECT dbo.Customers_Rooms.Bill_Number, dbo.Bill.Customer_ID, dbo.Customers_Rooms.Room_Number, 
	--dbo.Rooms.Room_Type, dbo.Rooms.Price_Per_Night, dbo.Customers_Rooms.Entry_Date,dbo.Customers_Rooms.Exit_Date,
	--(SELECT DATEDIFF(day, dbo.Customers_Rooms.Entry_Date, dbo.Customers_Rooms.Exit_Date)) as Number_Of_Nights,
	--dbo.Customers_Rooms.Amount_Of_People, 
	--(SELECT DATEDIFF(day, dbo.Customers_Rooms.Entry_Date, dbo.Customers_Rooms.Exit_Date) * dbo.Rooms.Price_Per_Night) as Sum_Total,
	--dbo.Bill.Credit_Card_Number, dbo.Bill.Purchase_Date,dbo.Bill.Bill_Status
	--FROM dbo.Customers_Rooms INNER JOIN dbo.Bill 
	--ON dbo.Customers_Rooms.Bill_Number = dbo.Bill.Bill_Number INNER JOIN dbo.Rooms 
	--ON dbo.Customers_Rooms.Room_Number = dbo.Rooms.Room_Number
	--WHERE  (dbo.Bill.Customer_ID = @ID)
	--GROUP BY dbo.Customers_Rooms.Bill_Number, dbo.Bill.Customer_ID, dbo.Customers_Rooms.Room_Number, dbo.Rooms.Room_Type, dbo.Rooms.Price_Per_Night, dbo.Customers_Rooms.Entry_Date, dbo.Customers_Rooms.Exit_Date, dbo.Customers_Rooms.Amount_Of_People, dbo.Bill.Credit_Card_Number, dbo.Bill.Purchase_Date, dbo.Bill.Bill_Status
	--order by dbo.Bill.Bill_Status desc
go

-- exec Room_Resit 555

--SELECT DATEDIFF(day, '28/06/2022', '07/07/2022') AS DateDiff;



create proc SumPerProduct
as
	SELECT dbo.Bill_Details.Product_Code, dbo.Products.Description, dbo.Category.Description AS Category,
	dbo.Products.Price_Per_Unit, dbo.Products.Discount_Percentage, 
	(select sum(Amount) from Bill_Details where Product_Code = dbo.Bill_Details.Product_Code) as Amount
	FROM dbo.Bill_Details INNER JOIN dbo.Products 
	ON dbo.Bill_Details.Product_Code = dbo.Products.Product_Code INNER JOIN dbo.Category 
	ON dbo.Products.Category_Number = dbo.Category.Category_Number
	GROUP BY dbo.Bill_Details.Product_Code, dbo.Products.Description, dbo.Category.Description, dbo.Products.Price_Per_Unit, dbo.Products.Discount_Percentage
go

-- exec SumPerProduct


 create proc Number_of_tasks_per_month
as
	SELECT Start_Date, count(Start_Date) as Amount FROM Employees_Tasks GROUP by Start_Date
go
--exec Number_of_tasks_per_month


create proc Month_with_the_most_reservation
as
	select MONTH(Entry_Date) as Month  from [dbo].[Customers_Rooms] GROUP by Entry_Date
go
--exec Month_with_the_most_reservation


create proc Expenses
as
	select sum([Sum_Total]) from [dbo].[Purchase_Of_Goods]
go

-- exec Expenses


create proc Calu_Rooms_Income
as
	SELECT ((SELECT DATEDIFF(day, dbo.Customers_Rooms.Entry_Date,  dbo.Customers_Rooms.Exit_Date)) * dbo.Rooms.Price_Per_Night) AS Sum_Total
	FROM dbo.Customers_Rooms INNER JOIN dbo.Rooms 
	ON dbo.Customers_Rooms.Room_Number = dbo.Rooms.Room_Number
go

--exec Calu_Rooms_Income


--SELECT dbo.Customers_Rooms.Bill_Number, dbo.Customers_Rooms.Entry_Date, dbo.Rooms.Room_Type,
--(select count(Bill_Number) from Customers_Rooms where MONTH(Entry_Date) = MONTH(dbo.Customers_Rooms.Entry_Date)) as sfira
--FROM     dbo.Customers_Rooms INNER JOIN
--                  dbo.Rooms ON dbo.Customers_Rooms.Room_Number = dbo.Rooms.Room_Number
--GROUP BY dbo.Customers_Rooms.Bill_Number, dbo.Customers_Rooms.Entry_Date, dbo.Rooms.Room_Type



create proc Calu_Products_Income
as
	SELECT dbo.Bill_Details.Amount, dbo.Products.Price_Per_Unit, dbo.Products.Discount_Percentage
	FROM     dbo.Bill_Details INNER JOIN
					  dbo.Products ON dbo.Bill_Details.Product_Code = dbo.Products.Product_Code
	GROUP BY dbo.Bill_Details.Amount, dbo.Products.Price_Per_Unit, dbo.Products.Discount_Percentage
go

--exec Calu_Products_Income

--drop proc GetAvailableRooms
--create proc GetAvailableRooms
--as
--	SELECT dbo.Rooms.Room_Number, dbo.Rooms.Room_Type, dbo.Rooms.Price_Per_Night,  dbo.Rooms.Details, dbo.Customers_Rooms.Exit_Date
--	FROM dbo.Customers_Rooms INNER JOIN dbo.Rooms 
--	ON dbo.Customers_Rooms.Room_Number = dbo.Rooms.Room_Number
--	WHERE  (dbo.Customers_Rooms.Exit_Date <= GETDATE() and dbo.Customers_Rooms.Bill_Status = 'Available')
--	GROUP BY dbo.Rooms.Room_Number, dbo.Rooms.Room_Type, dbo.Rooms.Price_Per_Night,dbo.Rooms.Details, dbo.Customers_Rooms.Exit_Date
--	order by dbo.Customers_Rooms.Exit_Date desc
--go

----exec GetAvailableRooms

--select * from [dbo].[Bill_Details]
--select * from [dbo].[Category]
--select * from [dbo].[Customers]
--select * from [dbo].[Customers_Rooms]
--select * from [dbo].[Customers_Types]
--select * from [dbo].[Employees]
--select * from [dbo].[Employees_Tasks]
--select * from [dbo].[Employees_Types]
--select * from [dbo].[Products]
--select * from [dbo].[Purchase_Of_Goods]
--select * from [dbo].[Rooms]
--select * from [dbo].[Tasks_Types]
--select * from [dbo].[Bill]




--==================================================
---  מנגנוני התאוששות
--  להתייעץ עם תמי 
--==================================================


--	יצירת מסד נתונים ארכיוני ( שימוש במחרוזות )

Set DateFormat DMY
go

IF  EXISTS ( SELECT * FROM sys.objects 
WHERE object_id = OBJECT_ID('[dbo].[Create_NewDB]') AND type in ('P', 'PC') )
     DROP PROC [dbo].[Create_NewDB]
Go


create Proc Create_NewDB  
	@yy int
as
	IF  EXISTS ( SELECT name FROM sys.databases WHERE name = Concat(N'db_a79b5b_proj13',@yy) )
	Begin
       Declare @sql_dr varchar(100)
       Set @sql_dr = Concat ('DROP DATABASE db_a79b5b_proj13' , @yy)
       Execute (@sql_dr)
    End  
Declare @DbName VarChar (20)
Declare @Sql Varchar (40)
Select @DbName = Concat (N'db_a79b5b_proj13' , @yy)
Select @Sql = Concat ('CREATE DATABASE ' , @Dbname)
Execute (@Sql) 
Go

Declare @YY int
Set @yy = 2022
Exec Create_NewDB @yy
Go

create Proc Create_Tbl_NEwDB
     (@tbl nvarchar (50) , @yy varchar(4))
As
    Declare @sql varchar(300)
    Declare @T varchar (50)
    Set @T = N'db_a79b5b_proj13' + @yy +'.dbo.' + @Tbl
    Set @sql = 'Select * Into ' + @T  + ' From db_a79b5b_proj13.dbo.' + @Tbl 
		select @sql
    Execute (@sql) 
Go

Exec Create_Tbl_NEwDB 'Customers', '2022'
Go


IF  EXISTS ( SELECT * FROM sys.objects 
WHERE object_id = OBJECT_ID(N'[dbo].[Create_AllTbl_NewDB]'))
     DROP  PROC [dbo].[Create_AllTbl_NewDB]
Go
 create Proc Create_AllTbl_NewDB(@yy varchar(4))
 as
 exec Create_NewDB @yy

Declare @table_name Varchar(50)
Declare all_tables Cursor  --  Cursor  הכרזה על משתנה מסוג 
For Select name from sysobjects where type = 'U' order by name
For read only
Open all_tables                 --  Cursor לפתוח את ה 
---
Fetch next from all_tables   into @table_name      -- להביא רשומה ראשונה לתוך משתנה עזר
While @@fetch_status=0
Begin
   Set @Table_name = Concat ('[',@table_name,']')
   Print @table_name
        Exec Create_Tbl_NEwDB  @table_name , @yy    -- הפעלת פרוצדורה להעתקת טבלה
        Fetch next from all_tables  into @table_name        -- להביא רשומה הבאה
   End
Close all_tables 
Deallocate all_tables 
Go

Declare @yy int
   set @yy= YEAR(getdate())
   exec Create_AllTbl_NewDB @yy
   go


 
--==================================================
--  גיבויים ושיחזורים ---
--==================================================

BACKUP DATABASE Final_Project
TO DISK = 'C:\LHOTLDB.bak'
with format
GO

-- להתאים את הפרוצדורות של ה-cmd
-- שיהיה מותקנות לSQL
EXEC sp_configure 'show advanced options', 1
RECONFIGURE
GO
sp_configure 'xp_cmdshell', '1' 
RECONFIGURE with override
Go

--  שיחזור
USE master
GO
IF  EXISTS (SELECT name FROM sys.databases WHERE name = N'db_a79b5b_proj13')
   DROP DATABASE Final_Project
GO
RESTORE DATABASE Final_Project
FROM DISK = 'C:\LHOTLDB.bak'
GO

