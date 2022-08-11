using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Task = DAL.Task;

namespace BLL
{
    public class BLLTasks
    {
        public static List<Task> GetAllTasks()
        {
            return DALTasks.GetAllTasks();
        }

        public static Task GetTaskById(int id, int taskNum, DateTime date)
        {
            return DALTasks.GetTaskById(id, taskNum, date);
        }

        public static bool AddNewTask(Task task)
        {
            return DALTasks.AddNewTask(task);
        }
        public static bool AlterTask(Task task)
        {
            return DALTasks.AlterTask(task);
        }
        public static bool DeleteTask(int id, int taskNum, DateTime date)
        {
            return DALTasks.DeleteTask(id, taskNum, date);
        }
    }
}
