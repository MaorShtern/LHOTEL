

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
	Price_Per_Unit DECIMAL(10,2) NOT NULL,
	Amount int NOT NULL,
	Purchase_Date Date NOT NULL,
	Sum_Total DECIMAL(10,2) NOT NULL,
	CONSTRAINT [Fk_Purchase_Of_Goods] FOREIGN KEY (Product_Code) REFERENCES Products (Product_Code),
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
	Credit_Card_Number nvarchar(16),
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


 
create table Bill
(
	Bill_Number int identity(1,1) NOT NULL,
	Customer_ID int NOT NULL,
	Bill_Date Date NOT NULL,
	Employee_ID int,
	Credit_Card_Number nvarchar(16),
	Bill_Status nvarchar(10) NOT NULL,
	CONSTRAINT [PK_Bill_Number1] PRIMARY KEY (Bill_Number,Customer_ID,Bill_Date),
	CONSTRAINT [Fk_Employee_ID2] FOREIGN KEY (Employee_ID) REFERENCES Employees (Employee_ID),
	CONSTRAINT [Fk_Customer_ID] FOREIGN KEY (Customer_ID) REFERENCES Customers (Customer_ID)
)
go


--select * from [dbo].[Employees_Types]

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



create table Customers_Rooms
(
    Room_Number int NOT NULL,
	Bill_Number int ,
	Customer_ID int NOT NULL,
	Bill_Date Date NOT NULL,
	Entry_Date Date NOT NULL,
	Exit_Date Date NOT NULL,
	Amount_Of_People int NOT NULL,
	Room_Status nvarchar(30) NOT NULL,
	CONSTRAINT [PK_Room_Number2] PRIMARY KEY (Room_Number),
	CONSTRAINT [Fk_Room_Number] FOREIGN KEY (Room_Number) REFERENCES Rooms (Room_Number),
	CONSTRAINT [Fk_Bill_Number3] FOREIGN KEY (Bill_Number,Customer_ID,Bill_Date) REFERENCES Bill (Bill_Number,Customer_ID,Bill_Date),
)
go


