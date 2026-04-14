import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const userRole = (session.user as any).role;
    if (userRole !== 'admin' && userRole !== 'super-admin') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const memberId = searchParams.get('memberId');
    
    if (!memberId) {
      return NextResponse.json({ error: 'Member ID is required' }, { status: 400 });
    }

    await dbConnect();
    
    // Only super-admins can delete members
    if (userRole !== 'super-admin') {
      return NextResponse.json({ error: 'Only super-admins can delete members' }, { status: 403 });
    }

    // Find and delete the member
    const deletedMember = await User.findByIdAndDelete(memberId);
    
    if (!deletedMember) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Member deleted successfully',
      deletedMember: {
        id: deletedMember._id,
        email: deletedMember.email,
        name: `${deletedMember.firstName} ${deletedMember.lastName}`
      }
    });

  } catch (error) {
    console.error('Error deleting member:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
