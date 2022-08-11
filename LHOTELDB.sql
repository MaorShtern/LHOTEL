

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


create table Rooms
(
	Room_Number int identity(1,1),
	Room_Type NVARCHAR(30) NOT NULL,
	Price_Per_Night int NOT NULL,
	Details NVARCHAR(100) NOT NULL,
	CONSTRAINT [PK_Room_Number] PRIMARY KEY (Room_Number)
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
	End_Date Date  NOT NULL,
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
	Mail nvarchar(100),
	Phone_Number nvarchar(30) ,
	Card_Holder_Name  nvarchar(30) NOT NULL,
	Credit_Card_Date  nvarchar(5) NOT NULL,
	Three_Digit int NOT NULL,
	CONSTRAINT [PK_Customer_ID] PRIMARY KEY (Customer_ID),
	CONSTRAINT [Fk_Customer_Type] FOREIGN KEY 
          (Customer_Type) REFERENCES Customers_Types (Customers_Type)
)
go

--exec GetAllCustomers

create table Bill
(
	Bill_Number int identity(1,1) NOT NULL,
	Employee_ID int NOT NULL,
	Customer_ID int NOT NULL,
	Credit_Card_Number nvarchar(12) NOT NULL,
	Purchase_Date Date NOT NULL,
	Bill_Status nvarchar(30) NOT NULL,
	CONSTRAINT [PK_Bill_Number1] PRIMARY KEY (Bill_Number),
	CONSTRAINT [Fk_Employee_ID2] FOREIGN KEY (Employee_ID) REFERENCES Employees (Employee_ID),
	CONSTRAINT [Fk_Customer_ID] FOREIGN KEY (Customer_ID) REFERENCES Customers (Customer_ID)
)
go


create table Bill_Details
(
	Bill_Number int NOT NULL,
	Product_Code int NOT NULL,
	Amount int NOT NULL,
	Purchase_Date date,
	Purchase_Time time,
	CONSTRAINT [Fk_Product_Code] FOREIGN KEY 
          (Product_Code) REFERENCES Products (Product_Code),
	CONSTRAINT [Fk_Bill_Number] FOREIGN KEY 
          (Bill_Number) REFERENCES Bill (Bill_Number),
)
go


create table Customers_Rooms
(
	Room_Number int NOT NULL,
	Bill_Number int NOT NULL,
	Customer_ID int NOT NULL,
	Entry_Date Date NOT NULL,
	Exit_Date Date NOT NULL,
	Amount_Of_People int NOT NULL,
	CONSTRAINT [PK_Room_Number2] PRIMARY KEY (Room_Number),
	CONSTRAINT [Fk_Room_Number] FOREIGN KEY (Room_Number) REFERENCES Rooms (Room_Number),
	CONSTRAINT [Fk_Bill_Number3] FOREIGN KEY (Bill_Number) REFERENCES Bill (Bill_Number),
)
go



-- פרוצדורות עובדים
create proc GetAllEmployees
as
	select * from [dbo].[Employees]
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
--exec InsertEmployee 111,'aaa','0526211881','23/02/1999',1,40,'aaa'


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


create proc DeleteEmployeeById
@id int
as
	DELETE FROM [dbo].[Employees] WHERE [Employee_ID] = @id
go
--exec DeleteEmployeeById 111



-- פרוצדורות לקוחות

select * from [dbo].[Customers_Types]
--1	Common
--2	Regular
--3	VIP

create proc GetAllCustomers
as
	select * from [dbo].[Customers]
go
--exec GetAllCustomers
-- exec DeleteCustomerById 315201913 


create proc GetCustomerById 
@id int
as
	select * from [dbo].[Customers] where [Customer_ID] = @id
go
--exec GetCustomerById 111


