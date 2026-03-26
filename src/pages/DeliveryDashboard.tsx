import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Order } from '../types';
import { useAuth } from '../context/AuthContext';
import { Truck, Package, MapPin, CheckCircle2, Clock, Navigation, Power, CheckCircle, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

const DeliveryDashboard: React.FC = () => {
  const { profile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;
    // For demo, show all 'confirmed' or 'shipped' orders
    const q = query(collection(db, 'orders'), where('status', 'in', ['confirmed', 'shipped', 'delivered']));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'orders');
    });
    return () => unsubscribe();
  }, [profile]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus,
        deliveryBoyId: profile?.uid
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `orders/${orderId}`);
    }
  };

  const hasActiveDeliveries = React.useMemo(() => 
    orders.some(o => o.status === 'shipped'), 
    [orders]
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (profile?.isOnline && hasActiveDeliveries) {
      interval = setInterval(() => {
        updateLocation();
      }, 5000); // Update every 5 seconds as requested
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [profile?.isOnline, hasActiveDeliveries]);

  const updateLocation = async () => {
    if (!profile) return;
    try {
      if (!navigator.geolocation) {
        console.error('Geolocation is not supported by your browser');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await updateDoc(doc(db, 'users', profile.uid), {
            location: {
              lat: latitude,
              lng: longitude,
              lastUpdated: serverTimestamp()
            }
          });
        },
        (err) => console.error('Error getting location:', err),
        { enableHighAccuracy: true }
      );
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${profile.uid}`);
    }
  };

  const toggleAvailability = async () => {
    if (!profile) return;
    try {
      await updateDoc(doc(db, 'users', profile.uid), {
        isOnline: !profile.isOnline
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${profile.uid}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-200 group hover:rotate-6 transition-transform duration-500">
              <Truck className="text-white w-10 h-10 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-gray-900 tracking-tighter font-display uppercase">Delivery Fleet<span className="text-indigo-600">.</span></h1>
              <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-sm mt-2">Manage assignments and track deliveries</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <motion.button 
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleAvailability}
              className={`flex items-center space-x-3 px-8 py-4 rounded-[1.5rem] font-black text-sm transition-all shadow-2xl uppercase tracking-[0.2em] ${
                profile?.isOnline 
                  ? 'bg-green-600 text-white shadow-green-200' 
                  : 'bg-white border-2 border-gray-100 text-gray-400 hover:border-gray-200'
              }`}
            >
              <Power className="w-6 h-6" />
              <span>{profile?.isOnline ? 'Online' : 'Offline'}</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={updateLocation}
              className="flex items-center space-x-3 px-8 py-4 bg-white border-2 border-gray-100 text-gray-900 rounded-[1.5rem] font-black text-sm hover:border-indigo-600 transition-all shadow-2xl uppercase tracking-[0.2em] relative overflow-hidden group"
            >
              <Navigation className="w-6 h-6 text-indigo-600 group-hover:rotate-12 transition-transform" />
              <span>Update Location</span>
              {profile?.isOnline && hasActiveDeliveries && (
                <div className="absolute bottom-0 left-0 h-1.5 bg-indigo-600 animate-progress w-full" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: 'Pending Deliveries', value: orders.filter(o => o.status === 'shipped').length, icon: Package, color: 'indigo' },
            { label: 'Completed Today', value: orders.filter(o => o.status === 'delivered').length, icon: CheckCircle, color: 'green' },
            { label: 'Total Earnings', value: `₹${(orders.filter(o => o.status === 'delivered').length * 50).toFixed(2)}`, icon: Wallet, color: 'blue' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glossy-card p-8 group"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{stat.label}</p>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600 opacity-50 group-hover:opacity-100 transition-opacity`} />
              </div>
              <p className="text-4xl font-black font-display tracking-tighter text-gray-900 group-hover:scale-110 transition-transform origin-left duration-500">{stat.value}</p>
            </motion.div>
          ))}
        </div>

      <div className="grid grid-cols-1 gap-6">
        {orders.map(order => (
          <div key={order.id} className="glossy-card overflow-hidden flex flex-col md:flex-row">
            <div className="p-8 flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-indigo-600" />
                  <span className="font-black text-gray-900 uppercase tracking-widest text-xs">Order #{order.id.slice(-6)}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Delivery Address</p>
                    <p className="font-bold text-gray-900">123 Main St, Suite 456, Metro City</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Est. Delivery</p>
                    <p className="font-bold text-gray-900">Today, by 6:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Items</p>
                <div className="flex flex-wrap gap-2">
                  {order.items.map((item, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-50 rounded-lg text-xs font-bold text-gray-600">
                      {item.quantity}x {item.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 w-full md:w-72 flex flex-col justify-center space-y-4">
              <div className="text-center mb-4">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Order Total</p>
                <p className="text-3xl font-black text-gray-900">₹{order.totalAmount.toFixed(2)}</p>
              </div>
              
              {order.status === 'confirmed' && (
                <button 
                  onClick={() => updateStatus(order.id, 'shipped')}
                  className="w-full py-3 glossy-button rounded-2xl font-bold uppercase tracking-widest"
                >
                  Mark as Shipped
                </button>
              )}
              {order.status === 'shipped' && (
                <button 
                  onClick={() => updateStatus(order.id, 'delivered')}
                  className="w-full py-3 bg-green-600 text-white rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100 uppercase tracking-widest"
                >
                  Mark as Delivered
                </button>
              )}
              {order.status === 'delivered' && (
                <div className="flex flex-col items-center text-green-600">
                  <CheckCircle2 className="w-10 h-10 mb-2" />
                  <span className="font-black uppercase tracking-widest text-xs">Completed</span>
                </div>
              )}
            </div>
          </div>
        ))}
        {orders.length === 0 && !loading && (
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">No active deliveries assigned.</p>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
