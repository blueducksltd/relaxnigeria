import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';

// Simple in-memory audit log for demo (in production, use proper database)
const auditLog: Array<{
  action: string;
  adminId: string;
  adminEmail: string;
  targetId?: string;
  targetEmail?: string;
  timestamp: string;
  details?: any;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userRole = (session.user as any).role;
    if (userRole !== 'admin' && userRole !== 'super-admin') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const body = await request.json();
    const { action, targetId, targetEmail, details } = body;

    // Add audit entry
    const auditEntry = {
      action,
      adminId: (session.user as any).id,
      adminEmail: (session.user as any).email,
      targetId,
      targetEmail,
      timestamp: new Date().toISOString(),
      details
    };

    auditLog.push(auditEntry);

    // Keep only last 100 entries for demo
    if (auditLog.length > 100) {
      auditLog.splice(0, auditLog.length - 100);
    }

    console.log('Audit log entry:', auditEntry);

    return NextResponse.json({
      success: true,
      message: 'Audit entry logged',
      auditEntry
    });

  } catch (error) {
    console.error('Error logging audit:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userRole = (session.user as any).role;
    if (userRole !== 'admin' && userRole !== 'super-admin') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    return NextResponse.json({
      success: true,
      auditLog: auditLog.slice(-50) // Return last 50 entries
    });

  } catch (error) {
    console.error('Error fetching audit log:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
