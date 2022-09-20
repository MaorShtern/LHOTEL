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
                        TaskCode = (int)reader["Task_Code"],
                        EmployeeID = (reader["Employee_ID"] != DBNull.Value) ? (int)reader["Employee_ID"] : -1,
                        TaskName = (string)reader["Task_Name"],
                        RoomNumber = (reader["Room_Number"] != DBNull.Value) ? (int)reader["Room_Number"] : -1,
                        StartDate = (DateTime)reader["Start_Date"],
                        StartTime = (string)reader["Start_Time"],
                        EndTime = (reader["End_Time"] != DBNull.Value)
                        ? (string)reader["End_Time"] : null,
                        TaskStatus = (string)reader["Task_Status"],
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

        public static List<Task> GetTaskById(int id)// פונקציה המחזירה רשימת משימות של עובד 
        {
            try
            {
                string str = $@"exec GetTask_ById {id}";// הגדרת הפקודה להרצת הפרוצודורה הרלוונטית
                str = str.Replace("\r\n", string.Empty);//סידור תחביר הפקודה ע"י מחיקה של רווחים וירידות שורה מיותרים
                SqlDataReader reader = SQLConnection.ExcNQReturnReder(str); // השמת הנתונים המוחזרים ממסד הנתונים בעקבות הרצת הפרוצדורה לאובייקט רידר
                if (reader == null && !reader.HasRows)//הצגת הודעה מתאימה אם לא קיימים נתונים מוחזרים והחזרת NULL
                {
                    Console.WriteLine("There is no such employee in the system");
                    return null;
                }
                List<Task> tasks = new List<Task>();
                while (reader.Read())//באם קיימים נתונים מוחזרים יצירת אובייקטי משימה מהם והכנסתם לרשימה 
                {
                    tasks.Add(new Task()
                    {
                        TaskCode = (int)reader["Task_Code"],
                        EmployeeID = (int)reader["Employee_ID"],
                        TaskName = (string)reader["Task_Name"],
                        RoomNumber = (reader["Room_Number"] != DBNull.Value)// תנאי אם מקוצר לטובת השמת ערך דיפולטיבי במידה ולא קיים ערך
                        ? (int)reader["Room_Number"] : -1,

                        StartDate = (DateTime)reader["Start_Date"],
                        StartTime = (string)reader["Start_Time"],

                        EndTime = (reader["End_Time"] != DBNull.Value)
                        ? (string)reader["End_Time"] : null,

                        TaskStatus = (string)reader["Task_Status"],
                        Description = (string)reader["Description"]
                    });
                }
                return tasks;// החזרה של הרשימה 

            }
            catch (Exception e)  // הצגת שגיאה במידה והתקבלה
            {
                Console.WriteLine(e.Message);
                return null;
            }
            finally   //סגירת החיבור אל מסד הנתונים
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
                        TaskCode = (int)reader["Task_Code"],
                        EmployeeID = (int)reader["Employee_ID"],
                        TaskName = (string)reader["Task_Name"],
                        RoomNumber = (reader["Room_Number"] != DBNull.Value)
                        ? (int)reader["Room_Number"] : -1,
                        StartDate = (DateTime)reader["Start_Date"],
                        StartTime = (string)reader["Start_Time"],

                        EndTime = (reader["End_Time"] != DBNull.Value)
                        ? (string)reader["End_Time"] : null,

                        TaskStatus = (string)reader["Task_Status"],
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
                string str = $@"exec AddNewTask {task.EmployeeID},'{task.TaskName}','{task.Description}',";
                if (task.RoomNumber != 0)
                    str += $"{task.RoomNumber}";
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


        public static bool CloseTask(int code)
        {
            try
            {
                if (GetTaskByCode(code) == null)
                {
                    return false;
                }
                string str = $@"exec CloseTask {code}";
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

        public static bool AlterTask(Task task)
        {
            try
            {
                if (GetTaskByCode(task.TaskCode) == null)
                {
                    return false;
                }

                string str = $@"exec AlterTask {task.TaskCode},{task.EmployeeID},'{task.TaskName}',";
                if (task.RoomNumber != 0)
                    str += $"{task.RoomNumber}";
                else
                    str += "null";
                str += $@",'{task.StartDate:yyyy - MM - dd}','{task.StartTime}','{task.EndTime}',
'{task.TaskStatus}','{task.Description}'";
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

