using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DALManager
    {
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
                        EmployeeID = (int)reader["Employee_ID"],
                        Description = (string)reader["Description"],
                        EmployeeName = (string)reader["Employee_Name"],
                        PhoneNumber = (string)reader["Phone_Number"],
                        BirthDate = (DateTime)reader["Birth_Date"],
                        HourlyWage = (int)reader["Hourly_Wage"],
                        Address = (string)reader["Address"],
                        //Employee_Code = (int)reader["Employee_Code"]
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

        public static List<Shift> GetAllShift()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder(@"exec GetAllShifts");
                if (reader == null || !reader.HasRows)
                    return null;

                List<Shift> employees = new List<Shift>();
                while (reader.Read())
                {

                    employees.Add(new Shift()
                    {
                        EmployeeID = (int)reader["Employee_ID"],
                        EmployeeCode = (int)reader["Employee_Code"],
                        EmployeeName = (string)reader["Employee_Name"],
                        Description = (string)reader["Description"],
                        Date = (DateTime)reader["Date"],
                        EntranceTime = (string)reader["Entrance_Time"],
                        LeavingTime = (reader["Leaving_Time"] != DBNull.Value)
                        ? (string)reader["Leaving_Time"] : null

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


        public static List<Shift> GetWorkersOnShift()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder(@"exec GetWorkersOnShift");
                if (reader == null || !reader.HasRows)
                    return null;

                List<Shift> employees = new List<Shift>();
                while (reader.Read())
                {

                    employees.Add(new Shift()
                    {
                        EmployeeID = (int)reader["Employee_ID"],
                        EmployeeCode = (int)reader["Employee_Code"],
                        EmployeeName = (string)reader["Employee_Name"],
                        Description = (string)reader["Description"],
                        Date = (DateTime)reader["Date"],
                        EntranceTime = (string)reader["Entrance_Time"],
                        LeavingTime = null

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
    }
}
