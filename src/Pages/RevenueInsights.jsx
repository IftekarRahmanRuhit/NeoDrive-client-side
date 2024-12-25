import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import "animate.css";

const RevenueInsights = ({ data }) => {
  return (
    <div className="bg-[#191919] p-5 max-w-screen-2xl mx-auto">
      <div className="w-11/12 mx-auto max-w-screen-2xl pb-16">
        <h2 className="font-bold text-3xl text-gray-300 mb-8 mt-16">
          Revenue Insights
        </h2>
        {!data || data.length === 0 ? (
          <p className="text-center text-gray-300 mt-6">
            You haven't booked any car yet.
          </p>
        ) : (
          <div className="mt-5">
            <div className="bg-black rounded-xl p-6 shadow-md overflow-x-auto cursor-pointer animate__animated animate__fadeInUp">
              <div className="min-w-[600px]">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={data.slice(0, 9).map((item) => ({
                      carModel: item.carModel,
                      dailyRentalPrice: Number(item.dailyRentalPrice),
                    }))}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    barCategoryGap="20%"
                  >
                    <XAxis
                      dataKey="carModel"
                      stroke="#F9FAFB" // Gray-500
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis stroke="#F9FAFB" tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#F9FAFB",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <CartesianGrid stroke="#E5E7EB" strokeDasharray="5 5" />
                    <Bar
                      dataKey="dailyRentalPrice"
                      fill="#FF3600"
                      barSize={30}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenueInsights;
