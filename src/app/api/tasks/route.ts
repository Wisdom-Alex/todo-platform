import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function GET() {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.error();
  }
}

export async function POST(req: NextRequest) {
  try {
    const taskData = await req.json();
    const response = await axios.post(`${API_URL}/tasks`, taskData);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.error();
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, ...taskData } = await req.json();
    const response = await axios.put(`${API_URL}/tasks/${id}`, taskData);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.error();
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await axios.delete(`${API_URL}/tasks/${id}`);
    return NextResponse.json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return NextResponse.error();
  }
}
