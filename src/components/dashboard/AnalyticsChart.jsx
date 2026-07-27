import React from 'react';
import { useSelector } from 'react-redux';
import { selectCategoryBreakdown } from '../../features/finance/financeSelectors';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-3.5 shadow-xl shadow-zinc-950/50 backdrop-blur-md">
        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
          {payload[0].payload.category}
        </p>
        <p className="text-sm font-mono font-black text-cyan-400">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const AnalyticsChart = () => {
  const categoryBreakdown = useSelector(selectCategoryBreakdown);

  // Convert breakdown object to array format for Recharts
  const chartData = Object.entries(categoryBreakdown).map(([category, amount]) => ({
    category,
    amount,
  }));

  // Sleek neon color array for chart bars
  const colors = ['#06B6D4', '#10B981', '#6366F1', '#F59E0B', '#EC4899', '#3B82F6'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 flex flex-col justify-between h-full min-h-[320px] relative overflow-hidden"
    >
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-cyan-500/5 blur-3xl -mr-12 -mt-12 pointer-events-none"></div>

      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-zinc-100 flex items-center space-x-2">
              <span>Category Breakdown</span>
            </h3>
            <p className="text-xs text-zinc-500">Distribution of expenses by tags</p>
          </div>
          <BarChart3 className="h-5 w-5 text-zinc-400" />
        </div>

        {/* Chart Area */}
        <div className="h-48 w-full font-mono text-[10px] text-zinc-400 mt-2">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <XAxis
                  dataKey="category"
                  stroke="#71717a"
                  tickLine={false}
                  axisLine={false}
                  fontSize={10}
                  fontWeight={500}
                />
                <YAxis
                  stroke="#71717a"
                  tickLine={false}
                  axisLine={false}
                  fontSize={10}
                  fontWeight={500}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#27272a', opacity: 0.2 }} />
                <Bar dataKey="amount" radius={[6, 6, 0, 0]} maxBarSize={32}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                      className="transition-all duration-300 hover:opacity-80"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-zinc-600">
              <span className="text-sm font-semibold mb-1">No Expense Data</span>
              <span className="text-[10px] text-center max-w-[180px] leading-relaxed">
                Add an expense transaction to view the category bar chart.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-4 border-t border-zinc-900 flex justify-between items-center text-[10px] text-zinc-500">
        <span>Active Categories: {chartData.length}</span>
        <span className="text-cyan-500/80 font-bold uppercase tracking-wider">Dynamic Engine</span>
      </div>
    </motion.div>
  );
};

export default AnalyticsChart;
