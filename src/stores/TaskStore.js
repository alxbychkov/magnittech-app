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
        async get() {
            try {
                const response = await axios.get('task');
                this.tasks = response.data.tasks;
                this.isLoaded = true;
            } catch (error) {
                console.error('Error: ', error);
                this.isLoaded = true;
            }
        },
        async update(value) {
            try {
                const response = await axios.put('task', value);
                if (response.data.tasks) {
                    this.isLoaded = false;
                    this.get();
                }
            } catch (error) {
                console.error('Error: ', error);
            }
        },
        async delete(value) {
            try {
                const response = await axios.delete('task', {data: value});
                if (response.data.deleted) {
                    this.isLoaded = false;
                    this.get();
                }
            } catch (error) {
                console.error('Error: ', error);
            }
        },
        async add(value) {
            try {
                const response = await axios.post('task', value);
                if (response.data.task) {
                    this.get();
                    return response.data.task._id;
                }
            } catch (error) {
                console.error('Error: ', error);
            }
        }
    },
    getters: {
        active(id) {
            return this.tasks.filter((t) => t._id === id);
        }
    }
});
