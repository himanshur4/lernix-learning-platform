import { clerkClient } from '@clerk/express';

export const updateRoleToEducator = async (req, res) => {
    try {
        // Validate if user is authenticated
        const userId = req.auth?.userId;
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: User not authenticated'
            });
        }

        // Update user metadata in Clerk
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: 'educator',
            }
        });

        // Send success response
        res.status(200).json({
            success: true,
            message: 'You can publish a course now'
        });

    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error updating user role'
        });
    }
}