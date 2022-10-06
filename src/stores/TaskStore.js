import { defineStore } from 'pinia';
import axios from '../utils/axios.js';

export const useTaskStore = defineStore('taskStore', {
    state: () => {
        return {
            isLoaded: false,
            tasks: []
        }
    },
    actions: {
        // Task = {
        //     _id: String,
        //     name: String,
        //     description: String,
        //     status: String,
        //     ends: Date,
        //     files: [String],
        //     comments: [String]
        // }
        // 
        // Method: GET
        // Response: [Task]
        // 
        async get() {
            try {
                const response = await axios.get('task');

                this.tasks = response.data.tasks;
            } catch (error) {
                console.error('Error: ', error);
            } finally {
                this.isLoaded = true;
            }
        },
        // 
        // Method: PUT
        // Body: Task
        // Response: Task
        // 
        async update(value) {
            try {
                const response = await axios.put('task', value);

                if (response.data.tasks) this.get();
            } catch (error) {
                console.error('Error: ', error);
            } finally {
                this.isLoaded = true;
            }
        },
        // 
        // Method: DELETE
        // Body: [_id]
        // Response: Task
        //         
        async delete(value) {
            try {
                const response = await axios.delete('task', {data: value});

                if (response.data.deleted) this.get();
            } catch (error) {
                console.error('Error: ', error);
            } finally {
                this.isLoaded = true;
            }
        },
        // 
        // Method: POST
        // Body: {name,description,status,files,comments,ends}
        // Response: Task
        // 
        async add(value) {
            try {
                const response = await axios.post('task', value);

                if (response.data.task) {
                    this.tasks.push(response.data.task);
                    return response.data.task._id;
                }
            } catch (error) {
                console.error('Error: ', error);
            }
        }
    }
});
