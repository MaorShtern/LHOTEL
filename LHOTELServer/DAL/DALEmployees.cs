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
        public static bool ClockIn(int id)
        {
            try
            {
                string str = $@"exec ClockIn {id}";
                str = str.Replace("\r\n", string.Empty);
                int rowsAffected = SQLConnection.ExeNonQuery(str);
                if (rowsAffected >= 1)
                    return true;
                return false;
            }

            catch (Exception)
            {
                return false;
            }
            finally
            {
                SQLConnection.CloseDB();
            }
        }

        public static bool ClockOut(int id)
        {
            try
            {
                string str = $@"exec ClockOut {id}";
                str = str.Replace("\r\n", string.Empty);
                int rowsAffected = SQLConnection.ExeNonQuery(str);
                if (rowsAffected >= 1)
                    return true;
                return false;
            }

            catch (Exception)
            {
                return false;
            }
            finally
            {
                SQLConnection.CloseDB();
            }
        }
        public static List<Employees> GetAllEmployees()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder(@"exec GetAllEmployees");
                if (reader == null || !reader.HasRows)
                    return null;

                List<Employees> employees = new List<Employees>();
                while (reader.Read())
                {
                    employees.Add(new Employees()
                    {
                        Employee_ID = (int)reader["Employee_ID"],
                        Description = (string)reader["Description"],
                        Employee_Name = (string)reader["Employee_Name"],
                        Phone_Number = (string)reader["Phone_Number"],
                        Birth_Date = (DateTime)reader["Birth_Date"],
                        Hourly_Wage = (int)reader["Hourly_Wage"],
                        Address = (string)reader["Address"],
                        Employee_Code = (int)reader["Employee_Code"]
                    });
                }
                return employees;
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

        public static Employees GetEmployeeByIdAndRole(int id, string role)
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder($@"exec GetEmployeeByIdAndRole {id} , '{role}'");

                if (reader == null || !reader.HasRows)
                {
                    Console.WriteLine("There is no such employee in the system");
                    return null;
                }
                Employees employee = null;
                while (reader.Read())
                {
                    employee = new Employees()
                    {
                        Employee_ID = (int)reader["Employee_ID"],
                        Description = (string)reader["Description"],
                        Employee_Name = (string)reader["Employee_Name"],
                        Phone_Number = (string)reader["Phone_Number"],
                        Birth_Date = (DateTime)reader["Birth_Date"],
                        Hourly_Wage = (int)reader["Hourly_Wage"],
                        Address = (string)reader["Address"],
                        Employee_Code = (int)reader["Employee_Code"]
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
                if (GetEmployeeByIdAndRole(newEmployee.Employee_ID, newEmployee.Description) == null)
                {
                    string str = $@"exec InsertEmployee {newEmployee.Employee_ID},'{newEmployee.Employee_Name}',
'{newEmployee.Phone_Number}','{newEmployee.Birth_Date.ToString("yyyy - MM - dd")}',
'{newEmployee.Description}',{newEmployee.Hourly_Wage},'{newEmployee.Address}'";
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
                Employees findEmployee = GetEmployeeByIdAndRole(employee.Employee_ID, employee.Description);
                if (findEmployee == null)
                {
                    return false;
                }
                string str = $@"exec AlterEmployee {employee.Employee_ID},'{employee.Employee_Name}','{employee.Phone_Number}',
        '{employee.Birth_Date.ToString("yyyy-MM-dd")}',{employee.Description},{employee.Hourly_Wage},'{employee.Address}'";
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

        //        public static bool DeleteEmployeeByIdAndCode(int id, int code)
        //        {
        //            try
        //            {
        //                Employees findEmployee = GetEmployeeByIdAndCode(id, code);
        //                if (findEmployee == null)
        //                {
        //                    return false;
        //                }
        //                string str = $@"exec DeleteEmployeeById {id}";
        //                int result = SQLConnection.ExeNonQuery(str);
        //                if (result >= 1)
        //                    return true;
        //                return false;
        //            }
        //            catch (Exception e)
        //            {
        //                Console.WriteLine(e.Message);
        //                return false;
        //            }
        //            finally
        //            {
        //                SQLConnection.CloseDB();
        //            }
        //        }

    }
}