create proc AddNewCustomer
@id int,
@Customer_Type int,
@First_Name nvarchar(30),
@Last_Name nvarchar(30),
@Mail nvarchar(100),
@Phone_Number nvarchar(30) ,
@Card_Holder_Name  nvarchar(30),
@Credit_Card_Date nvarchar(5),
@Three_Digit int
as
	insert [dbo].[Customers] values (@id ,@Customer_Type,@First_Name,@Last_Name,@Mail,@Phone_Number
	,@Card_Holder_Name,@Credit_Card_Date,@Three_Digit)
go
----exec AddNewCustomer 111,1,'AAA','BBB','CCC','0526211881','AAA','02/28',569
--exec AddNewCustomer 999,1,'mmm','mmm','mmm@gmail.com','0526159848','mmm','12-55',456
--111	1	aaa	aaa	aaa@gmail.com	0526211881	aaa	'02/28'	569
--222	1	bbb	bbb	bbb@gmail.com	0524987762	bbb	'10/26'	788
--333	2	ccc	ccc	ccc@gmail.com	0501264859	ccc	'02/28'	954
--444	2	eee	eee	eee@gmail.com	0541528971	eee	'05/26'	781
--555	3	fff	fff	fff@gmail.com	0526487912	fff	'11/27'	212


create proc AlterCustomerById
@id int,
@Customer_Type int,
@First_Name nvarchar(30),
@Last_Name nvarchar(30),
@Mail nvarchar(100),
@Phone_Number nvarchar(30) ,
@Card_Holder_Name  nvarchar(30),
@Credit_Card_Date nvarchar(5),
@Three_Digit int
as
	UPDATE [dbo].[Customers]
	SET  [Customer_Type] = @Customer_Type, 
	[First_Name]=@First_Name,
	[Last_Name]=@Last_Name,
	[Mail] = @Mail,
	[Phone_Number] =@Phone_Number, 
	[Card_Holder_Name] =@Card_Holder_Name, 
	[Credit_Card_Date]=@Credit_Card_Date,
	[Three_Digit]=@Three_Digit
	WHERE [Customer_ID] = @id
go
--exec AlterCustomerById 111,1,'aaa','aaa','aaa@gmail.com','0524987762','aaa','02/28',569
--exec AlterCustomerById 222,2,'bbb','bbb','bbb@gmail.com','0501264859','bbb','02/28',781
--exec AlterCustomerById 333,3,'ccc','ccc','ccc@gmail.com','0541528971','ccc','02/28',569
--exec AlterCustomerById 444,2,'ddd','ddd','ddd@gmail.com','0526487912','ddd','02/28',212
--exec AlterCustomerById 555,1,'eee','eee','eee@gmail.com','0500123889','eee','02/28',954
--exec AlterCustomerById 666,2,'fff','fff','fff@gmail.com','0531528966','fff','02/28',856
--exec AlterCustomerById 777,2,'ggg','ggg','ggg@gmail.com','0531528966','ggg','02/28',569
--exec AlterCustomerById 888,3,'hhh','hhh','hhh@gmail.com','0576488918','hhh','02/28',381

create proc DeleteCustomerById
@id int
as
	DELETE FROM [dbo].[Customers] WHERE [Customer_ID] = @id
go
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
--exec GetProductById 111


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
-- exec GetRoomById 111


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




create proc AlterRoomById
@Room_Number int,
@Room_Type nvarchar(30),
@Price_Per_Night int
as
	UPDATE [dbo].[Rooms]
	SET  [Room_Type] = @Room_Type , [Price_Per_Night] = @Price_Per_Night
	WHERE [Room_Number] = @Room_Number
go

--exec AlterRoomById 5,'Double room',300
--exec AlterRoomById 6,'Double room',300
--exec AlterRoomById 7,'Double room',300


create proc DeleteRoomById
@Room_Number int
as
	DELETE FROM [dbo].[Rooms] WHERE [Room_Number] = @Room_Number
go
-- exec DeleteRoomById 1


--  פרוצדורות משימות
create proc GetAllTasks
as
	select*from [dbo].[Employees_Tasks] ORDER BY [Task_Status] DESC
go
-- exec GetAllTasks


