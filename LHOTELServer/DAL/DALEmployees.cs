using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DALEmployees
    {
        //public static List<Employees> GetAllEmployees()
        //{
        //    try
        //    {
        //        SqlDataReader reader = SQLConnection.ExcNQReturnReder(@"exec GetAllEmployees");
        //        if (reader == null || !reader.HasRows)
        //            return null;

        //        List<Employees> employees = new List<Employees>();
        //        while (reader.Read())
        //        {
        //            employees.Add(new Employees(
        //                (int)reader["Employee_ID"],
        //                (string)reader["Employee_Name"],
        //                (string)reader["Phone_Number"],
        //                (DateTime)reader["Birth_Date"],
        //                (int)reader["Worker_Code"],
        //                (int)reader["Hourly_Wage"],
        //                (string)reader["Address"]
        //                ));
        //        }
        //        return employees;
        //    }
        //    catch (Exception e)
        //    {
        //        Console.WriteLine(e.Message);
        //        return null;
        //    }
        //    finally
        //    {
        //        SQLConnection.CloseDB();
        //    }
        //}

        public static Employees GetEmployeeByIdAndCode(int id, int code)
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec GetEmployeeByIdAndCode {id} , {code}");

                if (reader == null || !reader.HasRows)
                {
                    Console.WriteLine("There is no such employee in the system");
                    return null;
                }
                Employees employee = null;
                while (reader.Read())
                {
                    employee = new Employees() {
                        id =  (int)reader["Employee_ID"],
                        name = (string)reader["Employee_Name"],
                        phoneNumber = (string)reader["Phone_Number"],
                        birthDate = (DateTime)reader["Birth_Date"],
                        worker_Code = (int)reader["Worker_Code"],
                        hourly_Wage = (int)reader["Hourly_Wage"],
                        address = (string)reader["Address"],
                        employee_Code = (int)reader["Employee_Code"]
                        };
                }
                return employee;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
            finally
            {
                SQLConnection.CloseDB();
            }
        }

        public static bool AddNewEmployee(Employees newEmployee)
        {
            try
            {
                if (GetEmployeeByIdAndCode(newEmployee.id , newEmployee.employee_Code) == null)
                {
                    string str = $@"exec InsertEmployee {newEmployee.id},'{newEmployee.name}','{newEmployee.phoneNumber}',
'{newEmployee.birthDate.ToString("yyyy - MM - dd")}',{newEmployee.worker_Code},{newEmployee.hourly_Wage},
'{newEmployee.address}'";
                    str = str.Replace("\r\n", string.Empty);
                    int rowsAffected = SQLConnection.ExeNonQuery(str);
                    if (rowsAffected >= 1)
                        return true;
                }
                return false;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
            finally
            {
                SQLConnection.CloseDB();
            }
        }

        public static bool AlterEmployeeById(Employees employee)
        {
            try
            {
                Employees findEmployee = GetEmployeeByIdAndCode(employee.id, employee.employee_Code);
                if (findEmployee == null)
                {
                    return false;
                }
                string str = $@"exec AlterEmployee {employee.id},'{employee.name}','{employee.phoneNumber}',
'{employee.birthDate.ToString("yyyy - MM - dd")}',{employee.worker_Code},{employee.hourly_Wage},'{employee.address}'";
                str = str.Replace("\r\n", string.Empty);
                int result = SQLConnection.ExeNonQuery(str);
                if (result == 1)
                    return true;
                return false;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return true;
            }
            finally
            {
                SQLConnection.CloseDB();
            }
        }

        public static bool DeleteEmployeeByIdAndCode(int id, int code)
        {
            try
            {
                Employees findEmployee = GetEmployeeByIdAndCode(id, code);
                if (findEmployee == null)
                {
                    return false;
                }
                string str = $@"exec DeleteEmployeeById {id}";
                int result = SQLConnection.ExeNonQuery(str);
                if (result >= 1)
                    return true;
                return false;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }
            finally
            {
                SQLConnection.CloseDB();
            }
        }

    }
}


