import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, auth } from '../firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { motion } from 'motion/react';
import { User, Mail, Shield, Clock, CheckCircle, AlertCircle, Phone, Lock, Eye, EyeOff, MessageCircle, Truck, LogOut } from 'lucide-react';

const Profile: React.FC = () => {
  const { profile, user } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsNotifications, setSmsNotifications] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
      setPhoneNumber(profile.phoneNumber || '');
      setSmsNotifications(profile.smsNotifications || false);
    }
  }, [profile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const userRef = doc(db, 'users', user.uid);
      
      if (profile.role === 'consumer') {
        // Direct update for consumers
        await updateDoc(userRef, {
          name,
          email,
          phoneNumber,
          smsNotifications,
        });
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
      } else {
        // Pending update for producers and delivery boys
        await updateDoc(userRef, {
          pendingProfileChanges: {
            name,
            email,
            phoneNumber,
            timestamp: serverTimestamp(),
          }
        });
        setMessage({ type: 'success', text: 'Profile changes submitted for admin approval.' });
      }
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !user.email) return;

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    setIsChangingPassword(true);
    setMessage(null);

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error('Error changing password:', error);
      setMessage({ type: 'error', text: error.message || 'Failed to change password. Check your current password.' });
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (!profile) return null;

  const needsApproval = profile.role === 'producer' || profile.role === 'delivery';
  const hasPendingChanges = !!profile.pendingProfileChanges;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glossy-card overflow-hidden group"
        >
          <div className="bg-indigo-600 px-12 py-20 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-1 bg-white/30 rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Account Settings</span>
              </div>
              <h1 className="text-6xl font-black tracking-tighter font-display uppercase mb-4">Your Profile<span className="text-indigo-300">.</span></h1>
              <div className="inline-flex items-center space-x-3 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <p className="text-indigo-100 font-black text-xs uppercase tracking-widest">{profile.role} Account</p>
              </div>
            </div>
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-indigo-400/30 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000" />
          </div>

          <div className="p-12 space-y-12">
            {message && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-8 rounded-[2rem] flex items-center gap-6 border-2 shadow-xl ${
                  message.type === 'success' ? 'bg-green-50 text-green-700 border-green-100 shadow-green-100/50' : 'bg-red-50 text-red-700 border-red-100 shadow-red-100/50'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
                  message.type === 'success' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {message.type === 'success' ? <CheckCircle size={28} /> : <AlertCircle size={28} />}
                </div>
                <div>
                  <h4 className="text-lg font-black uppercase tracking-tight font-display">{message.type === 'success' ? 'Success' : 'Error'}</h4>
                  <p className="text-sm font-bold opacity-80 uppercase tracking-widest">{message.text}</p>
                </div>
              </motion.div>
            )}

            {hasPendingChanges && (
              <div className="p-10 bg-amber-50 border-2 border-amber-100 rounded-[2.5rem] flex gap-8 shadow-2xl shadow-amber-100/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center shrink-0 relative z-10">
                  <Clock className="text-amber-600" size={32} />
                </div>
                <div className="relative z-10">
                  <h3 className="text-amber-900 font-black text-2xl font-display tracking-tighter mb-2 uppercase">Verification Pending</h3>
                  <p className="text-amber-800/70 text-base font-bold leading-relaxed">
                    You have submitted changes to your profile. An admin will review them shortly.
                  </p>
                  <div className="mt-6 p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-amber-200/50 shadow-sm">
                    <p className="text-[10px] font-black text-amber-600 uppercase tracking-[0.3em] mb-2">Proposed Changes</p>
                    <p className="text-amber-900 font-black text-lg tracking-tight font-display">
                      {profile.pendingProfileChanges?.name} <span className="mx-2 text-amber-300">/</span> {profile.pendingProfileChanges?.email} <span className="mx-2 text-amber-300">/</span> {profile.pendingProfileChanges?.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] ml-2">
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-focus-within:shadow-indigo-100 transition-all">
                    <User className="text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-20 pr-6 py-5 bg-gray-50/50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] ml-2">
                  Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-focus-within:shadow-indigo-100 transition-all">
                    <Phone className="text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full pl-20 pr-6 py-5 bg-gray-50/50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                    placeholder="Phone number"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] ml-2">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-focus-within:shadow-indigo-100 transition-all">
                  <Mail className="text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-20 pr-6 py-5 bg-gray-50/50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-600 outline-none transition-all font-bold text-gray-900 placeholder:text-gray-300"
                  placeholder="Your email address"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-8 bg-gray-50/50 rounded-[2rem] border border-gray-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <MessageCircle className="text-indigo-600" size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight font-display">SMS Notifications</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Receive order updates via SMS</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={smsNotifications}
                  onChange={(e) => setSmsNotifications(e.target.checked)}
                />
                <div className="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            {profile.role === 'consumer' && (
              <div className="p-10 bg-indigo-50/50 border-2 border-indigo-100 rounded-[2.5rem] space-y-8">
                <div>
                  <h3 className="text-2xl font-black text-indigo-900 font-display tracking-tighter uppercase">Join the Ecosystem</h3>
                  <p className="text-indigo-800/60 text-sm font-bold uppercase tracking-widest mt-1">Upgrade your account to start selling or delivering</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={async () => {
                      if (!user) return;
                      setIsSubmitting(true);
                      try {
                        await updateDoc(doc(db, 'users', user.uid), {
                          role: 'producer',
                          isVerified: false
                        });
                        setMessage({ type: 'success', text: 'Application submitted! Awaiting admin verification.' });
                      } catch (error) {
                        setMessage({ type: 'error', text: 'Failed to submit application.' });
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                    className="p-8 bg-white rounded-3xl border border-indigo-100 shadow-xl shadow-indigo-100/20 text-center group hover:border-indigo-600 transition-all"
                  >
                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Shield className="text-indigo-600" size={32} />
                    </div>
                    <h4 className="text-lg font-black text-indigo-900 uppercase tracking-tight font-display">Become Producer</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Sell your products directly</p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={async () => {
                      if (!user) return;
                      setIsSubmitting(true);
                      try {
                        await updateDoc(doc(db, 'users', user.uid), {
                          role: 'delivery',
                          isVerified: true // Delivery partners are auto-verified for now
                        });
                        setMessage({ type: 'success', text: 'Welcome to the delivery fleet!' });
                      } catch (error) {
                        setMessage({ type: 'error', text: 'Failed to join fleet.' });
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                    className="p-8 bg-white rounded-3xl border border-indigo-100 shadow-xl shadow-indigo-100/20 text-center group hover:border-indigo-600 transition-all"
                  >
                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Truck className="text-indigo-600" size={32} />
                    </div>
                    <h4 className="text-lg font-black text-indigo-900 uppercase tracking-tight font-display">Join Fleet</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">Deliver orders and earn</p>
                  </motion.button>
                </div>
              </div>
            )}

            <div className="pt-6">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-6 glossy-button rounded-[1.5rem] font-black text-xl flex items-center justify-center gap-3 disabled:opacity-50 uppercase tracking-widest ${
                  isSubmitting ? 'cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  needsApproval ? 'Submit for Approval' : 'Update Profile'
                )}
              </motion.button>
              {needsApproval && (
                <p className="text-center text-[10px] text-gray-400 mt-6 font-black uppercase tracking-[0.2em]">
                  * Profile changes for {profile.role}s require administrator verification.
                </p>
              )}
            </div>
          </form>
        </div>
      </motion.div>

      {/* Password Change Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <Lock className="text-amber-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Security</h2>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPasswords ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPasswords(!showPasswords)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPasswords ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type={showPasswords ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isChangingPassword}
                className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg shadow-amber-100 flex items-center justify-center gap-2 ${
                  isChangingPassword ? 'bg-amber-400 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 active:scale-[0.98]'
                }`}
              >
                {isChangingPassword ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Logout Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="pt-12"
      >
        <button
          onClick={async () => {
            const { signOut } = await import('firebase/auth');
            const { auth } = await import('../firebase');
            await signOut(auth);
            window.location.href = '/';
          }}
          className="w-full py-6 bg-red-50 text-red-600 rounded-[1.5rem] font-black text-xl uppercase tracking-widest border-2 border-red-100 hover:bg-red-100 transition-all flex items-center justify-center gap-4 shadow-xl shadow-red-100/50"
        >
          <LogOut size={28} />
          <span>Logout from Account</span>
        </button>
      </motion.div>
      </div>
    </div>
  );
};

export default Profile;