create proc GetTaskById
@id int,
@Task_Number int,
@Start_Date date
as
	select * from [dbo].[Employees_Tasks] 
	where [Employee_ID] = @id and [Task_Number] = @Task_Number and [Start_Date] = @Start_Date
go
-- exec GetTaskById 111,1,'20/02/2000'


create proc AddNewTask
@Employee_ID int, 
@Task_Number int,
@Start_Date date,
@Start_Time time(7) ,
@End_Date date,
@Task_Status nvarchar(30),
@Description nvarchar(30)
as
	insert [dbo].[Employees_Tasks]
	values (@Employee_ID,@Task_Number,@Start_Date,@Start_Time,@End_Date,@Task_Status,@Description)
go

-- exec AddNewTask 111,1,'02/02/2022','15:00','03/02/2022','Open','bbb'


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
	SET [Start_Time]=@Start_Time,
	[End_Date]=@End_Date,[Task_Status]=@Task_Status,[Description]=@Description
	WHERE [Employee_ID] = @Employee_ID and [Task_Number]=@Task_Number and [Start_Date]=@Start_Date
go

-- exec AlterTask 111,1,'02/02/2022','20:00','30/01/2555','Close','vvv'


create proc DeleteTask
@Employee_ID int, 
@Task_Number int,
@Start_Date date
as
	delete from [dbo].[Employees_Tasks]
	where [Employee_ID] = @Employee_ID and [Task_Number]=@Task_Number and [Start_Date]=@Start_Date
go

-- exec DeleteTask 111,1,'02/02/2022'


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
@Amount_Of_People int
as
	insert [dbo].[Customers_Rooms] 
	values(@Room_Number,@Bill_Number,@Customer_ID,@Entry_Date,@Exit_Date,@Amount_Of_People)
go

--exec AddNewCustomerRooms 1,1,111,'2022-09-09','2022-09-15',1
--exec AddNewCustomerRooms 2,2,222,'2022-09-08','2022-09-14',2
--exec AddNewCustomerRooms 3,3,333,'2022-07-21','2022-07-25',2
--exec AddNewCustomerRooms 8,4,444,'2022-07-14','2022-07-20',8
--exec AddNewCustomerRooms 9,5,555,'2021-07-05','2021-07-08',2
--exec AddNewCustomerRooms 7,6,666,'2021-06-06','2021-06-12',4
--exec AddNewCustomerRooms 6,3,333,'2022-07-21','2022-07-25',3
--exec AddNewCustomerRooms 19,4,333,'2021-12-21','2021-12-25',10



create proc DeleteCustomerRoom
@Customer_ID int,
@Room_Number int,
@Entry_Date date
as
	DELETE FROM [dbo].[Customers_Rooms] 
	WHERE [Customer_ID] = @Customer_ID and [Room_Number] = @Room_Number and [Entry_Date] = @Entry_Date
go
-- exec DeleteCustomerRoom 111,	3,	'2022-09-08'


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
@Customer_ID int,
@Room_Number int,
@Entry_Date date,
@Exit_Date date,
@Amount_Of_People int,
@Bill_Number int
as
	UPDATE [dbo].[Customers_Rooms]
	SET [Room_Number] = @Room_Number,
	[Exit_Date]=@Exit_Date, 
	[Amount_Of_People] = @Amount_Of_People,
	[Bill_Number] = @Bill_Number
	WHERE [Customer_ID] = @Customer_ID and [Entry_Date] = @Entry_Date 
go

-- exec AlterCustomerRoom 111,2,'2022-09-08','2022-09-14',1,1


--  מביא את החדרים שתאריך היציאה שלהם גדול מהתאריך של היום
--  מצביא על חדרים תפוסים
create proc GetTakenRooms
as
	select * from [dbo].[Customers_Rooms]
	where Exit_Date >= GETDATE() order by [Entry_Date] DESC
go
-- exec GetTakenRooms



