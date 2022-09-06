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

        public static List<Task> GetTaskById(int id)
        {
            return DALTasks.GetTaskById(id);
        }

        public static List<Task> GetTaskByCode(int code)
        {
            return DALTasks.GetTaskByCode(code);
        }

        public static bool AddNewTask(Task task)
        {
            return DALTasks.AddNewTask(task);
        }
        public static bool AlterTask(Task task)
        {
            return DALTasks.AlterTask(task);
        }
        public static bool DeleteTask(int code)
        {
            return DALTasks.DeleteTask(code);
        }
    }
}
