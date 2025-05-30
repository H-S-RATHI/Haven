import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function POST(
  request: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    const { conversationId } = params;
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    const { messageIds } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    if (!messageIds || !Array.isArray(messageIds)) {
      return NextResponse.json(
        { error: 'Message IDs are required' },
        { status: 400 }
      );
    }
    
    const response = await fetch(`${API_URL}/api/conversations/${conversationId}/messages/read`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messageIds }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to mark messages as read');
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error marking messages as read:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to mark messages as read' },
      { status: 500 }
    );
  }
}
