'use client';

import StorageSummary from '../../components/dashboardPage/StorageSummary';
import RecentFiles from '../../components/dashboardPage/RecentFiles';
import Layout from '@/components/Layout';

export default function Dashboard() {
    return (
        <Layout>
            <div className="max-w-7xl mx-auto flex flex-col gap-8">

                {/* Page Header */}
                <header className="mb-4">
                    <h1 className="text-3xl font-bold text-white">Welcome back 👋</h1>
                    <p className="text-sm text-gray-300">Here’s what’s going on with your storage today.</p>
                </header>

                {/* Storage Summary */}
                <StorageSummary />

                {/* Recent Files */}
                <RecentFiles />
            </div>
        </Layout>
    );
}
