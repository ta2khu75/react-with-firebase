import { Level } from "./Level";

interface Todo {
    id?: string;
    content?: string;
    done?: boolean;
    userId?: string
    level?: Level;
}