--  תביא לי את כול החדרים הפנויים
--  חדר פנוי  -->  חדר שתאריך היציאה שלו עבר כבר, חדר שלא מופיע ברשימה
create proc AvailableRooms
as
	SELECT t1.Room_Number,Room_Type, Price_Per_Night  
	FROM dbo.Rooms t1 LEFT JOIN  dbo.Customers_Rooms t2 
	ON t2.Room_Number = t1.Room_Number
	WHERE t2.Room_Number IS NULL or t2.Exit_Date < GETDATE()
go

-- exec AvailableRooms


-- פרוצדורות חשבון ללקוח
create proc GetAllBill
as
	select * from [dbo].[Bill]
	order by [Bill_Status] desc
go
--exec GetAllBill


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
@Bill_Status nvarchar(30)
as
	insert [dbo].[Bill] 
	values(@Employee_ID, @Customer_ID,@Credit_Card_Number,@Purchase_Date,@Bill_Status)
go

--exec AddNewBill 111,111,'4580266514789456','01/01/2021','Open'
--exec AddNewBill 222,222,'4580266514789456','01/01/2021','Open'
--exec AddNewBill 333,333,'4580266514789456','01/01/2021','Open'
--exec AddNewBill 444,444,'4580266514789456','01/01/2021','Open'
--exec AddNewBill 555,555,'4580266514789456','12/09/2020','Close'
--exec AddNewBill 666,444,'4580266514789456','23/09/2020','Close'



create proc AlterBill
@Bill_Number int,
@Employee_ID int,
@Customer_ID int,
@Room_Number int,
@Credit_Card_Number nvarchar(12),
@Purchase_Date date,
@Bill_Status nvarchar(30)
as
	UPDATE [dbo].[Bill]
	SET Employee_ID = @Employee_ID,
	Customer_ID=@Customer_ID, 
	Room_Number = @Room_Number,
	Credit_Card_Number = @Credit_Card_Number,
	Purchase_Date = @Purchase_Date,
	Bill_Status = @Bill_Status
	WHERE Bill_Number = @Bill_Number 
go
--exec AlterBill 1,111,111,1,'4580266514789456','01/01/2021','Open'
--exec AlterBill 2,222,222,2,'4580266514789456','01/01/2021','Open'
--exec AlterBill 3,333,333,3,'4580266514789456','01/01/2021','Open'
--exec AlterBill 4,444,444,4,'4580266514789456','01/01/2021','Open'
--exec AlterBill 5,555,555,5,'4580266514789456','12/09/2020','Close'


create proc DeletBill
@Bill_Number int,
@Customer_ID int,
@Room_Number int
as
	DELETE FROM [dbo].[Bill] 
	WHERE Bill_Number = @Bill_Number or (Customer_ID = @Customer_ID and Room_Number = @Room_Number)
go

-- exec DeletBill 1,222,1


--  פרוצדורות פרטי רכישות
create proc GetAllBill_Details
as
	select * from [dbo].[Bill_Details]
go
-- exec GetAllBill_Details


create proc GetBill_DetailsByNumber
@Bill_Number int
as
	select * from [dbo].[Bill_Details]
	where Bill_Number = @Bill_Number
go
-- exec GetAllBill_DetailsByNumber 1



create proc AddNewBill_Detail
@Bill_Number int,
@Product_Code int,
@Amount int,
@Purchase_Date date,
@Purchase_Time time
as
	insert [dbo].[Bill_Details]
	values (@Bill_Number, @Product_Code, @Amount,@Purchase_Date,@Purchase_Time)
go

--exec AddNewBill_Detail 1,2,6,'12/12/2022','13:00'
--exec AddNewBill_Detail 4,3,6,'03/12/2022','16:00'
--exec AddNewBill_Detail 3,1,6,'12/12/2022','21:00'
--exec AddNewBill_Detail 5,1,10,'12/12/2022','21:00'
--exec AddNewBill_Detail 6,5,2,'12/12/2022','21:00'
--exec AddNewBill_Detail 3,1,3,'12/12/2022','21:00'
--exec AddNewBill_Detail 3,6,1,'12/12/2022','21:00'
--exec AddNewBill_Detail 6,5,2,'13/01/2022','21:00'


