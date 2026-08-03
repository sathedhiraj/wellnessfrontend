"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore, type Address } from "@/lib/store/auth-store";
import { Package, MapPin, User as UserIcon, LogOut, ChevronRight, RefreshCw, Plus, Edit2, Trash2, X } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  Placed:     "bg-amber-50 text-amber-700 border-amber-100",
  Packed:     "bg-blue-50 text-blue-700 border-blue-100",
  Shipped:    "bg-indigo-50 text-indigo-700 border-indigo-100",
  Delivered:  "bg-sage-100 text-sage-700 border-sage-200",
  Returned:   "bg-rose-100 text-rose-800 border-rose-200",
  Cancelled:  "bg-red-50 text-red-600 border-red-100",
};

export default function AccountPage() {
  const {
    user,
    logout,
    fetchOrders,
    fetchUserProfile,
    updateProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    isLoading,
    error: storeError,
    clearError
  } = useAuthStore();

  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "profile">("orders");

  // Address editing states
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  // Address form inputs
  const [addrForm, setAddrForm] = useState({
    name: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    pincode: ""
  });

  // Profile form inputs
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [feedbackError, setFeedbackError] = useState("");

  // Sync profile form when user updates or loads
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || ""
      });
    }
  }, [user]);

  // Refresh user and orders on mount
  useEffect(() => {
    if (user) {
      fetchOrders();
      fetchUserProfile();
    }
  }, [fetchOrders, fetchUserProfile, user]);

  const handleLogout = () => {
    logout();
    router.push("/account/login");
  };

  // Address CRUD logic
  const openAddAddress = () => {
    setAddrForm({ name: "", phone: "", line1: "", line2: "", city: "", state: "", pincode: "" });
    setIsAddingAddress(true);
    setEditingAddress(null);
    clearError();
  };

  const openEditAddress = (addr: Address) => {
    setAddrForm({
      name: addr.name || "",
      phone: addr.phone || "",
      line1: addr.line1,
      line2: addr.line2 || "",
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode
    });
    setEditingAddress(addr);
    setIsAddingAddress(false);
    clearError();
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackError("");
    setFeedbackMsg("");

    let success = false;
    if (editingAddress) {
      success = await updateAddress(editingAddress.id, addrForm);
    } else {
      success = await addAddress(addrForm);
    }

    if (success) {
      setFeedbackMsg(editingAddress ? "Address updated successfully!" : "Address saved successfully!");
      setIsAddingAddress(false);
      setEditingAddress(null);
    } else {
      setFeedbackError(storeError || "Failed to save address.");
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    setFeedbackError("");
    setFeedbackMsg("");
    const success = await deleteAddress(id);
    if (success) {
      setFeedbackMsg("Address deleted successfully!");
    } else {
      setFeedbackError(storeError || "Failed to delete address.");
    }
  };

  // Profile Update logic
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackError("");
    setFeedbackMsg("");
    const success = await updateProfile(profileForm.name, profileForm.email, profileForm.phone);
    if (success) {
      setFeedbackMsg("Profile updated successfully!");
    } else {
      setFeedbackError(storeError || "Failed to update profile.");
    }
  };

  // Return Order logic
  const handleReturnOrder = async (orderId: string) => {
    if (!window.confirm("Are you sure you want to return this product?")) return;
    setFeedbackError("");
    setFeedbackMsg("");
    try {
      const token = localStorage.getItem("wow-token");
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const res = await fetch(`${API_BASE}/orders/${orderId}/return`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setFeedbackMsg("Return request submitted successfully! Status updated to Returned.");
        fetchOrders();
      } else {
        const data = await res.json().catch(() => ({}));
        setFeedbackError(data.error || "Failed to return order.");
      }
    } catch {
      setFeedbackError("Network error. Please try again.");
    }
  };

  if (!user) {
    return (
      <section className="section-py bg-cream-50 min-h-[60vh] flex items-center">
        <div className="container-padded text-center">
          <h1 className="font-serif text-2xl text-forest mb-4">Please sign in to view your account</h1>
          <Link href="/account/login" className="btn-primary">Sign In</Link>
        </div>
      </section>
    );
  }

  const orders = user.orders ?? [];
  const addresses = user.addresses ?? [];

  return (
    <section className="section-py bg-cream-50 min-h-[80vh]">
      <div className="container-padded max-w-5xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-sage-100 rounded-full flex items-center justify-center border border-sage-200">
              <span className="text-sage-700 font-bold text-xl font-serif">{user.name[0]?.toUpperCase()}</span>
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-forest">Hello, {user.name.split(" ")[0]}!</h1>
              <p className="text-warmgray-400 text-sm">{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-warmgray-500 hover:text-coral transition-colors font-medium">
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Global Feedback Messages */}
        {feedbackMsg && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-medium animate-fade-in">
            {feedbackMsg}
          </div>
        )}
        {feedbackError && (
          <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium animate-fade-in">
            {feedbackError}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Side: Quick Links */}
          <div className="space-y-3">
            {[
              { id: "orders", icon: Package, label: "Order History", count: orders.length },
              { id: "addresses", icon: MapPin, label: "Saved Addresses", count: addresses.length },
              { id: "profile", icon: UserIcon, label: "Profile Details" },
            ].map(({ id: tabId, icon: Icon, label, count }) => (
              <div
                key={label}
                onClick={() => {
                  setActiveTab(tabId as any);
                  setIsAddingAddress(false);
                  setEditingAddress(null);
                  setFeedbackError("");
                  setFeedbackMsg("");
                }}
                className={`bg-white rounded-2xl p-4 shadow-card flex items-center justify-between group cursor-pointer hover:shadow-card-hover border-2 transition-all duration-150 ${
                  activeTab === tabId ? "border-sage-500 bg-sage-50/40" : "border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${activeTab === tabId ? "bg-sage-100" : "bg-sage-50"}`}>
                    <Icon size={16} className="text-sage-600" />
                  </div>
                  <span className={`font-semibold text-sm ${activeTab === tabId ? "text-sage-700" : "text-forest"}`}>{label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {count !== undefined && (
                    <span className="text-xs text-warmgray-400 font-medium">{count}</span>
                  )}
                  <ChevronRight size={14} className="text-warmgray-300 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Right Side: Tab View */}
          <div className="lg:col-span-2">
            {activeTab === "orders" && (
              <div className="bg-white rounded-2xl shadow-card p-5">
                <div className="flex items-center justify-between mb-4 border-b border-warmgray-50 pb-3">
                  <h2 className="font-serif text-xl font-bold text-forest">Recent Orders</h2>
                  <button
                    onClick={() => fetchOrders()}
                    disabled={isLoading}
                    className="flex items-center gap-1.5 text-xs text-warmgray-500 hover:text-forest transition-colors disabled:opacity-50"
                  >
                    <RefreshCw size={12} className={isLoading ? "animate-spin" : ""} />
                    Refresh
                  </button>
                </div>

                {isLoading && orders.length === 0 ? (
                  <div className="text-center py-10 text-warmgray-400">Loading orders...</div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-10 bg-warmgray-50/50 rounded-xl border border-dashed border-warmgray-200">
                    <Package size={36} className="text-warmgray-300 mx-auto mb-3" />
                    <p className="text-warmgray-400 text-sm">No orders found.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-warmgray-100 rounded-xl p-4 bg-white hover:shadow-sm transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-warmgray-50">
                          <div>
                            <p className="font-semibold text-forest text-sm">#{order.orderNumber}</p>
                            <p className="text-xs text-warmgray-400">
                              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <div className="text-right flex flex-col items-end sm:items-end gap-1">
                            <span
                              className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                                STATUS_COLORS[order.status] ?? "bg-warmgray-50 text-warmgray-600 border-warmgray-100"
                              }`}
                            >
                              {order.status}
                            </span>
                            <p className="text-sm font-bold text-forest">
                              ₹{order.total.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>

                        {/* Order info details */}
                        <div className="grid grid-cols-2 gap-2 mb-4 bg-warmgray-50 p-2.5 rounded-lg text-xs text-warmgray-600">
                          <p>
                            <span className="font-semibold text-warmgray-700">Payment Method:</span>{" "}
                            {order.paymentMethod === "prepaid" ? "Online Payment" : "Cash on Delivery (COD)"}
                          </p>
                          <p>
                            <span className="font-semibold text-warmgray-700">Delivery Status:</span>{" "}
                            {order.status === "Delivered" ? "Delivered" : order.status === "Returned" ? "Returned" : "Pending Delivery"}
                          </p>
                        </div>

                        {/* Line items list */}
                        <div className="space-y-2 mb-4">
                          {order.items?.map((item, i) => (
                            <p key={i} className="text-xs text-warmgray-500">
                              · {item.variant?.product?.title ?? "Product"} ({item.variant?.name || "Standard"}) × {item.quantity}
                            </p>
                          ))}
                        </div>

                        {/* Order return action */}
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleReturnOrder(order.id)}
                            disabled={order.status !== "Delivered"}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                              order.status === "Delivered"
                                ? "bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100 hover:border-rose-300"
                                : "bg-warmgray-50 border-warmgray-100 text-warmgray-300 cursor-not-allowed"
                            }`}
                          >
                            Return Product
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="bg-white rounded-2xl shadow-card p-5">
                <div className="flex items-center justify-between mb-4 border-b border-warmgray-50 pb-3">
                  <h2 className="font-serif text-xl font-bold text-forest">Saved Addresses</h2>
                  {!isAddingAddress && !editingAddress && (
                    <button
                      onClick={openAddAddress}
                      className="flex items-center gap-1.5 text-xs text-sage-600 hover:text-forest font-semibold"
                    >
                      <Plus size={14} /> Add Address
                    </button>
                  )}
                </div>

                {/* Adding / Editing address form */}
                {(isAddingAddress || editingAddress) ? (
                  <form onSubmit={handleSaveAddress} className="space-y-4 bg-warmgray-50/50 p-4 rounded-xl border border-warmgray-100 animate-fade-in">
                    <div className="flex justify-between items-center mb-2 border-b border-warmgray-100 pb-2">
                      <h4 className="font-semibold text-sm text-forest">{editingAddress ? "Edit Address" : "Add Address"}</h4>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingAddress(false);
                          setEditingAddress(null);
                        }}
                        className="text-warmgray-400 hover:text-warmgray-600"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-warmgray-500 mb-1">Contact Name *</label>
                        <input
                          type="text"
                          required
                          value={addrForm.name}
                          onChange={(e) => setAddrForm({ ...addrForm, name: e.target.value })}
                          className="input-base text-xs"
                          placeholder="Ananya Singh"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-warmgray-500 mb-1">Contact Phone *</label>
                        <input
                          type="text"
                          required
                          value={addrForm.phone}
                          onChange={(e) => setAddrForm({ ...addrForm, phone: e.target.value })}
                          className="input-base text-xs"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-warmgray-500 mb-1">Address Line 1 *</label>
                        <input
                          type="text"
                          required
                          value={addrForm.line1}
                          onChange={(e) => setAddrForm({ ...addrForm, line1: e.target.value })}
                          className="input-base text-xs"
                          placeholder="Flat/House No, Building, Street"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-warmgray-500 mb-1">Address Line 2 (Optional)</label>
                        <input
                          type="text"
                          value={addrForm.line2}
                          onChange={(e) => setAddrForm({ ...addrForm, line2: e.target.value })}
                          className="input-base text-xs"
                          placeholder="Locality, Sector, Landmark"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-warmgray-500 mb-1">City *</label>
                        <input
                          type="text"
                          required
                          value={addrForm.city}
                          onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
                          className="input-base text-xs"
                          placeholder="Mumbai"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-warmgray-500 mb-1">State *</label>
                        <input
                          type="text"
                          required
                          value={addrForm.state}
                          onChange={(e) => setAddrForm({ ...addrForm, state: e.target.value })}
                          className="input-base text-xs"
                          placeholder="Maharashtra"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-warmgray-500 mb-1">PIN Code *</label>
                        <input
                          type="text"
                          required
                          value={addrForm.pincode}
                          onChange={(e) => setAddrForm({ ...addrForm, pincode: e.target.value })}
                          className="input-base text-xs"
                          placeholder="400001"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end pt-3">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingAddress(false);
                          setEditingAddress(null);
                        }}
                        className="px-4 py-2 border border-warmgray-200 text-xs font-semibold text-warmgray-600 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn-primary text-xs py-2 px-4">
                        Save Address
                      </button>
                    </div>
                  </form>
                ) : addresses.length === 0 ? (
                  <div className="text-center py-10 bg-warmgray-50/50 rounded-xl border border-dashed border-warmgray-200">
                    <MapPin size={36} className="text-warmgray-300 mx-auto mb-3" />
                    <p className="text-warmgray-400 text-sm">No saved addresses found.</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="border border-warmgray-100 rounded-xl p-4 bg-white shadow-sm flex flex-col justify-between">
                        <div className="space-y-1">
                          <p className="font-semibold text-forest text-sm">{addr.name || user.name}</p>
                          <p className="text-xs text-sage-600 font-medium">{addr.phone || user.phone}</p>
                          <p className="text-xs text-warmgray-500 mt-2">{addr.line1}</p>
                          {addr.line2 && <p className="text-xs text-warmgray-400">{addr.line2}</p>}
                          <p className="text-xs text-warmgray-500">
                            {addr.city}, {addr.state} - <span className="font-semibold">{addr.pincode}</span>
                          </p>
                        </div>
                        <div className="flex justify-end gap-3 mt-4 border-t border-warmgray-50 pt-3">
                          <button
                            onClick={() => openEditAddress(addr)}
                            className="flex items-center gap-1 text-xs text-sage-600 hover:text-forest font-semibold transition-colors"
                          >
                            <Edit2 size={12} /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="flex items-center gap-1 text-xs text-rose-500 hover:text-rose-700 font-semibold transition-colors"
                          >
                            <Trash2 size={12} /> Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl shadow-card p-5">
                <div className="mb-4 border-b border-warmgray-50 pb-3">
                  <h2 className="font-serif text-xl font-bold text-forest">Profile Details</h2>
                </div>

                <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-xs font-semibold text-warmgray-500 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="input-base text-sm"
                      placeholder="Ananya Singh"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-warmgray-500 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="input-base text-sm"
                      placeholder="ananya@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-warmgray-500 mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="input-base text-sm"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <button type="submit" disabled={isLoading} className="btn-primary w-full justify-center py-3">
                    {isLoading ? "Saving Profile..." : "Save Profile Details"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
