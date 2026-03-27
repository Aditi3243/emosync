import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from "recharts";
import { TrendingUp } from "lucide-react";

const weeklyData = [
  { day: "Mon", stress: 45, mood: 70 },
  { day: "Tue", stress: 32, mood: 80 },
  { day: "Wed", stress: 58, mood: 55 },
  { day: "Thu", stress: 40, mood: 72 },
  { day: "Fri", stress: 25, mood: 85 },
  { day: "Sat", stress: 30, mood: 90 },
  { day: "Sun", stress: 20, mood: 88 },
];

const WeeklyChart = () => {
  return (
    <div className="glass-card-strong p-6 md:p-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-xl text-foreground">Weekly Report</h2>
            <p className="text-sm text-muted-foreground">Your stress & mood trends this week</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-emo-purple" />
            <span className="text-muted-foreground">Stress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-emo-green" />
            <span className="text-muted-foreground">Mood</span>
          </div>
        </div>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={weeklyData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(270, 20%, 90%)" vertical={false} />
            <XAxis
              dataKey="day"
              tick={{ fill: "hsl(260, 10%, 50%)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: "hsl(260, 10%, 50%)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                background: "hsla(270, 30%, 100%, 0.9)",
                border: "1px solid hsl(270, 20%, 90%)",
                borderRadius: "12px",
                backdropFilter: "blur(10px)",
                boxShadow: "0 8px 32px hsla(260, 40%, 60%, 0.08)",
              }}
              labelStyle={{ color: "hsl(260, 20%, 20%)", fontWeight: 600 }}
            />
            <Bar dataKey="stress" fill="hsl(270, 60%, 65%)" radius={[6, 6, 0, 0]} barSize={24} opacity={0.8} />
            <Line
              type="monotone"
              dataKey="mood"
              stroke="hsl(150, 50%, 55%)"
              strokeWidth={3}
              dot={{ fill: "hsl(150, 50%, 55%)", r: 5, strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 7 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center p-3 rounded-xl bg-muted/30">
          <p className="text-2xl font-bold text-primary">35%</p>
          <p className="text-xs text-muted-foreground mt-1">Avg Stress</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-muted/30">
          <p className="text-2xl font-bold text-emo-green">77%</p>
          <p className="text-xs text-muted-foreground mt-1">Avg Mood</p>
        </div>
        <div className="text-center p-3 rounded-xl bg-muted/30">
          <p className="text-2xl font-bold text-emo-pink">7</p>
          <p className="text-xs text-muted-foreground mt-1">Entries</p>
        </div>
      </div>
    </div>
  );
};

export default WeeklyChart;