create table Bill_Details
(
	Bill_Number int NOT NULL,
	Customer_ID int NOT NULL,
	Bill_Date Date NOT NULL,
	Room_Number int NOT NULL,
	Purchase_Date Date NOT NULL,
	Product_Code int NOT NULL,
	Amount int NOT NULL,
	Purchase_Time time,
	Payment_Method nvarchar(20) NOT NULL,
	CONSTRAINT [Fk_Product_Code] FOREIGN KEY (Product_Code) REFERENCES Products (Product_Code),
	CONSTRAINT Room_Number FOREIGN KEY (Room_Number) REFERENCES Customers_Rooms (Room_Number)
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



create table Employees_Tasks
(
	Task_Code int identity(1,1) NOT NULL,
	Employee_ID int,
	Task_Number int,
	Room_Number int,
	Start_Date Date  NOT NULL,
    Start_Time Time  NOT NULL,
	End_Time Time ,
	Task_Status nvarchar(30),
	Description NVARCHAR(100),
	CONSTRAINT [PK_Employee_ID2] PRIMARY KEY (Employee_ID,Task_Number,Start_Date,Start_Time),
	CONSTRAINT [Fk_Employee_ID] FOREIGN KEY (Employee_ID,Start_Date) REFERENCES Shifts (Employee_ID,Date),
	CONSTRAINT [Fk_Task_Number] FOREIGN KEY (Task_Number) REFERENCES Tasks_Types (Task_Number),
	CONSTRAINT [Fk_Employees_Tasks_Room_Number] FOREIGN KEY (Room_Number)
	REFERENCES Rooms ([Room_Number])
)
go
--222	7	2022-02-02	13:12:00.0000000	2022-02-03	Open	Clean the counter is filthy
--222	7	2022-08-17	13:00:00.0000000	2022-03-02	Open	Clean the counter is filthy
--333	1	2022-02-02	13:10:00.0000000	2022-02-03	Close	Room cleaning 21
--444	2	2022-02-02	13:05:00.0000000	2022-02-03	Open	Schnitzel, chips and coke for 
--555	4	2022-02-02	13:07:00.0000000	2022-02-03	Close	Mini bar filling for room 10
--777	3	2022-02-02	13:08:00.0000000	2022-02-03	Open	Room 15 request dry towels
--888	6	2022-02-02	13:12:00.0000000	2022-02-03	Close	A customer requests to check o


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


--=================================================================================================================================================
                                                --פרוצדורות
--=================================================================================================================================================

-- פרוצדורות עובדים

-------------------------------------------
create proc GetAllEmployees
as
	begin tran
		SELECT dbo.Employees.Employee_ID, dbo.Employees_Types.Description, dbo.Employees.Employee_Name,
		dbo.Employees.Phone_Number, dbo.Employees.Birth_Date, dbo.Employees.Hourly_Wage, 
		dbo.Employees.Address, dbo.Employees.Employee_Code
		FROM dbo.Employees INNER JOIN dbo.Employees_Types 
		ON dbo.Employees.Worker_Code = dbo.Employees_Types.Worker_Code
		GROUP BY dbo.Employees.Employee_ID, dbo.Employees_Types.Description,
		dbo.Employees.Employee_Name, dbo.Employees.Phone_Number, dbo.Employees.Birth_Date, 
		dbo.Employees.Hourly_Wage, dbo.Employees.Address, dbo.Employees.Employee_Code
	if (@@error !=0)
		begin
			rollback tran
			print 'error'
			return
		end
	commit tran
go
--exec GetAllEmployees


create proc GetEmployeeByIdAndCode
@id int,
@code int
as
begin tran

SELECT dbo.Employees.Employee_ID, dbo.Employees.Employee_Code, dbo.Employees.Employee_Name, 
dbo.Employees.Phone_Number, dbo.Employees.Birth_Date, dbo.Employees.Worker_Code, 
dbo.Employees_Types.Description as Role, dbo.Employees.Hourly_Wage, dbo.Employees.Address
FROM     dbo.Employees INNER JOIN
                  dbo.Employees_Types ON dbo.Employees.Worker_Code = dbo.Employees_Types.Worker_Code
				  where dbo.Employees.Employee_ID = @id and dbo.Employees.Employee_Code = @code
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetEmployeeByIdAndCode 888 , 8
--select * from Employees



create proc InsertEmployee 
@id int, 
@name nvarchar(30),
@phoneNumber nvarchar(30),
@birthDate Date, 
@role nvarchar(30), 
@hourly_Wage int, 
@address nvarchar(30)
as
begin tran
	declare @dateResult as date  = convert(date, @birthDate, 103) 
	declare @worker_Code as int = (select [Worker_Code] from [dbo].[Employees_Types]
	where [Description] = @role)
	insert  [dbo].[Employees] values (@id,@name,@phoneNumber,@dateResult,@worker_Code,@hourly_Wage,@address)
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec InsertEmployee 999,'aaa','0526211881','2022-08-15','Manager',40,'aaa'
--exec InsertEmployee -1,'','','','General',-1,''

--111	Manager	aaa	0526211881	2022-08-15	40	aaa	1
--222	Receptionist	bbb	0526211881	2022-08-15	40	bbb	2
--333	Room service	ccc	0542611881	2022-08-15	40	ccc	3
--444	Room service	ddd	0548937881	2022-08-15	41	ddd	4
--555	Room service	eee	0528057777	2022-08-15	41	eee	5
--666	Manager	fff	0502359678	2022-08-15	41	fff	6
--777	Room service	ggg	0502233344	2022-08-15	41	ggg	7
--888	Receptionist	hhh	0523491528	2022-08-15	41	hhh	8
--999	Manager	cccc	05266666666	2022-08-15	40	hbhjbkjbjk	18
--exec GetAllEmployees


-----------------------------------------------------


create proc AlterEmployee
@id int, 
@name nvarchar(30),
@phoneNumber nvarchar(30),
@birthDate date, 
@role nvarchar(30), 
@hourly_Wage int, 
@address nvarchar(30)
as
begin tran

	declare @worker_Code as int = (select [Worker_Code] from [dbo].[Employees_Types]
	where [Description] = @role)
	UPDATE [dbo].[Employees]
	SET [Employee_Name] = @name ,[Phone_Number]= @phoneNumber,[Birth_Date]=@birthDate
	,[Worker_Code]=@worker_Code,[Hourly_Wage]=@hourly_Wage,[Address]=@address
	WHERE [Employee_ID] = @id
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec AlterEmployee 999,'ccc','0563211948','2022 - 08 - 15','Manager',40,'dgdbbd'




---------------------------------------------------------
---  יהיה צורך למחוק אות מהטבלה "משמרות ו"משימות" ף
create proc DeleteEmployeeById
@id int
as
begin tran
	delete FROM [Employees] WHERE [Employee_ID] = @id
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
	--DECLARE @RowCount1 INTEGER
 --   DECLARE @RowCount2 INTEGER
 --   DECLARE @RowCount3 INTEGER

	--DELETE FROM Employees_Tasks WHERE [Employee_ID] = @id
	--SELECT @RowCount1 = @@ROWCOUNT
	--DELETE FROM Bill WHERE [Employee_ID] = @id
	--SELECT @RowCount2 = @@ROWCOUNT
	--DELETE FROM Employees WHERE [Employee_ID] = @id
	--SELECT @RowCount3 = @@ROWCOUNT
	--SELECT @RowCount1 + @RowCount2 + @RowCount3 AS Result
go
--exec DeleteEmployeeById 999
--exec GetAllEmployees
--exec GetAllTasks




-- פרוצדורות לקוחות
----------------------------------------------
create proc GetAllCustomers
as
begin tran
select * from [dbo].[Customers]	
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec GetAllCustomers
-- exec DeleteCustomerById 999 


-------------------------------------------
create proc GetCustomerById 
@id int
as
begin tran
	select * from [dbo].[Customers] where [Customer_ID] = @id
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetCustomerById 10


create proc GetCustomerByMailAndPassword
@Mail nvarchar(100),
@Password nvarchar(30) 
as
begin tran
		select * from [dbo].[Customers] 
		where Mail = @Mail and Password = @Password
		if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

-- exec GetCustomerByMailAndPassword 'ccc@gmail.com','ccc'


create proc GetCustomerByIDAndMail
@id int,
@Mail nvarchar(100)
as
begin tran
	select * from [dbo].[Customers] 
	where Mail = @Mail and Customer_ID = @id
		if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetCustomerByIDAndMail 10 , 'ggggg@gmail.com'



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
begin tran
	insert [dbo].[Customers] values (@id ,@Customer_Type,@First_Name,@Last_Name,@Mail,@Password,@Phone_Number
	,@Card_Holder_Name,@Credit_Card_Date,@Three_Digit,@Credit_Card_Number)
		if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
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
begin tran
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
		if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
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
@Credit_Card_Number nvarchar(16)
as
begin tran
	UPDATE [dbo].[Customers]
	SET 	
	[Card_Holder_Name] =@Card_Holder_Name, 
	[Credit_Card_Date]=@Credit_Card_Date,
	[Three_Digit]=@Three_Digit,
	[Credit_Card_Number] = @Credit_Card_Number
	WHERE [Customer_ID] = @id
		if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec UpdateCustomerCredit 999,'mmm','02/28',123,'21312'


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
begin tran
		select * from [dbo].[Category]
		if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec GetCategory

---------------------------------------------
create proc AddNewCategory
@Category_Number int,
@Description nvarchar(30)
as
begin tran
	insert [dbo].[Category] values(@Category_Number,@Description)
		if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec AddNewCategory 1,'sweet drink'
--exec AddNewCategory 2,'Alcohol'
--exec AddNewCategory 3,'Snacks'


-----------------------------------------------
create proc AlterCategory
@Category_Number int,
@Description nvarchar(30)
as
begin tran
update [dbo].[Category]
	set Description = @Description
	where Category_Number = @Category_Number
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec AlterCategory 1,'Sweet Drink'



-- פרוצדורות מוצרים
create proc GetAllProducts
as
begin tran
	select * from [dbo].[Products]
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetAllProducts


create proc GetProductById
@id int
as
	begin tran
	select * from dbo.Products where Products.Product_Code = @id
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetProductById 7


create proc AddNewProduct
@Category_Number int,
@Description nvarchar(30) ,
@Price_Per_Unit int ,
@Discount_Percentage int
as
begin tran
	Insert [dbo].[Products] Values (@Category_Number,@Description,@Price_Per_Unit,@Discount_Percentage)
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec AddNewProduct 1,'Coca cola',15,0
--exec AddNewProduct 2,'Vodka',35,0
--exec AddNewProduct 3,'Doritos',20,0
--exec AddNewProduct 3,'Doritos',20,50
--exec AddNewProduct 1,'Sprite',15,15
--exec AddNewProduct 2,'Whiskey',45,0
--exec AddNewProduct 3,'Doritos',20,0

----------------------------------------------
create proc AlterProductById
@id int,
@Description nvarchar(30) ,
@Price_Per_Unit int ,
@Discount_Percentage int
as
begin tran
	UPDATE [dbo].[Products]
	SET [Description] = @Description,
	[Price_Per_Unit]=@Price_Per_Unit,
	[Discount_Percentage] = @Discount_Percentage
	WHERE [Product_Code] = @id
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec AlterProductById 1,'Coca cola',15,50


-----------------------------------------------------
create proc DeleteProductById
@id int
as
begin tran
		DELETE FROM [dbo].[Products] WHERE [Product_Code] = @id
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec DeleteProductById 2



---  פרוצדורות רכישות הספקה
create proc GetAllPurchase_Of_Goods
as
begin tran
select * from [dbo].[Purchase_Of_Goods]
	order by [Purchase_Date] desc
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec GetAllPurchase_Of_Goods


create proc GetPurchase_Of_Goods_ByCode
@Code int
as
	begin tran
	select * from [dbo].[Purchase_Of_Goods]
	where [Product_Code] = @Code
	order by [Purchase_Date] desc
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

-- exec GetPurchase_Of_Goods_ByCode 1 


create proc AddNewPurchase_Of_Goods
@Product_Code int,
@Price_Per_Unit decimal(10,2),
@Amount int,
@Purchase_Date date
as
begin tran
declare @Sum_Total as decimal(10,2) = @Price_Per_Unit * @Amount
	insert [dbo].[Purchase_Of_Goods] 
	values(@Product_Code , @Price_Per_Unit , @Amount, @Purchase_Date , @Sum_Total)
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec AddNewPurchase_Of_Goods 1,7.5,100,'07/07/2022'
--exec AddNewPurchase_Of_Goods 2,25,230,'07/07/2022'
--exec AddNewPurchase_Of_Goods 3,10,300,'07/07/2022'
--exec AddNewPurchase_Of_Goods 4,15,50,'07/07/2022'
--exec AddNewPurchase_Of_Goods 5,9,76,'07/07/2022'
--exec AddNewPurchase_Of_Goods 6,30,89,'07/07/2022'
--exec AddNewPurchase_Of_Goods 7,10,191,'07/07/2022'



create proc AlterPurchase_Of_Goods
@Product_Code int,
@Price_Per_Unit decimal(10,2),
@Amount int,
@Purchase_Date date
as
begin tran
	declare @Sum_Total as decimal(10,2) = @Price_Per_Unit * @Amount
	update [dbo].[Purchase_Of_Goods]
	set [Product_Code] = @Product_Code ,  [Price_Per_Unit] = @Price_Per_Unit,
	[Amount] = @Amount , [Purchase_Date] = @Purchase_Date, [Sum_Total] = @Sum_Total
	where [Product_Code] = @Product_Code
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec AlterPurchase_Of_Goods 1,1,8,200,'07/07/2022'


create proc DeletePurchase_Of_Goods
@Product_Code int,
@Purchase_Date date
as
begin tran
	delete from [dbo].[Purchase_Of_Goods] 
	where [Product_Code] = @Product_Code and [Purchase_Date] = @Purchase_Date
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec DeletePurchase_Of_Goods 1 ,'07/07/2022'



--  פרוצדורות חדרים 
----------------------------------------
create proc GetAllRooms
as
begin tran
	select * from [dbo].[Rooms]
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go 
-- exec GetAllRooms


------------------------------------
create proc GetRoomById
@id int
as
begin tran
	select * from [dbo].[Rooms] where [Room_Number] = @id
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec GetRoomById 1


create proc AddNewRoom
@Room_Type nvarchar(30),
@Price_Per_Night int,
@Details NVARCHAR(100)
as
	begin tran
	Insert [dbo].[Rooms] Values (@Room_Type,@Price_Per_Night,@Details)
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
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


--drop proc AlterRoomById
--alter proc AlterRoomById
--@Room_Number int,
--@Customer_ID int,
--@Status NVARCHAR(30)
--as
--	begin tran
--	UPDATE [dbo].[Rooms]
--	SET  [Customer_ID] = @Customer_ID , [Status] = @Status
--	WHERE [Room_Number] = @Room_Number
--	if (@@error !=0)
--	begin
--		rollback tran
--		print 'error'
--		return
--	end
--commit tran
--go
--exec AlterRoomById 5,null,'Available'


--drop proc DeleteRoomById
--create proc DeleteRoomById
--@Room_Number int
--as
--	DELETE FROM [dbo].[Rooms] WHERE [Room_Number] = @Room_Number
--go
-- exec DeleteRoomById 1


---  פרוצדורות טבלת משמרות
create proc GetAllShifts
as
begin tran
	SELECT dbo.Shifts.Employee_ID, dbo.Shifts.Employee_Code, dbo.Employees_Types.Description,
	dbo.Shifts.Date, CONVERT(VARCHAR(5), dbo.Shifts.Entrance_Time, 108) AS Entrance_Time,
	CONVERT(VARCHAR(5), dbo.Shifts.Leaving_Time, 108) AS Leaving_Time
	FROM  dbo.Shifts INNER JOIN dbo.Employees_Types 
	ON dbo.Shifts.Worker_Code = dbo.Employees_Types.Worker_Code
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetAllShifts
 --CONVERT(VARCHAR(5), dbo.Shifts.Entrance_Time, 108) AS Entrance_Time 




create proc GetWorkersOnShift
as
begin tran
	SELECT dbo.Shifts.Employee_ID, dbo.Shifts.Employee_Code, dbo.Employees_Types.Description,
	dbo.Shifts.Date, CONVERT(VARCHAR(5), dbo.Shifts.Entrance_Time, 108) AS Entrance_Time,
	CONVERT(VARCHAR(5), dbo.Shifts.Leaving_Time, 108) AS Leaving_Time
	FROM  dbo.Shifts INNER JOIN dbo.Employees_Types 
	ON dbo.Shifts.Worker_Code = dbo.Employees_Types.Worker_Code
	where dbo.Shifts.Date =	 FORMAT(getdate(), 'yyyy-MM-dd') and  dbo.Shifts.Leaving_Time is null
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec GetWorkersOnShift



 
create proc ClockIn
@Employee_ID int
as
begin tran
	DECLARE @Employee_Code int=(select Employee_Code  from Employees 
	where Employee_ID = @Employee_ID)
	DECLARE @Worker_Code int =(select Worker_Code from Employees 
	where Employee_ID = @Employee_ID)
	insert [dbo].[Shifts] values (@Employee_ID,@Employee_Code,@Worker_Code,getdate(),
	(select convert(varchar, getdate(), 120)),null)
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
exec GetShifts
--exec ClockIn 111
--exec ClockIn 222
--exec ClockIn 333
--exec ClockIn 444
--exec ClockIn 555
--exec ClockIn 666
--exec ClockIn 777
--exec ClockIn 888
--exec ClockIn -1


create proc DeleteShift
@Employee_ID int,
@Entrance_Time datetime 
as
begin tran
	delete from [dbo].[Shifts]
	where Employee_ID = @Employee_ID and Entrance_Time = @Entrance_Time
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec DeleteShift 111,'2022-08-23 02:16:12.000'




create proc ClockOut
@Employee_ID int
as
begin tran
	update [dbo].[Shifts]
	set [Leaving_Time] = (SELECT CONVERT(VARCHAR(8), GETDATE(), 108))
	where Employee_ID = @Employee_ID and [Leaving_Time] IS NULL
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec ClockOut 111 
-- select * from [dbo].[Shifts]



--  פרוצדורות משימות
create proc GetAllTasks
as
begin tran
SELECT dbo.Employees_Tasks.Task_Code, dbo.Employees_Tasks.Employee_ID, dbo.Tasks_Types.Task_Name, dbo.Employees_Tasks.Room_Number, dbo.Employees_Tasks.Start_Date, dbo.Employees_Tasks.Start_Time, 
                  dbo.Employees_Tasks.End_Time, dbo.Employees_Tasks.Task_Status, dbo.Employees_Tasks.Description
FROM     dbo.Tasks_Types INNER JOIN
                  dbo.Employees_Tasks ON dbo.Tasks_Types.Task_Number = dbo.Employees_Tasks.Task_Number
GROUP BY dbo.Employees_Tasks.Task_Code, dbo.Employees_Tasks.Employee_ID, dbo.Tasks_Types.Task_Name, dbo.Employees_Tasks.Room_Number, dbo.Employees_Tasks.Start_Date, dbo.Employees_Tasks.Start_Time, 
                  dbo.Employees_Tasks.End_Time, dbo.Employees_Tasks.Task_Status, dbo.Employees_Tasks.Description
	order by dbo.Employees_Tasks.Task_Status desc
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec GetAllTasks



create proc GetTask_ByCode
@code int
as
begin tran
	SELECT dbo.Employees_Tasks.Task_Code, dbo.Employees_Tasks.Employee_ID, dbo.Tasks_Types.Task_Name, dbo.Employees_Tasks.Room_Number, dbo.Employees_Tasks.Start_Date, dbo.Employees_Tasks.Start_Time, 
                  dbo.Employees_Tasks.End_Time, dbo.Employees_Tasks.Task_Status, dbo.Employees_Tasks.Description
FROM     dbo.Tasks_Types INNER JOIN
                  dbo.Employees_Tasks ON dbo.Tasks_Types.Task_Number = dbo.Employees_Tasks.Task_Number

where dbo.Employees_Tasks.Task_Code = @code

GROUP BY dbo.Employees_Tasks.Task_Code, dbo.Employees_Tasks.Employee_ID, dbo.Tasks_Types.Task_Name, dbo.Employees_Tasks.Room_Number, dbo.Employees_Tasks.Start_Date, dbo.Employees_Tasks.Start_Time, 
                  dbo.Employees_Tasks.End_Time, dbo.Employees_Tasks.Task_Status, dbo.Employees_Tasks.Description
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetAllTasks
-- exec GetTask_ByCode 2




create proc GetTask_ById
@id int
as
begin tran
	SELECT dbo.Employees_Tasks.Task_Code, dbo.Employees_Tasks.Employee_ID, dbo.Tasks_Types.Task_Name, dbo.Employees_Tasks.Room_Number, dbo.Employees_Tasks.Start_Date, dbo.Employees_Tasks.Start_Time, 
                  dbo.Employees_Tasks.End_Time, dbo.Employees_Tasks.Task_Status, dbo.Employees_Tasks.Description
FROM     dbo.Tasks_Types INNER JOIN
                  dbo.Employees_Tasks ON dbo.Tasks_Types.Task_Number = dbo.Employees_Tasks.Task_Number

where  dbo.Employees_Tasks.Employee_ID = @id

GROUP BY dbo.Employees_Tasks.Task_Code, dbo.Employees_Tasks.Employee_ID, dbo.Tasks_Types.Task_Name, dbo.Employees_Tasks.Room_Number, dbo.Employees_Tasks.Start_Date, dbo.Employees_Tasks.Start_Time, 
                  dbo.Employees_Tasks.End_Time, dbo.Employees_Tasks.Task_Status, dbo.Employees_Tasks.Description
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetAllTasks
-- exec GetTask_ById -1



create proc AddNewTask
@Employee_ID int, 
@Task_Name nvarchar(30),
@Room_Number int,
@Description nvarchar(30)
as
begin tran
	declare @Date as date = (SELECT FORMAT (getdate(), 'yyyy-MM-dd'))
	declare @number int = (select [Task_Number] from [dbo].[Tasks_Types]where [Task_Name] = @Task_Name)
	if EXISTS( select [Employee_ID],[Date],[Entrance_Time] from [dbo].[Shifts]
	where [Employee_ID] = @Employee_ID and [Date] = @Date and [Leaving_Time] is null )
	begin
		insert [dbo].[Employees_Tasks]
		values (@Employee_ID,@number,@Room_Number , (select getdate()),
		(SELECT CONVERT(VARCHAR(8), GETDATE(), 108)),null,'Open', 'dfbdbd')
	end
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
 --exec AddNewTask -1,'Room Cleaning',23, 'chips and coke for room 23'
 -- exec AddNewTask -1,'Room Cleaning',23, 'chips and coke for room 23'
-- -1	4	Refill mini bar	2022-08-28	03:15:50.0000000	NULL	Open	dfbdbd
--444	4	Refill mini bar	2022-08-26	03:08:23.0000000	NULL	Open	dfbdbd
--444	4	Refill mini bar	2022-08-26	03:08:51.0000000	NULL	Open	dfbdbd

--exec GetAllTasks
-- select * from [dbo].[Shifts]
--insert [dbo].[Employees_Tasks]
--		values (-1,4,'2022-08-28',(SELECT CONVERT(VARCHAR(8), GETDATE(), 108))
--		,null,'Open', 'dfbdbd')



create proc AlterTask
@Employee_ID int, 
@Task_Number int,
@Start_Date date,
@Start_Time time(7) ,
@End_Date time(7),
@Task_Status nvarchar(30),
@Description nvarchar(30)
as
begin tran
	UPDATE [dbo].[Employees_Tasks]
	SET 
	[End_Time]=@End_Date,[Task_Status]=@Task_Status,[Description]=@Description
	WHERE [Employee_ID] = @Employee_ID and [Task_Number]=@Task_Number and [Start_Date]=@Start_Date 
	and [Start_Time]=@Start_Time
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

-- exec AlterTask 222,7,'02/02/2022','13:00','03/02/2022','Close','Clean the counter is filthy'


create proc DeleteTask
@Employee_ID int, 
@Task_Number int,
@Start_Date date,
@Start_Time time(7)
as
begin tran
	delete from [dbo].[Employees_Tasks]
	where [Employee_ID] = @Employee_ID and [Task_Number]=@Task_Number
	and [Start_Date]=@Start_Date and [Start_Time]=@Start_Time
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--select * from [Employees_Tasks]
 --exec DeleteTask 222,7,'2022-08-23','07:00:10.0000000'
 --exec DeleteTask 222,7,'2022-08-23','06:55:10.0000000'
 --exec DeleteTask 222,7,'2022-08-23','06:57:00.0000000'


create proc CloseTask
@Employee_ID int, 
@Task_Number int,
@Start_Date date,
@Start_Time time(7)
as
begin tran
	UPDATE [dbo].[Employees_Tasks]
	SET 
	[Task_Status]='Close'
	WHERE [Employee_ID] = @Employee_ID and [Task_Number]=@Task_Number and [Start_Date]=@Start_Date 
	and [Start_Time]=@Start_Time
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec CloseTask 222, 7 ,'2022-08-23','07:03:33.0000000'
--select * from [dbo].[Employees_Tasks]


-- פרוצדורות חשבון ללקוח
---------------------------------------------------
create proc GetAllBills
as
begin tran	
	select * from [dbo].[Bill]
	order by [Bill_Status] desc
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetAllBills
--exec GetAllEmployees


--------------------------------------------------
create proc  GetBillByNumber
@Bill_Number int
as
begin tran	
	select * from [dbo].[Bill]
	where Bill_Number = @Bill_Number
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec GetBillByNumber 1 


create proc AddNewBill 
@Employee_ID int,
@Customer_ID int,
@Credit_Card_Number nvarchar(16),
@Bill_Date date,
@Bill_Status nvarchar(10)
as
begin tran	
	insert [dbo].[Bill] 
	values( @Customer_ID,@Bill_Date,@Employee_ID,@Credit_Card_Number,@Bill_Status)
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec AddNewBill 111,'2022-08-22',111,'4580266514789456','Open'



create proc AlterBill
@Customer_ID int,
@Bill_Date date,
@Employee_ID int,
@Credit_Card_Number nvarchar(16),
@Bill_Status nvarchar(10)
as
begin tran	
	UPDATE [dbo].[Bill]
	SET Employee_ID = @Employee_ID,
	Credit_Card_Number = @Credit_Card_Number,
	Bill_Status = @Bill_Status
	where Customer_ID=@Customer_ID and Bill_Date = @Bill_Date
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetAllBills
-- exec AlterBill 444,'2021-01-01',444,'4580266514789456','Open'



-----------------------------------------------
create proc DeleteBill
@Bill_Number int,
@Customer_ID int,
@Bill_Date date,
@Credit_Card_Number nvarchar(16)
as
begin tran	
		DELETE FROM [dbo].[Bill] 
	WHERE Bill_Number = @Bill_Number and Customer_ID = @Customer_ID 
	and Credit_Card_Number = @Credit_Card_Number and Bill_Date = @Bill_Date
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec DeleteBill 14,111,'01/01/2021','4580266514789456'
--exec DeleteBill 15,222,'01/01/2021','4580266514789456'
--exec DeleteBill 16,333,'01/01/2021','4580266514789456'
--exec DeleteBill 17,444,'01/01/2021','4580266514789456'
--exec DeleteBill 18,555,'12/09/2020','4580266514789456'
--exec DeleteBill 19,444,'23/09/2020','458026651478'
--exec DeleteBill 20,666,'2022-10-08','458026651478'
--exec DeleteBill 21,888,'2022-12-06','458026651478'
--exec DeleteBill 22,666,'2021-10-07','458026651478'
--exec DeleteBill 23,888,'2022-12-05','458026651478'


--  פרוצדורות חדרים שמורים ללקוחות
-------------------------------------------------
create proc GetCustomersRooms
as
begin tran	
	select * from [dbo].[Customers_Rooms] order by [Entry_Date] DESC
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec GetCustomersRooms


create proc AddNewCustomerRooms
@Room_Number int,
@Bill_Number int,
@Customer_ID int,
@Bill_Date date,
@Entry_Date date,
@Exit_Date date,
@Amount_Of_People int,
@Room_Status nvarchar(30)
as
	begin tran
		insert [dbo].[Customers_Rooms] 
			values(@Room_Number,@Bill_Number,@Customer_ID,@Bill_Date,@Entry_Date,@Exit_Date,@Amount_Of_People,@Room_Status)
	if(@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
	commit tran
go

--exec AddNewCustomerRooms 2,2,222,'2021-01-01','2021-01-01','2021-01-03',1,'Occupied'
--exec AddNewCustomerRooms 20,null,888,'2022-12-06','2022-12-06','2022-12-12',2,'Reserved'
--exec AddNewCustomerRooms 3,3,333,'2021-01-01','2021-01-01','2021-01-05',2,'Reserved'
--exec AddNewCustomerRooms 8,8,888,'2022-12-06','2022-12-06','2022-12-09',8,'Occupied'
--exec AddNewCustomerRooms 5,5,555,'2020-09-12','2020-09-12','2020-09-16',2,'Reserved'
--exec AddNewCustomerRooms 7,7,666,'2022-10-08','2022-10-08','2022-10-15',4,'Occupied'



create proc DeleteCustomerRoom
@Customer_ID int,
@Entry_Date date
as
begin tran	
	DELETE FROM [dbo].[Customers_Rooms] 
	WHERE [Customer_ID] = @Customer_ID and Bill_Date = @Entry_Date
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetCustomersRooms
 --exec DeleteCustomerRoom 1,999,'2022-08-22'



create proc FindCustomerRoomByKeys
@Customer_ID int,
@Room_Number int,
@Entry_Date date
as
begin tran	
	select * from [dbo].[Customers_Rooms]
	where [Customer_ID] = @Customer_ID and [Room_Number] = @Room_Number and [Entry_Date] = @Entry_Date
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

-- exec FindCustomerRoomByKeys 111,1,'2022-09-09'


create proc AlterCustomerRoom
@Room_Number int,
@Bill_Number int,
@Customer_ID int,
@Bill_Date date,
@Entry_Date date,
@Exit_Date date,
@Amount_Of_People int,
@Room_Status nvarchar(30)
as
begin tran	
	UPDATE [dbo].[Customers_Rooms]
	SET 
	[Entry_Date] = @Entry_Date ,
	[Exit_Date]=@Exit_Date, 
	[Customer_ID] = @Customer_ID,
	[Bill_Date] =@Bill_Date,
	[Amount_Of_People] = @Amount_Of_People,
	[Bill_Number] = @Bill_Number,
	[Room_Status] = @Room_Status
	WHERE  	[Room_Number] = @Room_Number
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetCustomersRooms
--exec AlterCustomerRoom 20,NULL,888,'2022-09-08','2022-09-08','2022-09-15',2	,'Reserved'




--  מביא את החדרים שתאריך היציאה שלהם גדול מהתאריך של היום
--  מצביא על חדרים תפוסים
create proc GetTakenRooms
as
begin tran	
	select * from [dbo].[Customers_Rooms]
	where [Room_Status] = 'Occupied'
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec GetTakenRooms




--  תביא לי את כול החדרים הפנויים
create FUNCTION AvailableRooms()
returns @Temp TABLE ( Room_Number int ,Room_Type nvarchar(30), Price_Per_Night int, Details nvarchar(100) )                     
as
	begin
		insert @Temp SELECT Room_Number,Room_Type, Price_Per_Night, Details FROM Rooms
		WHERE Room_Number NOT IN (SELECT Room_Number FROM Customers_Rooms)
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
@Credit_Card_Number nvarchar(16),
@Employee_ID int,
@Counter_Single int,
@Counter_Double int,
@Counter_Suite int,
@Entry_Date date,
@Exit_Date date,
@Amount_Of_People int
as
begin tran	
	exec UpdateCustomerCredit @id,@Card_Holder_Name,@Credit_Card_Date,@Three_Digit,@Credit_Card_Number
	DECLARE @Bill_Date as date = (select Bill_Date from Bill where Customer_ID = @id and Bill_Status = 'Open')
	DECLARE @date as date = GETDATE()

	if NOT EXISTS (select * from Bill where Customer_ID = @id and Bill_Status = 'Open')
		exec AddNewBill @Employee_ID, @id,@Credit_Card_Number ,@date,'Open'
	else
		exec AlterBill @id, @Bill_Date ,@Employee_ID, @Credit_Card_Number,'Open'


	set @Bill_Date = (select Bill_Date from Bill where Customer_ID = @id and Bill_Status = 'Open')
	DECLARE @bill_number as int = (select Bill_Number from Bill where Customer_ID = @id and Bill_Status = 'Open')
	DECLARE @room_number as int


	while @Counter_Single > 0
		begin
		set @room_number = (SELECT MIN(Room_Number) AS Room_Number FROM dbo.AvailableRooms() WHERE  Room_Type = 'Single room')
		IF NOT EXISTS(select Room_Number from [dbo].[Customers_Rooms] where Room_Number = @room_number)
			exec AddNewCustomerRooms @room_number, @bill_number,@id,@Bill_Date,@Entry_Date,@Exit_Date,@Amount_Of_People,'Reserved'
		else
			exec AlterCustomerRoom @room_number, @bill_number,@id,@date,@Entry_Date,@Exit_Date,@Amount_Of_People,'Reserved'
		set @Counter_Single = @Counter_Single - 1
		end

	while @Counter_Double > 0
		begin
		set @room_number = (SELECT MIN(Room_Number) AS Room_Number FROM dbo.AvailableRooms() WHERE  Room_Type = 'Double room')
		IF NOT EXISTS(select Room_Number from [dbo].[Customers_Rooms] where Room_Number = @room_number)
	exec AddNewCustomerRooms @room_number, @bill_number,@id,@Bill_Date,@Entry_Date,@Exit_Date,@Amount_Of_People,'Reserved'
		else
			exec AlterCustomerRoom @room_number, @bill_number,@id,@date,@Entry_Date,@Exit_Date,@Amount_Of_People,'Reserved'
		set @Counter_Double = @Counter_Double - 1
		end

	while @Counter_Suite > 0
		begin
		set @room_number = (SELECT MIN(Room_Number) AS Room_Number FROM dbo.AvailableRooms() WHERE  Room_Type = 'Suite')
		IF NOT EXISTS(select Room_Number from [dbo].[Customers_Rooms] where Room_Number = @room_number)
	exec AddNewCustomerRooms @room_number, @bill_number,@id,@Bill_Date,@Entry_Date,@Exit_Date,@Amount_Of_People,'Reserved'
		else
			exec AlterCustomerRoom @room_number, @bill_number,@id,@date,@Entry_Date,@Exit_Date,@Amount_Of_People,'Reserved'
		set @Counter_Suite = @Counter_Suite - 1
		end

	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec SaveRoomReservation 666,'mmm','12/29',912,'4580111133335555',111,1,1,1,'2022-08-22','2022-08-24',5
--select * from Bill
--select * from [dbo].[Customers_Rooms]
--select * from [dbo].[Bill_Details]
    --"id": 666,
    --"Card_Holder_Name": "mmm",
    --"Card_Date": "12/29",
    --"Three_Digit": 912,
    --"Credit_Card_Number": "4580111133335555",
    --"Employee_ID": 111,
    --"Counter_Single" :1,
    --"Counter_Double": 1,
    --"Counter_Suite": 1,
    --"Entry_Date": "2022-08-22",
    --"exitDate": "2022-08-24",
    --"Amount_Of_People": 5 


create trigger AddRoomToDetails
on [Customers_Rooms] for update
as
	if exists (select Room_Number from inserted where [Room_Status] = 'Occupied')
	begin
		insert [dbo].[Bill_Details]
			select Bill_Number, Customer_ID, Bill_Date, Room_Number,Entry_Date,8,1,convert(time,getdate()),'Credit'  
				from inserted
	end
go


--  פרוצדורה עבור צאק אין
create proc CheckIn
@id int,
@entry_date date
as
begin tran	
	UPDATE [dbo].[Customers_Rooms]
	SET 
	[Room_Status] = 'Occupied'
	WHERE  	[Customer_ID] = @id and [Entry_Date] = @entry_date
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec CheckIn 666 , '2022-08-22'
    --"id": 666,
    --"Entry_Date": "2022-08-22"



create proc CheckIn_At_The_Counter
@id int,
@Card_Holder_Name  nvarchar(30),
@Credit_Card_Date nvarchar(5),
@Three_Digit int,
@Credit_Card_Number nvarchar(16),
@Employee_ID int,
@Counter_Single int,
@Counter_Double int,
@Counter_Suite int,
@Entry_Date date,
@Exit_Date date,
@Amount_Of_People int
as
	begin tran	
		exec SaveRoomReservation @id ,@Card_Holder_Name ,@Credit_Card_Date ,@Three_Digit ,@Credit_Card_Number ,@Employee_ID ,@Counter_Single ,@Counter_Double ,@Counter_Suite ,@Entry_Date ,@Exit_Date ,@Amount_Of_People 
		exec CheckIn @id , @Entry_Date
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec CheckIn_At_The_Counter 666,'mmm','12/29',912,'4580111133335555',111,1,1,1,'2022-08-22','2022-08-24',5
--select * from Bill
--select * from [dbo].[Customers_Rooms]
--select * from [dbo].[Bill_Details]



--  פרוצדורת צאק אווט
create proc CheckOut
@id int,
@Bill_Date date
as
begin tran		
	UPDATE [dbo].[Bill] SET Bill_Status = 'Close'
	where Customer_ID=@id and Bill_Date = @Bill_Date and Bill_Status = 'Open'
	exec DeleteBill_Detail @id,@Bill_Date
	exec DeleteCustomerRoom @id , @Bill_Date
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec CheckOut 666, '2022-09-01'



--  פרוצדורות פרטי רכישות
create proc GetAllBill_Details
as
begin tran	
	select * from [dbo].[Bill_Details]
	order by Bill_Date 
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec GetAllBill_Details



create proc GetBill_DetailsByNumber
@Bill_Number int
as
begin tran	
	select * from [dbo].[Bill_Details]
	where Bill_Number = @Bill_Number
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec GetBill_DetailsByNumber 1



create proc AddNewBill_Detail
@id int,
@Room_Number int,
@Product_Dec nvarchar(30),
@Amount int,
@Payment_Method nvarchar(20)
as
begin tran	
		DECLARE @Purchase_Date as date =  GETDATE()

	DECLARE @Purchase_Time as time = (select convert(time, getdate(), 108) )

	DECLARE @bill_number as int = (select Bill_Number from  [dbo].[Customers_Rooms] 
	where [Customer_ID] = @id and Room_Number = @Room_Number)

	DECLARE @bill_date as date = (select Bill_Date from  [dbo].[Customers_Rooms] 
	where [Customer_ID] = @id and Room_Number = @Room_Number)

	DECLARE @Product_Code as int = (select [Product_Code] from [dbo].[Products] where [Description] = @Product_Dec)

	insert [dbo].[Bill_Details]
	values (@bill_number,@id, @bill_date,@Room_Number, @Purchase_Date, @Product_Code, @Amount,@Purchase_Time,@Payment_Method)

	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec AddNewBill_Detail 666,11,'Vodka',6,'Cash'
--exec AddNewBill_Detail 666,11,'Coca cola',9,'Credit'



create proc DeleteBill_Detail
@id int,
@Bill_Date date
as
begin tran		
	DELETE FROM [dbo].[Bill_Details] 
	WHERE [Customer_ID] = @id and Bill_Date = @Bill_Date 
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
-- exec DeleteBill_Detail 666,'2022-08-21'


create proc AlterBill_Detail
@Bill_Number int,
@Product_Code int,
@Amount int,
@Purchase_Date date,
@Purchase_Time time,
@Payment_Method nvarchar(20)
as
begin tran		
	UPDATE [dbo].[Bill_Details]
	SET Bill_Number = @Bill_Number , Product_Code = @Product_Code, 
	Amount = @Amount , [Payment_Method]  = @Payment_Method 
	WHERE Bill_Number = @Bill_Number and Product_Code = @Product_Code
	and Purchase_Date = @Purchase_Date and Purchase_Time = @Purchase_Time
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
 --exec AlterBill_Detail 1,2,10,'2021-12-12','13:00','Cash'




create proc ProductPurchaseByName
@Description nvarchar(30)
as
begin tran		
	SELECT dbo.Bill_Details.Product_Code, dbo.Products.Description, dbo.Category.Description AS Category, dbo.Products.Price_Per_Unit, dbo.Products.Discount_Percentage, sum(dbo.Bill_Details.Amount) as Amount
	FROM     dbo.Bill_Details INNER JOIN dbo.Products 
	ON dbo.Bill_Details.Product_Code = dbo.Products.Product_Code INNER JOIN dbo.Category 
	ON dbo.Products.Category_Number = dbo.Category.Category_Number
	WHERE  (dbo.Products.Description = @Description)
	GROUP BY dbo.Bill_Details.Product_Code, dbo.Products.Description, dbo.Category.Description, dbo.Products.Price_Per_Unit, dbo.Products.Discount_Percentage
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec GetAllProducts
-- exec ProductPurchaseByName 'Coca cola'



create proc Product_Resit
@Bill_Number int
as
begin tran		
SELECT dbo.Bill_Details.Bill_Number, dbo.Bill_Details.Product_Code, dbo.Products.Description, dbo.Products.Price_Per_Unit, dbo.Products.Discount_Percentage, dbo.Bill_Details.Amount, dbo.Bill_Details.Purchase_Date, dbo.Bill_Details.Purchase_Time
	FROM dbo.Bill_Details INNER JOIN dbo.Products 
	ON dbo.Bill_Details.Product_Code = dbo.Products.Product_Code
	WHERE  (dbo.Bill_Details.Bill_Number = @Bill_Number)
	GROUP BY dbo.Bill_Details.Bill_Number, dbo.Bill_Details.Product_Code, dbo.Products.Description, dbo.Products.Price_Per_Unit, dbo.Products.Discount_Percentage, dbo.Bill_Details.Amount, dbo.Bill_Details.Purchase_Date, dbo.Bill_Details.Purchase_Time
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec Product_Resit 3


create proc SumPerProduct
as
begin tran		
SELECT dbo.Bill_Details.Product_Code, dbo.Products.Description, dbo.Category.Description AS Category,
	dbo.Products.Price_Per_Unit, dbo.Products.Discount_Percentage, 
	(select sum(Amount) from Bill_Details where Product_Code = dbo.Bill_Details.Product_Code) as Amount
	FROM dbo.Bill_Details INNER JOIN dbo.Products 
	ON dbo.Bill_Details.Product_Code = dbo.Products.Product_Code INNER JOIN dbo.Category 
	ON dbo.Products.Category_Number = dbo.Category.Category_Number
	GROUP BY dbo.Bill_Details.Product_Code, dbo.Products.Description, dbo.Category.Description, dbo.Products.Price_Per_Unit, dbo.Products.Discount_Percentage
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

-- exec SumPerProduct


create proc Number_of_tasks_per_month
as
begin tran		
	SELECT Start_Date, count(Start_Date) as Amount FROM Employees_Tasks GROUP by Start_Date
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec Number_of_tasks_per_month


create proc Month_with_the_most_reservation
as
begin tran		
	select MONTH(Entry_Date) as Month  from [dbo].[Customers_Rooms] GROUP by Entry_Date
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec Month_with_the_most_reservation


create proc Expenses
as
begin tran		
	select sum([Sum_Total]) from [dbo].[Purchase_Of_Goods]
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

-- exec Expenses


create proc Calu_Rooms_Income
as
begin tran		
	SELECT ((SELECT DATEDIFF(day, dbo.Customers_Rooms.Entry_Date,  dbo.Customers_Rooms.Exit_Date)) * dbo.Rooms.Price_Per_Night) AS Sum_Total
	FROM dbo.Customers_Rooms INNER JOIN dbo.Rooms 
	ON dbo.Customers_Rooms.Room_Number = dbo.Rooms.Room_Number
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec Calu_Rooms_Income


create proc Calu_Products_Income
as
begin tran		
	SELECT ((SELECT DATEDIFF(day, dbo.Customers_Rooms.Entry_Date,  dbo.Customers_Rooms.Exit_Date)) * dbo.Rooms.Price_Per_Night) AS Sum_Total
	FROM dbo.Customers_Rooms INNER JOIN dbo.Rooms 
	ON dbo.Customers_Rooms.Room_Number = dbo.Rooms.Room_Number
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go

--exec Calu_Products_Income






create proc Room_Resit
@id int
as
begin tran		

  declare @bill_number as int = (select [Bill_Number] from Bill 
  where Customer_ID = @id and Bill_Status = 'Open')


SELECT dbo.Bill_Details.Bill_Number, dbo.Bill_Details.Customer_ID, dbo.Bill_Details.Bill_Date, dbo.Bill_Details.Room_Number, 
dbo.Rooms.Room_Type, dbo.Rooms.Price_Per_Night,  
dbo.Customers_Rooms.Amount_Of_People,
(SELECT DATEDIFF(day, dbo.Customers_Rooms.Entry_Date, dbo.Customers_Rooms.Exit_Date))AS Number_Of_Nights,
dbo.Bill_Details.Payment_Method
FROM     dbo.Customers_Rooms INNER JOIN
                  dbo.Bill_Details ON dbo.Customers_Rooms.Room_Number = dbo.Bill_Details.Room_Number INNER JOIN
                  dbo.Rooms ON dbo.Bill_Details.Room_Number = dbo.Rooms.Room_Number
WHERE  (dbo.Bill_Details.Product_Code = 8 and dbo.Bill_Details.Bill_Number = @bill_number)
union all
SELECT dbo.Bill_Details.Bill_Number, dbo.Bill_Details.Customer_ID, dbo.Bill_Details.Bill_Date,
dbo.Bill_Details.Room_Number, dbo.Products.Description,dbo.Products.Price_Per_Unit, 
dbo.Products.Discount_Percentage, dbo.Bill_Details.Amount,dbo.Bill_Details.Payment_Method
FROM     dbo.Bill_Details INNER JOIN
   dbo.Bill ON dbo.Bill_Details.Bill_Number = dbo.Bill.Bill_Number INNER JOIN
   dbo.Products ON dbo.Bill_Details.Product_Code = dbo.Products.Product_Code
	WHERE  (dbo.Bill_Details.Product_Code != 8 and dbo.Bill_Details.Bill_Number = @bill_number)
	if (@@error !=0)
	begin
		rollback tran
		print 'error'
		return
	end
commit tran
go
--exec Room_Resit 666


select * from [dbo].[Customers_Rooms]
--select * from [dbo].[Employees_Tasks]
--select * from [dbo].[Bill_Details]
