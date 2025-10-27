export interface Course {
    id: string;
    title: string;
    description: string;
    instructor: string;
    duration_hours: number;
    price: number;
    start_date?: string;
    created_at?: string;
}

export interface CourseFormData {
    title: string;
    description: string;
    instructor: string;
    duration_hours: number;
    price: number;
}