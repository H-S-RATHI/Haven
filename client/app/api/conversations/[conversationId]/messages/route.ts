import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Get messages for a specific conversation
export async function GET(
  request: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    const { conversationId } = params;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const response = await fetch(`${API_URL}/api/conversations/${conversationId}/messages`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch messages');
    }
    
    const messages = await response.json();
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// Send a new message in a conversation
export async function POST(
  request: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    const { conversationId } = params;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const { content, sender } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    if (!content || !sender) {
      return NextResponse.json(
        { error: 'Content and sender are required' },
        { status: 400 }
      );
    }
    
    const response = await fetch(`${API_URL}/api/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, sender }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send message');
    }
    
    const newMessage = await response.json();
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send message' },
      { status: 500 }
    );
  }
}
