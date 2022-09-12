using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DALTasks
    {
        public static List<Task> GetAllTasks()
        {
            try
            {
                SqlDataReader reader = SQLConnection.ExcNQReturnReder(@"exec GetAllTasks");
                if (reader == null && !reader.HasRows)
                {
                    return null;
                }
                List<Task> tasks = new List<Task>();
                while (reader.Read())
                {
                    tasks.Add(new Task()
                    {
                        Task_Code = (int)reader["Task_Code"],
                        Employee_ID = (reader["Employee_ID"] != DBNull.Value) ? (int)reader["Employee_ID"] : -1,
                        Task_Name = (string)reader["Task_Name"],
                        Room_Number = (reader["Room_Number"] != DBNull.Value) ? (int)reader["Room_Number"] : -1,
                        Start_Date = (DateTime)reader["Start_Date"],
                        Start_Time = (string)reader["Start_Time"],
                        End_Time = (reader["End_Time"] != DBNull.Value)
                        ? (string)reader["End_Time"] : null,
                        Task_Status = (string)reader["Task_Status"],
                        Description = (string)reader["Description"]
                    });
                }
                return tasks;
            }
            catch (Exception e)
            {
                throw e;
                //Console.WriteLine(e.Message);
                //return null;
            }
            finally
            {
                SQLConnection.CloseDB();
            }
        }

        public static List<Task> GetTaskById(int id)
        {
            try
            {
                string str = $@"exec GetTask_ById {id}";
                str = str.Replace("\r\n", string.Empty);
                SqlDataReader reader = SQLConnection.ExcNQReturnReder(str);
                if (reader == null && !reader.HasRows)
                {
                    Console.WriteLine("There is no such employee in the system");
                    return null;
                }
                List<Task> tasks = new List<Task>();
                while (reader.Read())
                {
                    tasks.Add(new Task()
                    {
                        Task_Code = (int)reader["Task_Code"],
                        Employee_ID = (int)reader["Employee_ID"],
                        Task_Name = (string)reader["Task_Name"],
                        Room_Number = (reader["Room_Number"] != DBNull.Value)
                        ? (int)reader["Room_Number"] : -1,

                        Start_Date = (DateTime)reader["Start_Date"],
                        Start_Time = (string)reader["Start_Time"],

                        End_Time = (reader["End_Time"] != DBNull.Value)
                        ? (string)reader["End_Time"] : null,

                        Task_Status = (string)reader["Task_Status"],
                        Description = (string)reader["Description"]
                    });
                }
                return tasks;

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

        public static List<Task> GetTaskByCode(int code)
        {
            try
            {
                string str = $@"exec GetTask_ByCode {code}";
                str = str.Replace("\r\n", string.Empty);
                SqlDataReader reader = SQLConnection.ExcNQReturnReder(str);
                if (reader == null && !reader.HasRows)
                {
                    Console.WriteLine("There is no such employee in the system");
                    return null;
                }
                List<Task> tasks = new List<Task>();
                while (reader.Read())
                {
                    tasks.Add(new Task()
                    {
                        Task_Code = (int)reader["Task_Code"],
                        Employee_ID = (int)reader["Employee_ID"],
                        Task_Name = (string)reader["Task_Name"],
                        Room_Number = (reader["Room_Number"] != DBNull.Value)
                        ? (int)reader["Room_Number"] : -1,
                        Start_Date = (DateTime)reader["Start_Date"],
                        Start_Time = (string)reader["Start_Time"],

                        End_Time = (reader["End_Time"] != DBNull.Value)
                        ? (string)reader["End_Time"] : null,

                        Task_Status = (string)reader["Task_Status"],
                        Description = (string)reader["Description"]
                    });
                }
                return tasks;

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

        public static bool AddNewTask(Task task)
        {
            try
            {
                string str = $@"exec AddNewTask {task.Employee_ID},'{task.Task_Name}','{task.Description}',";
                if (task.Room_Number != 0)
                    str += $"{task.Room_Number}";
                else
                    str += "null";
                str = str.Replace("\r\n", string.Empty);
                int result = SQLConnection.ExeNonQuery(str);
                if (result == 1)
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


        public static bool AlterTask(Task task)
        {
            try
            {
                if (GetTaskByCode(task.Task_Code) == null)
                {
                    return false;
                }

                string str = $@"exec AlterTask {task.Task_Code},{task.Employee_ID},'{task.Task_Name}',";
                if (task.Room_Number != 0)
                    str += $"{task.Room_Number}";
                else
                    str += "null";
                str += $@",'{task.Start_Date.ToString("yyyy - MM - dd")}','{task.Start_Time}','{task.End_Time}',
'{task.Task_Status}','{task.Description}'";
                str = str.Replace("\r\n", string.Empty);
                int result = SQLConnection.ExeNonQuery(str);
                if (result == 1)
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


        public static bool DeleteTask(int code)
        {
            try
            {
                if (GetTaskByCode(code) == null)
                {
                    return false;
                }
                string str = $@"exec DeleteTask {code}";
                int result = SQLConnection.ExeNonQuery(str);
                if (result == 1)
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

