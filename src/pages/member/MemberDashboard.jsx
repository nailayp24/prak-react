import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import { supabase } from "../../services/supabaseClient";

export default function MemberDashboard() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        const { data: authData } = await supabase.auth.getUser();
        if (!authData.user) return;

        const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", authData.user.id)
            .single();

        setProfile(data);
    };

    const getDiscount = (tier) => {
        if (tier === "platinum") return "20%";
        if (tier === "gold") return "15%";
        if (tier === "silver") return "10%";
        return "5%";
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(price || 0);
    };

    return (
        <div className="p-6">
            <PageHeader title="Dashboard Member" breadcrumb={["Member Area"]} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <span className="block text-gray-500 text-sm mb-2">Nama Member</span>
                    <span className="block text-2xl font-bold text-gray-800">{profile?.full_name || "-"}</span>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <span className="block text-gray-500 text-sm mb-2">Tier Saat Ini</span>
                    <span className="block text-2xl font-bold text-[#00B074]">{profile?.tier || "bronze"}</span>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <span className="block text-gray-500 text-sm mb-2">Poin</span>
                    <span className="block text-2xl font-bold text-gray-800">{profile?.points || 0}</span>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <span className="block text-gray-500 text-sm mb-2">Diskon</span>
                    <span className="block text-2xl font-bold text-gray-800">{getDiscount(profile?.tier)}</span>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">Total Belanja</h3>
                <p className="text-[#00B074] text-3xl font-black">{formatPrice(profile?.total_spent)}</p>
            </div>
        </div>
    );
}
