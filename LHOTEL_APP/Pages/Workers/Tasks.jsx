import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { ActivityIndicator } from "react-native";
import TasksCard from "./TasksCard";
import moment from "moment";
import AppContext from "../../AppContext";

// const RequestType = [
//     { label: "All Task", value: "All Task" },
//     { label: "Today's tasks", value: "Today's tasks" },
//     { label: 'Open Tasks', value: 'Open Tasks' },
//     { label: 'Add New Task', value: 'Add New Task' },
// ];

export default function Tasks({ navigation }) {
  const myContext = useContext(AppContext);
  const myEmployee = myContext.employee;
  const [dropdown, setDropdown] = useState(null);
  const [tasks, SetTasks] = useState([]);
  const [tasksDisplay, SetTasksDisplay] = useState([]);
  const [taskToMarkAsDone, SetTaskToMarkAsDone] = useState([]);
  const [loading, SetLoading] = useState(false);
  const [requestType, SetRequestType] = useState([
    { label: "All Task", value: "All Task" },
    { label: "Today's tasks", value: "Today's tasks" },
    { label: "Open Tasks", value: "Open Tasks" },
    { label: "Add New Task", value: "Add New Task" },
  ]);

  useEffect(() => {
    if (myEmployee.Description === "Manager") GetAllTasksFromDB();
    else GetTasksByID();
  }, []);

  const GetTasksByID = async () => {
    try {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          id: myEmployee.EmployeeID,
        }),
        headers: { "Content-Type": "application/json" },
      };
      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/GetTaskById",
        requestOptions
      );
      let temp = await result.json();
      // console.log(temp);
      if (temp !== null) {
        SetTasks(temp);
        SetTasksDisplay(temp);
        // console.log(requestType);
        let newRequest = requestType.filter(
          (request) => request.label !== "Add New Task"
        );
        SetRequestType(newRequest);
        SetLoading(true);
      }
    } catch (error) {
      alert(error);
      SetLoading(true);
    }
  };

  const GetAllTasksFromDB = async () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/GetAllTasks",
        requestOptions
      );
      let temp = await result.json();
      // console.log(temp);
      if (temp !== null) {
        SetTasks(temp);
        SetTasksDisplay(temp);
        SetLoading(true);
      }
    } catch (error) {
      alert(error);
      SetLoading(true);
    }
  };

  const EditTaskDetails = (taskcode) => {
    let taskDetails = tasks.filter((task) => task.TaskCode === taskcode)[0];
    navigation.navigate("EditTasks", { taskDetails: taskDetails });
  };

  const HandelRequest = (request) => {
    // console.log(request);
    let listTemp = null;
    switch (request) {
      case "All Task":
        listTemp = tasks;
        break;
      case "Today's tasks":
        listTemp = tasks.filter(
          (task) => task.StartDate === moment(new Date()).format("YYYY-MM-DD")
        );
        break;
      case "Open Tasks":
        listTemp = tasks.filter((task) => task.TaskStatus === "Open");
        break;
      case "Add New Task":
        navigation.navigate("EditTasks");
        return;
      default:
        return;
    }
    // console.log(JSON.stringify(listTemp));
    SetTasksDisplay(listTemp);
  };

  const MarkTaskAsDone = (taskCode) => {
    let newArrayTasks = tasksDisplay.filter(
      (task) => task.TaskCode === taskCode
    )[0];
    let temp = [...taskToMarkAsDone, newArrayTasks];
    SetTaskToMarkAsDone(temp);
  };

  const RemoveFromCheck = (taskCode) => {
    let newArrayTasks = taskToMarkAsDone.filter(
      (task) => task.TaskCode !== taskCode
    );
    SetTaskToMarkAsDone(newArrayTasks);
  };

  const DeleteTask = async (taskCode) => {
    try {
      SetLoading(false);
      const requestOptions = {
        method: "DELETE",
        body: JSON.stringify({
          task_code: taskCode,
        }),
        headers: { "Content-Type": "application/json" },
      };
      // console.log(requestOptions.body);
      let result = await fetch(
        "http://proj13.ruppin-tech.co.il/DeleteTask",
        requestOptions
      );
      let temp = await result.json();
      // console.log(temp);
      if (temp) {
        SetLoading(true);
        GetAllTasksFromDB();
      }
    } catch (error) {
      alert(error);
    }
    SetLoading(true);
  };

  const CloseTask = async () => {
    try {
      if (taskToMarkAsDone.length === 0) {
        alert("No tasks have been selected for execution");
        return;
      }
      SetLoading(false);
      let counter = 0;
      for (let index = 0; index < taskToMarkAsDone.length; index++) {
        // console.log(taskToMarkAsDone[index]);
        const requestOptions = {
          method: "PUT",
          body: JSON.stringify({
            task_code: taskToMarkAsDone[index].TaskCode,
            end_time: moment(new Date()).format('HH:MM')
          }),
          headers: { "Content-Type": "application/json" },
        };
        let result = await fetch(
          "http://proj13.ruppin-tech.co.il/CloseTask",
          requestOptions
        );
        let temp = await result.json();
        if (temp) {
          counter++;
          // GetAllTasksFromDB()
        }
      }
      // console.log(counter > 1);
      if (counter > 1) {
        alert("All selected tasks have been successfully closed");
        GetAllTasksFromDB();
      }
    } catch (error) {
      alert(error);
      SetLoading(true);
    }
    SetLoading(true);
  };

  // console.log(JSON.stringify(taskToMarkAsDone));

  console.log();

  const Spinner = () => (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" />
    </View>
  );

  let tasksList = tasksDisplay.map((task) => (
    <TasksCard
      key={task.TaskCode}
      TaskCode={task.TaskCode}
      EmployeeID={task.EmployeeID}
      TaskName={task.TaskName}
      RoomNumber={task.RoomNumber}
      StartDate={moment(task.StartDate).format("DD/MM/YYYY")}
      StartTime={task.StartTime}
      EndTime={task.EndTime}
      TaskStatus={task.TaskStatus}
      Description={task.Description}
      EditTaskDetails={EditTaskDetails}
      MarkTaskAsDone={MarkTaskAsDone}
      RemoveFromCheck={RemoveFromCheck}
      DeleteTask={DeleteTask}
    />
  ));

  // console.log(JSON.stringify(tasks));

  // let role = 'Manager'

  return (
    <ScrollView>
      <Text style={styles.HeadLine}>All Tasks</Text>

      <Dropdown
        style={styles.dropdown}
        data={requestType}
        searchPlaceholder="Search"
        labelField="label"
        valueField="value"
        placeholder="Task Request"
        value={dropdown}
        onChange={(request) => {
          HandelRequest(request.value);
        }}
      />
      <ScrollView>
        <View style={styles.SaveContainer}>
          <TouchableOpacity style={styles.Save} onPress={CloseTask}>
            <Text>Save the tasks marked as "Done"</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.items}>{loading ? tasksList : <Spinner />}</View>
      </ScrollView>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  HeadLine: {
    fontSize: 40,
    fontWeight: "bold",
    paddingTop: 50,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",

  },
  dropdown: {
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    marginTop: 20,
  },
  container: {
    padding: 10,
  },
  Plus: {
    width: 30,
    height: 30,
  },
  SaveContainer: {
    alignItems: "center",
    padding: 10,
  },
  Save: {
    backgroundColor: "#D9E7E2",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    borderWidth: 2,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
