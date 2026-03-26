import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, onSnapshot, deleteDoc, doc, addDoc, serverTimestamp, updateDoc, increment, getDocs, writeBatch } from 'firebase/firestore';
import { Trash2, ShoppingBag, ArrowRight, Wallet as WalletIcon, CheckCircle2, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { motion, AnimatePresence } from 'motion/react';

interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  sellerId: string;
}

const CartPage: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shippingAddress, setShippingAddress] = useState('123 Main St, Suite 456, Metro City');

  useEffect(() => {
    if (!user) return;
    const path = `users/${user.uid}/cart`;
    const unsubscribe = onSnapshot(collection(db, 'users', user.uid, 'cart'), (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CartItem)));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });
    return () => unsubscribe();
  }, [user]);

  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (!user || newQuantity < 1) return;
    try {
      await updateDoc(doc(db, 'users', user.uid, 'cart', itemId), {
        quantity: newQuantity
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}/cart/${itemId}`);
    }
  };

  const handleCheckout = async () => {
    if (!user || !profile || items.length === 0) return;
    
    if (profile.walletBalance < total) {
      alert('Insufficient wallet balance! Please top up your wallet.');
      navigate('/wallet');
      return;
    }

    setCheckingOut(true);
    try {
      const response = await fetch('/api/wallet/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          cartItemIds: items.map(i => i.id),
          orderDetails: {
            totalAmount: total,
            shippingAddress: shippingAddress,
            sellerId: items[0]?.sellerId,
            items: items.map(i => ({ productId: i.productId, title: i.title, price: i.price, quantity: i.quantity }))
          }
        })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Checkout failed');
      }

      setSuccess(true);
      setTimeout(() => navigate('/orders'), 3000);
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(error.message);
    } finally {
      setCheckingOut(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle2 className="text-green-600 w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500">Your order has been successfully created and paid for via Wallet.</p>
        <p className="text-gray-400 text-sm mt-4">Redirecting to home...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-16"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div className="flex items-center space-x-8">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-24 h-24 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-200/50 border-4 border-white group"
            >
              <ShoppingBag className="text-white w-12 h-12 group-hover:scale-110 transition-transform" />
            </motion.div>
            <div>
              <h1 className="text-7xl font-black text-gray-900 tracking-tighter font-display uppercase leading-none">Your Cart<span className="text-indigo-600">.</span></h1>
              <p className="text-gray-400 font-bold text-sm uppercase tracking-[0.4em] mt-3">Review items before checkout</p>
            </div>
          </div>
          <div className="glass-surface px-10 py-5 rounded-2xl flex items-center space-x-6 border-white/60 shadow-xl">
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-600">{items.length} Items</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-10">
          <motion.div layout className="space-y-8">
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="glossy-card p-12 flex flex-col sm:flex-row items-center justify-between gap-12 group relative overflow-hidden border-white/40 shadow-2xl shadow-gray-100/50"
                >
                  <div className="absolute top-0 left-0 w-3 h-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-50 rounded-full blur-[100px] opacity-0 group-hover:opacity-60 transition-opacity" />
                  
                  <div className="flex flex-col sm:flex-row items-center gap-12 w-full relative z-10">
                    <div className="w-48 h-48 rounded-[3rem] overflow-hidden bg-gray-50 shadow-2xl shadow-gray-200/50 group-hover:rotate-3 transition-transform duration-500 border-4 border-white">
                      <img 
                        src={item.image || `https://picsum.photos/seed/${item.productId}/300/300`} 
                        alt={item.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 space-y-8 text-center sm:text-left">
                      <div>
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.5em] mb-3 block">Premium Selection</span>
                        <h4 className="font-black text-gray-900 text-4xl tracking-tighter font-display line-clamp-1 group-hover:text-indigo-600 transition-colors uppercase leading-tight">{item.title}</h4>
                      </div>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-10">
                        <div className="space-y-2">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block">Unit Price</span>
                          <p className="text-4xl font-black text-gray-900 tracking-tighter font-display">₹{item.price.toFixed(2)}</p>
                        </div>
                        <div className="h-12 w-px bg-gray-100 hidden sm:block" />
                        <div className="space-y-3">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block ml-1">Quantity</span>
                          <div className="flex items-center space-x-6 glass-surface p-2.5 rounded-[1.5rem] border border-white/60 shadow-lg">
                            <motion.button 
                              whileHover={{ scale: 1.1, rotate: -10 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-14 h-14 flex items-center justify-center bg-white text-gray-600 rounded-2xl shadow-xl hover:bg-red-50 hover:text-red-500 transition-all border border-gray-50"
                            >
                              <Minus className="w-6 h-6" />
                            </motion.button>
                            <span className="text-3xl font-black text-gray-900 w-10 text-center font-display">{item.quantity}</span>
                            <motion.button 
                              whileHover={{ scale: 1.1, rotate: 10 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-14 h-14 flex items-center justify-center bg-white text-gray-600 rounded-2xl shadow-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-gray-50"
                            >
                              <Plus className="w-6 h-6" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row sm:flex-col items-center gap-8 relative z-10">
                    <div className="text-right hidden sm:block">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block mb-2">Subtotal</span>
                      <p className="text-5xl font-black text-indigo-600 tracking-tighter font-display">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.1, rotate: 8, backgroundColor: '#fee2e2', color: '#ef4444' }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteDoc(doc(db, 'users', user!.uid, 'cart', item.id))}
                      className="w-20 h-20 flex items-center justify-center text-gray-300 bg-gray-50/50 rounded-[2rem] transition-all sm:opacity-0 group-hover:opacity-100 shadow-xl hover:shadow-red-100"
                    >
                      <Trash2 className="w-8 h-8" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {items.length === 0 && !loading && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-64 text-center bg-white rounded-[4rem] border-2 border-dashed border-gray-100 shadow-2xl shadow-gray-50/50"
            >
              <div className="w-40 h-40 bg-gray-50 rounded-[3rem] flex items-center justify-center mx-auto mb-10 group hover:rotate-12 transition-transform duration-500">
                <ShoppingBag className="text-gray-200 w-16 h-16 group-hover:text-indigo-200 transition-colors" />
              </div>
              <h2 className="text-5xl font-black text-gray-900 mb-6 uppercase tracking-tighter font-display">Your cart is empty</h2>
              <p className="text-gray-400 font-bold text-xl mb-14 max-w-md mx-auto">Looks like you haven't added anything to your cart yet.</p>
              <motion.button 
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')} 
                className="glossy-button px-16 py-6 rounded-2xl font-black text-sm uppercase tracking-[0.3em]"
              >
                Start Shopping
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Summary */}
        <div className="space-y-10">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-14 rounded-[4rem] border border-gray-100 shadow-2xl shadow-indigo-100/30 space-y-12 sticky top-28 overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-50 rounded-full -mr-24 -mt-24 blur-[80px] opacity-60" />
            
            <div className="flex items-center space-x-6 relative">
              <div className="w-16 h-16 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-indigo-100">
                <CheckCircle2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-black text-gray-900 text-4xl tracking-tighter font-display uppercase">Summary</h3>
            </div>

            <div className="space-y-8 relative">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-black text-xs uppercase tracking-[0.3em]">Subtotal</span>
                <span className="text-2xl font-black text-gray-900 font-display tracking-tight">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-black text-xs uppercase tracking-[0.3em]">Shipping</span>
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-black text-green-600 bg-green-50 px-4 py-1.5 rounded-full uppercase tracking-widest">Free</span>
                  <span className="text-2xl font-black text-gray-900 font-display tracking-tight">₹0.00</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 font-black text-xs uppercase tracking-[0.3em]">Tax (GST 18%)</span>
                <span className="text-2xl font-black text-gray-900 font-display tracking-tight">₹{(total * 0.18).toFixed(2)}</span>
              </div>
              
              <div className="h-px bg-gray-100 my-10" />
              
              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <span className="font-black text-gray-900 text-sm uppercase tracking-[0.4em]">Total Amount</span>
                  <p className="text-xs text-gray-400 font-bold">Including all taxes</p>
                </div>
                <span className="text-7xl font-black text-indigo-600 tracking-tighter font-display">₹{(total * 1.18).toFixed(2)}</span>
              </div>
            </div>

            <div className="p-10 bg-gray-50/50 rounded-[2.5rem] border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-2xl transition-all duration-500 relative">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform group-hover:rotate-6">
                  <WalletIcon className="w-8 h-8 text-indigo-600" />
                </div>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Wallet Balance</span>
              </div>
              <span className="font-black text-gray-900 text-2xl tracking-tighter">₹{profile?.walletBalance.toFixed(2)}</span>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] block ml-3">Shipping Address</label>
              <textarea 
                className="w-full px-8 py-6 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-indigo-100 focus:ring-8 focus:ring-indigo-50 transition-all outline-none font-bold text-base resize-none text-gray-700 shadow-inner"
                rows={3}
                value={shippingAddress}
                onChange={e => setShippingAddress(e.target.value)}
                placeholder="Enter your full delivery address..."
              />
            </div>

            <motion.button 
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCheckout}
              disabled={checkingOut || items.length === 0}
              className="w-full py-8 glossy-button rounded-[2rem] font-black text-2xl flex items-center justify-center space-x-4 disabled:opacity-50 uppercase tracking-[0.2em] shadow-2xl shadow-indigo-200"
            >
              <span>{checkingOut ? 'Processing...' : 'Checkout Now'}</span>
              <ArrowRight className="w-8 h-8" />
            </motion.button>
          </motion.div>
        </div>
      </div>
      </motion.div>
    </div>
  );
};

export default CartPage;
