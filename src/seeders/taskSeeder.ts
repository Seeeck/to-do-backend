import { Task } from "../models/task"

const taskSeeder = async ({ users = 5, tasks = 10 }) => {

    try {
        console.log('Inserting tasks........')
        for (let i = 1; i <= users; i++) {
            for (let j = 1; j <= tasks; j++) {
                await Task.create({
                    user_id: i,
                    task_title: `task${j}-user${i}`,
                    task_description: `description${j}-user${i}`,
                    finished_task: false,
                    task_day: new Date()
                })
            }
        }
        console.log('Tasks inserted.')
    } catch (e) {
        console.log("Tasks already exists", e);
    }
}


export default taskSeeder;