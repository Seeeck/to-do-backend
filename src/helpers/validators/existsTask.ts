import { Task } from "../../models/task";

const existsTask = async (task_title: string, obj: { req: any }) => {

    const existsTask = await Task.findOne({
        where: {
            task_title:task_title,
            user_id: obj.req.body.user_id
        }
    })

    if (existsTask) {
        throw new Error(`the task '${task_title}' already exists.`);
    }
    return true;
};

export default existsTask;