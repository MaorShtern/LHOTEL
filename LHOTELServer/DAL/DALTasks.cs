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
                        Employee_ID = (int)reader["Employee_ID"],
                        Task_Number = (int)reader["Task_Number"],
                        Task_Name = (string)reader["Task_Name"],
                        Start_Date = (DateTime)reader["Start_Date"],
                        Start_Time = (string)reader["Start_Time"],
                        End_Date = (DateTime)reader["End_Date"],
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
        }

        public static Task GetTaskById(int id)
        {
            try
            {
                string str = $@"exec GetTaskById {id}";
                str = str.Replace("\r\n", string.Empty);
                SqlDataReader reader = SQLConnection.ExcNQReturnReder(str);
                if (reader == null && !reader.HasRows)
                {
                    Console.WriteLine("There is no such employee in the system");
                    return null;
                }
                Task task = null;
                while (reader.Read())
                {
                    task = new Task() {
                        Employee_ID = (int)reader["Employee_ID"],
                        Task_Number = (int)reader["Task_Number"],
                        Task_Name = (string)reader["Task_Name"],
                        Start_Date = (DateTime)reader["Start_Date"],
                        Start_Time = (string)reader["Start_Time"],
                        End_Date = (DateTime)reader["End_Date"],
                        Task_Status = (string)reader["Task_Status"],
                        Description = (string)reader["Description"]
                    };
                }
                return task;

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return null;
            }
        }

        public static bool AddNewTask(Task task)
        {
            try
            {
                string str = $@"exec AddNewTask {task.Employee_ID},'{task.Task_Name}','{task.Description}'";
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
        }

        //        public static bool AlterTask(Task task)
        //        {
        //            try
        //            {
        //                Task findTask = GetTaskById(task.id, task.number, task.startDate);
        //                if (findTask == null)
        //                {
        //                    return false;
        //                }
        //                string str = $@"exec AlterTask {task.id},{task.number},'{task.startDate}','{task.startTime}','{task.endDate}'
        //,'{task.taskStatus}','{task.description}'";
        //                str = str.Replace("\r\n", string.Empty);
        //                int result = SQLConnection.ExeNonQuery(str);
        //                if (result == 1)
        //                    return true;
        //                return false;
        //            }
        //            catch (Exception e)
        //            {
        //                Console.WriteLine(e.Message);
        //                return false;
        //            }
        //        }
        //        public static bool DeleteTask(int id, int taskNum, DateTime date)
        //        {
        //            try
        //            {
        //                Task findTask = GetTaskById(id, taskNum, date);
        //                if (findTask == null)
        //                {
        //                    return false;
        //                }
        //                string str = $@"exec DeleteTask {id},{taskNum},'{date}'";
        //                int result = SQLConnection.ExeNonQuery(str);
        //                if (result == 1)
        //                    return true;
        //                return false;
        //            }
        //            catch (Exception e)
        //            {
        //                Console.WriteLine(e.Message);
        //                return false;
        //            }
        //        }
    }
}

