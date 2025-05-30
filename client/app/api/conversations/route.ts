import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Get all conversations for the current user
export async function GET(request: Request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const response = await fetch(`${API_URL}/api/conversations`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch conversations');
    }
    
    const conversations = await response.json();
    return NextResponse.json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch conversations' },
      { status: 500 }
    );
  }
}

// Create a new conversation
export async function POST(request: Request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const { participantIds } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    if (!participantIds || !Array.isArray(participantIds) || participantIds.length === 0) {
      return NextResponse.json(
        { error: 'At least one participant is required' },
        { status: 400 }
      );
    }
    
    const response = await fetch(`${API_URL}/api/conversations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ participantIds }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create conversation');
    }
    
    const newConversation = await response.json();
    return NextResponse.json(newConversation, { status: 201 });
  } catch (error) {
    console.error('Error creating conversation:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create conversation' },
      { status: 500 }
    );
  }
}
