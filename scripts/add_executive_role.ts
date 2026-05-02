import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/user.model';

/**
 * This script finds all users with position "Webmaster" and ensures they have the
 * "executive-committee" role and are approved. Run it with `bun run add_executive_role`.
 */
async function fixWebmasters() {
  await dbConnect();
  const webmasters = await UserModel.find({ position: 'Webmaster' });
  for (const user of webmasters) {
    const updates: any = {};
    // Ensure role
    if (!user.roles.includes('executive-committee')) {
      updates.$addToSet = { roles: 'executive-committee' };
    }
    // Ensure approved
    if (!user.isApproved) {
      updates.isApproved = true;
    }
    if (Object.keys(updates).length) {
      await UserModel.updateOne({ _id: user._id }, updates);
      console.log(`Updated user ${user.name} (${user._id})`);
    } else {
      console.log(`No changes needed for ${user.name}`);
    }
  }
  console.log('Webmaster fix complete');
  process.exit(0);
}

fixWebmasters().catch((e) => {
  console.error('Error fixing webmasters:', e);
  process.exit(1);
});
