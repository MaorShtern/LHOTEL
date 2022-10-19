import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { ActivityIndicator } from "react-native";
import TasksCard from "./TasksCard";
import moment from "moment";
import AppContext from "../../AppContext";
import { useFocusEffect } from "@react-navigation/native";
import { images } from '../../images';
import { Dimensions } from 'react-native';

export default function Tasks(props) {
  const myContext = useContext(AppContext);
  const myEmployee = myContext.employee;
  const [dropdown, setDropdown] = useState(null);
  const [tasks, SetTasks] = useState([]);
  const [tasksDisplay, SetTasksDisplay] = useState([]);
  const [taskToMarkAsDone, SetTaskToMarkAsDone] = useState([]);
  const [loading, SetLoading] = useState(false);
  const windowHeight = Dimensions.get('window').height;
  // const [requestType, SetRequestType] = useState([
  //   { label: "All Task", value: "All Task" },
  //   { label: "Today's tasks", value: "Today's tasks" },
  //   { label: "Open Tasks", value: "Open Tasks" },
  //   { label: "Add New Task", value: "Add New Task" },
  // ]);
  // console.log(props.navigation);
  // useEffect(() => {
  //   if (myEmployee.Description === "Manager")
  //     GetAllTasksFromDB();
  //   else
  //     GetTasksByID();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (myEmployee.Description === "Manager") GetAllTasksFromDB();
      else GetTasksByID();
    }, [props])
  );
  // console.log(tasks);

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
        HandelRequest(temp);



        // console.log(requestType);
        // let newRequest = requestType.filter(
        //   (request) => request.label !== "Add New Task"
        // );
        // SetRequestType(newRequest);
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
        "http://proj13.ruppin-tech.co.il/GetAllTasks", requestOptions);
      let temp = await result.json();
      // console.log(temp);
      if (temp !== null) {
        SetTasks(temp);
        HandelRequest(temp);
        SetLoading(true);
      }
    } catch (error) {
      alert(error);
      SetLoading(true);
    }
  };

  const EditTaskDetails = (taskcode) => {
    let taskDetails = tasks.filter((task) => task.TaskCode === taskcode)[0];
    props.navigation.navigate("EditTasks", { taskDetails: taskDetails });
  };

  const HandelRequest = (allTasks) => {
    // console.log(tasks);
    let listTemp = null;
    switch (props.route.name) {
      case "All Tasks":
        listTemp = allTasks;
        break;
      case "Today's Tasks":

        listTemp = allTasks.filter(
          (task) =>
            moment(task.StartDate).format("YYYY-MM-DD") ===
            moment().format("YYYY-MM-DD")
        );
        break;
      case "Open Tasks":
        listTemp = allTasks.filter((task) => task.TaskStatus === "Open");
        break;
      // case "Task Form":
      //   // EditTaskDetails
      //   // navigation.navigate("EditTasks");
      //   return
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
      let result = await fetch("http://proj13.ruppin-tech.co.il/DeleteTask", requestOptions);
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
      let endTime =  moment(new Date()).format("HH:MM")
      for (let index = 0; index < taskToMarkAsDone.length; index++) {
        // console.log(taskToMarkAsDone[index]);
        const requestOptions = {
          method: "PUT",
          body: JSON.stringify({
            task_code: taskToMarkAsDone[index].TaskCode,
            end_time: endTime,
          }),
          headers: { "Content-Type": "application/json" },
        };
        // console.log(requestOptions.body);
        let result = await fetch("http://proj13.ruppin-tech.co.il/CloseTask", requestOptions);
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

  // style={styles.SaveContainer}
  return (
    <View style={{ height: windowHeight - 120 }}>
      {
        tasksDisplay.length !== 0 ? <TouchableOpacity style={styles.Save} onPress={CloseTask}>
          {/* <Text>Save the tasks marked as "Done"</Text> */}
          <Image style={styles.save} source={images.save} />
        </TouchableOpacity> : null
      }


      <ScrollView>
        <View style={styles.items}>{loading ? tasksList : <Spinner />}</View>
      </ScrollView>
    </View>
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
    position: "absolute",
    zIndex: 2,
  },
  Save: {
    backgroundColor: "#D9E7E0",
    padding: 15,
    borderRadius: 50,

    position: 'absolute',
    bottom: 75,
    left: 30,
    borderWidth: 2,
    zIndex: 2,
  },
  save: {
    width: 30,
    height: 30
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
{
  /* <Text style={styles.HeadLine}>All Tasks</Text>

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
      /> */
}
