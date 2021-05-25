import React from "react";
import { Container, makeStyles, Box, Button } from "@material-ui/core";
import TaskTable from "./TaskTable";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "90vh",
    marginBottom: 0,
    marginTop: theme.spacing(1),
  },
  add: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 20,
  },
}));

const TaskView = () => {
  const classes = useStyles();

  return (
    <Container>
      <h3 style={{ color: "#50A84C" }}>Tasks</h3>
      <div>
        <div className={classes.add}>
          <Button color="primary" variant="text" size="large">
            <Box
              style={{
                fontWeight: 500,
                fontSize: 18,
                textTransform: "none",
                padding: 0,
              }}
            >
              +Add Task
            </Box>
          </Button>
        </div>
        <div>
          <TaskTable />
        </div>
      </div>
    </Container>
  );
};

export default TaskView;