create proc DeletBill_Detail
@Product_Code int,
@Amount int,
@Purchase_Date date,
@Purchase_Time time
as
	DELETE FROM [dbo].[Bill_Details] 
	WHERE Product_Code = @Product_Code and @Amount = @Amount 
	and Purchase_Date = @Purchase_Date and Purchase_Time = @Purchase_Time
go

-- exec DeletBill_Detail 2,6,'12/12/2022','13:00'



create proc AlterBill_Detail
@Bill_Number int,
@Product_Code int,
@Amount int,
@Purchase_Date date,
@Purchase_Time time
as
	UPDATE [dbo].[Bill_Details]
	SET Bill_Number = @Bill_Number , Product_Code = @Product_Code, 
	Amount = @Amount , Purchase_Date = @Purchase_Date , Purchase_Time = @Purchase_Time
	WHERE Bill_Number = @Bill_Number and Product_Code = @Product_Code
go
-- exec AlterBill_Detail 2,2,6, '12/12/2022','13:00'


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


create proc Room_Resit
@ID int
as
	SELECT dbo.Customers_Rooms.Bill_Number, dbo.Bill.Customer_ID, dbo.Customers_Rooms.Room_Number, 
	dbo.Rooms.Room_Type, dbo.Rooms.Price_Per_Night, dbo.Customers_Rooms.Entry_Date,dbo.Customers_Rooms.Exit_Date,
	(SELECT DATEDIFF(day, dbo.Customers_Rooms.Entry_Date, dbo.Customers_Rooms.Exit_Date)) as Number_Of_Nights,
	dbo.Customers_Rooms.Amount_Of_People, 
	(SELECT DATEDIFF(day, dbo.Customers_Rooms.Entry_Date, dbo.Customers_Rooms.Exit_Date) * dbo.Rooms.Price_Per_Night) as Sum_Total,
	dbo.Bill.Credit_Card_Number, dbo.Bill.Purchase_Date,dbo.Bill.Bill_Status
	FROM dbo.Customers_Rooms INNER JOIN dbo.Bill 
	ON dbo.Customers_Rooms.Bill_Number = dbo.Bill.Bill_Number INNER JOIN dbo.Rooms 
	ON dbo.Customers_Rooms.Room_Number = dbo.Rooms.Room_Number
	WHERE  (dbo.Bill.Customer_ID = @ID)
	GROUP BY dbo.Customers_Rooms.Bill_Number, dbo.Bill.Customer_ID, dbo.Customers_Rooms.Room_Number, dbo.Rooms.Room_Type, dbo.Rooms.Price_Per_Night, dbo.Customers_Rooms.Entry_Date, dbo.Customers_Rooms.Exit_Date, dbo.Customers_Rooms.Amount_Of_People, dbo.Bill.Credit_Card_Number, dbo.Bill.Purchase_Date, dbo.Bill.Bill_Status
	order by dbo.Bill.Bill_Status desc
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
	SELECT Start_Date, count(Start_Date) FROM Employees_Tasks GROUP by Start_Date
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


create proc GetAvailableRooms
as
	SELECT dbo.Rooms.Room_Number, dbo.Rooms.Room_Type, dbo.Rooms.Price_Per_Night,  dbo.Rooms.Details, dbo.Customers_Rooms.Exit_Date
	FROM dbo.Customers_Rooms INNER JOIN dbo.Rooms 
	ON dbo.Customers_Rooms.Room_Number = dbo.Rooms.Room_Number
	WHERE  (dbo.Customers_Rooms.Exit_Date <= GETDATE())
	GROUP BY dbo.Rooms.Room_Number, dbo.Rooms.Room_Type, dbo.Rooms.Price_Per_Night,dbo.Rooms.Details, dbo.Customers_Rooms.Exit_Date
	order by dbo.Customers_Rooms.Exit_Date desc
go

--exec GetAvailableRooms


